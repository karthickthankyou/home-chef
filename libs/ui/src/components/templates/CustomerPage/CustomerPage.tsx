import Badge from '@home-chefs-org/ui/src/components/atoms/Badge'
import { Button } from '@home-chefs-org/ui/src/components/atoms/Button'
import { Form } from '@home-chefs-org/ui/src/components/atoms/Form'
import { HtmlLabel } from '@home-chefs-org/ui/src/components/atoms/HtmlLabel'
import { HtmlTextArea } from '@home-chefs-org/ui/src/components/atoms/HtmlTextArea'
import { PlainButton } from '@home-chefs-org/ui/src/components/atoms/PlainButton'
import Tooltip from '@home-chefs-org/ui/src/components/atoms/Tooltip'
import { Dialog } from '@home-chefs-org/ui/src/components/molecules/Dialog'
import { Loader } from '@home-chefs-org/ui/src/components/molecules/Loader'
import { Rating } from '@home-chefs-org/ui/src/components/molecules/Rating'
import {
  Tabs,
  Tab,
  TabPanel,
} from '@home-chefs-org/ui/src/components/molecules/Tabs/Tabs'
import { IconType } from '@home-chefs-org/ui/src/components/molecules/TimelineItem/TimelineItem'
import { WeekCalendar } from '@home-chefs-org/ui/src/components/molecules/WeekCalendar'
import { useFormReviewFoodItem } from '@home-chefs-org/forms/src/customer/reviewFoodItem'

import {
  DateTimeFilter,
  InputMaybe,
  SchedulesForCustomerQuery,
  namedOperations,
  useCreateCustomerReviewMutation,
  useOrdersForCustomerLazyQuery,
  useSchedulesForCustomerLazyQuery,
  useUpdateScheduleMutation,
} from '@home-chefs-org/network/src/generated'
import { useAppDispatch, useAppSelector } from '@home-chefs-org/store'
import { selectUid } from '@home-chefs-org/store/user'
import {
  IconMessageCircle,
  IconPlayerPause,
  IconPlayerPlay,
  IconRefresh,
  IconStar,
  IconX,
} from '@tabler/icons-react'
import { format } from 'date-fns'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Controller } from 'react-hook-form'

import {
  TableCell,
  TableHead,
  TableRow,
  Table,
} from '../../organisms/Table/Table'

export interface ICustomerPageProps {}

export const CustomerPage = ({}: ICustomerPageProps) => {
  return (
    <div className="space-y-6">
      <CustomerSchedules />
      <CustomerOrders />
    </div>
  )
}

export const LayoutWithHeader = ({
  heading,
  children,
  empty = false,
}: {
  heading: string
  children: ReactNode
  empty?: boolean
}) => (
  <div>
    <div className="text-lg">{heading}</div>
    {children}
  </div>
)

export type OrderType = 'Today' | 'Previous' | 'Upcoming'

export const CustomerOrders = () => {
  const [value, setValue] = useState<number>(1)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const dispatch = useAppDispatch()
  return (
    <LayoutWithHeader heading="Orders">
      <div>
        {/* <PlainButton onClick={() => dispatch(refetchOrdersForCustomers())}>
          <IconRefresh />
        </PlainButton> */}
        <div>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Upcoming" />
            <Tab label="Today" />
            <Tab label="Previous" />
          </Tabs>
        </div>
        <TabPanel index={0} value={value}>
          <CustomerOrderData type="Upcoming" />
        </TabPanel>
        <TabPanel index={1} value={value}>
          <CustomerOrderData type="Today" />
        </TabPanel>
        <TabPanel index={2} value={value}>
          <CustomerOrderData type="Previous" />
        </TabPanel>
      </div>
    </LayoutWithHeader>
  )
}

type Dates = {
  today: string
  tomorrow: string
}

export const getTodayAndTomorrow = () => {
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setUTCHours(0, 0, 0, 0)
  return { today: today.toISOString(), tomorrow: tomorrow.toISOString() }
}

export const getDatesFilter = ({
  type,
}: {
  type: 'Today' | 'Upcoming' | 'Previous'
}): InputMaybe<DateTimeFilter> => {
  const dates = getTodayAndTomorrow()

  switch (type) {
    case 'Previous':
      return { lt: dates.today }
    case 'Today':
      return { gte: dates.today, lt: dates.tomorrow }
    case 'Upcoming':
      return { gt: dates.today }
  }
}

const useGetOrders = ({
  type,
}: {
  type: 'Today' | 'Upcoming' | 'Previous'
}) => {
  const uid = useAppSelector((state) => state.user.uid)

  const dateFilter = getDatesFilter({ type })

  const [ordersForCustomer, data] = useOrdersForCustomerLazyQuery({
    variables: {
      customerId: uid!,
      where: { time: dateFilter },
    },
  })

  useEffect(() => {
    if (uid) ordersForCustomer()
  }, [uid])

  return [data]
}

export const CustomerOrderData = ({
  type,
}: {
  type: 'Today' | 'Upcoming' | 'Previous'
}) => {
  const [{ data }] = useGetOrders({ type })

  if (data?.ordersForCustomer.length === 0)
    return (
      <div className="flex items-center justify-center bg-gray-50 h-52">
        No orders found.
      </div>
    )

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Item name</TableCell>
          <TableCell align="right">Order ID</TableCell>
          <TableCell align="right">Time</TableCell>
          <TableCell align="right">Quantity</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Status</TableCell>
        </TableRow>
      </TableHead>
      {data?.ordersForCustomer.map((order) => (
        <TableRow key={order.id}>
          <TableCell>{order.schedule.foodItem.name}</TableCell>
          <TableCell align="right">{order.id}</TableCell>
          <TableCell align="right">
            {format(new Date(order.time), 'PPp')}
          </TableCell>
          <TableCell align="right">{order.quantity}</TableCell>
          <TableCell align="right">{order.price}</TableCell>
          <TableCell align="right">
            <Badge>{order.status}</Badge>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  )
}

export const useCustomerSchedules = () => {
  const uid = useAppSelector(selectUid)

  const [refetchSchedules, { loading, data, error }] =
    useSchedulesForCustomerLazyQuery({
      variables: { customerId: uid! },
    })

  useEffect(() => {
    if (uid) refetchSchedules()
  }, [uid])

  return { loading, data, error }
}

export const CustomerSchedules = () => {
  const { data, loading } = useCustomerSchedules()

  return (
    <LayoutWithHeader heading="Subscriptions">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Days</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Rating</TableCell>
          </TableRow>
        </TableHead>
        {data?.schedulesForCustomer
          .sort((a, b) => a.foodItem.time.localeCompare(b.foodItem.time))
          .map((schedule) => (
            <CustomerSubscriptionRow key={schedule.id} schedule={schedule} />
          ))}
      </Table>
    </LayoutWithHeader>
  )
}

export const CustomerSubscriptionRow = ({
  schedule,
}: {
  schedule: SchedulesForCustomerQuery['schedulesForCustomer'][number]
}) => {
  const [openRatingDialog, setOpenRatingDialog] = useState(false)

  const [updateScheduleMutation, { loading, data }] = useUpdateScheduleMutation(
    {
      refetchQueries: [namedOperations.Query.schedulesForCustomer],
      awaitRefetchQueries: true,
    },
  )
  return (
    <>
      <FoodItemReviewForm
        open={openRatingDialog}
        setOpen={setOpenRatingDialog}
        foodItemId={+schedule.foodItem.id}
      />
      <TableRow key={schedule.id}>
        <TableCell>
          <div className="font-semibold">{schedule.foodItem.name}</div>
          <div className="text-gray-600">{schedule.foodItem.kitchen.name}</div>
        </TableCell>
        <TableCell align="right" className="text-sm">
          Rs. {(schedule.quantity || 1) * schedule.foodItem.price}
        </TableCell>
        <TableCell align="center" className="font-semibold">
          {schedule.quantity}
        </TableCell>
        <TableCell>
          <div className="flex gap-2 text-sm text-gray-600">
            <IconType time={+schedule.foodItem.time} />
            {format(new Date(schedule.foodItem.time), 'p')}
          </div>
        </TableCell>

        <TableCell className="space-y-1">
          <WeekCalendar days={schedule.days} />
        </TableCell>

        <TableCell align="right">
          {schedule.live ? (
            <div className="flex items-center justify-end gap-2">
              <Badge>Live</Badge>
              <PlainButton
                onClick={async () => {
                  await updateScheduleMutation({
                    variables: {
                      updateScheduleInput: { id: +schedule.id, live: false },
                    },
                  })
                }}
              >
                {loading ? <Loader /> : <IconPlayerPause />}
              </PlainButton>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-2">
              <Badge variant="gray">Paused</Badge>
              <PlainButton
                onClick={async () => {
                  await updateScheduleMutation({
                    variables: {
                      updateScheduleInput: { id: +schedule.id, live: true },
                    },
                  })
                }}
              >
                {loading ? <Loader /> : <IconPlayerPlay />}
              </PlainButton>
            </div>
          )}
        </TableCell>
        <TableCell align="right">
          {schedule?.foodItem.customerReview?.rating ? (
            <div className="flex justify-end gap-2">
              {schedule.foodItem.customerReview.text ? (
                <Tooltip title={schedule.foodItem.customerReview.text}>
                  <IconMessageCircle />
                </Tooltip>
              ) : null}
              <Rating
                readOnly
                value={schedule.foodItem.customerReview.rating}
              />
            </div>
          ) : (
            <PlainButton
              onClick={() => {
                setOpenRatingDialog(true)
              }}
            >
              <IconStar />
            </PlainButton>
          )}
        </TableCell>
      </TableRow>
    </>
  )
}

export const FoodItemReviewForm = ({
  foodItemId,
  open,
  setOpen,
}: {
  foodItemId: number
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const { register, control, handleSubmit } = useFormReviewFoodItem({})

  const [createCustomerReviewMutation, { loading, data }] =
    useCreateCustomerReviewMutation()
  const uid = useAppSelector(selectUid)
  return (
    <Dialog open={open} setOpen={setOpen}>
      <Form
        onSubmit={handleSubmit(async (data) => {
          if (!uid) return
          await createCustomerReviewMutation({
            variables: {
              createCustomerReviewInput: {
                customerId: uid,
                foodItemId,
                rating: data.rating,
                text: data.text,
              },
            },
          })
          setOpen(false)
        })}
      >
        <HtmlLabel title="Review">
          <HtmlTextArea {...register('text')} />
        </HtmlLabel>
        <HtmlLabel title="Rating">
          <Controller
            name="rating"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Rating
                size="large"
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue)
                }}
              />
            )}
          />
        </HtmlLabel>

        <Button loading={loading} type="submit">
          Submit
        </Button>
      </Form>
    </Dialog>
  )
}
