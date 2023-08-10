import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Provider } from 'react-redux'
import { Header } from './Header'

import { userReducer } from '@home-chefs-org/store/user'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const reducers = { user: userReducer }

const store = configureStore({
  reducer: combineReducers(reducers),
  preloadedState: {
    user: {
      uid: '3',
      roles: ['admin'],
      loaded: true,
    },
  },
})

export default {
  title: 'organisms/Header',
  component: Header,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = () => <Header />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
