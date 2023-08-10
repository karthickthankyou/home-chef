import { ComponentMeta, ComponentStory } from '@storybook/react'
import { LoginForm } from './LoginForm'

import { userInitialState, userReducer } from '@home-chefs-org/store/user'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

const reducers = { user: userReducer }

const store = configureStore({
  reducer: combineReducers(reducers),
  preloadedState: { user: userInitialState || { loaded: true } },
})

export default {
  title: 'templates/LoginForm',
  component: LoginForm,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
} as ComponentMeta<typeof LoginForm>

const Template: ComponentStory<typeof LoginForm> = () => <LoginForm />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
