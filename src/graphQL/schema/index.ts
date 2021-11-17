import { gql } from 'apollo-server-core'

const schema = gql`
  type Query {
    hello: String
    users: [User]!
    accounts: [Account!]!
    account(accountId: String): Account
    appartments: [Appartment!]!
    appartment(appartmentId: String): Appartment
    appartementDetails: [AppartmentDetail!]!
    appartementDetail(appartmentDetailId: String): AppartmentDetail
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
    updateAccount(accountId: ID!, data: accountData): Account!
    deleteAccount(accountId: ID!, data: accountData): Account!

    createAppartment(data: appartmentData): Appartment!
    updateAppartment(appartmentId: ID!, data: appartmentData): Appartment!
    deleteAppartment(appartmentId: ID!, data: appartmentData): Appartment!

    createAppartmentDetail(data: appartmentDetailData): AppartmentDetail
    updateAppartmentDetail(appartmentDetailId: ID!, data: appartmentDetailData): AppartmentDetail
    deleteAppartmentDetail(appartmentDetailId: ID!, data: appartmentDetailData): AppartmentDetail

    createPublication(data: publicationData): Publication!
    updatePublication(publicationId: ID!, data: publicationData): Publication!
    deletePublication(publicationId: ID!, data: publicationData): Publication!

    createReservation(data: reservationData): Reservation!
    updateReservation(reservationId: ID!, data: reservationData): Reservation!
    deleteReservation(reservationId: ID!, data: reservationData): Reservation!

    createVisit(data: visitData): Visit!
    updateVisit(visitId: ID!, data: visitData): Visit!
    deleteVisit(visitId: ID!, data: visitData): Visit!
  }

  type User {
    id: ID!
    email: String
    password: String
  }

  type Account {
    id: ID!
    user: User
    userType: UserType
    status: String
    createdAt: String
    firstname: String
    lastname: String
    civility: String
    phone: String
    email: String
    adminType: String
    updatedAt: String
  }

  input accountData {
    user: String
    userType: UserType
    status: String
    createdAt: String
    firstname: String
    lastname: String
    civility: String
    phone: String
    email: String
    adminType: String
    updatedAt: String
  }

  enum UserType {
    ADMIN,
    PUBLISHER,
    SIMPLE,
    OWNER
  }

  type Appartment {
    id: ID!
    owner: String
    tenant: String
    createdBy: String
    createdAt: String
    location: String
    rent: Float
    status: String
    advancePayment: Float
    energyCommision: Float
    numberOffPrepaidMonths: Float
  }

  input appartmentData {
    owner: String
    tenant: String
    createdBy: String
    createdAt: String
    location: String
    rent: Float
    status: String
    advancePayment: Float
    energyCommision: Float
    numberOffPrepaidMonths: Float
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
    id: String
    appartment: String
    publisher: String
    createdBy: String
    createdAt: String
    date: String
    status: String
  }

  input publicationData {
    id: String
    appartment: String
    publisher: String
    createdBy: String
    createdAt: String
    date: String
    status: String
  }

  type Reservation {
    id: ID!
    appartment: String
    reservedBy: String
    createdBy: String
    createdAt: String
    status: String
    date: String
  }

  input reservationData {
    id: ID!
    appartment: String
    reservedBy: String
    createdBy: String
    createdAt: String
    status: String
    date: String
  }

  type Visit {
    id: ID!
    appartment: String
    visitBy: String
    date: String
  }

  input visitData {
    id: ID!
    appartment: String
    visitBy: String
    date: String
  }
`

export { schema as default }
