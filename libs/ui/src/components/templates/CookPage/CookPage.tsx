import { Button } from '@home-chefs-org/ui/src/components/atoms/Button'
import { Form } from '@home-chefs-org/ui/src/components/atoms/Form'
import { HtmlInput } from '@home-chefs-org/ui/src/components/atoms/HtmlInput'
import { HtmlLabel } from '@home-chefs-org/ui/src/components/atoms/HtmlLabel'
import { ProgressBar } from '@home-chefs-org/ui/src/components/atoms/ProgressBar'
import { Price } from '@home-chefs-org/ui/src/components/molecules/Price'
import { useFormUpdateCook } from '@home-chefs-org/forms/src/cook/updateCookProfile'

import { useFormCreateFoodItem } from '@home-chefs-org/forms/src/foodItems/createFoodItems'
import { useFormUpdateFoodItem } from '@home-chefs-org/forms/src/foodItems/updateFoodItem'
import { Map } from '@home-chefs-org/ui/src/components/organisms/Map'
import {
  Day,
  GetCookQuery,
  OrdersForKitchenQuery,
  Status,
  useCreateFoodItemMutation,
  useGetCookLazyQuery,
  useGetCookQuery,
  useOrdersForKitchenQuery,
  useRemoveFoodItemMutation,
  useUpdateAddressMutation,
  useUpdateFoodItemMutation,
  useUpdateKitchenMutation,
  useUpdateOrderMutation,
} from '@home-chefs-org/network/src/generated'

import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import dynamic from 'next/dynamic'

import { format, isToday, isTomorrow, isYesterday } from 'date-fns'

import {
  IconDotsVertical,
  IconPencil,
  IconPlus,
  IconSoup,
  IconUser,
} from '@tabler/icons-react'

import Badge from '@home-chefs-org/ui/src/components/atoms/Badge'
import { HtmlTextArea } from '@home-chefs-org/ui/src/components/atoms/HtmlTextArea'
import {
  Popup,
  PopupContent,
} from '@home-chefs-org/ui/src/components/organisms/Map/Popup/Popup'

import { Marker } from 'react-map-gl'
import { Panel } from '@home-chefs-org/ui/src/components/organisms/Map/Panel'
import Tooltip from '@home-chefs-org/ui/src/components/atoms/Tooltip'
import { Accordion } from '@home-chefs-org/ui/src/components/molecules/Accordion'
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
} from '@home-chefs-org/ui/src/components/organisms/Table/Table'

import { notification$ } from '@home-chefs-org/util/subjects'
import {
  getHHMMSS,
  getMsFromString,
  getTimeFromDateTime,
  useImageUpload,
} from '@home-chefs-org/util'
import { useAppDispatch, useAppSelector } from '@home-chefs-org/store'
import { Dialog } from '../../molecules/Dialog/Dialog'
import { ToggleButtonGroup } from '../../molecules/ToggleButtonGroup'
import { ToggleButton } from '../../molecules/ToggleButtonGroup/ToggleButtonGroup'
import { DayIcons } from '../../molecules/WeekCalendar/WeekCalendar'
import { Menu } from '../../organisms/Menu'
import { MenuItem } from '../../organisms/Menu/Menu'
import { BecomeCook } from '../../organisms/BecomeCook'
import { selectUid } from '@home-chefs-org/store/user'
import ZoomControls from '../../organisms/Map/ZoomControls'
import { DefaultZoomControls } from '../../organisms/Map/ZoomControls/ZoomControls'
import { LoaderPanel } from '../../molecules/Loader'

const QuillEditor = dynamic(
  () => import('../../organisms/QuillEditor').then((mod) => mod.QuillEditor),
  { ssr: false },
)

export interface ICookPageProps {}

export const CookPage = () => {
  const user = useAppSelector((state) => state.user)
  const [getCook, { loading: cookFetching, data: cookData }] =
    useGetCookLazyQuery()

  useEffect(() => {
    if (user.uid)
      getCook({
        variables: { where: { uid: user.uid } },
      })
  }, [user])

  if (!user.loaded) {
    return <LoaderPanel />
  }

  if (!user.uid)
    return (
      <>
        <div>You are not logged in.</div>
        <Link
          className="mt-4 font-semibold underline underline-offset-4"
          href={'/login'}
        >
          Login
        </Link>
      </>
    )

  if (!cookData?.cook) return <BecomeCook uid={user.uid} />

  return <CookProfile />
}

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
  NonNullable<NonNullable<GetCookQuery['cook']>['kitchen']>['foodItems']
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

export const UpdateKitchenInfo = ({ className }: { className?: string }) => {
  const [openUpdate, setOpenUpdate] = useState(false)
  const [updateKitchenMutation, { loading }] = useUpdateKitchenMutation()
  const [updateAddressMutation, { loading: updateAddressFetching }] =
    useUpdateAddressMutation()

  const uid = useAppSelector(selectUid)

  const { data: cookData } = useGetCookQuery({ variables: { where: { uid } } })

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useFormUpdateCook({
    defaultValues: {
      about: cookData?.cook?.kitchen?.about || '',
      address: {
        address: cookData?.cook?.kitchen?.address?.address || '',
        zipCode: cookData?.cook?.kitchen?.address?.zipCode || '',
        lat: cookData?.cook?.kitchen?.address?.lat || 0,
        lng: cookData?.cook?.kitchen?.address?.lng || 0,
      },
      image: cookData?.cook?.kitchen?.image || '',
      name: cookData?.cook?.kitchen?.name || '',
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
      <Dialog open={openUpdate} setOpen={setOpenUpdate}>
        <div className="mb-4 font-semibold">Edit cook details</div>
        <Form
          onSubmit={handleSubmit(async ({ name, image, about, address }) => {
            if (!uid) {
              notification$.next({ message: 'Not logged in.', type: 'error' })
              return
            }
            if (!cookData?.cook?.kitchen?.id) {
              notification$.next({
                message: 'Something went wrong. (Kitchen id not received.)',
                type: 'error',
              })
              return
            }
            await updateKitchenMutation({
              variables: {
                updateKitchenInput: {
                  id: +cookData.cook.kitchen.id,
                  about,
                  image,
                  name,
                },
              },
            })

            if (cookData?.cook?.kitchen?.address?.id) {
              await updateAddressMutation({
                variables: {
                  updateAddressInput: {
                    id: +cookData.cook.kitchen.address.id,
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
                latitude: cookData?.cook?.kitchen?.address?.lat || 80,
                longitude: cookData?.cook?.kitchen?.address?.lng || 12,
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

export const AddNewFoodItem = () => {
  const [openUpdate, setOpenUpdate] = useState(false)

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useFormCreateFoodItem({
    defaultValues: {
      description: '',
      deliveryAvailable: false,
      live: false,
      vegan: false,
      name: '',
      price: 0,
      image: '',
      maxQuantity: 0,
      days: [],
      time: '00:00:00',
    },
  })

  const [createFoodItemMutation, { loading }] = useCreateFoodItemMutation()

  const [{ percent }, uploadImages] = useImageUpload()
  const dispatch = useAppDispatch()
  const uid = useAppSelector(selectUid)

  const { loading: cookFetching, data: cookData } = useGetCookQuery({
    variables: { where: { uid } },
  })

  const formData = useWatch({ control })

  return (
    <>
      <Button
        variant="text"
        size="none"
        className="mt-auto"
        onClick={() => setOpenUpdate(true)}
      >
        <div>
          <IconPlus className="w-6 h-6 p-1 text-white bg-black rounded-full" />
        </div>
      </Button>

      <Dialog open={openUpdate} setOpen={setOpenUpdate}>
        <Form
          onSubmit={handleSubmit(
            async ({
              description,
              image,
              maxQuantity,
              name,
              price,
              time,
              days,
              vegan,
              deliveryAvailable,
              live,
            }) => {
              console.log('come on ... ', description, image, maxQuantity)
              if (!cookData?.cook?.kitchen?.id) {
                throw 'Kitchen id not found.'
              }
              await createFoodItemMutation({
                variables: {
                  createFoodItemInput: {
                    kitchenId: +cookData.cook.kitchen.id,
                    description,
                    image: image || '',
                    days,
                    maxQuantity,
                    name,
                    price,
                    time: getMsFromString(time),
                    deliveryAvailable,
                    live,
                    vegan,
                  },
                },
              })
              setOpenUpdate(false)
            },
          )}
        >
          <HtmlLabel title="Name">
            <HtmlInput {...register('name')} />
          </HtmlLabel>

          <HtmlLabel title="Description">
            <Controller
              name="description"
              control={control}
              render={({ field: { value, onChange } }) => (
                <QuillEditor value={value} onChange={onChange} />
              )}
            />
          </HtmlLabel>
          <HtmlLabel title="Days">
            <Controller
              name={'days'}
              control={control}
              render={({ field: { value, onChange } }) => (
                <ToggleButtonGroup
                  value={value}
                  onChange={(e, value) => onChange(value)}
                  aria-label="Select days"
                >
                  {Object.entries(DayIcons).map(([key, Icon]) => {
                    return (
                      <ToggleButton key={key} value={key}>
                        {Icon}
                      </ToggleButton>
                    )
                  })}
                </ToggleButtonGroup>
              )}
            />
          </HtmlLabel>

          <HtmlLabel type="number" title="Price">
            <HtmlInput {...register('price', { valueAsNumber: true })} />
          </HtmlLabel>
          <HtmlLabel type="number" title="MaxQuantity">
            <HtmlInput {...register('maxQuantity', { valueAsNumber: true })} />
          </HtmlLabel>
          <HtmlLabel title="Time">
            <HtmlInput type="time" {...register('time')} />
          </HtmlLabel>
          {formData.image ? (
            <img alt={formData.name} src={formData.image} />
          ) : null}
          <HtmlLabel title="Images">
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
          <div className="flex justify-end gap-2">
            <Button onClick={() => setOpenUpdate(false)} variant="outlined">
              Close
            </Button>
            <Button loading={loading} type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Dialog>
    </>
  )
}

export const UpdateFoodItem = ({ foodItem }: { foodItem: FoodItemInQuery }) => {
  const [openUpdate, setOpenUpdate] = useState(false)

  const {
    control,
    register,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
  } = useFormUpdateFoodItem({
    defaultValues: {
      description: foodItem.description || '',
      name: foodItem.name || '',
      price: foodItem.price || 0,
      image: foodItem.image || '',
      maxQuantity: foodItem.maxQuantity || 0,
      time: getHHMMSS(foodItem.time) || '',
      days: foodItem.days || [],
    },
  })
  const formData = useWatch({ control })

  console.log('foodItem.days', foodItem.days, formData)

  const [updateFoodItemMutation, { loading }] = useUpdateFoodItemMutation()
  const [removeFootItemMutation, { loading: removing }] =
    useRemoveFoodItemMutation()

  const [{ percent }, uploadImages] = useImageUpload()
  const dispatch = useAppDispatch()
  return (
    <div>
      <Button
        variant="text"
        size="none"
        color="black"
        className="mt-auto"
        onClick={() => setOpenUpdate(true)}
      >
        <IconPencil className="p-1 text-black bg-white border rounded hover:bg-gray-200" />
      </Button>
      <Dialog open={openUpdate} setOpen={setOpenUpdate}>
        <Form
          onSubmit={handleSubmit(
            async ({
              description,
              image,
              maxQuantity,
              name,
              price,
              time,
              days,
            }) => {
              await updateFoodItemMutation({
                variables: {
                  updateFoodItemInput: {
                    id: +foodItem.id,
                    description,
                    image,
                    maxQuantity,
                    name,
                    price,
                    time: getMsFromString(time),
                    days,
                  },
                },
              })
              reset({})
              setOpenUpdate(false)
            },
          )}
        >
          <HtmlLabel error={errors.name?.message} title="Name">
            <HtmlInput {...register('name')} />
          </HtmlLabel>

          <HtmlLabel title="Description">
            <Controller
              name="description"
              control={control}
              render={({ field: { value, onChange } }) => (
                <QuillEditor value={value} onChange={onChange} />
              )}
            />
          </HtmlLabel>
          <HtmlLabel title="Days">
            <Controller
              name="days"
              control={control}
              render={({ field: { value, onChange } }) => (
                <ToggleButtonGroup
                  value={value}
                  onChange={(e, v) => onChange(v)}
                >
                  {Object.entries(DayIcons).map(([key, Icon]) => {
                    return (
                      <ToggleButton
                        key={key}
                        selected={value?.includes(key as Day)}
                        value={key}
                      >
                        {Icon}
                      </ToggleButton>
                    )
                  })}
                </ToggleButtonGroup>
              )}
            />
          </HtmlLabel>

          <HtmlLabel error={errors.price?.message} title="Price">
            <HtmlInput {...register('price', { valueAsNumber: true })} />
          </HtmlLabel>
          <HtmlLabel error={errors.maxQuantity?.message} title="MaxQuantity">
            <HtmlInput {...register('maxQuantity', { valueAsNumber: true })} />
          </HtmlLabel>
          <HtmlLabel error={errors.time?.message} title="Time">
            <HtmlInput type="time" {...register('time')} />
          </HtmlLabel>
          <img
            alt={formData.name || foodItem.name}
            src={formData.image || foodItem.image || ''}
          />
          <HtmlLabel title="Images" error={errors.image?.message}>
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

          <div className="flex gap-2">
            <Button
              color="error"
              loading={removing}
              onClick={async () => {
                await removeFootItemMutation({
                  variables: { where: { id: +foodItem.id } },
                })
                setOpenUpdate(false)
              }}
              variant="outlined"
            >
              Delete
            </Button>
            <Button
              className="ml-auto"
              onClick={() => {
                reset({})
                setOpenUpdate(false)
              }}
              variant="outlined"
            >
              Close
            </Button>
            <Button loading={loading} type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Dialog>
    </div>
  )
}

export const CookInfo = ({
  kitchen,
}: {
  kitchen?: NonNullable<GetCookQuery['cook']>['kitchen']
}) => {
  return (
    <div className="flex flex-col w-full max-w-[12rem] md:max-w-[16rem] gap-2 ">
      <div className="sticky top-16">
        <div className="relative w-full h-64">
          <Image
            fill
            src={
              kitchen?.image ||
              'https://images.unsplash.com/photo-1614548539924-5c1f205b3747?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
            }
            className="object-cover rounded"
            alt=""
          />
        </div>
        <div className="mt-2">
          <div className="flex justify-between">
            <div className="font-semibold">{kitchen?.name}</div>
            <div>
              {kitchen?.open ? <Badge>Open</Badge> : <Badge>Closed</Badge>}
            </div>
          </div>
          <div className="text-sm text-gray-700">{kitchen?.about}</div>
          <div className="text-sm text-gray-700">
            {kitchen?.address?.address}
          </div>

          <UpdateKitchenInfo className="mt-2" />
        </div>
      </div>
    </div>
  )
}

export const CookProfile = () => {
  const uid = useAppSelector(selectUid)
  const { loading, data } = useGetCookQuery({ variables: { where: { uid } } })

  return (
    <div className="flex gap-4 ">
      <CookInfo kitchen={data?.cook?.kitchen} />
      <div className="space-y-6">
        <CookOrders kitchenId={data?.cook?.kitchen?.id} />
        <CookMenu data={data} />
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

export const CookOrders = ({ kitchenId }: { kitchenId?: number }) => {
  const { loading, data } = useOrdersForKitchenQuery({
    variables: { kitchenId: +kitchenId! },
  })

  const result = groupByDayAndTime(data?.ordersForKitchen || [])

  return (
    <div>
      <Heading>Orders</Heading>
      {result.map((dateItem) => (
        <div key={dateItem.date}>
          <Accordion
            title={
              <div className="text-xl">
                {' '}
                {dateItem.date} (
                {dateItem.items.reduce(
                  (total, current) => total + current.items.length,
                  0,
                )}
                )
              </div>
            }
          >
            <div>
              {dateItem.items.sort().map((timeItem) => (
                <div key={timeItem.time}>
                  <Accordion
                    title={
                      <div className="text-lg">
                        {timeItem.time} ({timeItem.items.length})
                      </div>
                    }
                  >
                    {groupByCustomers(timeItem.items).map((customerData) => (
                      <Accordion
                        key={customerData.uid.toLowerCase()}
                        title={
                          <div className="text-lg">{customerData.name}</div>
                        }
                      >
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Item</TableCell>
                              <TableCell align="right">Quantity</TableCell>
                              <TableCell align="right">Action</TableCell>
                              <TableCell align="right">Options</TableCell>
                            </TableRow>
                          </TableHead>
                          {customerData.items.map((order) => (
                            <CustomerFoodItemRow key={order.id} order={order} />
                          ))}
                        </Table>
                      </Accordion>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      ))}
    </div>
  )
}

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
      <TableCell>{order.schedule.foodItem.name}</TableCell>
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

export const CookMenu = ({ data }: { data?: GetCookQuery }) => {
  if (!data) return null
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <Heading>Menu</Heading>
        <AddNewFoodItem />
      </div>

      <div className="space-y-6">
        {Object.entries(groupByTime(data?.cook?.kitchen?.foodItems || []) || {})
          .sort()
          .map(([time, foodItems]) => (
            <div key={time} className="space-y-4">
              <div>{getTimeFromDateTime(time)}</div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {foodItems?.map((foodItem) => (
                  <div key={foodItem.id} className="flex gap-2">
                    <img
                      alt={foodItem.name}
                      className="object-cover w-24 h-24 rounded"
                      src={
                        foodItem?.image ||
                        'https://images.unsplash.com/photo-1614548539924-5c1f205b3747?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                      }
                    />
                    <div className="flex flex-col items-start flex-1 gap-2">
                      <div className="flex justify-between w-full">
                        <div className="font-semibold">{foodItem?.name}</div>
                        <UpdateFoodItem foodItem={foodItem} />
                      </div>
                      {/* <div className="flex text-sm">
                        Subscribers:{' '}
                        <div>
                          {foodItem.scheduleCount._count?.foodItemId || 0}
                        </div>
                        <div>/</div>
                        <div>{foodItem.maxQuantity}</div>
                      </div> */}

                      <Tooltip
                        placement="top"
                        arrow
                        title={`Reached ${
                          foodItem?.scheduleCount?.count || 0
                        } of ${foodItem.maxQuantity} subscribers.`}
                      >
                        <div className="flex items-center w-full gap-2">
                          <IconUser className="w-4 h-4" />
                          <ProgressBar
                            variant="determinate"
                            value={
                              foodItem?.scheduleCount?.count ||
                              0 / foodItem.maxQuantity
                            }
                          />
                        </div>
                      </Tooltip>

                      <Price price={foodItem.price} />
                      <div className="text-gray-600">
                        <QuillEditor
                          theme="bubble"
                          readOnly
                          value={foodItem.description || ''}
                        />
                      </div>
                      <ToggleButtonGroup>
                        {Object.entries(DayIcons).map(([key, Icon]) => {
                          return (
                            <ToggleButton
                              key={key}
                              selected={foodItem.days?.includes(key as Day)}
                              value={key}
                              className="cursor-auto"
                            >
                              {Icon}
                            </ToggleButton>
                          )
                        })}
                      </ToggleButtonGroup>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
