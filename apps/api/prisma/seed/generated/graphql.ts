/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
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
  lat: Scalars['Float']
  lng: Scalars['Float']
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
  lat: Scalars['Float']
  lng: Scalars['Float']
  zipCode: Scalars['String']
}

export type CreateCookInput = {
  kitchen: CreateKitchenInputWithoutCookId
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

export type CreateFoodItemInputWithoutKitchenId = {
  days: Array<Day>
  deliveryAvailable: Scalars['Boolean']
  description: Scalars['String']
  image: Scalars['String']
  live: Scalars['Boolean']
  maxQuantity: Scalars['Int']
  name: Scalars['String']
  price: Scalars['Int']
  time: Scalars['DateTime']
  vegan: Scalars['Boolean']
}

export type CreateKitchenInput = {
  about: Scalars['String']
  address: CreateAddressInput
  cookId: Scalars['String']
  foodItems: Array<CreateFoodItemInputWithoutKitchenId>
  image: Scalars['String']
  name: Scalars['String']
  open: Scalars['Boolean']
}

export type CreateKitchenInputWithoutCookId = {
  about: Scalars['String']
  address: CreateAddressInput
  foodItems: Array<CreateFoodItemInputWithoutKitchenId>
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
  scheduleCount?: Maybe<AggregateCountOutput>
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
  cook?: Maybe<Cook>
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
  lat?: InputMaybe<Scalars['Float']>
  lng?: InputMaybe<Scalars['Float']>
  zipCode?: InputMaybe<Scalars['String']>
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

export const CreateCookDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateCook' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'createCookInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateCookInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCook' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createCookInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'createCookInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateCookMutation, CreateCookMutationVariables>
