import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
}

export type Address = {
  __typename?: 'Address'
  address: Scalars['String']
  createdAt: Scalars['DateTime']
  customer: Customer
  id: Scalars['Int']
  kitchenId: Scalars['Int']
  lat: Scalars['Int']
  lng: Scalars['Int']
  updatedAt: Scalars['DateTime']
  zipCode: Scalars['String']
}

export type AddressOrderByWithRelationInput = {
  address?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  customer?: InputMaybe<CustomerOrderByWithRelationInput>
  id?: InputMaybe<SortOrder>
  kitchen?: InputMaybe<KitchenOrderByWithRelationInput>
  kitchenId?: InputMaybe<SortOrder>
  lat?: InputMaybe<SortOrder>
  lng?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
  zipCode?: InputMaybe<SortOrder>
}

export type AddressRelationFilter = {
  is?: InputMaybe<AddressWhereInput>
  isNot?: InputMaybe<AddressWhereInput>
}

export enum AddressScalarFieldEnum {
  Address = 'address',
  CreatedAt = 'createdAt',
  Id = 'id',
  KitchenId = 'kitchenId',
  Lat = 'lat',
  Lng = 'lng',
  UpdatedAt = 'updatedAt',
  ZipCode = 'zipCode',
}

export type AddressWhereInput = {
  AND?: InputMaybe<Array<AddressWhereInput>>
  NOT?: InputMaybe<Array<AddressWhereInput>>
  OR?: InputMaybe<Array<AddressWhereInput>>
  address?: InputMaybe<StringFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  customer?: InputMaybe<CustomerRelationFilter>
  id?: InputMaybe<IntFilter>
  kitchen?: InputMaybe<KitchenRelationFilter>
  kitchenId?: InputMaybe<IntFilter>
  lat?: InputMaybe<FloatFilter>
  lng?: InputMaybe<FloatFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
  zipCode?: InputMaybe<StringFilter>
}

export type AddressWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
  kitchenId?: InputMaybe<Scalars['Int']>
}

export type AggregateCountOutput = {
  __typename?: 'AggregateCountOutput'
  count: Scalars['Int']
}

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>
  not?: InputMaybe<Scalars['Boolean']>
}

export type Cook = {
  __typename?: 'Cook'
  createdAt: Scalars['DateTime']
  kitchen: Kitchen
  uid: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type CookOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>
  kitchen?: InputMaybe<KitchenOrderByWithRelationInput>
  uid?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export type CookRelationFilter = {
  is?: InputMaybe<CookWhereInput>
  isNot?: InputMaybe<CookWhereInput>
}

export enum CookScalarFieldEnum {
  CreatedAt = 'createdAt',
  Uid = 'uid',
  UpdatedAt = 'updatedAt',
}

export type CookWhereInput = {
  AND?: InputMaybe<Array<CookWhereInput>>
  NOT?: InputMaybe<Array<CookWhereInput>>
  OR?: InputMaybe<Array<CookWhereInput>>
  createdAt?: InputMaybe<DateTimeFilter>
  kitchen?: InputMaybe<KitchenRelationFilter>
  uid?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type CookWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>
}

export type CreateAddressInput = {
  address: Scalars['String']
  lat: Scalars['Int']
  lng: Scalars['Int']
  zipCode: Scalars['String']
}

export type CreateCookInput = {
  uid: Scalars['String']
}

export type CreateCustomerInput = {
  addressId: Scalars['Int']
  name: Scalars['String']
  uid: Scalars['String']
}

export type CreateCustomerReviewInput = {
  customerId: Scalars['String']
  foodItemId: Scalars['Int']
  rating: Scalars['Int']
  text: Scalars['String']
}

export type CreateFoodItemInput = {
  days: Array<Day>
  deliveryAvailable: Scalars['Boolean']
  description: Scalars['String']
  image: Scalars['String']
  kitchenId: Scalars['Int']
  live: Scalars['Boolean']
  maxQuantity: Scalars['Int']
  name: Scalars['String']
  price: Scalars['Int']
  time: Scalars['DateTime']
  vegan: Scalars['Boolean']
}

export type CreateKitchenInput = {
  about: Scalars['String']
  addressId: Scalars['Int']
  cookId: Scalars['String']
  image: Scalars['String']
  name: Scalars['String']
  open: Scalars['Boolean']
}

export type CreateOrderInput = {
  customerId: Scalars['String']
  price: Scalars['Int']
  quantity: Scalars['Int']
  scheduleId: Scalars['Int']
  status: Status
  time: Scalars['DateTime']
  tokenNumber: Scalars['Int']
}

export type CreateScheduleInput = {
  customerId: Scalars['String']
  days: Array<Day>
  foodItemId: Scalars['Int']
  live: Scalars['Boolean']
  quantity: Scalars['Int']
}

export type Customer = {
  __typename?: 'Customer'
  address: Address
  addressId: Scalars['Int']
  createdAt: Scalars['DateTime']
  customerReviews: Array<CustomerReview>
  name: Scalars['String']
  orders: Array<Order>
  schedules: Array<Schedule>
  uid: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type CustomerOrderByWithRelationInput = {
  address?: InputMaybe<AddressOrderByWithRelationInput>
  addressId?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  customerReviews?: InputMaybe<CustomerReviewOrderByRelationAggregateInput>
  name?: InputMaybe<SortOrder>
  orders?: InputMaybe<OrderOrderByRelationAggregateInput>
  schedules?: InputMaybe<ScheduleOrderByRelationAggregateInput>
  uid?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export type CustomerRelationFilter = {
  is?: InputMaybe<CustomerWhereInput>
  isNot?: InputMaybe<CustomerWhereInput>
}

export type CustomerReview = {
  __typename?: 'CustomerReview'
  createdAt: Scalars['DateTime']
  customer: Customer
  customerId: Scalars['String']
  foodItem: FoodItem
  foodItemId: Scalars['Int']
  id: Scalars['Int']
  rating: Scalars['Int']
  text: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type CustomerReviewListRelationFilter = {
  every?: InputMaybe<CustomerReviewWhereInput>
  none?: InputMaybe<CustomerReviewWhereInput>
  some?: InputMaybe<CustomerReviewWhereInput>
}

export type CustomerReviewOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type CustomerReviewOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>
  customer?: InputMaybe<CustomerOrderByWithRelationInput>
  customerId?: InputMaybe<SortOrder>
  foodItem?: InputMaybe<FoodItemOrderByWithRelationInput>
  foodItemId?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  rating?: InputMaybe<SortOrder>
  text?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export enum CustomerReviewScalarFieldEnum {
  CreatedAt = 'createdAt',
  CustomerId = 'customerId',
  FoodItemId = 'foodItemId',
  Id = 'id',
  Rating = 'rating',
  Text = 'text',
  UpdatedAt = 'updatedAt',
}

export type CustomerReviewWhereInput = {
  AND?: InputMaybe<Array<CustomerReviewWhereInput>>
  NOT?: InputMaybe<Array<CustomerReviewWhereInput>>
  OR?: InputMaybe<Array<CustomerReviewWhereInput>>
  createdAt?: InputMaybe<DateTimeFilter>
  customer?: InputMaybe<CustomerRelationFilter>
  customerId?: InputMaybe<StringFilter>
  foodItem?: InputMaybe<FoodItemRelationFilter>
  foodItemId?: InputMaybe<IntFilter>
  id?: InputMaybe<IntFilter>
  rating?: InputMaybe<IntFilter>
  text?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type CustomerReviewWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export enum CustomerScalarFieldEnum {
  AddressId = 'addressId',
  CreatedAt = 'createdAt',
  Name = 'name',
  Uid = 'uid',
  UpdatedAt = 'updatedAt',
}

export type CustomerWhereInput = {
  AND?: InputMaybe<Array<CustomerWhereInput>>
  NOT?: InputMaybe<Array<CustomerWhereInput>>
  OR?: InputMaybe<Array<CustomerWhereInput>>
  address: AddressRelationFilter
  addressId: IntFilter
  createdAt: DateTimeFilter
  customerReviews: CustomerReviewListRelationFilter
  name: StringFilter
  orders: OrderListRelationFilter
  schedules: ScheduleListRelationFilter
  uid: StringFilter
  updatedAt: DateTimeFilter
}

export type CustomerWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>
}

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['String']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<Scalars['String']>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  notIn?: InputMaybe<Array<Scalars['String']>>
}

/** Enum for days */
export enum Day {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
}

export type DayItems = {
  __typename?: 'DayItems'
  foodItems: Array<PartialFoodItem>
  time: Scalars['String']
}

export type EnumDayListFilter = {
  equals?: InputMaybe<Day>
  in?: InputMaybe<Array<Day>>
  not?: InputMaybe<Day>
  notIn?: InputMaybe<Array<Day>>
}

export type EnumStatusFilter = {
  equals?: InputMaybe<Status>
  in?: InputMaybe<Array<Status>>
  not?: InputMaybe<Status>
  notIn?: InputMaybe<Array<Status>>
}

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']>
  gt?: InputMaybe<Scalars['Float']>
  gte?: InputMaybe<Scalars['Float']>
  in?: InputMaybe<Scalars['Float']>
  lt?: InputMaybe<Scalars['Float']>
  lte?: InputMaybe<Scalars['Float']>
  not?: InputMaybe<Scalars['Float']>
  notIn?: InputMaybe<Scalars['Float']>
}

export type FoodItem = {
  __typename?: 'FoodItem'
  createdAt: Scalars['DateTime']
  customerReview: Array<CustomerReview>
  days: Array<Day>
  deliveryAvailable: Scalars['Boolean']
  description: Scalars['String']
  id: Scalars['Int']
  image: Scalars['String']
  kitchen: Kitchen
  kitchenId: Scalars['Int']
  live: Scalars['Boolean']
  maxQuantity: Scalars['Int']
  name: Scalars['String']
  price: Scalars['Int']
  scheduleCount: AggregateCountOutput
  schedules: Array<Schedule>
  time: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  vegan: Scalars['Boolean']
}

export type FoodItemListRelationFilter = {
  every?: InputMaybe<FoodItemWhereInput>
  none?: InputMaybe<FoodItemWhereInput>
  some?: InputMaybe<FoodItemWhereInput>
}

export type FoodItemOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type FoodItemOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>
  customerReviews?: InputMaybe<CustomerReviewOrderByRelationAggregateInput>
  days?: InputMaybe<SortOrder>
  deliveryAvailable?: InputMaybe<SortOrder>
  description?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  image?: InputMaybe<SortOrder>
  kitchen?: InputMaybe<KitchenOrderByWithRelationInput>
  kitchenId?: InputMaybe<SortOrder>
  live?: InputMaybe<SortOrder>
  maxQuantity?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  price?: InputMaybe<SortOrder>
  schedules?: InputMaybe<ScheduleOrderByRelationAggregateInput>
  time?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
  vegan?: InputMaybe<SortOrder>
}

export type FoodItemRelationFilter = {
  is?: InputMaybe<FoodItemWhereInput>
  isNot?: InputMaybe<FoodItemWhereInput>
}

export enum FoodItemScalarFieldEnum {
  CreatedAt = 'createdAt',
  Days = 'days',
  DeliveryAvailable = 'deliveryAvailable',
  Description = 'description',
  Id = 'id',
  Image = 'image',
  KitchenId = 'kitchenId',
  Live = 'live',
  MaxQuantity = 'maxQuantity',
  Name = 'name',
  Price = 'price',
  Time = 'time',
  UpdatedAt = 'updatedAt',
  Vegan = 'vegan',
}

export type FoodItemWhereInput = {
  AND?: InputMaybe<Array<FoodItemWhereInput>>
  NOT?: InputMaybe<Array<FoodItemWhereInput>>
  OR?: InputMaybe<Array<FoodItemWhereInput>>
  createdAt?: InputMaybe<DateTimeFilter>
  customerReviews?: InputMaybe<CustomerReviewListRelationFilter>
  days?: InputMaybe<EnumDayListFilter>
  deliveryAvailable?: InputMaybe<BoolFilter>
  description?: InputMaybe<StringFilter>
  id?: InputMaybe<IntFilter>
  image?: InputMaybe<StringFilter>
  kitchen?: InputMaybe<KitchenRelationFilter>
  kitchenId?: InputMaybe<IntFilter>
  live?: InputMaybe<BoolFilter>
  maxQuantity?: InputMaybe<IntFilter>
  name?: InputMaybe<StringFilter>
  price?: InputMaybe<FloatFilter>
  schedules?: InputMaybe<ScheduleListRelationFilter>
  time?: InputMaybe<DateTimeFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
  vegan?: InputMaybe<BoolFilter>
}

export type FoodItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>
  gt?: InputMaybe<Scalars['Int']>
  gte?: InputMaybe<Scalars['Int']>
  in?: InputMaybe<Scalars['Int']>
  lt?: InputMaybe<Scalars['Int']>
  lte?: InputMaybe<Scalars['Int']>
  not?: InputMaybe<Scalars['Int']>
  notIn?: InputMaybe<Scalars['Int']>
}

export type Kitchen = {
  __typename?: 'Kitchen'
  about: Scalars['String']
  address: Address
  addressId: Scalars['Int']
  cook: Cook
  cookId: Scalars['String']
  createdAt: Scalars['DateTime']
  foodItems: Array<FoodItem>
  id: Scalars['Int']
  image: Scalars['String']
  name: Scalars['String']
  open: Scalars['Boolean']
  updatedAt: Scalars['DateTime']
}

export type KitchenOrderByWithRelationInput = {
  about?: InputMaybe<SortOrder>
  address?: InputMaybe<AddressOrderByWithRelationInput>
  addressId?: InputMaybe<SortOrder>
  cook?: InputMaybe<CookOrderByWithRelationInput>
  cookId?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  foodItems?: InputMaybe<FoodItemOrderByRelationAggregateInput>
  id?: InputMaybe<SortOrder>
  image?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  open?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export type KitchenRelationFilter = {
  is?: InputMaybe<KitchenWhereInput>
  isNot?: InputMaybe<KitchenWhereInput>
}

export enum KitchenScalarFieldEnum {
  About = 'about',
  CookId = 'cookId',
  CreatedAt = 'createdAt',
  Id = 'id',
  Image = 'image',
  Name = 'name',
  Open = 'open',
  UpdatedAt = 'updatedAt',
}

export type KitchenWhereInput = {
  AND?: InputMaybe<Array<KitchenWhereInput>>
  NOT?: InputMaybe<Array<KitchenWhereInput>>
  OR?: InputMaybe<Array<KitchenWhereInput>>
  about?: InputMaybe<StringFilter>
  address?: InputMaybe<AddressRelationFilter>
  addressId?: InputMaybe<IntFilter>
  cook?: InputMaybe<CookRelationFilter>
  cookId?: InputMaybe<StringFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  foodItems?: InputMaybe<FoodItemListRelationFilter>
  id?: InputMaybe<IntFilter>
  image?: InputMaybe<StringFilter>
  name?: InputMaybe<StringFilter>
  open?: InputMaybe<BoolFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type KitchenWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export type LocationFilterInput = {
  ne_lat: Scalars['Float']
  ne_lng: Scalars['Float']
  sw_lat: Scalars['Float']
  sw_lng: Scalars['Float']
}

export type LoginInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type LoginOutput = {
  __typename?: 'LoginOutput'
  displayName: Scalars['String']
  email: Scalars['String']
  expiresIn: Scalars['String']
  idToken: Scalars['String']
  kind: Scalars['String']
  localId: Scalars['String']
  refreshToken: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createAddress: Address
  createCook: Cook
  createCustomer: Customer
  createCustomerReview: CustomerReview
  createFoodItem: FoodItem
  createKitchen: Kitchen
  createOrder: Order
  createSchedule: Schedule
  login: LoginOutput
  refreshToken: RefreshTokenOutput
  register: RegisterOutput
  removeAddress: Address
  removeCook: Cook
  removeCustomer: Customer
  removeCustomerReview: CustomerReview
  removeFoodItem: FoodItem
  removeKitchen: Kitchen
  removeOrder: Order
  removeSchedule: Schedule
  setAdmin: Scalars['Boolean']
  setRole: Scalars['Boolean']
  updateAddress: Address
  updateCook: Cook
  updateCustomer: Customer
  updateCustomerReview: CustomerReview
  updateFoodItem: FoodItem
  updateKitchen: Kitchen
  updateOrder: Order
  updateSchedule: Schedule
}

export type MutationCreateAddressArgs = {
  createAddressInput: CreateAddressInput
}

export type MutationCreateCookArgs = {
  createCookInput: CreateCookInput
}

export type MutationCreateCustomerArgs = {
  createCustomerInput: CreateCustomerInput
}

export type MutationCreateCustomerReviewArgs = {
  createCustomerReviewInput: CreateCustomerReviewInput
}

export type MutationCreateFoodItemArgs = {
  createFoodItemInput: CreateFoodItemInput
}

export type MutationCreateKitchenArgs = {
  createKitchenInput: CreateKitchenInput
}

export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput
}

export type MutationCreateScheduleArgs = {
  createScheduleInput: CreateScheduleInput
}

export type MutationLoginArgs = {
  credentials: LoginInput
}

export type MutationRefreshTokenArgs = {
  refreshTokenInput: RefreshTokenInput
}

export type MutationRegisterArgs = {
  credentials: RegisterInput
}

export type MutationRemoveAddressArgs = {
  where?: InputMaybe<AddressWhereUniqueInput>
}

export type MutationRemoveCookArgs = {
  where?: InputMaybe<CookWhereUniqueInput>
}

export type MutationRemoveCustomerArgs = {
  where?: InputMaybe<CustomerWhereUniqueInput>
}

export type MutationRemoveCustomerReviewArgs = {
  where?: InputMaybe<CustomerReviewWhereUniqueInput>
}

export type MutationRemoveFoodItemArgs = {
  where?: InputMaybe<FoodItemWhereUniqueInput>
}

export type MutationRemoveKitchenArgs = {
  where?: InputMaybe<KitchenWhereUniqueInput>
}

export type MutationRemoveOrderArgs = {
  where?: InputMaybe<OrderWhereUniqueInput>
}

export type MutationRemoveScheduleArgs = {
  where?: InputMaybe<ScheduleWhereUniqueInput>
}

export type MutationSetAdminArgs = {
  uid: Scalars['String']
}

export type MutationSetRoleArgs = {
  setRoleInput: SetRoleInput
}

export type MutationUpdateAddressArgs = {
  updateAddressInput: UpdateAddressInput
}

export type MutationUpdateCookArgs = {
  updateCookInput: UpdateCookInput
}

export type MutationUpdateCustomerArgs = {
  updateCustomerInput: UpdateCustomerInput
}

export type MutationUpdateCustomerReviewArgs = {
  updateCustomerReviewInput: UpdateCustomerReviewInput
}

export type MutationUpdateFoodItemArgs = {
  updateFoodItemInput: UpdateFoodItemInput
}

export type MutationUpdateKitchenArgs = {
  updateKitchenInput: UpdateKitchenInput
}

export type MutationUpdateOrderArgs = {
  updateOrderInput: UpdateOrderInput
}

export type MutationUpdateScheduleArgs = {
  updateScheduleInput: UpdateScheduleInput
}

export type Order = {
  __typename?: 'Order'
  createdAt: Scalars['DateTime']
  customer: Customer
  customerId: Scalars['String']
  id: Scalars['Int']
  price: Scalars['Int']
  quantity: Scalars['Int']
  schedule: Schedule
  scheduleId: Scalars['Int']
  status: Status
  time: Scalars['DateTime']
  tokenNumber: Scalars['Int']
  updatedAt: Scalars['DateTime']
}

export type OrderListRelationFilter = {
  every?: InputMaybe<OrderWhereInput>
  none?: InputMaybe<OrderWhereInput>
  some?: InputMaybe<OrderWhereInput>
}

export type OrderOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type OrderOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>
  customer?: InputMaybe<CustomerOrderByWithRelationInput>
  customerId?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  price?: InputMaybe<SortOrder>
  quantity?: InputMaybe<SortOrder>
  schedule?: InputMaybe<ScheduleOrderByWithRelationInput>
  scheduleId?: InputMaybe<SortOrder>
  status?: InputMaybe<SortOrder>
  time?: InputMaybe<SortOrder>
  tokenNumber?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export enum OrderScalarFieldEnum {
  CreatedAt = 'createdAt',
  CustomerId = 'customerId',
  Id = 'id',
  Price = 'price',
  Quantity = 'quantity',
  ScheduleId = 'scheduleId',
  Status = 'status',
  Time = 'time',
  TokenNumber = 'tokenNumber',
  UpdatedAt = 'updatedAt',
}

export type OrderWhereInput = {
  AND?: InputMaybe<Array<OrderWhereInput>>
  NOT?: InputMaybe<Array<OrderWhereInput>>
  OR?: InputMaybe<Array<OrderWhereInput>>
  createdAt?: InputMaybe<DateTimeFilter>
  customer?: InputMaybe<CustomerRelationFilter>
  customerId?: InputMaybe<StringFilter>
  id?: InputMaybe<IntFilter>
  price?: InputMaybe<FloatFilter>
  quantity?: InputMaybe<IntFilter>
  schedule?: InputMaybe<ScheduleRelationFilter>
  scheduleId?: InputMaybe<IntFilter>
  status?: InputMaybe<EnumStatusFilter>
  time?: InputMaybe<DateTimeFilter>
  tokenNumber?: InputMaybe<IntFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type OrderWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export type PartialFoodItem = {
  __typename?: 'PartialFoodItem'
  id: Scalars['Int']
  kitchenId: Scalars['Int']
  kitchenName?: Maybe<Scalars['String']>
  name: Scalars['String']
  quantity: Scalars['Int']
}

export type Query = {
  __typename?: 'Query'
  address: Address
  addresses: Array<Address>
  cook: Cook
  cooks: Array<Cook>
  customer: Customer
  customerReview: CustomerReview
  customerReviews: Array<CustomerReview>
  customers: Array<Customer>
  foodItem: FoodItem
  foodItems: Array<FoodItem>
  kitchen: Kitchen
  kitchens: Array<Kitchen>
  order: Order
  orders: Array<Order>
  ordersForCustomer: Array<Order>
  ordersForKitchen: Array<Order>
  schedule: Schedule
  schedules: Array<Schedule>
  schedulesForCustomer: Array<Schedule>
  schedulesForCustomerRaw: Array<SchedulesForKitchenOutput>
  schedulesForKitchen: Array<Schedule>
  schedulesForKitchenRaw: Array<SchedulesForKitchenOutput>
  searchKitchens: Array<Kitchen>
}

export type QueryAddressArgs = {
  where?: InputMaybe<AddressWhereUniqueInput>
}

export type QueryAddressesArgs = {
  cursor?: InputMaybe<WhereUniqueInputNumber>
  distinct?: InputMaybe<Array<AddressScalarFieldEnum>>
  orderBy?: InputMaybe<Array<AddressOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<AddressWhereInput>
}

export type QueryCookArgs = {
  where?: InputMaybe<CookWhereUniqueInput>
}

export type QueryCooksArgs = {
  cursor?: InputMaybe<CookWhereUniqueInput>
  distinct?: InputMaybe<Array<CookScalarFieldEnum>>
  orderBy?: InputMaybe<Array<CookOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<CookWhereInput>
}

export type QueryCustomerArgs = {
  where?: InputMaybe<CustomerWhereUniqueInput>
}

export type QueryCustomerReviewArgs = {
  where?: InputMaybe<CustomerReviewWhereUniqueInput>
}

export type QueryCustomerReviewsArgs = {
  cursor?: InputMaybe<CustomerReviewWhereUniqueInput>
  distinct?: InputMaybe<Array<CustomerReviewScalarFieldEnum>>
  orderBy?: InputMaybe<Array<CustomerReviewOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<CustomerReviewWhereInput>
}

export type QueryCustomersArgs = {
  cursor?: InputMaybe<CustomerWhereUniqueInput>
  distinct?: InputMaybe<Array<CustomerScalarFieldEnum>>
  orderBy?: InputMaybe<Array<CustomerOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<CustomerWhereInput>
}

export type QueryFoodItemArgs = {
  where?: InputMaybe<FoodItemWhereUniqueInput>
}

export type QueryFoodItemsArgs = {
  cursor?: InputMaybe<WhereUniqueInputNumber>
  distinct?: InputMaybe<Array<FoodItemScalarFieldEnum>>
  orderBy?: InputMaybe<Array<FoodItemOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<FoodItemWhereInput>
}

export type QueryKitchenArgs = {
  where?: InputMaybe<KitchenWhereUniqueInput>
}

export type QueryKitchensArgs = {
  cursor?: InputMaybe<KitchenWhereUniqueInput>
  distinct?: InputMaybe<Array<KitchenScalarFieldEnum>>
  orderBy?: InputMaybe<Array<KitchenOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<KitchenWhereInput>
}

export type QueryOrderArgs = {
  where?: InputMaybe<OrderWhereUniqueInput>
}

export type QueryOrdersArgs = {
  cursor?: InputMaybe<WhereUniqueInputNumber>
  distinct?: InputMaybe<Array<OrderScalarFieldEnum>>
  orderBy?: InputMaybe<Array<OrderOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<OrderWhereInput>
}

export type QueryOrdersForCustomerArgs = {
  cursor?: InputMaybe<WhereUniqueInputNumber>
  customerId: Scalars['String']
  distinct?: InputMaybe<Array<OrderScalarFieldEnum>>
  orderBy?: InputMaybe<Array<OrderOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<OrderWhereInput>
}

export type QueryOrdersForKitchenArgs = {
  cursor?: InputMaybe<WhereUniqueInputNumber>
  distinct?: InputMaybe<Array<OrderScalarFieldEnum>>
  kitchenId: Scalars['Int']
  orderBy?: InputMaybe<Array<OrderOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<OrderWhereInput>
}

export type QueryScheduleArgs = {
  where?: InputMaybe<ScheduleWhereUniqueInput>
}

export type QuerySchedulesArgs = {
  cursor?: InputMaybe<WhereUniqueInputNumber>
  distinct?: InputMaybe<Array<ScheduleScalarFieldEnum>>
  orderBy?: InputMaybe<Array<ScheduleOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ScheduleWhereInput>
}

export type QuerySchedulesForCustomerArgs = {
  cursor?: InputMaybe<WhereUniqueInputNumber>
  customerId: Scalars['String']
  distinct?: InputMaybe<Array<ScheduleScalarFieldEnum>>
  orderBy?: InputMaybe<Array<ScheduleOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ScheduleWhereInput>
}

export type QuerySchedulesForCustomerRawArgs = {
  customerId: Scalars['String']
}

export type QuerySchedulesForKitchenArgs = {
  cursor?: InputMaybe<WhereUniqueInputNumber>
  distinct?: InputMaybe<Array<ScheduleScalarFieldEnum>>
  kitchenId: Scalars['String']
  orderBy?: InputMaybe<Array<ScheduleOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ScheduleWhereInput>
}

export type QuerySchedulesForKitchenRawArgs = {
  kitchenId: Scalars['String']
}

export type QuerySearchKitchensArgs = {
  cursor?: InputMaybe<KitchenWhereUniqueInput>
  distinct?: InputMaybe<Array<KitchenScalarFieldEnum>>
  locationFilter: LocationFilterInput
  orderBy?: InputMaybe<Array<KitchenOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<KitchenWhereInput>
}

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export type RefreshTokenInput = {
  refresh_token: Scalars['String']
}

export type RefreshTokenOutput = {
  __typename?: 'RefreshTokenOutput'
  access_token: Scalars['String']
  expires_in: Scalars['String']
  id_token: Scalars['String']
  project_id: Scalars['String']
  refresh_token: Scalars['String']
  token_type: Scalars['String']
  user_id: Scalars['String']
}

export type RegisterInput = {
  displayName?: InputMaybe<Scalars['String']>
  email: Scalars['String']
  password: Scalars['String']
}

export type RegisterOutput = {
  __typename?: 'RegisterOutput'
  displayName: Scalars['String']
  email: Scalars['String']
  expiresIn: Scalars['String']
  idToken: Scalars['String']
  kind: Scalars['String']
  localId: Scalars['String']
  refreshToken: Scalars['String']
}

/** Enum for roles */
export enum RoleEnum {
  Admin = 'admin',
  Moderator = 'moderator',
}

export type Schedule = {
  __typename?: 'Schedule'
  createdAt: Scalars['DateTime']
  customer: Customer
  customerId: Scalars['String']
  days: Array<Day>
  foodItem: FoodItem
  foodItemId: Scalars['Int']
  id: Scalars['Int']
  live: Scalars['Boolean']
  orders: Array<Order>
  quantity: Scalars['Int']
  updatedAt: Scalars['DateTime']
}

export type ScheduleListRelationFilter = {
  every?: InputMaybe<ScheduleWhereInput>
  none?: InputMaybe<ScheduleWhereInput>
  some?: InputMaybe<ScheduleWhereInput>
}

export type ScheduleOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type ScheduleOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>
  customer?: InputMaybe<CustomerOrderByWithRelationInput>
  customerId?: InputMaybe<SortOrder>
  days?: InputMaybe<SortOrder>
  foodItem?: InputMaybe<FoodItemOrderByWithRelationInput>
  foodItemId?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  live?: InputMaybe<SortOrder>
  orders?: InputMaybe<OrderOrderByRelationAggregateInput>
  quantity?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export type ScheduleRelationFilter = {
  is?: InputMaybe<ScheduleWhereInput>
  isNot?: InputMaybe<ScheduleWhereInput>
}

export enum ScheduleScalarFieldEnum {
  CreatedAt = 'createdAt',
  CustomerId = 'customerId',
  Days = 'days',
  FoodItemId = 'foodItemId',
  Id = 'id',
  Live = 'live',
  Quantity = 'quantity',
  UpdatedAt = 'updatedAt',
}

export type ScheduleWhereInput = {
  AND?: InputMaybe<Array<ScheduleWhereInput>>
  NOT?: InputMaybe<Array<ScheduleWhereInput>>
  OR?: InputMaybe<Array<ScheduleWhereInput>>
  createdAt?: InputMaybe<DateTimeFilter>
  customer?: InputMaybe<CustomerRelationFilter>
  customerId?: InputMaybe<StringFilter>
  days?: InputMaybe<EnumDayListFilter>
  foodItem?: InputMaybe<FoodItemRelationFilter>
  foodItemId?: InputMaybe<IntFilter>
  id?: InputMaybe<IntFilter>
  live?: InputMaybe<BoolFilter>
  orders?: InputMaybe<OrderListRelationFilter>
  quantity?: InputMaybe<IntFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type ScheduleWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export type SchedulesForKitchenOutput = {
  __typename?: 'SchedulesForKitchenOutput'
  day: Scalars['String']
  items: Array<DayItems>
}

export type SetRoleInput = {
  role: RoleEnum
  uid: Scalars['String']
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

/** Enum for days */
export enum Status {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Undelivered = 'UNDELIVERED',
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>
  endsWith?: InputMaybe<Scalars['String']>
  equals?: InputMaybe<Scalars['String']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<Scalars['String']>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  mode?: InputMaybe<QueryMode>
  not?: InputMaybe<Scalars['String']>
  notIn?: InputMaybe<Array<Scalars['String']>>
  startsWith?: InputMaybe<Scalars['String']>
}

export type UpdateAddressInput = {
  address?: InputMaybe<Scalars['String']>
  id: Scalars['Int']
  lat?: InputMaybe<Scalars['Int']>
  lng?: InputMaybe<Scalars['Int']>
  zipCode?: InputMaybe<Scalars['String']>
}

export type UpdateCookInput = {
  uid: Scalars['String']
}

export type UpdateCustomerInput = {
  addressId?: InputMaybe<Scalars['Int']>
  name?: InputMaybe<Scalars['String']>
  uid: Scalars['String']
}

export type UpdateCustomerReviewInput = {
  customerId?: InputMaybe<Scalars['String']>
  foodItemId?: InputMaybe<Scalars['Int']>
  id: Scalars['Int']
  rating?: InputMaybe<Scalars['Int']>
  text?: InputMaybe<Scalars['String']>
}

export type UpdateFoodItemInput = {
  days?: InputMaybe<Array<Day>>
  deliveryAvailable?: InputMaybe<Scalars['Boolean']>
  description?: InputMaybe<Scalars['String']>
  id: Scalars['Int']
  image?: InputMaybe<Scalars['String']>
  kitchenId?: InputMaybe<Scalars['Int']>
  live?: InputMaybe<Scalars['Boolean']>
  maxQuantity?: InputMaybe<Scalars['Int']>
  name?: InputMaybe<Scalars['String']>
  price?: InputMaybe<Scalars['Int']>
  time?: InputMaybe<Scalars['DateTime']>
  vegan?: InputMaybe<Scalars['Boolean']>
}

export type UpdateKitchenInput = {
  about?: InputMaybe<Scalars['String']>
  addressId?: InputMaybe<Scalars['Int']>
  cookId?: InputMaybe<Scalars['String']>
  id: Scalars['Int']
  image?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  open?: InputMaybe<Scalars['Boolean']>
}

export type UpdateOrderInput = {
  customerId?: InputMaybe<Scalars['String']>
  id: Scalars['Int']
  price?: InputMaybe<Scalars['Int']>
  quantity?: InputMaybe<Scalars['Int']>
  scheduleId?: InputMaybe<Scalars['Int']>
  status?: InputMaybe<Status>
  time?: InputMaybe<Scalars['DateTime']>
  tokenNumber?: InputMaybe<Scalars['Int']>
}

export type UpdateScheduleInput = {
  customerId?: InputMaybe<Scalars['String']>
  days?: InputMaybe<Array<Day>>
  foodItemId?: InputMaybe<Scalars['Int']>
  id: Scalars['Int']
  live?: InputMaybe<Scalars['Boolean']>
  quantity?: InputMaybe<Scalars['Int']>
}

export type WhereUniqueInputNumber = {
  id?: InputMaybe<Scalars['Int']>
}

export type CreateCookMutationVariables = Exact<{
  createCookInput: CreateCookInput
}>

export type CreateCookMutation = {
  __typename?: 'Mutation'
  createCook: { __typename?: 'Cook'; uid: string }
}

export type CreateCustomerMutationVariables = Exact<{
  createCustomerInput: CreateCustomerInput
}>

export type CreateCustomerMutation = {
  __typename?: 'Mutation'
  createCustomer: { __typename?: 'Customer'; uid: string }
}

export type CreateOrderMutationVariables = Exact<{
  createOrderInput: CreateOrderInput
}>

export type CreateOrderMutation = {
  __typename?: 'Mutation'
  createOrder: { __typename?: 'Order'; id: number }
}

export type UpdateOrderMutationVariables = Exact<{
  updateOrderInput: UpdateOrderInput
}>

export type UpdateOrderMutation = {
  __typename?: 'Mutation'
  updateOrder: { __typename?: 'Order'; id: number }
}

export type RemoveScheduleMutationVariables = Exact<{
  where: ScheduleWhereUniqueInput
}>

export type RemoveScheduleMutation = {
  __typename?: 'Mutation'
  removeSchedule: { __typename?: 'Schedule'; id: number }
}

export type UpdateScheduleMutationVariables = Exact<{
  updateScheduleInput: UpdateScheduleInput
}>

export type UpdateScheduleMutation = {
  __typename?: 'Mutation'
  updateSchedule: { __typename?: 'Schedule'; id: number }
}

export type OrdersForKitchenQueryVariables = Exact<{
  kitchenId: Scalars['Int']
}>

export type OrdersForKitchenQuery = {
  __typename?: 'Query'
  ordersForKitchen: Array<{
    __typename?: 'Order'
    id: number
    time: any
    status: Status
    price: number
    quantity: number
    customer: { __typename?: 'Customer'; uid: string; name: string }
    schedule: {
      __typename?: 'Schedule'
      foodItem: { __typename?: 'FoodItem'; name: string; vegan: boolean }
    }
  }>
}

export type LoginMutationVariables = Exact<{
  credentials: LoginInput
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login: {
    __typename?: 'LoginOutput'
    refreshToken: string
    localId: string
    kind: string
    idToken: string
    expiresIn: string
    email: string
    displayName: string
  }
}

export type GetKitchenLocationQueryVariables = Exact<{
  where: KitchenWhereUniqueInput
}>

export type GetKitchenLocationQuery = {
  __typename?: 'Query'
  kitchen: {
    __typename?: 'Kitchen'
    id: number
    address: {
      __typename?: 'Address'
      address: string
      zipCode: string
      lat: number
      lng: number
    }
  }
}

export type GetKitchenQueryVariables = Exact<{
  where: KitchenWhereUniqueInput
}>

export type GetKitchenQuery = {
  __typename?: 'Query'
  kitchen: {
    __typename?: 'Kitchen'
    id: number
    updatedAt: any
    open: boolean
    name: string
    image: string
    createdAt: any
    about: string
    cook: { __typename?: 'Cook'; uid: string }
    address: {
      __typename?: 'Address'
      address: string
      zipCode: string
      lat: number
      lng: number
    }
    foodItems: Array<{
      __typename?: 'FoodItem'
      id: number
      days: Array<Day>
      createdAt: any
      description: string
      image: string
      maxQuantity: number
      name: string
      price: number
      time: any
      updatedAt: any
      scheduleCount: { __typename?: 'AggregateCountOutput'; count: number }
    }>
  }
}

export type GetCustomerQueryVariables = Exact<{
  where: CustomerWhereUniqueInput
}>

export type GetCustomerQuery = {
  __typename?: 'Query'
  customer: {
    __typename?: 'Customer'
    name: string
    uid: string
    address: {
      __typename?: 'Address'
      address: string
      lat: number
      lng: number
    }
  }
}

export type GetCookQueryVariables = Exact<{
  where: CookWhereUniqueInput
}>

export type GetCookQuery = {
  __typename?: 'Query'
  cook: {
    __typename?: 'Cook'
    uid: string
    kitchen: {
      __typename?: 'Kitchen'
      id: number
      updatedAt: any
      open: boolean
      name: string
      image: string
      createdAt: any
      about: string
      address: {
        __typename?: 'Address'
        address: string
        zipCode: string
        lat: number
        lng: number
        id: number
      }
      foodItems: Array<{
        __typename?: 'FoodItem'
        id: number
        createdAt: any
        description: string
        image: string
        maxQuantity: number
        name: string
        days: Array<Day>
        price: number
        time: any
        updatedAt: any
        scheduleCount: { __typename?: 'AggregateCountOutput'; count: number }
      }>
    }
  }
}

export type UpdateFoodItemMutationVariables = Exact<{
  updateFoodItemInput: UpdateFoodItemInput
}>

export type UpdateFoodItemMutation = {
  __typename?: 'Mutation'
  updateFoodItem: {
    __typename?: 'FoodItem'
    id: number
    image: string
    maxQuantity: number
    name: string
    price: number
    time: any
    description: string
  }
}

export type CreateFoodItemMutationVariables = Exact<{
  createFoodItemInput: CreateFoodItemInput
}>

export type CreateFoodItemMutation = {
  __typename?: 'Mutation'
  createFoodItem: { __typename?: 'FoodItem'; id: number }
}

export type RemoveFoodItemMutationVariables = Exact<{
  where: FoodItemWhereUniqueInput
}>

export type RemoveFoodItemMutation = {
  __typename?: 'Mutation'
  removeFoodItem: { __typename?: 'FoodItem'; id: number }
}

export type UpdateCookMutationVariables = Exact<{
  updateCookInput: UpdateCookInput
}>

export type UpdateCookMutation = {
  __typename?: 'Mutation'
  updateCook: { __typename?: 'Cook'; uid: string }
}

export type UpdateKitchenMutationVariables = Exact<{
  updateKitchenInput: UpdateKitchenInput
}>

export type UpdateKitchenMutation = {
  __typename?: 'Mutation'
  updateKitchen: { __typename?: 'Kitchen'; id: number }
}

export type SearchKitchensQueryVariables = Exact<{
  locationFilter: LocationFilterInput
  where?: InputMaybe<KitchenWhereInput>
  orderBy?: InputMaybe<
    Array<KitchenOrderByWithRelationInput> | KitchenOrderByWithRelationInput
  >
  cursor?: InputMaybe<KitchenWhereUniqueInput>
  take?: InputMaybe<Scalars['Int']>
  skip?: InputMaybe<Scalars['Int']>
  distinct?: InputMaybe<Array<KitchenScalarFieldEnum> | KitchenScalarFieldEnum>
}>

export type SearchKitchensQuery = {
  __typename?: 'Query'
  searchKitchens: Array<{
    __typename?: 'Kitchen'
    about: string
    id: number
    image: string
    name: string
    open: boolean
    createdAt: any
    address: {
      __typename?: 'Address'
      lat: number
      lng: number
      address: string
    }
  }>
}

export type CreateScheduleMutationVariables = Exact<{
  createScheduleInput: CreateScheduleInput
}>

export type CreateScheduleMutation = {
  __typename?: 'Mutation'
  createSchedule: { __typename?: 'Schedule'; id: number }
}

export type OrdersForCustomerQueryVariables = Exact<{
  customerId: Scalars['String']
  where?: InputMaybe<OrderWhereInput>
}>

export type OrdersForCustomerQuery = {
  __typename?: 'Query'
  ordersForCustomer: Array<{
    __typename?: 'Order'
    id: number
    quantity: number
    time: any
    status: Status
    price: number
    schedule: {
      __typename?: 'Schedule'
      foodItem: { __typename?: 'FoodItem'; name: string }
    }
  }>
}

export type SchedulesForCustomerQueryVariables = Exact<{
  customerId: Scalars['String']
  where?: InputMaybe<ScheduleWhereInput>
}>

export type SchedulesForCustomerQuery = {
  __typename?: 'Query'
  schedulesForCustomer: Array<{
    __typename?: 'Schedule'
    id: number
    days: Array<Day>
    quantity: number
    live: boolean
    foodItem: {
      __typename?: 'FoodItem'
      id: number
      name: string
      price: number
      time: any
      customerReview: Array<{
        __typename?: 'CustomerReview'
        rating: number
        text: string
      }>
      kitchen: { __typename?: 'Kitchen'; name: string }
    }
  }>
}

export type UpdateAddressMutationVariables = Exact<{
  updateAddressInput: UpdateAddressInput
}>

export type UpdateAddressMutation = {
  __typename?: 'Mutation'
  updateAddress: { __typename?: 'Address'; id: number }
}

export type SchedulesForKitchenQueryVariables = Exact<{
  kitchenId: Scalars['String']
}>

export type SchedulesForKitchenQuery = {
  __typename?: 'Query'
  schedulesForKitchen: Array<{
    __typename?: 'Schedule'
    foodItem: { __typename?: 'FoodItem'; kitchenId: number }
  }>
}

export type SchedulesForCustomerRawQueryVariables = Exact<{
  customerId: Scalars['String']
}>

export type SchedulesForCustomerRawQuery = {
  __typename?: 'Query'
  schedulesForCustomerRaw: Array<{
    __typename?: 'SchedulesForKitchenOutput'
    day: string
    items: Array<{
      __typename?: 'DayItems'
      time: string
      foodItems: Array<{
        __typename?: 'PartialFoodItem'
        id: number
        name: string
        kitchenId: number
        kitchenName?: string | null
        quantity: number
      }>
    }>
  }>
}

export type CreateCustomerReviewMutationVariables = Exact<{
  createCustomerReviewInput: CreateCustomerReviewInput
}>

export type CreateCustomerReviewMutation = {
  __typename?: 'Mutation'
  createCustomerReview: { __typename?: 'CustomerReview'; id: number }
}

export const namedOperations = {
  Query: {
    OrdersForKitchen: 'OrdersForKitchen',
    getKitchenLocation: 'getKitchenLocation',
    getKitchen: 'getKitchen',
    getCustomer: 'getCustomer',
    getCook: 'getCook',
    SearchKitchens: 'SearchKitchens',
    ordersForCustomer: 'ordersForCustomer',
    schedulesForCustomer: 'schedulesForCustomer',
    schedulesForKitchen: 'schedulesForKitchen',
    SchedulesForCustomerRaw: 'SchedulesForCustomerRaw',
  },
  Mutation: {
    CreateCook: 'CreateCook',
    CreateCustomer: 'CreateCustomer',
    CreateOrder: 'CreateOrder',
    UpdateOrder: 'UpdateOrder',
    removeSchedule: 'removeSchedule',
    UpdateSchedule: 'UpdateSchedule',
    Login: 'Login',
    updateFoodItem: 'updateFoodItem',
    createFoodItem: 'createFoodItem',
    RemoveFoodItem: 'RemoveFoodItem',
    updateCook: 'updateCook',
    updateKitchen: 'updateKitchen',
    createSchedule: 'createSchedule',
    updateAddress: 'updateAddress',
    createCustomerReview: 'createCustomerReview',
  },
}

export const CreateCookDocument = /*#__PURE__*/ gql`
  mutation CreateCook($createCookInput: CreateCookInput!) {
    createCook(createCookInput: $createCookInput) {
      uid
    }
  }
`
export type CreateCookMutationFn = Apollo.MutationFunction<
  CreateCookMutation,
  CreateCookMutationVariables
>

/**
 * __useCreateCookMutation__
 *
 * To run a mutation, you first call `useCreateCookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCookMutation, { data, loading, error }] = useCreateCookMutation({
 *   variables: {
 *      createCookInput: // value for 'createCookInput'
 *   },
 * });
 */
export function useCreateCookMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCookMutation,
    CreateCookMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateCookMutation, CreateCookMutationVariables>(
    CreateCookDocument,
    options,
  )
}
export type CreateCookMutationHookResult = ReturnType<
  typeof useCreateCookMutation
>
export type CreateCookMutationResult = Apollo.MutationResult<CreateCookMutation>
export type CreateCookMutationOptions = Apollo.BaseMutationOptions<
  CreateCookMutation,
  CreateCookMutationVariables
>
export const CreateCustomerDocument = /*#__PURE__*/ gql`
  mutation CreateCustomer($createCustomerInput: CreateCustomerInput!) {
    createCustomer(createCustomerInput: $createCustomerInput) {
      uid
    }
  }
`
export type CreateCustomerMutationFn = Apollo.MutationFunction<
  CreateCustomerMutation,
  CreateCustomerMutationVariables
>

/**
 * __useCreateCustomerMutation__
 *
 * To run a mutation, you first call `useCreateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerMutation, { data, loading, error }] = useCreateCustomerMutation({
 *   variables: {
 *      createCustomerInput: // value for 'createCustomerInput'
 *   },
 * });
 */
export function useCreateCustomerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCustomerMutation,
    CreateCustomerMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateCustomerMutation,
    CreateCustomerMutationVariables
  >(CreateCustomerDocument, options)
}
export type CreateCustomerMutationHookResult = ReturnType<
  typeof useCreateCustomerMutation
>
export type CreateCustomerMutationResult =
  Apollo.MutationResult<CreateCustomerMutation>
export type CreateCustomerMutationOptions = Apollo.BaseMutationOptions<
  CreateCustomerMutation,
  CreateCustomerMutationVariables
>
export const CreateOrderDocument = /*#__PURE__*/ gql`
  mutation CreateOrder($createOrderInput: CreateOrderInput!) {
    createOrder(createOrderInput: $createOrderInput) {
      id
    }
  }
`
export type CreateOrderMutationFn = Apollo.MutationFunction<
  CreateOrderMutation,
  CreateOrderMutationVariables
>

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      createOrderInput: // value for 'createOrderInput'
 *   },
 * });
 */
export function useCreateOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(
    CreateOrderDocument,
    options,
  )
}
export type CreateOrderMutationHookResult = ReturnType<
  typeof useCreateOrderMutation
>
export type CreateOrderMutationResult =
  Apollo.MutationResult<CreateOrderMutation>
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<
  CreateOrderMutation,
  CreateOrderMutationVariables
>
export const UpdateOrderDocument = /*#__PURE__*/ gql`
  mutation UpdateOrder($updateOrderInput: UpdateOrderInput!) {
    updateOrder(updateOrderInput: $updateOrderInput) {
      id
    }
  }
`
export type UpdateOrderMutationFn = Apollo.MutationFunction<
  UpdateOrderMutation,
  UpdateOrderMutationVariables
>

/**
 * __useUpdateOrderMutation__
 *
 * To run a mutation, you first call `useUpdateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderMutation, { data, loading, error }] = useUpdateOrderMutation({
 *   variables: {
 *      updateOrderInput: // value for 'updateOrderInput'
 *   },
 * });
 */
export function useUpdateOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateOrderMutation,
    UpdateOrderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateOrderMutation, UpdateOrderMutationVariables>(
    UpdateOrderDocument,
    options,
  )
}
export type UpdateOrderMutationHookResult = ReturnType<
  typeof useUpdateOrderMutation
>
export type UpdateOrderMutationResult =
  Apollo.MutationResult<UpdateOrderMutation>
export type UpdateOrderMutationOptions = Apollo.BaseMutationOptions<
  UpdateOrderMutation,
  UpdateOrderMutationVariables
>
export const RemoveScheduleDocument = /*#__PURE__*/ gql`
  mutation removeSchedule($where: ScheduleWhereUniqueInput!) {
    removeSchedule(where: $where) {
      id
    }
  }
`
export type RemoveScheduleMutationFn = Apollo.MutationFunction<
  RemoveScheduleMutation,
  RemoveScheduleMutationVariables
>

/**
 * __useRemoveScheduleMutation__
 *
 * To run a mutation, you first call `useRemoveScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeScheduleMutation, { data, loading, error }] = useRemoveScheduleMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useRemoveScheduleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveScheduleMutation,
    RemoveScheduleMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    RemoveScheduleMutation,
    RemoveScheduleMutationVariables
  >(RemoveScheduleDocument, options)
}
export type RemoveScheduleMutationHookResult = ReturnType<
  typeof useRemoveScheduleMutation
>
export type RemoveScheduleMutationResult =
  Apollo.MutationResult<RemoveScheduleMutation>
export type RemoveScheduleMutationOptions = Apollo.BaseMutationOptions<
  RemoveScheduleMutation,
  RemoveScheduleMutationVariables
>
export const UpdateScheduleDocument = /*#__PURE__*/ gql`
  mutation UpdateSchedule($updateScheduleInput: UpdateScheduleInput!) {
    updateSchedule(updateScheduleInput: $updateScheduleInput) {
      id
    }
  }
`
export type UpdateScheduleMutationFn = Apollo.MutationFunction<
  UpdateScheduleMutation,
  UpdateScheduleMutationVariables
>

/**
 * __useUpdateScheduleMutation__
 *
 * To run a mutation, you first call `useUpdateScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateScheduleMutation, { data, loading, error }] = useUpdateScheduleMutation({
 *   variables: {
 *      updateScheduleInput: // value for 'updateScheduleInput'
 *   },
 * });
 */
export function useUpdateScheduleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateScheduleMutation,
    UpdateScheduleMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateScheduleMutation,
    UpdateScheduleMutationVariables
  >(UpdateScheduleDocument, options)
}
export type UpdateScheduleMutationHookResult = ReturnType<
  typeof useUpdateScheduleMutation
>
export type UpdateScheduleMutationResult =
  Apollo.MutationResult<UpdateScheduleMutation>
export type UpdateScheduleMutationOptions = Apollo.BaseMutationOptions<
  UpdateScheduleMutation,
  UpdateScheduleMutationVariables
>
export const OrdersForKitchenDocument = /*#__PURE__*/ gql`
  query OrdersForKitchen($kitchenId: Int!) {
    ordersForKitchen(kitchenId: $kitchenId) {
      id
      time
      status
      price
      quantity
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
  }
`

/**
 * __useOrdersForKitchenQuery__
 *
 * To run a query within a React component, call `useOrdersForKitchenQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersForKitchenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersForKitchenQuery({
 *   variables: {
 *      kitchenId: // value for 'kitchenId'
 *   },
 * });
 */
export function useOrdersForKitchenQuery(
  baseOptions: Apollo.QueryHookOptions<
    OrdersForKitchenQuery,
    OrdersForKitchenQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<OrdersForKitchenQuery, OrdersForKitchenQueryVariables>(
    OrdersForKitchenDocument,
    options,
  )
}
export function useOrdersForKitchenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OrdersForKitchenQuery,
    OrdersForKitchenQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    OrdersForKitchenQuery,
    OrdersForKitchenQueryVariables
  >(OrdersForKitchenDocument, options)
}
export type OrdersForKitchenQueryHookResult = ReturnType<
  typeof useOrdersForKitchenQuery
>
export type OrdersForKitchenLazyQueryHookResult = ReturnType<
  typeof useOrdersForKitchenLazyQuery
>
export type OrdersForKitchenQueryResult = Apollo.QueryResult<
  OrdersForKitchenQuery,
  OrdersForKitchenQueryVariables
>
export const LoginDocument = /*#__PURE__*/ gql`
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
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const GetKitchenLocationDocument = /*#__PURE__*/ gql`
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

/**
 * __useGetKitchenLocationQuery__
 *
 * To run a query within a React component, call `useGetKitchenLocationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetKitchenLocationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetKitchenLocationQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetKitchenLocationQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetKitchenLocationQuery,
    GetKitchenLocationQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetKitchenLocationQuery,
    GetKitchenLocationQueryVariables
  >(GetKitchenLocationDocument, options)
}
export function useGetKitchenLocationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetKitchenLocationQuery,
    GetKitchenLocationQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetKitchenLocationQuery,
    GetKitchenLocationQueryVariables
  >(GetKitchenLocationDocument, options)
}
export type GetKitchenLocationQueryHookResult = ReturnType<
  typeof useGetKitchenLocationQuery
>
export type GetKitchenLocationLazyQueryHookResult = ReturnType<
  typeof useGetKitchenLocationLazyQuery
>
export type GetKitchenLocationQueryResult = Apollo.QueryResult<
  GetKitchenLocationQuery,
  GetKitchenLocationQueryVariables
>
export const GetKitchenDocument = /*#__PURE__*/ gql`
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

/**
 * __useGetKitchenQuery__
 *
 * To run a query within a React component, call `useGetKitchenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetKitchenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetKitchenQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetKitchenQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetKitchenQuery,
    GetKitchenQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetKitchenQuery, GetKitchenQueryVariables>(
    GetKitchenDocument,
    options,
  )
}
export function useGetKitchenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetKitchenQuery,
    GetKitchenQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetKitchenQuery, GetKitchenQueryVariables>(
    GetKitchenDocument,
    options,
  )
}
export type GetKitchenQueryHookResult = ReturnType<typeof useGetKitchenQuery>
export type GetKitchenLazyQueryHookResult = ReturnType<
  typeof useGetKitchenLazyQuery
>
export type GetKitchenQueryResult = Apollo.QueryResult<
  GetKitchenQuery,
  GetKitchenQueryVariables
>
export const GetCustomerDocument = /*#__PURE__*/ gql`
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

/**
 * __useGetCustomerQuery__
 *
 * To run a query within a React component, call `useGetCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetCustomerQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCustomerQuery,
    GetCustomerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCustomerQuery, GetCustomerQueryVariables>(
    GetCustomerDocument,
    options,
  )
}
export function useGetCustomerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCustomerQuery,
    GetCustomerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCustomerQuery, GetCustomerQueryVariables>(
    GetCustomerDocument,
    options,
  )
}
export type GetCustomerQueryHookResult = ReturnType<typeof useGetCustomerQuery>
export type GetCustomerLazyQueryHookResult = ReturnType<
  typeof useGetCustomerLazyQuery
>
export type GetCustomerQueryResult = Apollo.QueryResult<
  GetCustomerQuery,
  GetCustomerQueryVariables
>
export const GetCookDocument = /*#__PURE__*/ gql`
  query getCook($where: CookWhereUniqueInput!) {
    cook(where: $where) {
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

/**
 * __useGetCookQuery__
 *
 * To run a query within a React component, call `useGetCookQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCookQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetCookQuery(
  baseOptions: Apollo.QueryHookOptions<GetCookQuery, GetCookQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCookQuery, GetCookQueryVariables>(
    GetCookDocument,
    options,
  )
}
export function useGetCookLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCookQuery,
    GetCookQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCookQuery, GetCookQueryVariables>(
    GetCookDocument,
    options,
  )
}
export type GetCookQueryHookResult = ReturnType<typeof useGetCookQuery>
export type GetCookLazyQueryHookResult = ReturnType<typeof useGetCookLazyQuery>
export type GetCookQueryResult = Apollo.QueryResult<
  GetCookQuery,
  GetCookQueryVariables
>
export const UpdateFoodItemDocument = /*#__PURE__*/ gql`
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
export type UpdateFoodItemMutationFn = Apollo.MutationFunction<
  UpdateFoodItemMutation,
  UpdateFoodItemMutationVariables
>

/**
 * __useUpdateFoodItemMutation__
 *
 * To run a mutation, you first call `useUpdateFoodItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFoodItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFoodItemMutation, { data, loading, error }] = useUpdateFoodItemMutation({
 *   variables: {
 *      updateFoodItemInput: // value for 'updateFoodItemInput'
 *   },
 * });
 */
export function useUpdateFoodItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateFoodItemMutation,
    UpdateFoodItemMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateFoodItemMutation,
    UpdateFoodItemMutationVariables
  >(UpdateFoodItemDocument, options)
}
export type UpdateFoodItemMutationHookResult = ReturnType<
  typeof useUpdateFoodItemMutation
>
export type UpdateFoodItemMutationResult =
  Apollo.MutationResult<UpdateFoodItemMutation>
export type UpdateFoodItemMutationOptions = Apollo.BaseMutationOptions<
  UpdateFoodItemMutation,
  UpdateFoodItemMutationVariables
>
export const CreateFoodItemDocument = /*#__PURE__*/ gql`
  mutation createFoodItem($createFoodItemInput: CreateFoodItemInput!) {
    createFoodItem(createFoodItemInput: $createFoodItemInput) {
      id
    }
  }
`
export type CreateFoodItemMutationFn = Apollo.MutationFunction<
  CreateFoodItemMutation,
  CreateFoodItemMutationVariables
>

/**
 * __useCreateFoodItemMutation__
 *
 * To run a mutation, you first call `useCreateFoodItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFoodItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFoodItemMutation, { data, loading, error }] = useCreateFoodItemMutation({
 *   variables: {
 *      createFoodItemInput: // value for 'createFoodItemInput'
 *   },
 * });
 */
export function useCreateFoodItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateFoodItemMutation,
    CreateFoodItemMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateFoodItemMutation,
    CreateFoodItemMutationVariables
  >(CreateFoodItemDocument, options)
}
export type CreateFoodItemMutationHookResult = ReturnType<
  typeof useCreateFoodItemMutation
>
export type CreateFoodItemMutationResult =
  Apollo.MutationResult<CreateFoodItemMutation>
export type CreateFoodItemMutationOptions = Apollo.BaseMutationOptions<
  CreateFoodItemMutation,
  CreateFoodItemMutationVariables
>
export const RemoveFoodItemDocument = /*#__PURE__*/ gql`
  mutation RemoveFoodItem($where: FoodItemWhereUniqueInput!) {
    removeFoodItem(where: $where) {
      id
    }
  }
`
export type RemoveFoodItemMutationFn = Apollo.MutationFunction<
  RemoveFoodItemMutation,
  RemoveFoodItemMutationVariables
>

/**
 * __useRemoveFoodItemMutation__
 *
 * To run a mutation, you first call `useRemoveFoodItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFoodItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFoodItemMutation, { data, loading, error }] = useRemoveFoodItemMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useRemoveFoodItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveFoodItemMutation,
    RemoveFoodItemMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    RemoveFoodItemMutation,
    RemoveFoodItemMutationVariables
  >(RemoveFoodItemDocument, options)
}
export type RemoveFoodItemMutationHookResult = ReturnType<
  typeof useRemoveFoodItemMutation
>
export type RemoveFoodItemMutationResult =
  Apollo.MutationResult<RemoveFoodItemMutation>
export type RemoveFoodItemMutationOptions = Apollo.BaseMutationOptions<
  RemoveFoodItemMutation,
  RemoveFoodItemMutationVariables
>
export const UpdateCookDocument = /*#__PURE__*/ gql`
  mutation updateCook($updateCookInput: UpdateCookInput!) {
    updateCook(updateCookInput: $updateCookInput) {
      uid
    }
  }
`
export type UpdateCookMutationFn = Apollo.MutationFunction<
  UpdateCookMutation,
  UpdateCookMutationVariables
>

/**
 * __useUpdateCookMutation__
 *
 * To run a mutation, you first call `useUpdateCookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCookMutation, { data, loading, error }] = useUpdateCookMutation({
 *   variables: {
 *      updateCookInput: // value for 'updateCookInput'
 *   },
 * });
 */
export function useUpdateCookMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCookMutation,
    UpdateCookMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateCookMutation, UpdateCookMutationVariables>(
    UpdateCookDocument,
    options,
  )
}
export type UpdateCookMutationHookResult = ReturnType<
  typeof useUpdateCookMutation
>
export type UpdateCookMutationResult = Apollo.MutationResult<UpdateCookMutation>
export type UpdateCookMutationOptions = Apollo.BaseMutationOptions<
  UpdateCookMutation,
  UpdateCookMutationVariables
>
export const UpdateKitchenDocument = /*#__PURE__*/ gql`
  mutation updateKitchen($updateKitchenInput: UpdateKitchenInput!) {
    updateKitchen(updateKitchenInput: $updateKitchenInput) {
      id
    }
  }
`
export type UpdateKitchenMutationFn = Apollo.MutationFunction<
  UpdateKitchenMutation,
  UpdateKitchenMutationVariables
>

/**
 * __useUpdateKitchenMutation__
 *
 * To run a mutation, you first call `useUpdateKitchenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateKitchenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateKitchenMutation, { data, loading, error }] = useUpdateKitchenMutation({
 *   variables: {
 *      updateKitchenInput: // value for 'updateKitchenInput'
 *   },
 * });
 */
export function useUpdateKitchenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateKitchenMutation,
    UpdateKitchenMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateKitchenMutation,
    UpdateKitchenMutationVariables
  >(UpdateKitchenDocument, options)
}
export type UpdateKitchenMutationHookResult = ReturnType<
  typeof useUpdateKitchenMutation
>
export type UpdateKitchenMutationResult =
  Apollo.MutationResult<UpdateKitchenMutation>
export type UpdateKitchenMutationOptions = Apollo.BaseMutationOptions<
  UpdateKitchenMutation,
  UpdateKitchenMutationVariables
>
export const SearchKitchensDocument = /*#__PURE__*/ gql`
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

/**
 * __useSearchKitchensQuery__
 *
 * To run a query within a React component, call `useSearchKitchensQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchKitchensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchKitchensQuery({
 *   variables: {
 *      locationFilter: // value for 'locationFilter'
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *   },
 * });
 */
export function useSearchKitchensQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchKitchensQuery,
    SearchKitchensQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SearchKitchensQuery, SearchKitchensQueryVariables>(
    SearchKitchensDocument,
    options,
  )
}
export function useSearchKitchensLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchKitchensQuery,
    SearchKitchensQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SearchKitchensQuery, SearchKitchensQueryVariables>(
    SearchKitchensDocument,
    options,
  )
}
export type SearchKitchensQueryHookResult = ReturnType<
  typeof useSearchKitchensQuery
>
export type SearchKitchensLazyQueryHookResult = ReturnType<
  typeof useSearchKitchensLazyQuery
>
export type SearchKitchensQueryResult = Apollo.QueryResult<
  SearchKitchensQuery,
  SearchKitchensQueryVariables
>
export const CreateScheduleDocument = /*#__PURE__*/ gql`
  mutation createSchedule($createScheduleInput: CreateScheduleInput!) {
    createSchedule(createScheduleInput: $createScheduleInput) {
      id
    }
  }
`
export type CreateScheduleMutationFn = Apollo.MutationFunction<
  CreateScheduleMutation,
  CreateScheduleMutationVariables
>

/**
 * __useCreateScheduleMutation__
 *
 * To run a mutation, you first call `useCreateScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createScheduleMutation, { data, loading, error }] = useCreateScheduleMutation({
 *   variables: {
 *      createScheduleInput: // value for 'createScheduleInput'
 *   },
 * });
 */
export function useCreateScheduleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateScheduleMutation,
    CreateScheduleMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateScheduleMutation,
    CreateScheduleMutationVariables
  >(CreateScheduleDocument, options)
}
export type CreateScheduleMutationHookResult = ReturnType<
  typeof useCreateScheduleMutation
>
export type CreateScheduleMutationResult =
  Apollo.MutationResult<CreateScheduleMutation>
export type CreateScheduleMutationOptions = Apollo.BaseMutationOptions<
  CreateScheduleMutation,
  CreateScheduleMutationVariables
>
export const OrdersForCustomerDocument = /*#__PURE__*/ gql`
  query ordersForCustomer($customerId: String!, $where: OrderWhereInput) {
    ordersForCustomer(customerId: $customerId, where: $where) {
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
  }
`

/**
 * __useOrdersForCustomerQuery__
 *
 * To run a query within a React component, call `useOrdersForCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersForCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersForCustomerQuery({
 *   variables: {
 *      customerId: // value for 'customerId'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useOrdersForCustomerQuery(
  baseOptions: Apollo.QueryHookOptions<
    OrdersForCustomerQuery,
    OrdersForCustomerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    OrdersForCustomerQuery,
    OrdersForCustomerQueryVariables
  >(OrdersForCustomerDocument, options)
}
export function useOrdersForCustomerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OrdersForCustomerQuery,
    OrdersForCustomerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    OrdersForCustomerQuery,
    OrdersForCustomerQueryVariables
  >(OrdersForCustomerDocument, options)
}
export type OrdersForCustomerQueryHookResult = ReturnType<
  typeof useOrdersForCustomerQuery
>
export type OrdersForCustomerLazyQueryHookResult = ReturnType<
  typeof useOrdersForCustomerLazyQuery
>
export type OrdersForCustomerQueryResult = Apollo.QueryResult<
  OrdersForCustomerQuery,
  OrdersForCustomerQueryVariables
>
export const SchedulesForCustomerDocument = /*#__PURE__*/ gql`
  query schedulesForCustomer($customerId: String!, $where: ScheduleWhereInput) {
    schedulesForCustomer(customerId: $customerId, where: $where) {
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
  }
`

/**
 * __useSchedulesForCustomerQuery__
 *
 * To run a query within a React component, call `useSchedulesForCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchedulesForCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchedulesForCustomerQuery({
 *   variables: {
 *      customerId: // value for 'customerId'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSchedulesForCustomerQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchedulesForCustomerQuery,
    SchedulesForCustomerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    SchedulesForCustomerQuery,
    SchedulesForCustomerQueryVariables
  >(SchedulesForCustomerDocument, options)
}
export function useSchedulesForCustomerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchedulesForCustomerQuery,
    SchedulesForCustomerQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    SchedulesForCustomerQuery,
    SchedulesForCustomerQueryVariables
  >(SchedulesForCustomerDocument, options)
}
export type SchedulesForCustomerQueryHookResult = ReturnType<
  typeof useSchedulesForCustomerQuery
>
export type SchedulesForCustomerLazyQueryHookResult = ReturnType<
  typeof useSchedulesForCustomerLazyQuery
>
export type SchedulesForCustomerQueryResult = Apollo.QueryResult<
  SchedulesForCustomerQuery,
  SchedulesForCustomerQueryVariables
>
export const UpdateAddressDocument = /*#__PURE__*/ gql`
  mutation updateAddress($updateAddressInput: UpdateAddressInput!) {
    updateAddress(updateAddressInput: $updateAddressInput) {
      id
    }
  }
`
export type UpdateAddressMutationFn = Apollo.MutationFunction<
  UpdateAddressMutation,
  UpdateAddressMutationVariables
>

/**
 * __useUpdateAddressMutation__
 *
 * To run a mutation, you first call `useUpdateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAddressMutation, { data, loading, error }] = useUpdateAddressMutation({
 *   variables: {
 *      updateAddressInput: // value for 'updateAddressInput'
 *   },
 * });
 */
export function useUpdateAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAddressMutation,
    UpdateAddressMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateAddressMutation,
    UpdateAddressMutationVariables
  >(UpdateAddressDocument, options)
}
export type UpdateAddressMutationHookResult = ReturnType<
  typeof useUpdateAddressMutation
>
export type UpdateAddressMutationResult =
  Apollo.MutationResult<UpdateAddressMutation>
export type UpdateAddressMutationOptions = Apollo.BaseMutationOptions<
  UpdateAddressMutation,
  UpdateAddressMutationVariables
>
export const SchedulesForKitchenDocument = /*#__PURE__*/ gql`
  query schedulesForKitchen($kitchenId: String!) {
    schedulesForKitchen(kitchenId: $kitchenId) {
      foodItem {
        kitchenId
      }
    }
  }
`

/**
 * __useSchedulesForKitchenQuery__
 *
 * To run a query within a React component, call `useSchedulesForKitchenQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchedulesForKitchenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchedulesForKitchenQuery({
 *   variables: {
 *      kitchenId: // value for 'kitchenId'
 *   },
 * });
 */
export function useSchedulesForKitchenQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchedulesForKitchenQuery,
    SchedulesForKitchenQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    SchedulesForKitchenQuery,
    SchedulesForKitchenQueryVariables
  >(SchedulesForKitchenDocument, options)
}
export function useSchedulesForKitchenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchedulesForKitchenQuery,
    SchedulesForKitchenQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    SchedulesForKitchenQuery,
    SchedulesForKitchenQueryVariables
  >(SchedulesForKitchenDocument, options)
}
export type SchedulesForKitchenQueryHookResult = ReturnType<
  typeof useSchedulesForKitchenQuery
>
export type SchedulesForKitchenLazyQueryHookResult = ReturnType<
  typeof useSchedulesForKitchenLazyQuery
>
export type SchedulesForKitchenQueryResult = Apollo.QueryResult<
  SchedulesForKitchenQuery,
  SchedulesForKitchenQueryVariables
>
export const SchedulesForCustomerRawDocument = /*#__PURE__*/ gql`
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

/**
 * __useSchedulesForCustomerRawQuery__
 *
 * To run a query within a React component, call `useSchedulesForCustomerRawQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchedulesForCustomerRawQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchedulesForCustomerRawQuery({
 *   variables: {
 *      customerId: // value for 'customerId'
 *   },
 * });
 */
export function useSchedulesForCustomerRawQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchedulesForCustomerRawQuery,
    SchedulesForCustomerRawQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    SchedulesForCustomerRawQuery,
    SchedulesForCustomerRawQueryVariables
  >(SchedulesForCustomerRawDocument, options)
}
export function useSchedulesForCustomerRawLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchedulesForCustomerRawQuery,
    SchedulesForCustomerRawQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    SchedulesForCustomerRawQuery,
    SchedulesForCustomerRawQueryVariables
  >(SchedulesForCustomerRawDocument, options)
}
export type SchedulesForCustomerRawQueryHookResult = ReturnType<
  typeof useSchedulesForCustomerRawQuery
>
export type SchedulesForCustomerRawLazyQueryHookResult = ReturnType<
  typeof useSchedulesForCustomerRawLazyQuery
>
export type SchedulesForCustomerRawQueryResult = Apollo.QueryResult<
  SchedulesForCustomerRawQuery,
  SchedulesForCustomerRawQueryVariables
>
export const CreateCustomerReviewDocument = /*#__PURE__*/ gql`
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
export type CreateCustomerReviewMutationFn = Apollo.MutationFunction<
  CreateCustomerReviewMutation,
  CreateCustomerReviewMutationVariables
>

/**
 * __useCreateCustomerReviewMutation__
 *
 * To run a mutation, you first call `useCreateCustomerReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerReviewMutation, { data, loading, error }] = useCreateCustomerReviewMutation({
 *   variables: {
 *      createCustomerReviewInput: // value for 'createCustomerReviewInput'
 *   },
 * });
 */
export function useCreateCustomerReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCustomerReviewMutation,
    CreateCustomerReviewMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateCustomerReviewMutation,
    CreateCustomerReviewMutationVariables
  >(CreateCustomerReviewDocument, options)
}
export type CreateCustomerReviewMutationHookResult = ReturnType<
  typeof useCreateCustomerReviewMutation
>
export type CreateCustomerReviewMutationResult =
  Apollo.MutationResult<CreateCustomerReviewMutation>
export type CreateCustomerReviewMutationOptions = Apollo.BaseMutationOptions<
  CreateCustomerReviewMutation,
  CreateCustomerReviewMutationVariables
>
