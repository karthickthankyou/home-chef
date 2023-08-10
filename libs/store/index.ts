import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { from } from 'rxjs'

import { composeWithDevTools } from '@redux-devtools/extension'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { userReducer } from './user'

import { mapReducer } from './map'
import utilReducer from './utils/utilsStore'

export const store = configureStore({
  reducer: {
    user: userReducer,
    utils: utilReducer,
    map: mapReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const composedEnhancers = composeWithDevTools()

export const store$ = from(store)
export type StoreObservableType = typeof store$

// Questions about synchronous Redux
// https://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux
// https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559
