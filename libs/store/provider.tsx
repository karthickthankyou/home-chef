import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '.'

export const ReduxProvider = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
)
