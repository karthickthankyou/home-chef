import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ViewState = {
  latitude: number
  longitude: number
  zoom?: number
}

export type LngLatTuple = [number, number]
export type DirectionType = {
  start?: LngLatTuple
  end?: LngLatTuple
}

type MapSliceType = {
  selectedKitchen: number | null
  selectedHome: boolean
  updatedViewState?: ViewState
  direction: DirectionType
}

const initialState: MapSliceType = {
  selectedKitchen: null,
  selectedHome: false,
  direction: {},
}

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setSelectedKitchen: (
      state,
      action: PayloadAction<MapSliceType['selectedKitchen']>,
    ) => {
      state.selectedHome = false
      state.selectedKitchen = action.payload
    },
    setSelectedHome: (
      state,
      action: PayloadAction<MapSliceType['selectedHome']>,
    ) => {
      state.selectedKitchen = null
      state.selectedHome = action.payload
    },
    setUpdatedViewState: (
      state,
      action: PayloadAction<MapSliceType['updatedViewState']>,
    ) => {
      state.updatedViewState = action.payload
    },
    setDirectionStart: (
      state,
      action: PayloadAction<MapSliceType['direction']['start']>,
    ) => {
      state.direction.start = action.payload
    },
    setDirectionEnd: (
      state,
      action: PayloadAction<MapSliceType['direction']['end']>,
    ) => {
      state.direction.end = action.payload
    },
  },
})

export const {
  setSelectedKitchen,
  setSelectedHome,
  setUpdatedViewState,
  setDirectionStart,
  setDirectionEnd,
} = mapSlice.actions

export const mapReducer = mapSlice.reducer
