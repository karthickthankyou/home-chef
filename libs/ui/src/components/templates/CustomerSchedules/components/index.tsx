import { useFormReviewFoodItem } from '@home-chefs-org/forms/src/customer/reviewFoodItem'
import {
  namedOperations,
  SchedulesForCustomerQuery,
  useCreateCustomerReviewMutation,
  useUpdateScheduleMutation,
} from '@home-chefs-org/network/src/generated'
import { Controller } from 'react-hook-form'

import {
  IconMessageCircle,
  IconPlayerPause,
  IconPlayerPlay,
  IconStar,
} from '@tabler/icons-react'
import { format } from 'date-fns'
import { Dispatch, SetStateAction, useState } from 'react'
import { PlainButton } from '../../../atoms/PlainButton'
import { IconType } from '../../../molecules/TimelineItem/TimelineItem'
import { WeekCalendar } from '../../../molecules/WeekCalendar'

import { useAppSelector } from '@home-chefs-org/store'
import { selectUid } from '@home-chefs-org/store/user'
import Badge from '../../../atoms/Badge'
import { Button } from '../../../atoms/Button'
import { Dialog } from '../../../atoms/Dialog'
import { Form } from '../../../atoms/Form'
import { HtmlLabel } from '../../../atoms/HtmlLabel'
import { HtmlTextArea } from '../../../atoms/HtmlTextArea'
import Tooltip from '../../../atoms/Tooltip'
import { Loader } from '../../../molecules/Loader'
import { Rating } from '../../../molecules/Rating'
import { TableCell, TableRow } from '../../../organisms/Table/Table'

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
    <Dialog open={open} setOpen={setOpen} title="Review">
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
