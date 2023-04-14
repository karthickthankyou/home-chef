import {
  Day,
  SchedulesForCustomerRawQuery,
  SearchKitchensQuery,
  useCreateScheduleMutation,
  useGetCustomerLazyQuery,
  useGetKitchenLazyQuery,
  useGetKitchenLocationQuery,
  useGetKitchenQuery,
  useOrdersForCustomerQuery,
  useSchedulesForCustomerRawLazyQuery,
  useSchedulesForCustomerRawQuery,
  useSearchKitchensLazyQuery,
  useSearchKitchensQuery,
} from '@home-chefs-org/network/src/generated'
import { useFormCreateSchedule } from '@home-chefs-org/forms/src/orders/schedule'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  Layer,
  LngLatBounds,
  MapProvider,
  Marker,
  Source,
  useMap,
  ViewState,
} from 'react-map-gl'
import { Map } from '../../organisms/Map'
import { Panel } from '@home-chefs-org/ui/src/components/organisms/Map/Panel'
import { SearchPlaceBox } from '@home-chefs-org/ui/src/components/organisms/SearchPlaceBox'
import { BrandIcon } from '@home-chefs-org/ui/src/components/atoms/BrandIcon'
import { useAppDispatch, useAppSelector } from '@home-chefs-org/store'
import {
  LngLatTuple,
  setDirectionEnd,
  setDirectionStart,
  setSelectedHome,
  setSelectedKitchen,
  setUpdatedViewState,
} from '@home-chefs-org/store/map'
import { FoodItemInQuery, groupByTime } from '../CookPage/CookPage'
import { getTimeFromDateTime } from '@home-chefs-org/util'
import { Price } from '@home-chefs-org/ui/src/components/molecules/Price'
import { Button } from '@home-chefs-org/ui/src/components/atoms/Button'
import { IconHome, IconNavigation, IconPin } from '@tabler/icons-react'

import dynamic from 'next/dynamic'

import { HtmlLabel } from '@home-chefs-org/ui/src/components/atoms/HtmlLabel/HtmlLabel'
import { HtmlInput } from '@home-chefs-org/ui/src/components/atoms/HtmlInput/HtmlInput'
import { Form } from '@home-chefs-org/ui/src/components/atoms/Form'
import { DayIcons } from '@home-chefs-org/ui/src/components/molecules/WeekCalendar/WeekCalendar'
import {
  ToggleButton,
  ToggleButtonGroup,
} from '@home-chefs-org/ui/src/components/molecules/ToggleButtonGroup/ToggleButtonGroup'

import { Controller } from 'react-hook-form'
import { Switch } from '@home-chefs-org/ui/src/components/atoms/Switch'

import { format } from 'date-fns'
import {
  Timeline,
  TimelineItem,
} from '@home-chefs-org/ui/src/components/molecules/TimelineItem'
import { PlainButton } from '@home-chefs-org/ui/src/components/atoms/PlainButton'
import Image from 'next/image'
import { Sidebar } from '@home-chefs-org/ui/src/components/organisms/Sidebar'
import Link from 'next/link'
import { Dialog } from '../../molecules/Dialog'
import { notification$ } from '@home-chefs-org/util/subjects'
import { selectUid } from '@home-chefs-org/store/user'
import { DefaultZoomControls } from '../../organisms/Map/ZoomControls/ZoomControls'

const QuillEditor = dynamic(
  () =>
    import('@home-chefs-org/ui/src/components/organisms/QuillEditor').then(
      (mod) => mod.QuillEditor,
    ),
  { ssr: false },
)
export interface ISearchKitchensProps {}

export const isWithinBounds = ({
  lat,
  lng,
  bounds,
}: {
  lat?: number
  lng?: number
  bounds?: LngLatBounds
}) => {
  if (!lat || !lng || !bounds) return false

  const neLat = bounds.getNorthEast().lat
  const neLng = bounds.getNorthEast().lng
  const swLat = bounds.getSouthWest().lat
  const swLng = bounds.getSouthWest().lng
  return lat >= swLat && lat <= neLat && lng >= swLng && lng <= neLng
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

  return (
    //   @ts-ignore
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
  )
}

export const SearchKitchens = ({}: ISearchKitchensProps) => {
  const uid = useAppSelector(selectUid)
  const [getCustomer, { data, loading }] = useGetCustomerLazyQuery()

  useEffect(() => {
    if (uid) getCustomer({ variables: { where: { uid } } })
  }, [uid])

  const dispatch = useAppDispatch()

  useEffect(() => {
    const lng = data?.customer?.address?.lng
    const lat = data?.customer?.address?.lat
    if (lat && lng) {
      dispatch(setDirectionStart([lng, lat]))
    }
  }, [data?.customer?.address?.lat, data?.customer?.address?.lng, dispatch])

  const direction = useAppSelector((state) => state.map.direction)

  useEffect(() => {
    const latitude = data?.customer?.address?.lat
    const longitude = data?.customer?.address?.lng
    if (!latitude || !longitude) return undefined
    const updatedViewState = {
      latitude,
      longitude,
      zoom: 15,
    } as ViewState

    dispatch(setUpdatedViewState(updatedViewState))
  }, [data?.customer?.address?.lat, data?.customer?.address?.lng, dispatch])

  const [openSidebarFoodItem, setOpenSidebarFoodItem] = useState(false)
  const [openSidebarCustomer, setOpenSidebarCustomer] = useState(false)

  return (
    <Map>
      <Panel position="right-center">
        <DefaultZoomControls />
      </Panel>
      {data?.customer?.address?.lat ? (
        <Marker
          latitude={data?.customer.address?.lat}
          longitude={data?.customer.address?.lng}
          onClick={() => {
            dispatch(setSelectedHome(true))
          }}
        >
          <IconHome className="text-black bg-white rounded cursor-pointer fill-black/50 " />
          <MarkerText>You</MarkerText>
        </Marker>
      ) : null}
      <DisplayAllKitchens />
      <Directions />

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
      <SidebarFoodItem
        open={openSidebarFoodItem}
        setOpen={setOpenSidebarFoodItem}
      />
      <SidebarCustomer
        open={openSidebarCustomer}
        setOpen={setOpenSidebarCustomer}
      />
      {/* <Panel position="right-top" className="h-[90vh] "></Panel> */}
      {/* {!isWithinBounds({
        bounds,
        lat: data?.customer?.address?.lat,
        lng: data?.customer?.address?.lng,
      }) ? (
        <Panel position="center-bottom">
          <GoToHome
            lat={data?.customer?.address?.lat}
            lng={data?.customer?.address?.lng}
          />
        </Panel>
      ) : null} */}
      <Panel position="left-top">
        <SearchPlaceBoxContainer />
      </Panel>
    </Map>
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

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useFormCreateSchedule({
    defaultValues: { days: [], quantity: 1, live: true },
  })

  const [createScheduleMutation, { loading }] = useCreateScheduleMutation()

  const uid = useAppSelector((state) => state.user.uid)

  const dispatch = useAppDispatch()

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
      <Dialog open={openUpdate} setOpen={setOpenUpdate}>
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
    variables: { customerId: uid! },
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
        <div className="flex flex-col items-center justify-center gap-1 text-gray-600 bg-gray-100 border-2 border-dashed h-36">
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
  const { current: map } = useMap()

  const [bounds, setBounds] = useState<LngLatBounds>()
  useEffect(() => {
    const bounds = map?.getBounds()
    setBounds(bounds)
  }, [])

  const locationFilter = useMemo(
    () => ({
      ne_lat: bounds?.getNorthEast().lat || 0,
      ne_lng: bounds?.getNorthEast().lng || 0,
      sw_lat: bounds?.getSouthWest().lat || 0,
      sw_lng: bounds?.getSouthWest().lng || 0,
    }),
    [bounds],
  )

  const [refetch, { data, loading }] = useSearchKitchensLazyQuery({
    variables: {
      locationFilter,
    },
  })

  useEffect(() => {
    refetch()
  }, [bounds, refetch])

  return (
    <div>
      {data?.searchKitchens.map((kitchen) => (
        <MarkerWithPopup key={kitchen.id} marker={kitchen} />
      ))}
    </div>
  )
}

export const MarkerWithPopup = ({
  marker,
}: {
  marker: SearchKitchensQuery['searchKitchens'][number]
}) => {
  const dispatch = useAppDispatch()
  if (!marker.address?.lat || !marker.address?.lng || !marker.id) {
    return null
  }

  return (
    <div key={marker?.id}>
      <Marker
        anchor="bottom"
        latitude={marker.address.lat}
        longitude={marker.address.lng}
        onClick={() => {
          dispatch(setSelectedKitchen(+marker.id))
        }}
      >
        <BrandIcon className="cursor-pointer" animate />
        <MarkerText>{marker.name}</MarkerText>
      </Marker>
    </div>
  )
}
