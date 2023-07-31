import { gql } from 'graphql-request'

export const createCook = gql`
  mutation CreateCook($createCookInput: CreateCookInput!) {
    createCook(createCookInput: $createCookInput) {
      uid
    }
  }
`

export const createCustomer = gql`
  mutation CreateCustomer($createCustomerInput: CreateCustomerInput!) {
    createCustomer(createCustomerInput: $createCustomerInput) {
      uid
    }
  }
`

export const createOrder = gql`
  mutation CreateOrder($createOrderInput: CreateOrderInput!) {
    createOrder(createOrderInput: $createOrderInput) {
      id
    }
  }
`
export const updateOrder = gql`
  mutation UpdateOrder($updateOrderInput: UpdateOrderInput!) {
    updateOrder(updateOrderInput: $updateOrderInput) {
      id
    }
  }
`
export const removeSchedule = gql`
  mutation removeSchedule($where: ScheduleWhereUniqueInput!) {
    removeSchedule(where: $where) {
      id
    }
  }
`
export const updateSchedule = gql`
  mutation UpdateSchedule($updateScheduleInput: UpdateScheduleInput!) {
    updateSchedule(updateScheduleInput: $updateScheduleInput) {
      id
    }
  }
`

export const ordersForKitchen = gql`
  query OrdersForKitchen(
    $distinct: [OrderScalarFieldEnum!]
    $skip: Int
    $take: Int
    $cursor: WhereUniqueInputNumber
    $orderBy: [OrderOrderByWithRelationInput!]
    $where: OrderWhereInput
  ) {
    ordersForKitchen(
      distinct: $distinct
      skip: $skip
      take: $take
      cursor: $cursor
      orderBy: $orderBy
      where: $where
    ) {
      id
      time
      status
      price
      quantity
      tokenNumber
      passcode
      customer {
        uid
        name
      }
      schedule {
        foodItem {
          name
          vegan
        }
      }
    }
    ordersCount(where: $where) {
      count
    }
  }
`

export const Login = gql`
  mutation Login($credentials: LoginInput!) {
    login(credentials: $credentials) {
      refreshToken
      localId
      kind
      idToken
      expiresIn
      email
      displayName
    }
  }
`

export const getKitchenLocation = gql`
  query getKitchenLocation($where: KitchenWhereUniqueInput!) {
    kitchen(where: $where) {
      id
      address {
        address
        zipCode
        lat
        lng
      }
    }
  }
`

export const getKitchen = gql`
  query getKitchen($where: KitchenWhereUniqueInput!) {
    kitchen(where: $where) {
      id
      cook {
        uid
      }
      updatedAt
      open
      name
      image
      createdAt
      address {
        address
        zipCode
        lat
        lng
      }
      about
      foodItems {
        id
        days
        createdAt
        description
        image
        maxQuantity
        name
        price
        time
        updatedAt
        scheduleCount {
          count
        }
      }
    }
  }
`

export const getCustomer = gql`
  query getCustomer($where: CustomerWhereUniqueInput!) {
    customer(where: $where) {
      name
      uid
      address {
        address
        lat
        lng
      }
    }
  }
`

export const customerMe = gql`
  query customerMe {
    customerMe {
      name
      uid
      address {
        address
        lat
        lng
      }
    }
  }
`

export const cookMe = gql`
  query cookMe {
    cookMe {
      uid
      kitchen {
        id
        updatedAt
        open
        name
        image
        createdAt
        address {
          address
          zipCode
          lat
          lng
          id
        }
        about
        foodItems {
          id
          createdAt
          description
          image
          maxQuantity
          name
          days
          price
          time
          updatedAt
          scheduleCount {
            count
          }
        }
      }
    }
  }
`

export const updateFoodItem = gql`
  mutation updateFoodItem($updateFoodItemInput: UpdateFoodItemInput!) {
    updateFoodItem(updateFoodItemInput: $updateFoodItemInput) {
      id
      image
      maxQuantity
      name
      price
      time
      description
    }
  }
`

export const createFoodItem = gql`
  mutation createFoodItem($createFoodItemInput: CreateFoodItemInput!) {
    createFoodItem(createFoodItemInput: $createFoodItemInput) {
      id
    }
  }
`

export const removeFoodItem = gql`
  mutation RemoveFoodItem($where: FoodItemWhereUniqueInput!) {
    removeFoodItem(where: $where) {
      id
    }
  }
`

export const updateKitchen = gql`
  mutation updateKitchen($updateKitchenInput: UpdateKitchenInput!) {
    updateKitchen(updateKitchenInput: $updateKitchenInput) {
      id
    }
  }
`

export const searchKitchens = gql`
  query SearchKitchens(
    $locationFilter: LocationFilterInput!
    $where: KitchenWhereInput
    $orderBy: [KitchenOrderByWithRelationInput!]
    $cursor: KitchenWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [KitchenScalarFieldEnum!]
  ) {
    searchKitchens(
      locationFilter: $locationFilter
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    ) {
      about
      address {
        lat
        lng
        address
      }
      id
      image
      name
      open
      createdAt
    }
  }
`

export const createSchedule = gql`
  mutation createSchedule($createScheduleInput: CreateScheduleInput!) {
    createSchedule(createScheduleInput: $createScheduleInput) {
      id
    }
  }
`

export const ordersForCustomer = gql`
  query ordersForCustomer($where: OrderWhereInput) {
    ordersForCustomer(where: $where) {
      id
      quantity
      time
      status
      price
      schedule {
        foodItem {
          name
        }
      }
    }
    ordersCount {
      count
    }
  }
`

export const schedulesForCustomer = gql`
  query schedulesForCustomer(
    $where: ScheduleWhereInput
    $distinct: [ScheduleScalarFieldEnum!]
    $skip: Int
    $take: Int
    $orderBy: [ScheduleOrderByWithRelationInput!]
  ) {
    schedulesForCustomer(
      where: $where
      distinct: $distinct
      skip: $skip
      take: $take
      orderBy: $orderBy
    ) {
      id
      days
      quantity
      live
      foodItem {
        customerReview {
          rating
          text
        }
        id
        name
        price
        time
        kitchen {
          name
        }
      }
    }
    schedulesCount(where: $where) {
      count
    }
  }
`

export const updateAddress = gql`
  mutation updateAddress($updateAddressInput: UpdateAddressInput!) {
    updateAddress(updateAddressInput: $updateAddressInput) {
      id
    }
  }
`

export const schedulesForKitchen = gql`
  query SchedulesForKitchen(
    $distinct: [ScheduleScalarFieldEnum!]
    $skip: Int
    $take: Int
    $cursor: WhereUniqueInputNumber
    $orderBy: [ScheduleOrderByWithRelationInput!]
    $where: ScheduleWhereInput
  ) {
    schedulesForKitchen(
      distinct: $distinct
      skip: $skip
      take: $take
      cursor: $cursor
      orderBy: $orderBy
      where: $where
    ) {
      id
      customer {
        name
        uid
      }
      live
      days
      quantity
      foodItem {
        name
      }
    }
    schedulesCount(where: $where) {
      count
    }
  }
`

export const SchedulesForCustomerRaw = gql`
  query SchedulesForCustomerRaw($customerId: String!) {
    schedulesForCustomerRaw(customerId: $customerId) {
      day
      items {
        time
        foodItems {
          id
          name
          kitchenId
          kitchenName
          quantity
        }
      }
    }
  }
`

export const createCustomerReview = gql`
  mutation createCustomerReview(
    $createCustomerReviewInput: CreateCustomerReviewInput!
  ) {
    createCustomerReview(
      createCustomerReviewInput: $createCustomerReviewInput
    ) {
      id
    }
  }
`
