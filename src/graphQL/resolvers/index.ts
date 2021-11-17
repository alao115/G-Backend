import { UserInputError } from "apollo-server-core"

export default {
  Query: {
    hello(parent: any, args: any, context: any, info: any) {
      return 'Hello world'
    },
    users(parent: any, args: any, { userService, res }: { userService: any, res: any}, info: any) {
      return userService.getAll()
    },
    accounts(parent: any, args: any, { accountService, res }: { accountService: any, res: any}, info: any) {
      return accountService.getAll()
    },
    account(parent: any, { accountId }: { accountId: String }, { accountService }: { accountService: any }, info: any) {
      if(!accountId) throw new UserInputError('AccountID is invalid')
      return accountService.findOne({ id: accountId })
    },
    authUser(parent: any, args: any, { userService, res }: { userService: any, res: any}, info: any) {
      return res.locals.authUser
    }
  },
  Mutation: {
    createAccount(parent: any, { data }: { data: any}, { accountService }: { accountService: any }, info: any) {
      if(!data) throw new UserInputError('Invalid account data')
      return accountService.create(data)
    },
    updateAccount(parent: any, { data, accountId }: { data: any, accountId: string }, { accountService }: { accountService: any }, info: any) {
      if(!data || !accountId) throw new UserInputError('Invalid account data')
      return accountService.update({ id: accountId, data})
    },
    deleteAccount(parent: any, { data, accountId }: { data: any, accountId: string }, { accountService }: { accountService: any }, info: any) {
      if(!data || !accountId) throw new UserInputError('Invalid account data')
      return accountService.delete({ id: accountId})
    },

    createAppartment(parent: any, { data }: { data: any}, { appartmentService }: { appartmentService: any }, info: any) {
      if(!data) throw new UserInputError('Invalid appartment data')
      return appartmentService.create(data)
    },
    updateAppartment(parent: any, { data, appartmentId }: { data: any, appartmentId: string }, { appartmentService }: { appartmentService: any }, info: any) {
      if(!data || !appartmentId) throw new UserInputError('Invalid appartment data')
      return appartmentService.update({ id: appartmentId, data})
    },
    deleteAppartment(parent: any, { data, appartmentId }: { data: any, appartmentId: string }, { appartmentService }: { appartmentService: any }, info: any) {
      if(!data || !appartmentId) throw new UserInputError('Invalid appartment data')
      return appartmentService.delete({ id: appartmentId})
    },

    createAppartmentDetail(parent: any, { data }: { data: any}, { appartmentDetailService }: { appartmentDetailService: any }, info: any) {
      if(!data) throw new UserInputError('Invalid appartment detail data')
      return appartmentDetailService.create(data)
    },
    updateAppartmentDetail(parent: any, { data, appartmentDetailId }: { data: any, appartmentDetailId: string }, { appartmentDetailService }: { appartmentDetailService: any }, info: any) {
      if(!data || !appartmentDetailId) throw new UserInputError('Invalid appartment detail data')
      return appartmentDetailService.update({ id: appartmentDetailId, data})
    },
    deleteAppartmentDetail(parent: any, { data, appartmentDetailId }: { data: any, appartmentDetailId: string }, { appartmentDetailService }: { appartmentDetailService: any }, info: any) {
      if(!data || !appartmentDetailId) throw new UserInputError('Invalid appartment detail data')
      return appartmentDetailService.delete({ id: appartmentDetailId})
    },

    createReservation(parent: any, { data }: { data: any}, { reservationService }: { reservationService: any }, info: any) {
      if(!data) throw new UserInputError('Invalid reservation data')
      return reservationService.create(data)
    },
    updateReservation(parent: any, { data, reservationId }: { data: any, reservationId: string }, { reservationService }: { reservationService: any }, info: any) {
      if(!data ||  reservationId) throw new UserInputError('Invalid reservation data')
      return reservationService.update({ id: reservationId, data})
    },
    deleteReservation(parent: any, { data, reservationId }: { data: any, reservationId: string }, { reservationService }: { reservationService: any }, info: any) {
      if(!data ||  reservationId) throw new UserInputError('Invalid reservation data')
      return reservationService.delete({ id: reservationId})
    },

    createPublication(parent: any, { data }: { data: any}, { publicationService }: { publicationService: any }, info: any) {
      if(!data) throw new UserInputError('Invalid publication data')
      return publicationService.create(data)
    },
    updatePublication(parent: any, { data, publicationId }: { data: any, publicationId: string }, { publicationService }: { publicationService: any }, info: any) {
      if(!data || !publicationId) throw new UserInputError('Invalid publication data')
      return publicationService.update({ id: publicationId, data})
    },
    deletePublication(parent: any, { data, publicationId }: { data: any, publicationId: string }, { publicationService }: { publicationService: any }, info: any) {
      if(!data || !publicationId) throw new UserInputError('Invalid publication data')
      return publicationService.delete({ id: publicationId})
    },

    createVisit(parent: any, { data }: { data: any}, { visitService }: { visitService: any }, info: any) {
      if(!data) throw new UserInputError('Invalid visit data')
      return visitService.create(data)
    },
    updateVisit(parent: any, { data, visitId }: { data: any, visitId: string }, { visitService }: { visitService: any }, info: any) {
      if(!data || !visitId) throw new UserInputError('Invalid visit data')
      return visitService.update({ id: visitId, data})
    },
    deleteVisit(parent: any, { data, visitId }: { data: any, visitId: string }, { visitService }: { visitService: any }, info: any) {
      if(!data || !visitId) throw new UserInputError('Invalid visit data')
      return visitService.delete({ id: visitId})
    },
  }
}
