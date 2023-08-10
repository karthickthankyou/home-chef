import { UseFormSetValue } from 'react-hook-form'
import { Button } from '../../atoms/Button'

import { Container } from '../../atoms/Container'
import { Form } from '../../atoms/Form'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlTextArea } from '../../atoms/HtmlTextArea'
import { ProgressBar } from '../../atoms/ProgressBar'
import { Accordion } from '../../molecules/Accordion'

import {
  FormTypeCreateCook,
  useFormCreateCook,
} from '@home-chefs-org/forms/src/cook/createCook'
import { LocationInfo } from '@home-chefs-org/hooks/src/location'
import {
  Day,
  namedOperations,
  useCreateCookMutation,
} from '@home-chefs-org/network/src/generated'
import { getMsFromString, useImageUpload } from '@home-chefs-org/util'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { Controller, useFieldArray, useWatch } from 'react-hook-form'
import { Marker, useMap } from 'react-map-gl'
import { BrandIcon } from '../../atoms/BrandIcon'
import { Switch } from '../../atoms/Switch'
import { ToggleButtonGroup } from '../../molecules/ToggleButtonGroup'
import { ToggleButton } from '../../molecules/ToggleButtonGroup/ToggleButtonGroup'
import { DayIcons } from '../../molecules/WeekCalendar/WeekCalendar'
import { Map } from '../../organisms/Map'
import { Panel } from '../Map/Panel'
import {
  CenterOfMap,
  DefaultZoomControls,
} from '../Map/ZoomControls/ZoomControls'
import { SearchPlaceBox } from '../SearchPlaceBox'

export const BecomeCook = ({ uid }: { uid: string }) => {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useFormCreateCook()

  const [{ percent }, uploadImages] = useImageUpload()

  const formdata = useWatch({ control })

  const { fields, append, remove } = useFieldArray({
    control,
    name: `foodItems`,
  })

  const [hovered, setHovered] = useState<string | null>(null)

  const [createCookMutation, { loading }] = useCreateCookMutation()

  return (
    <Container>
      <Form
        className="mt-4"
        onSubmit={handleSubmit(async (data) => {
          const { about, address, foodItems, image, name, open } = data
          await createCookMutation({
            variables: {
              createCookInput: {
                uid,
                kitchen: {
                  name,
                  open,
                  image: image || '',
                  about,
                  address: {
                    address: address.address,
                    lat: address.lat,
                    lng: address.lng,
                    zipCode: address.zipCode,
                  },
                  foodItems: foodItems.map(
                    ({
                      description,
                      image,
                      maxQuantity,
                      name,
                      price,
                      time,
                      days,
                      deliveryAvailable,
                      live,
                      vegan,
                    }) => ({
                      description,
                      image: image || '',
                      maxQuantity,
                      name,
                      price,
                      time: getMsFromString(time),
                      days,
                      deliveryAvailable,
                      live,
                      vegan,
                    }),
                  ),
                },
              },
            },
            refetchQueries: [namedOperations.Query.cookMe],
            awaitRefetchQueries: true,
          })
        })}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <div className="mb-4 space-y-2">
              <h1 className="text-xl font-semibold ">Create cook profile</h1>
            </div>
            <HtmlLabel title="Name" error={errors.name?.message}>
              <HtmlInput {...register('name')} />
            </HtmlLabel>
            <HtmlLabel title="About" error={errors.about?.message}>
              <HtmlTextArea {...register('about')} />
            </HtmlLabel>
            <HtmlLabel title="Address" error={errors.address?.message}>
              <HtmlTextArea {...register('address.address')} />
            </HtmlLabel>
            <HtmlLabel
              title="Zip code"
              error={errors.address?.zipCode?.message}
            >
              <HtmlInput {...register('address.zipCode')} />
            </HtmlLabel>
            <HtmlLabel title="Images" error={errors.image?.message}>
              <HtmlInput
                multiple={false}
                type="file"
                placeholder="Upload images"
                accept="image/*"
                onChange={(e) => {
                  uploadImages(e, (images: string[]) => {
                    console.trace('-- - --- - set value called.... ')
                    if (images) setValue('image', images[0])
                  })
                }}
              />
              {percent > 0 ? (
                <ProgressBar variant="determinate" value={percent} />
              ) : null}
            </HtmlLabel>
            <HtmlLabel title="Live">
              <Controller
                name="open"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Switch value={value} onChange={onChange} />
                )}
              />
            </HtmlLabel>
            <div>
              {fields.map((item, foodItemIndex) => (
                <Accordion
                  title={item.name || '[Empty]'}
                  key={item.id}
                  className={item.id}
                >
                  <div className={`flex justify-end my-2`}>
                    <Button
                      variant="text"
                      size="none"
                      className="text-xs text-gray-600 underline underline-offset-2"
                      onClick={() => {
                        remove(foodItemIndex)
                      }}
                      onMouseEnter={() => setHovered(item.id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(item.id)}
                      onBlur={() => setHovered(null)}
                    >
                      remove choice
                    </Button>
                  </div>
                  <div
                    className={`flex flex-col gap-2 ${
                      hovered === item.id ? 'bg-strip' : null
                    }`}
                  >
                    <HtmlLabel
                      title="Name"
                      error={errors.foodItems?.[foodItemIndex]?.name?.message}
                    >
                      <HtmlTextArea
                        rows={1}
                        placeholder="Enter the name"
                        {...register(`foodItems.${foodItemIndex}.name`)}
                      />
                    </HtmlLabel>

                    <HtmlLabel
                      title="Description"
                      optional
                      error={
                        errors.foodItems?.[foodItemIndex]?.description?.message
                      }
                    >
                      <HtmlTextArea
                        rows={3}
                        placeholder="Enter the description"
                        {...register(`foodItems.${foodItemIndex}.description`)}
                      />
                    </HtmlLabel>
                    <HtmlLabel title="Days">
                      <Controller
                        name={`foodItems.${foodItemIndex}.days`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <ToggleButtonGroup
                            value={value}
                            onChange={(e, value) => onChange(value)}
                            aria-label="Select days"
                          >
                            {Object.entries(DayIcons).map(([key, Icon]) => (
                              <ToggleButton
                                key={key}
                                value={key}
                                aria-label={key}
                              >
                                {Icon}
                              </ToggleButton>
                            ))}
                          </ToggleButtonGroup>
                        )}
                      />
                    </HtmlLabel>
                    <HtmlLabel
                      title="Max quantity"
                      optional
                      error={
                        errors.foodItems?.[foodItemIndex]?.maxQuantity?.message
                      }
                    >
                      <HtmlInput
                        type="number"
                        placeholder="Enter the maximum quantity"
                        {...register(`foodItems.${foodItemIndex}.maxQuantity`, {
                          valueAsNumber: true,
                        })}
                      />
                    </HtmlLabel>
                    <HtmlLabel
                      title="Price"
                      error={errors.foodItems?.[foodItemIndex]?.price?.message}
                    >
                      <HtmlInput
                        type="number"
                        placeholder="Enter the price"
                        {...register(`foodItems.${foodItemIndex}.price`, {
                          valueAsNumber: true,
                        })}
                      />
                    </HtmlLabel>
                    <HtmlLabel
                      title="Time"
                      optional
                      error={errors.foodItems?.[foodItemIndex]?.time?.message}
                    >
                      <HtmlInput
                        type="time"
                        placeholder="Enter the time"
                        {...register(`foodItems.${foodItemIndex}.time`)}
                      />
                    </HtmlLabel>
                    <HtmlLabel title="Images">
                      <HtmlInput
                        multiple={false}
                        type="file"
                        placeholder="Upload images"
                        accept="image/*"
                        onChange={(e) =>
                          uploadImages(e, (images: string[]) => {
                            setValue(
                              `foodItems.${foodItemIndex}.image`,
                              images[0],
                            )
                          })
                        }
                      />
                      {percent > 0 ? (
                        <ProgressBar variant="determinate" value={percent} />
                      ) : null}
                    </HtmlLabel>
                  </div>
                </Accordion>
              ))}
            </div>
            <div>
              <Button
                className="flex items-center justify-center w-full py-2 text-xs border-2 border-dashed"
                size="none"
                variant="text"
                onClick={() =>
                  append({
                    deliveryAvailable: false,
                    live: false,
                    vegan: false,
                    description: '',
                    image: '',
                    maxQuantity: 0,
                    name: '',
                    price: 0,
                    time: '00:00',
                    days: [Day.Monday],
                  })
                }
              >
                <IconPlus className="w-4 h-4" /> Add food item
              </Button>
            </div>
            <div className="mt-2">
              <Button fullWidth loading={loading} type="submit">
                Submit
              </Button>
            </div>
          </div>
          <Map
            initialViewState={{
              longitude: 80.2,
              latitude: 12.9,
              zoom: 8,
            }}
          >
            <Panel position="right-center">
              <DefaultZoomControls>
                <CenterOfMap
                  onClick={(latLng) => {
                    const lat = parseFloat(latLng.lat.toFixed(6))
                    const lng = parseFloat(latLng.lng.toFixed(6))
                    setValue('address.lat', lat, { shouldValidate: true })
                    setValue('address.lng', lng, { shouldValidate: true })
                  }}
                />
              </DefaultZoomControls>
            </Panel>
            <Panel position="left-top">
              <SearchBox setValue={setValue} />
            </Panel>
            <Panel position="center-bottom">
              <div>Drag the marker to the kitchen's exact location.</div>
            </Panel>
            <div>
              <Marker
                anchor="bottom"
                draggable
                latitude={formdata.address?.lat || 0}
                longitude={formdata.address?.lng || 0}
                onDragEnd={({ lngLat }) => {
                  setValue('address.lat', lngLat.lat, { shouldValidate: true })
                  setValue('address.lng', lngLat.lng, { shouldValidate: true })
                }}
              >
                <BrandIcon animate />
              </Marker>
            </div>
          </Map>
        </div>
      </Form>
    </Container>
  )
}

export const SearchBox = ({
  setValue,
}: {
  setValue: UseFormSetValue<FormTypeCreateCook>
}) => {
  const { current: map } = useMap()
  return (
    <SearchPlaceBox
      setLocationInfo={function ({ latLng, placeName }: LocationInfo): void {
        const lat = latLng[0]
        const lng = latLng[1]
        setValue('address.lat', lat, { shouldValidate: true })
        setValue('address.lng', lng, { shouldValidate: true })

        map?.flyTo({
          center: { lat, lng },
          zoom: 12,
          animate: true,
          essential: true,
        })
      }}
    />
  )
}
