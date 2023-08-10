import { useFormCreateSchedule } from '@home-chefs-org/forms/src/orders/schedule'
import { FormTypeSearchKitchens } from '@home-chefs-org/forms/src/searchKitchens'
import {
  CustomerMeQuery,
  Day,
  SchedulesForCustomerRawQuery,
  useCreateScheduleMutation,
  useGetKitchenLazyQuery,
  useOrdersForCustomerQuery,
  useSchedulesForCustomerRawLazyQuery,
  useSearchKitchensLazyQuery,
} from '@home-chefs-org/network/src/generated'
import { useAppDispatch, useAppSelector } from '@home-chefs-org/store'
import {
  LngLatTuple,
  setDirectionEnd,
  setDirectionStart,
  setSelectedHome,
  setSelectedKitchen,
  setUpdatedViewState,
} from '@home-chefs-org/store/map'
import { BrandIcon } from '@home-chefs-org/ui/src/components/atoms/BrandIcon'
import { Button } from '@home-chefs-org/ui/src/components/atoms/Button'
import { Price } from '@home-chefs-org/ui/src/components/molecules/Price'
import { Panel } from '@home-chefs-org/ui/src/components/organisms/Map/Panel'
import { SearchPlaceBox } from '@home-chefs-org/ui/src/components/organisms/SearchPlaceBox'
import { getTimeFromDateTime } from '@home-chefs-org/util'
import { IconHome, IconNavigation, IconPin } from '@tabler/icons-react'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  Layer,
  Marker,
  Source,
  useMap,
  ViewState,
  ViewStateChangeEvent,
} from 'react-map-gl'
import { Map } from '../../organisms/Map'
import { FoodItemInQuery, groupByTime } from '../CookPage/CookPage'

import dynamic from 'next/dynamic'

import { Form } from '@home-chefs-org/ui/src/components/atoms/Form'
import { HtmlInput } from '@home-chefs-org/ui/src/components/atoms/HtmlInput/HtmlInput'
import { HtmlLabel } from '@home-chefs-org/ui/src/components/atoms/HtmlLabel/HtmlLabel'
import {
  ToggleButton,
  ToggleButtonGroup,
} from '@home-chefs-org/ui/src/components/molecules/ToggleButtonGroup/ToggleButtonGroup'
import { DayIcons } from '@home-chefs-org/ui/src/components/molecules/WeekCalendar/WeekCalendar'

import { Switch } from '@home-chefs-org/ui/src/components/atoms/Switch'
import { Controller } from 'react-hook-form'

import { selectUid } from '@home-chefs-org/store/user'
import { PlainButton } from '@home-chefs-org/ui/src/components/atoms/PlainButton'
import {
  Timeline,
  TimelineItem,
} from '@home-chefs-org/ui/src/components/molecules/TimelineItem'
import { Sidebar } from '@home-chefs-org/ui/src/components/organisms/Sidebar'
import { notification$ } from '@home-chefs-org/util/subjects'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog } from '../../atoms/Dialog'
import { DefaultZoomControls } from '../../organisms/Map/ZoomControls/ZoomControls'

const QuillEditor = dynamic(
  () =>
    import('@home-chefs-org/ui/src/components/organisms/QuillEditor').then(
      (mod) => mod.QuillEditor,
    ),
  { ssr: false },
)
export interface ISearchKitchensProps {
  customer: CustomerMeQuery['customerMe']
}

export const MoveToHome = ({
  lat = 0,
  lng = 0,
}: {
  lat?: number
  lng?: number
}) => {
  const { locationFilter } = useWatch<FormTypeSearchKitchens>()

  const nw_lat = locationFilter?.nw_lat || 0
  const nw_lng = locationFilter?.nw_lng || 0
  const se_lat = locationFilter?.se_lat || 0
  const se_lng = locationFilter?.se_lng || 0

  const insideBounds =
    lat <= nw_lat && lat >= se_lat && lng >= nw_lng && lng <= se_lng

  const { current: map } = useMap()
  if (insideBounds) {
    return null
  }

  return (
    <Panel position="center-bottom">
      <PlainButton
        onClick={() => {
          map?.getMap().flyTo({ center: { lat, lng }, essential: true })
        }}
      >
        Move to home
      </PlainButton>
    </Panel>
  )
}

export const GoToHome = ({ lat, lng }: { lat?: number; lng?: number }) => {
  const dispatch = useAppDispatch()
  if (!lat || !lng) return null
  return (
    <PlainButton
      onClick={() => {
        dispatch(setUpdatedViewState({ latitude: lat, longitude: lng }))
      }}
    >
      Go to home
    </PlainButton>
  )
}

export const SearchPlaceBoxContainer = () => {
  const { current: map } = useMap()
  return (
    <SearchPlaceBox
      setLocationInfo={(locationInfo) => {
        const { latLng } = locationInfo
        map?.flyTo({ center: latLng })
      }}
    />
  )
}

export const SetMapLocation = ({ viewState }: { viewState?: ViewState }) => {
  const { current: map } = useMap()

  useEffect(() => {
    if (viewState) {
      const { latitude, longitude, zoom } = viewState

      map?.getMap().flyTo({
        center: [longitude, latitude],
        zoom: 12,
      })

      map?.getMap().setCenter({ lat: latitude, lng: longitude })
    }
  }, [viewState, map])

  return null
}

export const MarkerText = ({ children }: { children: ReactNode }) => (
  <div className="absolute -translate-x-1/2 left-1/2">
    <div className="mt-1 leading-4 text-center min-w-max px-0.5 rounded backdrop-blur-sm bg-white/50">
      {children}
    </div>
  </div>
)

export const Directions = () => {
  const direction = useAppSelector((state) => state.map.direction)
  const [coordinates, setCoordinates] = useState<LngLatTuple[]>([])

  useEffect(() => {
    ;(async () => {
      if (!direction?.start || !direction?.end) {
        setCoordinates([])
        return
      }

      const { start, end } = direction
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?access_token=pk.eyJ1IjoiaWFta2FydGhpY2siLCJhIjoiY2t4b3AwNjZ0MGtkczJub2VqMDZ6OWNrYSJ9.-FMKkHQHvHUeDEvxz2RJWQ&steps=true&overview=simplified`,
      )
      const data = await response.json()
      const coordinates =
        data?.routes[0]?.legs[0]?.steps.map(
          (step: { maneuver: { location: any } }) => step.maneuver.location,
        ) || []
      console.log('coordinates', coordinates)
      setCoordinates(coordinates)
    })()
  }, [direction, direction?.end, direction?.start])

  const dataOne = useMemo(
    () => ({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates,
      },
    }),
    [coordinates],
  )
  const dispatch = useAppDispatch()
  return (
    <>
      {/* @ts-ignore */}
      <Source type="geojson" data={dataOne}>
        <Layer
          id="lineLayer"
          type="line"
          source="my-data"
          paint={{
            'line-color': 'rgb(0,0,0)',
            'line-width': 2,
          }}
        />
      </Source>
      {direction?.start && direction?.end ? (
        <Panel position="left-bottom">
          <Button
            onClick={() => {
              dispatch(setDirectionEnd(undefined))
            }}
          >
            Clear directions
          </Button>
        </Panel>
      ) : null}
    </>
  )
}

export const SearchKitchens = ({ customer }: ISearchKitchensProps) => {
  const dispatch = useAppDispatch()
  const { setValue } = useFormContext<FormTypeSearchKitchens>()
  // Set direction start
  useEffect(() => {
    const lng = customer?.address?.lng
    const lat = customer?.address?.lat
    if (lat && lng) {
      dispatch(setDirectionStart([lng, lat]))
    }
  }, [customer?.address?.lat, customer?.address?.lng, dispatch])

  function handleMapChange(target: ViewStateChangeEvent['target']) {
    const bounds = target.getBounds()

    const locationFilter = {
      nw_lat: bounds?.getNorthWest().lat || 0,
      nw_lng: bounds?.getNorthWest().lng || 0,
      se_lat: bounds?.getSouthEast().lat || 0,
      se_lng: bounds?.getSouthEast().lng || 0,
    }

    setValue('locationFilter', locationFilter)
  }

  return (
    <Map
      initialViewState={{
        latitude: customer.address?.lat,
        longitude: customer.address?.lng,
        zoom: 12,
      }}
      onZoomEnd={(e) => handleMapChange(e.target)}
      onDragEnd={(e) => handleMapChange(e.target)}
      onLoad={(e) => handleMapChange(e.target)}
    >
      <Panel position="right-center">
        <DefaultZoomControls />
      </Panel>
      <DisplayCustomer customer={customer} />
      <DisplayAllKitchens />
      <Directions />
      <MoveToHome lat={customer.address?.lat} lng={customer.address?.lng} />

      <Panel position="left-top">
        <SearchPlaceBoxContainer />
      </Panel>
    </Map>
  )
}

export const DisplayCustomer = ({ customer }: ISearchKitchensProps) => {
  const [openSidebarCustomer, setOpenSidebarCustomer] = useState(false)
  const dispatch = useAppDispatch()

  return (
    <div>
      {customer?.address?.lat ? (
        <Marker
          latitude={customer.address.lat}
          longitude={customer.address.lng}
          onClick={() => {
            setOpenSidebarCustomer(true)
            dispatch(setSelectedHome(true))
          }}
        >
          <IconHome className="text-black bg-white rounded cursor-pointer fill-black/50 " />
          <MarkerText>You</MarkerText>
        </Marker>
      ) : null}
      <SidebarCustomer
        open={openSidebarCustomer}
        setOpen={setOpenSidebarCustomer}
      />
    </div>
  )
}

export const SubscribeFoodItem = ({
  foodItem,
  kitchenId,
}: {
  foodItem: FoodItemInQuery
  kitchenId: number | null
}) => {
  const [openUpdate, setOpenUpdate] = useState(false)

  const { register, control, handleSubmit } = useFormCreateSchedule({
    defaultValues: { days: [], quantity: 1, live: true },
  })

  const [createScheduleMutation, { loading }] = useCreateScheduleMutation()

  const uid = useAppSelector((state) => state.user.uid)

  return (
    <div>
      <Button
        variant="text"
        size="none"
        className="mt-auto"
        onClick={() => setOpenUpdate(true)}
      >
        Subscribe
      </Button>
      <Dialog open={openUpdate} setOpen={setOpenUpdate} title={foodItem.name}>
        <div className="text-4xl font-semibold">{foodItem.name}</div>
        <div>Rs. {foodItem.price}</div>
        <QuillEditor
          theme="bubble"
          readOnly
          value={foodItem.description || ''}
        />

        <Form
          onSubmit={handleSubmit(async (data) => {
            if (!uid) {
              return
            }
            await createScheduleMutation({
              variables: {
                createScheduleInput: {
                  customerId: uid,
                  foodItemId: foodItem.id,
                  days: data.days,
                  quantity: data.quantity,
                  live: data.live,
                },
              },
            })
            setOpenUpdate(false)
            notification$.next({
              message: 'Subscription created successfully.',
              type: 'success',
            })
          })}
        >
          <HtmlLabel title="Quantity">
            <HtmlInput
              type="number"
              {...register('quantity', { valueAsNumber: true })}
            />
          </HtmlLabel>
          <HtmlLabel title="Live">
            <Controller
              name="live"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Switch value={value} onChange={onChange} />
              )}
            />
          </HtmlLabel>

          <HtmlLabel title="Days" />
          <Controller
            name="days"
            control={control}
            render={({ field: { value, onChange } }) => (
              <ToggleButtonGroup value={value} onChange={(e, v) => onChange(v)}>
                {Object.entries(DayIcons).map(([key, Icon]) => {
                  return (
                    <ToggleButton
                      key={key}
                      disabled={!foodItem?.days?.includes(key as Day)}
                      value={key}
                    >
                      {Icon}
                    </ToggleButton>
                  )
                })}
              </ToggleButtonGroup>
            )}
          />

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
    </div>
  )
}

export const GoToKitchenLocation = ({
  kitchenName,
  kitchenId,
}: {
  kitchenName?: string | null
  kitchenId: number
}) => {
  const [getKitchenLocation, { data, loading }] = useGetKitchenLazyQuery({
    variables: { where: { id: kitchenId } },
  })

  useEffect(() => {
    if (kitchenId) getKitchenLocation()
  }, [kitchenId])

  const dispatch = useAppDispatch()

  useEffect(() => {
    const lat = data?.kitchen.address?.lat
    const lng = data?.kitchen.address?.lng
    if (lat && lng) {
      dispatch(setDirectionEnd([lng, lat]))
      dispatch(
        setUpdatedViewState({
          latitude: lat,
          longitude: lng,
        }),
      )
    }
  }, [data?.kitchen?.address?.lat, data?.kitchen?.address?.lng, dispatch])

  return (
    <button
      onClick={async () => {
        await getKitchenLocation()
      }}
      className="flex items-center gap-1 text-xs group"
    >
      <div>{kitchenName}</div>
      <IconPin className="hidden w-4 h-4 group-hover:block" />
      {loading ? 'Loading...' : null}
    </button>
  )
}

const daysOfWeek = [
  Day.Monday,
  Day.Tuesday,
  Day.Wednesday,
  Day.Thursday,
  Day.Friday,
  Day.Saturday,
  Day.Sunday,
]

const SidebarCustomer = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const selectedHome = useAppSelector((state) => state.map.selectedHome)
  const uid = useAppSelector(selectUid)
  const [refetchSchedules, { data: schedules }] =
    useSchedulesForCustomerRawLazyQuery()

  useEffect(() => {
    if (uid)
      refetchSchedules({
        variables: { customerId: uid },
      })
  }, [uid])

  const { loading, data } = useOrdersForCustomerQuery({
    variables: {},
  })

  useEffect(() => {
    console.log('Open state: ', Boolean(selectedHome))
    setOpen(Boolean(selectedHome))
  }, [selectedHome, setOpen])

  return (
    <Sidebar overlayBlur={false} open={open} setOpen={setOpen}>
      <Sidebar.Header className="bg-gray-200">
        <div className="text-xl font-semibold">My menu</div>
      </Sidebar.Header>
      <Sidebar.Body>
        <div className="space-y-6">
          {daysOfWeek.map((day) => (
            <MenuForDay
              key={day}
              daysData={
                schedules?.schedulesForCustomerRaw.find(
                  (daySchedule) => daySchedule.day === day,
                ) || { day, items: [] }
              }
            />
          ))}
        </div>
      </Sidebar.Body>
      <Sidebar.Footer>
        <Link href="/customer">Customer page</Link>
      </Sidebar.Footer>
    </Sidebar>
  )
}

export const MenuForDay = ({
  daysData,
}: {
  daysData: SchedulesForCustomerRawQuery['schedulesForCustomerRaw'][number]
}) => (
  <Timeline className="gap-1" key={daysData.day}>
    <div className="text-base text-gray-600">{daysData.day}</div>
    <div>
      {daysData.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-1 text-gray-600 border-2 border-gray-100 border-dashed bg-gray-25 h-36">
          No items.
        </div>
      ) : null}
      {daysData.items.map((timeGroup) => (
        <TimelineItem key={timeGroup.time} time={+timeGroup.time}>
          <div className="py-0.5 text-gray-600">
            {format(new Date(+timeGroup.time), 'p')}
          </div>
          <div className="space-y-2">
            {timeGroup.foodItems.map((foodItem) => (
              <div key={foodItem.id}>
                <div className="flex justify-between">
                  <div className="font-semibold ">{foodItem.name}</div>
                  <div className="font-semibold">{foodItem.quantity}</div>
                </div>
                <div className="flex items-center mt-1">
                  <GoToKitchenLocation
                    kitchenName={foodItem.kitchenName}
                    kitchenId={foodItem.kitchenId}
                  />
                </div>
              </div>
            ))}
          </div>
        </TimelineItem>
      ))}
    </div>
  </Timeline>
)

const SidebarFoodItem = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const direction = useAppSelector((state) => state.map.direction)
  const dispatch = useAppDispatch()
  const selectedKitchenId = useAppSelector((state) => state.map.selectedKitchen)

  useEffect(() => {
    setOpen(Boolean(selectedKitchenId))
  }, [selectedKitchenId, setOpen])

  const [getKitchen, { loading, data }] = useGetKitchenLazyQuery({
    variables: { where: { id: selectedKitchenId } },
  })
  useEffect(() => {
    if (selectedKitchenId) getKitchen()
  }, [selectedKitchenId])

  return (
    <Sidebar overlayBlur={false} open={open} setOpen={setOpen}>
      <Sidebar.Header className="bg-gray-200">
        <div className="text-xl font-semibold">{data?.kitchen.name}</div>
      </Sidebar.Header>
      <Sidebar.Body>
        <div>{data?.kitchen.about}</div>
        <Timeline className="space-y-6 ">
          {Object.entries(groupByTime(data?.kitchen?.foodItems || []) || {})
            .sort()
            .map(([time, foodItems]) => (
              <TimelineItem key={time} time={+time}>
                <div className="mb-2 text-lg">{getTimeFromDateTime(time)}</div>
                <div className="space-y-6">
                  {foodItems?.map((foodItem) => (
                    <div key={foodItem.id} className="flex gap-2">
                      <Image
                        alt={foodItem.name}
                        width={128}
                        height={128}
                        className="object-cover w-40 rounded h-36"
                        src={foodItem?.image || ''}
                      />
                      <div className="flex flex-col items-start flex-1 gap-2">
                        <div className="text-base font-semibold">
                          {foodItem?.name}
                        </div>
                        <Price
                          price={foodItem.price}
                          previousPrice={foodItem.price + 1}
                        />
                        {/* <QuillEditor
                            theme="bubble"
                            readOnly
                            className="max-w-sm"
                            value={foodItem.description || ''}
                          /> */}
                        <div className="max-w-xs text-sm">
                          {foodItem.description}
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
                        <SubscribeFoodItem
                          foodItem={foodItem}
                          kitchenId={
                            data?.kitchen?.id ? +data.kitchen.id : null
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TimelineItem>
            ))}
        </Timeline>
      </Sidebar.Body>
      <Sidebar.Footer className="flex items-center gap-2">
        <PlainButton
          onClick={() => {
            if (direction.end) {
              dispatch(setDirectionEnd(undefined))
              return
            }
            if (data?.kitchen?.address?.lat && data?.kitchen?.address?.lng) {
              const lat = data.kitchen.address.lat
              const lng = data.kitchen.address.lng
              dispatch(setDirectionEnd([lng, lat]))
            }
          }}
        >
          <IconNavigation
            className={`w-6 h-6 border rounded stroke-1 ${
              direction.end
                ? 'fill-black border-black shadow-md shadow-black/20'
                : 'fill-white border-black'
            }`}
          />
        </PlainButton>
        <div className="text-base font-normal">
          {data?.kitchen.address?.address}
        </div>
      </Sidebar.Footer>
    </Sidebar>
  )
}

export const DisplaySelectedKitchen = () => {
  const [open, setOpen] = useState(false)

  return <SidebarFoodItem open={open} setOpen={setOpen} />
}

export const DisplayAllKitchens = () => {
  const { locationFilter } = useWatch<FormTypeSearchKitchens>()

  const [refetch, { data, loading }] = useSearchKitchensLazyQuery()

  useEffect(() => {
    if (locationFilter) {
      refetch({
        variables: {
          locationFilter: {
            nw_lat: locationFilter.nw_lat || 0,
            nw_lng: locationFilter.nw_lng || 0,
            se_lat: locationFilter.se_lat || 0,
            se_lng: locationFilter.se_lng || 0,
          },
        },
      })
    }
  }, [locationFilter, refetch])

  const [openSidebarFoodItem, setOpenSidebarFoodItem] = useState(false)
  const dispatch = useAppDispatch()

  return (
    <>
      {data?.searchKitchens.map((kitchen) => (
        <div key={kitchen?.id}>
          <Marker
            anchor="bottom"
            latitude={kitchen.address?.lat}
            longitude={kitchen.address?.lng}
            onClick={() => {
              setOpenSidebarFoodItem(true)
              dispatch(setSelectedKitchen(+kitchen.id))
            }}
          >
            <BrandIcon className="cursor-pointer" animate />
            <MarkerText>{kitchen.name}</MarkerText>
          </Marker>
        </div>
      ))}
      <SidebarFoodItem
        open={openSidebarFoodItem}
        setOpen={setOpenSidebarFoodItem}
      />
    </>
  )
}
