import { Panel } from '@home-chefs-org/ui/src/components/organisms/Map/Panel'
import { SearchPlaceBox } from '@home-chefs-org/ui/src/components/organisms/SearchPlaceBox'
import { useEffect, useState } from 'react'
import { Map } from '../../organisms/Map'
import { SearchKitchens } from '../SearchKitchens'

import { useFormCreateCustomer } from '@home-chefs-org/forms/src/customer/createCustomer'
import { Button } from '@home-chefs-org/ui/src/components/atoms/Button'
import { Form } from '@home-chefs-org/ui/src/components/atoms/Form'
import { HtmlInput } from '@home-chefs-org/ui/src/components/atoms/HtmlInput'
import { HtmlLabel } from '@home-chefs-org/ui/src/components/atoms/HtmlLabel'
import { IconHome, IconTriangleInvertedFilled } from '@tabler/icons-react'
import { Marker, Popup, useMap } from 'react-map-gl'

import {
  namedOperations,
  useCreateCustomerMutation,
  useCustomerMeQuery,
} from '@home-chefs-org/network/src/generated'
import { HtmlTextArea } from '@home-chefs-org/ui/src/components/atoms/HtmlTextArea'
import { notification$ } from '@home-chefs-org/util/subjects'
import { LoaderPanel } from '../../molecules/Loader'
import {
  CenterOfMap,
  DefaultZoomControls,
} from '../../organisms/Map/ZoomControls/ZoomControls'
import { ISearchPlaceBoxProps } from '../../organisms/SearchPlaceBox/SearchPlaceBox'

export interface ISearchPageProps {
  uid: string
}

export const SearchPage = ({ uid }: ISearchPageProps) => {
  const { loading, data } = useCustomerMeQuery()
  if (loading) {
    return <LoaderPanel />
  }
  console.log('data?.customerMe ', data?.customerMe)
  if (!data?.customerMe) return <RegisterCustomer uid={uid} />
  return <SearchKitchens customer={data.customerMe} />
}

export const RegisterCustomer = ({ uid }: { uid: string }) => {
  const [markerLocation, setMarkerLocation] = useState({
    longitude: 80.23,
    latitude: 12.9,
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormCreateCustomer()

  useEffect(() => {
    setValue('address.lat', markerLocation.latitude)
    setValue('address.lng', markerLocation.longitude)
  }, [markerLocation.latitude, markerLocation.longitude, setValue])

  const [createCustomerMutation, { loading }] = useCreateCustomerMutation()
  return (
    <div>
      <Map
        initialViewState={{
          longitude: 80.23,
          latitude: 12.9,
          zoom: 12,
        }}
      >
        <Panel position="right-center">
          <DefaultZoomControls>
            <CenterOfMap
              onClick={(latLng) => {
                const latitude = parseFloat(latLng.lat.toFixed(6))
                const longitude = parseFloat(latLng.lng.toFixed(6))
                setMarkerLocation({ latitude, longitude })
              }}
            />
          </DefaultZoomControls>
        </Panel>
        <Popup
          latitude={markerLocation.latitude}
          longitude={markerLocation.longitude}
          onOpen={() => console.log('Opened')}
          closeOnClick={false}
          anchor="bottom"
          offset={30}
          closeButton={false}
        >
          <Form
            onSubmit={handleSubmit(async ({ name, address }) => {
              const { data, errors } = await createCustomerMutation({
                variables: {
                  createCustomerInput: {
                    uid,
                    name,
                    address: {
                      address: address.address,
                      lat: address.lat,
                      lng: address.lng,
                      zipCode: address.zipCode,
                    },
                  },
                },
                awaitRefetchQueries: true,
                refetchQueries: [namedOperations.Query.customerMe],
              })
              if (data?.createCustomer) {
                notification$.next({
                  message: 'Location saved successfully.',
                  type: 'success',
                })
              }
              if (errors)
                notification$.next({
                  message: 'Location creation failed.',
                  type: 'error',
                })
            })}
          >
            <div className="flex flex-col gap-2 px-2 pt-2">
              <HtmlLabel title="Name" error={errors.name?.message}>
                <HtmlInput
                  {...register('name')}
                  placeholder="Enter your name"
                />
              </HtmlLabel>
              <HtmlLabel
                title="Address"
                error={errors.address?.address?.message}
              >
                <HtmlTextArea
                  {...register('address.address')}
                  placeholder="Enter your address"
                />
              </HtmlLabel>
              <HtmlLabel
                title="Zipcode"
                error={errors.address?.zipCode?.message}
              >
                <HtmlInput
                  {...register('address.zipCode')}
                  placeholder="Enter your zipcoe"
                />
              </HtmlLabel>
            </div>
            <Button loading={loading} type="submit">
              Register location
            </Button>
          </Form>
        </Popup>
        <Marker
          draggable
          anchor="bottom"
          latitude={markerLocation.latitude}
          longitude={markerLocation.longitude}
          onDragEnd={({ lngLat }) => {
            setMarkerLocation({ latitude: lngLat.lat, longitude: lngLat.lng })
          }}
        >
          <div className="flex flex-col items-center">
            <IconHome />
            <IconTriangleInvertedFilled className="w-2 h-2 animate-pulse" />
          </div>
        </Marker>

        <Panel position="left-top">
          <SearchBox
            setLocationInfo={({ latLng }) => {
              setMarkerLocation({
                latitude: latLng[0],
                longitude: latLng[1],
              })
            }}
          />
        </Panel>
      </Map>
    </div>
  )
}

export const SearchBox = ({ setLocationInfo }: ISearchPlaceBoxProps) => {
  const { current: map } = useMap()
  return (
    <SearchPlaceBox
      setLocationInfo={(locationInfo) => {
        const { latLng } = locationInfo

        map?.flyTo({ center: { lat: latLng[0], lng: latLng[1] }, zoom: 12 })
        setLocationInfo(locationInfo)
      }}
    />
  )
}
