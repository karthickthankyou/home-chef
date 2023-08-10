import { useState } from 'react'

import {
  Tab,
  TabPanel,
  Tabs,
} from '@home-chefs-org/ui/src/components/molecules/Tabs/Tabs'
import { CustomerOrderData, LayoutWithHeader } from './components'
export interface ICustomerOrdersProps {}

export const CustomerOrders = () => {
  const [value, setValue] = useState<number>(1)

  return (
    <LayoutWithHeader heading="Orders">
      <div>
        <Tabs
          value={value}
          onChange={(event: React.SyntheticEvent, newValue: number) =>
            setValue(newValue)
          }
          aria-label="Order types"
        >
          <Tab label="Upcoming" />
          <Tab label="Today" />
          <Tab label="Previous" />
        </Tabs>
      </div>
      <TabPanel index={0} value={value}>
        <CustomerOrderData type="Upcoming" />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <CustomerOrderData type="Today" />
      </TabPanel>
      <TabPanel index={2} value={value}>
        <CustomerOrderData type="Previous" />
      </TabPanel>
    </LayoutWithHeader>
  )
}
