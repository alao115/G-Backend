import { gql } from 'apollo-server-core'

const schema = gql`
  type Query {
    hello: String

    users: [User]!
    accounts: [Account!]!
    account(accountId: String): Account
    appartments: [Appartment!]!
    appartment(appartmentId: String): Appartment
    appartmentTypes: [AppartmentType!]!
    appartmentType(appartmentTypeId: String): AppartmentType
    appartmentDetails: [AppartmentDetail!]!
    appartmentDetail(appartmentDetailId: String): AppartmentDetail
    publications: [Publication!]!
    publication(publicationId: String): Publication
    reservations: [Reservation!]!
    reservation(reservationId: String): Reservation
    visits: [Visit!]!
    visit(visitId: String): Visit

    authUser: User!
  }

  type Mutation {
    createAccount(data: accountData): Account!
    updateAccount(accountId: ID!, data: accountData): Account
    deleteAccount(accountId: ID!, data: accountData): Account

    createAppartment(data: appartmentData): Appartment!
    updateAppartment(appartmentId: ID!, data: appartmentData): Appartment
    deleteAppartment(appartmentId: ID!): Appartment

    createAppartmentDetail(data: appartmentDetailData): AppartmentDetail
    updateAppartmentDetail(appartmentDetailId: ID!, data: appartmentDetailData): AppartmentDetail
    deleteAppartmentDetail(appartmentDetailId: ID!, data: appartmentDetailData): AppartmentDetail

    createAppartmentType(data: appartmentTypeData): AppartmentType
    updateAppartmentType(appartmentTypeId: ID!, data: appartmentTypeData): AppartmentType
    deleteAppartmentType(appartmentTypeId: ID!, data: appartmentTypeData): AppartmentType

    createPublication(data: publicationData): Publication!
    updatePublication(publicationId: ID!, data: publicationData): Publication
    deletePublication(publicationId: ID!, data: publicationData): Publication

    createReservation(data: reservationData): Reservation!
    updateReservation(reservationId: ID!, data: reservationData): Reservation
    deleteReservation(reservationId: ID!, data: reservationData): Reservation

    createVisit(data: visitData): Visit!
    updateVisit(visitId: ID!, data: visitData): Visit
    deleteVisit(visitId: ID!, data: visitData): Visit
  }

  type User {
    id: ID!
    email: String
    password: String
  }

  type Account {
    id: ID!
    user: String
    userType: Int
    status: String
    createdAt: String
    firstname: String
    lastname: String
    civility: String
    phone: String
    email: String
    updatedAt: String
  }

  input accountData {
    user: String
    userType: Int
    status: String
    createdAt: String
    firstname: String
    lastname: String
    civility: String
    phone: String
    email: String
    updatedAt: String
  }

  enum UserType {
    ADMIN,
    PUBLISHER,
    SIMPLE,
    OWNER
  }

  type AppartmentType {
    id: String
    label: String
    description: String
  }

  input appartmentTypeData {
    label: String
    description: String
  }

  type appartmentCondition {
    advancePayment: Int
    energyCommission: Int
    prepaidRentMonths: Int
    rent: Int
    paymentFrequency: Int
  }
  type ownerInfos {
    civility: String
    firstname: String
    lastname: String
    address: String
    isAlive: Boolean
    phone: String
    email: String
  }
  type visitorInfos {
    firstname: String
    lastname: String
    phone: String
    email: String
  }

  type Appartment {
    id: ID!
    mainImg: String
    firstImg: String
    secondImg: String
    thirdImg: String
    fourthImg: String
    appartmentType: String
    isFurnished: Boolean
    location: String
    rent: Int
    details: String
    rooms: Int
    bathrooms: Int
    bedrooms: Int
    livingrooms: Int
    storageroom: Int
    kitchen: Int
    garage: Int
    keeper: Boolean
    terrace: Int
    garden: Int
    ac: Boolean
    pool: Boolean
    householdsTotal: Int
    groundLevel: Int
    conditions: appartmentCondition,
    ownerInfos: ownerInfos
    likes: Int
    favorite: Int
  }

  input appartmentConditionData {
    advancePayment: Int
    energyCommission: Int
    prepaidRentMonths: Int
    rent: Int
    paymentFrequency: Int
  }
  input ownerInfosData {
    civility: String
    firstname: String
    lastname: String
    address: String
    isAlive: Boolean
    phone: String
    email: String
  }
  input visitorInfosData {
    firstname: String
    lastname: String
    phone: String
    email: String
  }
  input appartmentData {
    mainImg: String
    firstImg: String
    secondImg: String
    thirdImg: String
    fourthImg: String
    appartmentType: String
    isFurnished: Boolean
    location: String
    rent: Int
    details: String
    rooms: Int
    bathrooms: Int
    bedrooms: Int
    livingrooms: Int
    storageroom: Int
    kitchen: Int
    garage: Int
    keeper: Boolean
    terrace: Int
    garden: Int
    ac: Boolean
    pool: Boolean
    householdsTotal: Int
    groundLevel: Int
    conditions: appartmentConditionData,
    ownerInfos: ownerInfosData
    likes: Int
    favorite: Int
  }

  type AppartmentDetail {
    id: ID!
    appartment: String
    createdBy: String
    createdAt: String
    groundLevel: String
    isFurnished: Boolean
    hasFloors: Boolean
    numberOfFloors: Int
    hasBedroom: Boolean
    numberOfBedrooms: Int
    hasLivingroom: Boolean
    numberOfLivingrooms: Int
    hasKitchen: Boolean
    numberOfKitchen: Int
    hasBathrooms: Boolean
    numberOfBathrooms: Int
    hasStorageroom: Boolean
    numberOfStoragerooms: Int
    hasGarage: Boolean
    numberOfGarage:Int
    hasGarden: Boolean
    numberOfGarden: Int
    hasAC: Boolean
    numberOfACs: Int
    hasPool: Boolean
    numberOfPools: Int
    hasKeeper: Boolean
    totalOfHouseholds: Int
  }

  input appartmentDetailData {
    appartment: String
    createdBy: String
    createdAt: String
    groundLevel: String
    isFurnished: Boolean
    hasFloors: Boolean
    numberOfFloors: Int
    hasBedroom: Boolean
    numberOfBedrooms: Int
    hasLivingroom: Boolean
    numberOfLivingrooms: Int
    hasKitchen: Boolean
    numberOfKitchen: Int
    hasBathrooms: Boolean
    numberOfBathrooms: Int
    hasStorageroom: Boolean
    numberOfStoragerooms: Int
    hasGarage: Boolean
    numberOfGarage:Int
    hasGarden: Boolean
    numberOfGarden: Int
    hasAC: Boolean
    numberOfACs: Int
    hasPool: Boolean
    numberOfPools: Int
    hasKeeper: Boolean
    totalOfHouseholds: Int
  }

  type Publication {
    id: ID!
    appartment: Appartment
    publisher: Account
    createdBy: String
    createdAt: String
    date: String
    status: String
    isNew: Boolean
    views: Int
  }

  input publicationData {
    appartment: String
    publisher: String
    date: String
    status: String
    isNew: Boolean
    views: Int
  }

  type Reservation {
    id: ID!
    appartment: String
    user: String
    createdBy: String
    createdAt: String
    status: String
    date: String
  }

  input reservationData {
    appartment: String
    user: String
    createdBy: String
    createdAt: String
    status: String
    date: String
  }

  type Visit {
    id: ID!
    appartment: String
    visitorInfos: visitorInfos
    date: String
    status: String
  }

  input visitData {
    appartment: String
    visitorInfos: visitorInfosData
    date: String
    status: String
  }
`

export { schema as default }
