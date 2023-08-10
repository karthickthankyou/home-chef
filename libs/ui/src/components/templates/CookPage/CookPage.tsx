import { useFormUpdateCook } from '@home-chefs-org/forms/src/cook/updateCookProfile'
import { Button } from '@home-chefs-org/ui/src/components/atoms/Button'
import { Form } from '@home-chefs-org/ui/src/components/atoms/Form'
import { HtmlInput } from '@home-chefs-org/ui/src/components/atoms/HtmlInput'
import { HtmlLabel } from '@home-chefs-org/ui/src/components/atoms/HtmlLabel'
import { ProgressBar } from '@home-chefs-org/ui/src/components/atoms/ProgressBar'
import Link from 'next/link'

import {
  CookMeQuery,
  OrdersForKitchenQuery,
  Status,
  useUpdateAddressMutation,
  useUpdateKitchenMutation,
  useUpdateOrderMutation,
} from '@home-chefs-org/network/src/generated'
import { Map } from '@home-chefs-org/ui/src/components/organisms/Map'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { useWatch } from 'react-hook-form'

import { format, isToday, isTomorrow, isYesterday } from 'date-fns'

import { IconDotsVertical, IconPencil, IconSoup } from '@tabler/icons-react'

import Badge from '@home-chefs-org/ui/src/components/atoms/Badge'
import { HtmlTextArea } from '@home-chefs-org/ui/src/components/atoms/HtmlTextArea'

import { Panel } from '@home-chefs-org/ui/src/components/organisms/Map/Panel'
import {
  TableCell,
  TableRow,
} from '@home-chefs-org/ui/src/components/organisms/Table/Table'
import { Marker } from 'react-map-gl'

import { useAppDispatch, useAppSelector } from '@home-chefs-org/store'
import { selectUid } from '@home-chefs-org/store/user'
import { useImageUpload } from '@home-chefs-org/util'
import { notification$ } from '@home-chefs-org/util/subjects'
import { Dialog } from '../../atoms/Dialog/Dialog'
import { DefaultZoomControls } from '../../organisms/Map/ZoomControls/ZoomControls'
import { Menu } from '../../organisms/Menu'
import { MenuItem } from '../../organisms/Menu/Menu'

const QuillEditor = dynamic(
  () => import('../../organisms/QuillEditor').then((mod) => mod.QuillEditor),
  { ssr: false },
)

export interface ICookPageProps {}

export const DisplayLocation = ({ lat, lng }: { lat: number; lng: number }) => {
  if (!lat || !lng) return null
  return (
    <div className="flex gap-2 text-xs">
      <div className="px-1 bg-gray-200 ">{lat.toFixed(2)}</div>
      <div className="px-1 bg-gray-200 ">{lng.toFixed(2)}</div>
    </div>
  )
}

export const TitleValue = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => (
  <div>
    <div className="font-semibold">{title}</div>
    {children}
  </div>
)

export type FoodItemInQuery = NonNullable<
  NonNullable<NonNullable<CookMeQuery['cookMe']>['kitchen']>['foodItems']
>[number]

export const groupByTime = (data: FoodItemInQuery[]) =>
  data?.reduce<{
    [key: string]: FoodItemInQuery[]
  }>((result, item) => {
    if (!result[item.time]) {
      result[item.time] = []
    }
    if (item && result[item.time]) {
      // @ts-ignore
      result[item.time as string].push(item)
    }
    return result
  }, {})

export const UpdateKitchenInfo = ({
  cook,
  className,
}: {
  cook: CookMeQuery['cookMe']
  className?: string
}) => {
  const [openUpdate, setOpenUpdate] = useState(false)
  const [updateKitchenMutation, { loading }] = useUpdateKitchenMutation()
  const [updateAddressMutation, { loading: updateAddressFetching }] =
    useUpdateAddressMutation()

  const uid = useAppSelector(selectUid)

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useFormUpdateCook({
    defaultValues: {
      about: cook.kitchen?.about || '',
      address: {
        address: cook.kitchen?.address?.address || '',
        zipCode: cook.kitchen?.address?.zipCode || '',
        lat: cook.kitchen?.address?.lat || 0,
        lng: cook.kitchen?.address?.lng || 0,
      },
      image: cook.kitchen?.image || '',
      name: cook.kitchen?.name || '',
    },
  })

  const formdata = useWatch({ control })
  console.log('formdata', formdata)

  const [{ percent }, uploadImages] = useImageUpload()

  return (
    <div className={`${className}`}>
      <Button
        variant="text"
        size="none"
        color="black"
        className="mt-auto"
        onClick={() => setOpenUpdate(true)}
      >
        <IconPencil className="p-1 text-black border rounded hover:bg-gray-200" />
      </Button>
      <Dialog open={openUpdate} setOpen={setOpenUpdate} title={'Edit'}>
        <div className="mb-4 font-semibold">Edit cook details</div>
        <Form
          onSubmit={handleSubmit(async ({ name, image, about, address }) => {
            if (!uid) {
              notification$.next({ message: 'Not logged in.', type: 'error' })
              return
            }
            if (!cook.kitchen?.id) {
              notification$.next({
                message: 'Something went wrong. (Kitchen id not received.)',
                type: 'error',
              })
              return
            }
            await updateKitchenMutation({
              variables: {
                updateKitchenInput: {
                  id: cook.kitchen.id,
                  about,
                  image,
                  name,
                },
              },
            })

            if (cook?.kitchen?.address?.id) {
              await updateAddressMutation({
                variables: {
                  updateAddressInput: {
                    id: cook.kitchen.address.id,
                    ...(address && {
                      address: address.address,
                      lat: address.lat,
                      lng: address.lng,
                      zipCode: address.zipCode,
                    }),
                  },
                },
              })
            }

            setOpenUpdate(false)
          })}
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <HtmlLabel title="Name">
                <HtmlInput {...register('name')} />
              </HtmlLabel>
              <HtmlLabel title="About">
                <HtmlInput {...register('about')} />
              </HtmlLabel>
              <HtmlLabel title="Image">
                <img
                  src={formdata.image}
                  className="object-cover w-24 mb-2 rounded aspect-square"
                />

                <HtmlInput
                  multiple={false}
                  type="file"
                  placeholder="Upload images"
                  accept="image/*"
                  onChange={(e) =>
                    uploadImages(e, (images: string[]) => {
                      setValue('image', images[0])
                    })
                  }
                />
                {percent > 0 ? (
                  <ProgressBar variant="determinate" value={percent} />
                ) : null}
              </HtmlLabel>
              <HtmlLabel title="Address" error={errors.address?.message}>
                <HtmlTextArea {...register('address.address')} />
              </HtmlLabel>
              <HtmlLabel
                title="Zip code"
                error={errors.address?.zipCode?.message}
              >
                <HtmlInput {...register('address.zipCode')} />
              </HtmlLabel>{' '}
              <HtmlLabel title="Location" error={errors.address?.lat?.message}>
                <DisplayLocation
                  lat={formdata?.address?.lat || 0}
                  lng={formdata?.address?.lng || 0}
                />
              </HtmlLabel>{' '}
              <div className="flex justify-end gap-2 ">
                <Button onClick={() => setOpenUpdate(false)} variant="outlined">
                  Close
                </Button>
                <Button loading={loading} type="submit">
                  Submit
                </Button>
              </div>
            </div>
            <Map
              height="100%"
              initialViewState={{
                latitude: cook.kitchen?.address?.lat || 80,
                longitude: cook.kitchen?.address?.lng || 12,
                zoom: 6,
              }}
            >
              <Panel
                position="center-bottom"
                className="px-2 py-1 bg-white rounded-t"
              >
                Drag marker to edit location.
              </Panel>
              <Panel
                position="right-center"
                className="px-2 py-1 bg-white rounded-t"
              >
                <DefaultZoomControls />
              </Panel>

              <Marker
                anchor="bottom"
                draggable
                latitude={formdata.address?.lat || 0}
                longitude={formdata.address?.lng || 0}
                onDragEnd={({ lngLat }) => {
                  setValue('address.lat', lngLat.lat)
                  setValue('address.lng', lngLat.lng)
                }}
              >
                <div className="cursor-pointer text-primary-500">
                  <IconSoup />
                </div>
              </Marker>
            </Map>
          </div>
        </Form>
      </Dialog>
    </div>
  )
}

export const CookInfo = ({ cook }: { cook: CookMeQuery['cookMe'] }) => {
  return (
    <div className="flex flex-col w-full max-w-[12rem] md:max-w-[16rem] gap-2 ">
      <div className="sticky top-16">
        <div className="relative w-full h-64">
          <Image
            fill
            src={
              cook.kitchen?.image ||
              'https://images.unsplash.com/photo-1614548539924-5c1f205b3747?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
            }
            className="object-cover rounded"
            alt=""
          />
        </div>
        <div className="mt-2">
          <div className="flex justify-between">
            <div className="font-semibold">{cook.kitchen?.name}</div>
            <div>
              {cook.kitchen?.open ? <Badge>Open</Badge> : <Badge>Closed</Badge>}
            </div>
          </div>
          <div className="text-sm text-gray-700">{cook.kitchen?.about}</div>
          <div className="text-sm text-gray-700">
            {cook.kitchen?.address?.address}
          </div>

          <UpdateKitchenInfo className="mt-2" cook={cook} />
        </div>
      </div>
    </div>
  )
}

export const CookProfile = ({ cook }: { cook: CookMeQuery['cookMe'] }) => {
  return (
    <div className="flex gap-4 ">
      <CookInfo cook={cook} />
      <div className="flex flex-col gap-2">
        <Link className="underline underline-offset-4" href="/menu">
          Menu
        </Link>
        <Link className="underline underline-offset-4" href="/subscribers">
          Subscribers
        </Link>
        <Link className="underline underline-offset-4" href="/orders">
          Orders
        </Link>
      </div>
    </div>
  )
}

type GroupedOrders = {
  date: string
  items: {
    time: string
    items: OrdersForKitchenQuery['ordersForKitchen']
  }[]
}[]

// https://github.com/prisma/prisma/issues/6653
const groupByDayAndTime = (arr: OrdersForKitchenQuery['ordersForKitchen']) => {
  return arr.reduce((result, obj) => {
    // Get the day of the current item
    const dateString = formatDate(obj.time)
    // Get the time of the current item
    const timeString = format(new Date(obj.time), 'p')

    // Find the existing day object, or create a new one if it doesn't exist
    let dayObject = result.find((item) => item.date === dateString)
    if (!dayObject) {
      dayObject = { date: dateString, items: [] }
      result.push(dayObject)
    }

    //   Todo group by item name

    // Find the existing time object for the current day, or create a new one if it doesn't exist
    let timeObject = dayObject.items.find((item) => item.time === timeString)
    if (!timeObject) {
      timeObject = { time: timeString, items: [] }
      dayObject.items.push(timeObject)
    }

    // Add the current object to the array of items
    timeObject.items.push(obj)

    console.log('Result: ', result)

    return result
  }, [] as GroupedOrders)
}

type GroupByCustomer = {
  uid: String
  name: String
  items: OrdersForKitchenQuery['ordersForKitchen']
}[]

const groupByCustomers = (items: OrdersForKitchenQuery['ordersForKitchen']) => {
  return items.reduce((result, item) => {
    const uid = item.customer.uid
    const existingItem = result.find((group) => group.uid === uid)
    if (existingItem) {
      existingItem.items.push(item)
    } else {
      result.push({ uid: uid, name: item.customer.name, items: [item] })
    }
    return result
  }, [] as GroupByCustomer)
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)

  if (isToday(date)) {
    return 'Today'
  } else if (isTomorrow(date)) {
    return 'Tomorrow'
  } else if (isYesterday(date)) {
    return 'Yesterday'
  } else {
    return format(date, 'PP')
  }
}

export const ValueLabel = ({
  value,
  label,
}: {
  value: ReactNode
  label: string
}) => (
  <div className="p-2 border rounded">
    <div className="text-xl">{value}</div>
    <div className="text-xs">{label}</div>
  </div>
)

export const CustomerFoodItemRow = ({
  order,
}: {
  order: OrdersForKitchenQuery['ordersForKitchen'][number]
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClose = () => {
    setAnchorEl(null)
  }
  const [updateOrderMutation, { loading }] = useUpdateOrderMutation()
  const dispatch = useAppDispatch()
  return (
    <TableRow key={order.id}>
      <TableCell>{order?.schedule?.foodItem.name}</TableCell>
      <TableCell align="right">{order.quantity}</TableCell>
      <TableCell align="right">
        {order.status === Status.Undelivered ? (
          <Button
            loading={loading}
            onClick={async () => {
              await updateOrderMutation({
                variables: {
                  updateOrderInput: {
                    id: +order.id,
                    status: Status.Delivered,
                  },
                },
              })
            }}
            variant="text"
            size="none"
          >
            Deliver
          </Button>
        ) : (
          <div className="text-xs">{order.status}</div>
        )}
      </TableCell>
      <TableCell align="right">
        <button onClick={(e) => setAnchorEl(e.currentTarget)}>
          <IconDotsVertical />
        </button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem
            onClick={async () => {
              await updateOrderMutation({
                variables: {
                  updateOrderInput: {
                    id: +order.id,
                    status: Status.Cancelled,
                  },
                },
              })
            }}
            className="text-red"
          >
            Cancel delivery
          </MenuItem>
          <div className="bg-gray-200 h-[1px]" />
          <MenuItem
            onClick={async () => {
              await updateOrderMutation({
                variables: {
                  updateOrderInput: {
                    id: +order.id,
                    status: Status.Undelivered,
                  },
                },
              })
            }}
          >
            Reset
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  )
}

export const Heading = ({ children }: { children: string }) => (
  <h1 className="text-lg font-semibold ">{children}</h1>
)
