import { UserInputError } from "apollo-server-core"
import { Request, Response } from 'express';
import Reservation from '../../types/reservations';
import moment from 'moment'

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

    async visits(parent: any, args: any, { visitService, res }: { visitService: any, res: any}, info: any) {
      return await visitService.getAll()
    },
    visit(parent: any, { visitId }: { visitId: String }, { visitService }: { visitService: any }, info: any) {
      if(!visitId) throw new UserInputError('VisitID is invalid')
      return visitService.findOne({ id: visitId })
    },

    favories(parent: any, args: any, { favoryService, res }: { favoryService: any, res: any}, info: any) {
      return favoryService.getAll()
    },
    favory(parent: any, { favoryId }: { favoryId: String }, { favoryService }: { favoryService: any }, info: any) {
      if(!favoryId) throw new UserInputError('FavoryID is invalid')
      return favoryService.findOne({ id: favoryId })
    },

    authUser(parent: any, args: any, { userService, res }: { userService: any, res: any}, info: any) {
      return res.locals.authUser
    },

    authUserAccount(parent: any, args: any, { accountService, res }: { accountService: any, res: any}, info: any) {
      return accountService.findOne({ user: res.locals.authUser.id })
    },

    authUserFavories(parent: any, args: any, { favoryService, res }: { favoryService: any, res: any}, info: any) {
      return favoryService.find({ user: res.locals.authUser.id })
    }
  },
  Publication: {
    appartment (parent: any, args: any, { appartmentService, res }: { appartmentService: any,  res: any}, info: any) {
      return appartmentService.findByID({ id: parent.appartment })
    },
    publisher (parent: any, args: any, { accountService, res }: { accountService: any, res: any}, info: any) {
      return accountService.findOne({ user: parent.publisher })
    }
  },
  Account: {
    user (parent: any, args: any, { userService, res }: { userService: any,  res: any}, info: any) {
      return userService.findByID({ id: parent.user })
    },
  },
  Favory: {
    user (parent: any, args: any, { accountService, res }: { accountService: any,  res: any}, info: any) {
      return accountService.findOne({ user: parent.user })
    },
    appartment (parent: any, args: any, { appartmentService, res }: { appartmentService: any,  res: any}, info: any) {
      return appartmentService.findOne({ _id: parent.appartment })
    },
  },
  Appartment: {
    createdBy (parent: any, args: any, { accountService, res }: { accountService: any,  res: any}, info: any) {
      return accountService.findOne({ user: parent.createdBy })
    },

  },
  // Reservation: {
  //   appartment (parent: any, args: any, { appartmentService, res }: { appartmentService: any,  res: any}, info: any) {
  //     return appartmentService.findByID({ id: parent.appartment })
  //   },
  //   user (parent: any, args: any, { accountService, res }: { accountService: any, res: any}, info: any) {
  //     return accountService.findOne({ user: parent.user })
  //   }
  // },
  // Visit: {
  //   appartment (parent: any, args: any, { appartmentService, res }: { appartmentService: any,  res: any}, info: any) {
  //     return appartmentService.findByID({ id: parent.appartment })
  //   },
  //   user (parent: any, args: any, { accountService, res }: { accountService: any, res: any}, info: any) {
  //     return accountService.findOne({ user: parent.user })
  //   }
  // },

  Mutation: {
    updateUser(parent: any, { data, userId }: { data: any, userId: string }, { userService }: { userService: any }, info: any) {
      if(!data || !userId) throw new UserInputError('Invalid user data')
      return userService.update({ id: userId, data})
    },

    createAccount(parent: any, { data }: { data: any}, { accountService }: { accountService: any }, info: any) {
      if(!data) throw new UserInputError('Invalid account data')
      return accountService.create(data)
    },
    updateAccount(parent: any, { data, accountId }: { data: any, accountId: string }, { accountService }: { accountService: any }, info: any) {
      if(!data || !accountId) throw new UserInputError('Invalid account data')
      return accountService.update({ id: accountId, data})
    },
    deleteAccount(parent: any, { data, accountId }: { data: any, accountId: string }, { accountService, userService }: { accountService: any; userService: any }, info: any) {
      if(!accountId) throw new UserInputError('Invalid account data')
      return accountService.findOne({ id: accountId})
              .then((account: any) => userService.delete({ id: account.user }))
              .then(() => accountService.delete({ id: accountId }))
    },

    createAppartment(parent: any, { data }: { data: any}, { appartmentService, res }: { appartmentService: any; res: any }, info: any) {
      if(!data) throw new UserInputError('Invalid appartment data')
      return appartmentService.create({ ...data, createdBy: res.locals.authUser._id })
    },
    updateAppartment(parent: any, { data, appartmentId }: { data: any, appartmentId: string }, { appartmentService }: { appartmentService: any }, info: any) {
      if(!data || !appartmentId) throw new UserInputError('Invalid appartment data')
      return appartmentService.update({ id: appartmentId, data})
    },
    deleteAppartment(parent: any, { appartmentId }: { appartmentId: string }, { appartmentService, publicationService, visitService, reservationService }: { appartmentService: any, publicationService: any, visitService: any, reservationService: any }, info: any) {
      if(!appartmentId) throw new UserInputError('Invalid appartment data')

      return publicationService.deleteMany({ appartment: appartmentId })
              .then(() => reservationService.deleteMany({ appartment: appartmentId }))
              .then(() => visitService.deleteMany({ appartment: appartmentId }))
              .then(() => appartmentService.delete({ id: appartmentId}))
    },

    createAppartmentType(parent: any, { data }: { data: any}, { appartmentTypeService }: { appartmentTypeService: any }, info: any) {
      if(!data) throw new UserInputError('Invalid appartment type data')
      // console.log('AppartmentType Data :: => ', data)
      return appartmentTypeService.create(data)
    },
    updateAppartmentType(parent: any, { data, appartmentTypeId }: { data: any, appartmentTypeId: string }, { appartmentTypeService }: { appartmentTypeService: any }, info: any) {
      if(!data || !appartmentTypeId) throw new UserInputError('Invalid appartment type data')
      return appartmentTypeService.update({ id: appartmentTypeId, data})
    },
    deleteAppartmentType(parent: any, { data, appartmentTypeId }: { data: any, appartmentTypeId: string }, { appartmentTypeService }: { appartmentTypeService: any }, info: any) {
      if(!appartmentTypeId) throw new UserInputError('Invalid appartment type data')
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
      if(!appartmentDetailId) throw new UserInputError('Invalid appartment detail data')
      return appartmentDetailService.delete({ id: appartmentDetailId})
    },

    createReservation(parent: any, { data }: { data: any}, { reservationService }: { reservationService: any }, info: any) {
      if(!data) throw new UserInputError('Invalid reservation data')
      return reservationService.create(data)
    },
    updateReservation(parent: any, { data, reservationId }: { data: any, reservationId: string }, { reservationService }: { reservationService: any }, info: any) {
      if(!data || !reservationId) throw new UserInputError('Invalid reservation data')
      return reservationService.update({ id: reservationId, data})
    },
    deleteReservation(parent: any, { data, reservationId }: { data: any, reservationId: string }, { reservationService }: { reservationService: any }, info: any) {
      if(!reservationId) throw new UserInputError('Invalid reservation data')
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
      if(!publicationId) throw new UserInputError('Invalid publication data')
      return publicationService.delete({ id: publicationId})
    },

    createVisit(parent: any, { data }: { data: any}, { visitService }: { visitService: any }, info: any) {
      if(!data) throw new UserInputError('Invalid visit data')

      return visitService.create({ ...data, /* date: moment(data.date).unix() */ })
    },
    updateVisit(parent: any, { data, visitId }: { data: any, visitId: string }, { visitService }: { visitService: any }, info: any) {
      if(!data || !visitId) throw new UserInputError('Invalid visit data')
      return visitService.update({ id: visitId, data: { ...data, /* date: moment(data.date).unix() */ } })
    },
    deleteVisit(parent: any, { data, visitId }: { data: any, visitId: string }, { visitService }: { visitService: any }, info: any) {
      if(!visitId) throw new UserInputError('Invalid visit data')
      return visitService.delete({ id: visitId})
    },

    createFavory(parent: any, { data }: { data: any}, { favoryService }: { favoryService: any }, info: any) {
      if(!data) throw new UserInputError('Invalid favory data')

      return favoryService.create(data)
    },
    updateFavory(parent: any, { data, favoryId }: { data: any, favoryId: string }, { favoryService }: { favoryService: any }, info: any) {
      if(!data || !favoryId) throw new UserInputError('Invalid favory data')
      return favoryService.update({ id: favoryId, data })
    },
    deleteFavory(parent: any, { data, favoryId }: { data: any, favoryId: string }, { favoryService }: { favoryService: any }, info: any) {
      if(!favoryId) throw new UserInputError('Invalid favory data')
      return favoryService.delete({ id: favoryId })
    },
  }
}
