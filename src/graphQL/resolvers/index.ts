import { UserInputError } from "apollo-server-core"
import { Request, Response } from 'express';

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

    appartments(parent: any, args: any, { appartmentService, res }: { appartmentService: any, res: any}, info: any) {
      return appartmentService.getAll()
    },
    appartment(parent: any, { appartmentId }: { appartmentId: String }, { appartmentService }: { appartmentService: any }, info: any) {
      if(!appartmentId) throw new UserInputError('AppartmentID is invalid')
      return appartmentService.findOne({ id: appartmentId })
    },

    appartmentDetails(parent: any, args: any, { appartmentDetailService, res }: { appartmentDetailService: any, res: any}, info: any) {
      return appartmentDetailService.getAll()
    },
    appartmentDetail(parent: any, { appartmentDetailId }: { appartmentDetailId: String }, { appartmentDetailService }: { appartmentDetailService: any }, info: any) {
      if(!appartmentDetailId) throw new UserInputError('AppatmentDetailID is invalid')
      return appartmentDetailService.findOne({ id: appartmentDetailId })
    },

    appartmentTypes(parent: any, args: any, { appartmentTypeService, res }: { appartmentTypeService: any, res: any}, info: any) {
      return appartmentTypeService.getAll()
    },
    appartmentType(parent: any, { appartmentTypeId }: { appartmentTypeId: String }, { appartmentTypeService }: { appartmentTypeService: any }, info: any) {
      if(!appartmentTypeId) throw new UserInputError('AppatmentTypeID is invalid')
      return appartmentTypeService.findOne({ id: appartmentTypeId })
    },

    publications(parent: any, args: any, { publicationService, res }: { publicationService: any, res: any}, info: any) {
      return publicationService.getAll()
    },
    publication(parent: any, { publicationId }: { publicationId: String }, { publicationService }: { publicationService: any }, info: any) {
      if(!publicationId) throw new UserInputError('PublicationID is invalid')
      return publicationService.findOne({ id: publicationId })
    },

    reservations(parent: any, args: any, { reservationService, res }: { reservationService: any, res: any}, info: any) {
      return reservationService.getAll()
    },
    reservation(parent: any, { reservationId }: { reservationId: String }, { reservationService }: { reservationService: any }, info: any) {
      if(!reservationId) throw new UserInputError('ReservationID is invalid')
      return reservationService.findOne({ id: reservationId })
    },

    visits(parent: any, args: any, { visitService, res }: { visitService: any, res: any}, info: any) {
      return visitService.getAll()
    },
    visit(parent: any, { visitId }: { visitId: String }, { visitService }: { visitService: any }, info: any) {
      if(!visitId) throw new UserInputError('VisitID is invalid')
      return visitService.findOne({ id: visitId })
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

    createAppartmentType(parent: any, { data }: { data: any}, { appartmentTypeService }: { appartmentTypeService: any }, info: any) {
      if(!data) throw new UserInputError('Invalid appartment type data')
      console.log('AppartmentType Data :: => ', data)
      return appartmentTypeService.create(data)
    },
    updateAppartmentType(parent: any, { data, appartmentTypeId }: { data: any, appartmentTypeId: string }, { appartmentTypeService }: { appartmentTypeService: any }, info: any) {
      if(!data || !appartmentTypeId) throw new UserInputError('Invalid appartment type data')
      return appartmentTypeService.update({ id: appartmentTypeId, data})
    },
    deleteAppartmentType(parent: any, { data, appartmentTypeId }: { data: any, appartmentTypeId: string }, { appartmentTypeService }: { appartmentTypeService: any }, info: any) {
      if(!data || !appartmentTypeId) throw new UserInputError('Invalid appartment type data')
      return appartmentTypeService.delete({ id: appartmentTypeId})
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

    createPublication(parent: any, { data }: { data: any}, { publicationService, res }: { publicationService: any, res: Response }, info: any) {
      if(!data) throw new UserInputError('Invalid publication data')
      const { authUser } = res.locals
      return publicationService.create({ ...data, createdBy: authUser.id, publisher: authUser.id })
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
