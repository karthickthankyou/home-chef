import {
  CookMeQuery,
  useRemoveFoodItemMutation,
  useUpdateFoodItemMutation,
  Day,
  namedOperations,
  useCreateFoodItemMutation,
} from '@home-chefs-org/network/src/generated'
import { Controller, useWatch } from 'react-hook-form'
import { FoodItemInQuery, Heading, groupByTime } from '../CookPage/CookPage'
import { ProgressBar } from '../../atoms/ProgressBar'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { Button } from '../../atoms/Button'
import { Form } from '../../atoms/Form'
import { Dialog } from '../../atoms/Dialog'
import { HtmlInput } from '../../atoms/HtmlInput'
import { ToggleButtonGroup } from '../../molecules/ToggleButtonGroup'
import { ToggleButton } from '../../molecules/ToggleButtonGroup/ToggleButtonGroup'
import { Price } from '@home-chefs-org/ui/src/components/molecules/Price'

import {
  getHHMMSS,
  getMsFromString,
  getTimeFromDateTime,
  useImageUpload,
} from '@home-chefs-org/util'
import { DayIcons } from '../../molecules/WeekCalendar/WeekCalendar'
import dynamic from 'next/dynamic'
const QuillEditor = dynamic(
  () => import('../../organisms/QuillEditor').then((mod) => mod.QuillEditor),
  { ssr: false },
)
import { IconPencil, IconPlus, IconUser } from '@tabler/icons-react'
import { useAppDispatch, useAppSelector } from '@home-chefs-org/store'
import { useFormUpdateFoodItem } from '@home-chefs-org/forms/src/foodItems/updateFoodItem'
import { useState } from 'react'
import { selectUid } from '@home-chefs-org/store/user'
import { useFormCreateFoodItem } from '@home-chefs-org/forms/src/foodItems/createFoodItems'
import Tooltip from '../../atoms/Tooltip'

export interface ICookMenuProps {}

export const CookMenu = ({ cook }: { cook: CookMeQuery['cookMe'] }) => {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <Heading>Menu</Heading>
        <AddNewFoodItem cook={cook} />
      </div>

      <div className="space-y-6">
        {Object.entries(groupByTime(cook?.kitchen?.foodItems || []) || {})
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

export const AddNewFoodItem = ({ cook }: { cook: CookMeQuery['cookMe'] }) => {
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

      <Dialog
        open={openUpdate}
        setOpen={setOpenUpdate}
        title={'Create food item'}
      >
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
              if (!cook?.kitchen?.id) {
                throw 'Kitchen id not found.'
              }
              await createFoodItemMutation({
                variables: {
                  createFoodItemInput: {
                    kitchenId: +cook.kitchen.id,
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
                awaitRefetchQueries: true,
                refetchQueries: [namedOperations.Query.cookMe],
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
      <Dialog
        open={openUpdate}
        setOpen={setOpenUpdate}
        title={'Update food item'}
      >
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
