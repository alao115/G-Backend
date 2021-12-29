"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
exports.default = {
    Query: {
        hello(parent, args, context, info) {
            return 'Hello world';
        },
        users(parent, args, { userService, res }, info) {
            return userService.getAll();
        },
        accounts(parent, args, { accountService, res }, info) {
            return accountService.getAll();
        },
        account(parent, { accountId }, { accountService }, info) {
            if (!accountId)
                throw new apollo_server_core_1.UserInputError('AccountID is invalid');
            return accountService.findOne({ id: accountId });
        },
        appartments(parent, args, { appartmentService, res }, info) {
            return appartmentService.getAll();
        },
        appartment(parent, { appartmentId }, { appartmentService }, info) {
            if (!appartmentId)
                throw new apollo_server_core_1.UserInputError('AppartmentID is invalid');
            return appartmentService.findOne({ id: appartmentId });
        },
        appartmentDetails(parent, args, { appartmentDetailService, res }, info) {
            return appartmentDetailService.getAll();
        },
        appartmentDetail(parent, { appartmentDetailId }, { appartmentDetailService }, info) {
            if (!appartmentDetailId)
                throw new apollo_server_core_1.UserInputError('AppatmentDetailID is invalid');
            return appartmentDetailService.findOne({ id: appartmentDetailId });
        },
        appartmentTypes(parent, args, { appartmentTypeService, res }, info) {
            return appartmentTypeService.getAll();
        },
        appartmentType(parent, { appartmentTypeId }, { appartmentTypeService }, info) {
            if (!appartmentTypeId)
                throw new apollo_server_core_1.UserInputError('AppatmentTypeID is invalid');
            return appartmentTypeService.findOne({ id: appartmentTypeId });
        },
        publications(parent, args, { publicationService, res }, info) {
            return publicationService.getAll();
        },
        publication(parent, { publicationId }, { publicationService }, info) {
            if (!publicationId)
                throw new apollo_server_core_1.UserInputError('PublicationID is invalid');
            return publicationService.findOne({ id: publicationId });
        },
        reservations(parent, args, { reservationService, res }, info) {
            return reservationService.getAll();
        },
        reservation(parent, { reservationId }, { reservationService }, info) {
            if (!reservationId)
                throw new apollo_server_core_1.UserInputError('ReservationID is invalid');
            return reservationService.findOne({ id: reservationId });
        },
        visits(parent, args, { visitService, res }, info) {
            return visitService.getAll();
        },
        visit(parent, { visitId }, { visitService }, info) {
            if (!visitId)
                throw new apollo_server_core_1.UserInputError('VisitID is invalid');
            return visitService.findOne({ id: visitId });
        },
        authUser(parent, args, { userService, res }, info) {
            return res.locals.authUser;
        }
    },
    Mutation: {
        createAccount(parent, { data }, { accountService }, info) {
            if (!data)
                throw new apollo_server_core_1.UserInputError('Invalid account data');
            return accountService.create(data);
        },
        updateAccount(parent, { data, accountId }, { accountService }, info) {
            if (!data || !accountId)
                throw new apollo_server_core_1.UserInputError('Invalid account data');
            return accountService.update({ id: accountId, data });
        },
        deleteAccount(parent, { data, accountId }, { accountService }, info) {
            if (!data || !accountId)
                throw new apollo_server_core_1.UserInputError('Invalid account data');
            return accountService.delete({ id: accountId });
        },
        createAppartment(parent, { data }, { appartmentService }, info) {
            if (!data)
                throw new apollo_server_core_1.UserInputError('Invalid appartment data');
            return appartmentService.create(data);
        },
        updateAppartment(parent, { data, appartmentId }, { appartmentService }, info) {
            if (!data || !appartmentId)
                throw new apollo_server_core_1.UserInputError('Invalid appartment data');
            return appartmentService.update({ id: appartmentId, data });
        },
        deleteAppartment(parent, { data, appartmentId }, { appartmentService }, info) {
            if (!data || !appartmentId)
                throw new apollo_server_core_1.UserInputError('Invalid appartment data');
            return appartmentService.delete({ id: appartmentId });
        },
        createAppartmentType(parent, { data }, { appartmentTypeService }, info) {
            if (!data)
                throw new apollo_server_core_1.UserInputError('Invalid appartment type data');
            console.log('AppartmentType Data :: => ', data);
            return appartmentTypeService.create(data);
        },
        updateAppartmentType(parent, { data, appartmentTypeId }, { appartmentTypeService }, info) {
            if (!data || !appartmentTypeId)
                throw new apollo_server_core_1.UserInputError('Invalid appartment type data');
            return appartmentTypeService.update({ id: appartmentTypeId, data });
        },
        deleteAppartmentType(parent, { data, appartmentTypeId }, { appartmentTypeService }, info) {
            if (!data || !appartmentTypeId)
                throw new apollo_server_core_1.UserInputError('Invalid appartment type data');
            return appartmentTypeService.delete({ id: appartmentTypeId });
        },
        createAppartmentDetail(parent, { data }, { appartmentDetailService }, info) {
            if (!data)
                throw new apollo_server_core_1.UserInputError('Invalid appartment detail data');
            return appartmentDetailService.create(data);
        },
        updateAppartmentDetail(parent, { data, appartmentDetailId }, { appartmentDetailService }, info) {
            if (!data || !appartmentDetailId)
                throw new apollo_server_core_1.UserInputError('Invalid appartment detail data');
            return appartmentDetailService.update({ id: appartmentDetailId, data });
        },
        deleteAppartmentDetail(parent, { data, appartmentDetailId }, { appartmentDetailService }, info) {
            if (!data || !appartmentDetailId)
                throw new apollo_server_core_1.UserInputError('Invalid appartment detail data');
            return appartmentDetailService.delete({ id: appartmentDetailId });
        },
        createReservation(parent, { data }, { reservationService }, info) {
            if (!data)
                throw new apollo_server_core_1.UserInputError('Invalid reservation data');
            return reservationService.create(data);
        },
        updateReservation(parent, { data, reservationId }, { reservationService }, info) {
            if (!data || reservationId)
                throw new apollo_server_core_1.UserInputError('Invalid reservation data');
            return reservationService.update({ id: reservationId, data });
        },
        deleteReservation(parent, { data, reservationId }, { reservationService }, info) {
            if (!data || reservationId)
                throw new apollo_server_core_1.UserInputError('Invalid reservation data');
            return reservationService.delete({ id: reservationId });
        },
        createPublication(parent, { data }, { publicationService }, info) {
            if (!data)
                throw new apollo_server_core_1.UserInputError('Invalid publication data');
            return publicationService.create(data);
        },
        updatePublication(parent, { data, publicationId }, { publicationService }, info) {
            if (!data || !publicationId)
                throw new apollo_server_core_1.UserInputError('Invalid publication data');
            return publicationService.update({ id: publicationId, data });
        },
        deletePublication(parent, { data, publicationId }, { publicationService }, info) {
            if (!data || !publicationId)
                throw new apollo_server_core_1.UserInputError('Invalid publication data');
            return publicationService.delete({ id: publicationId });
        },
        createVisit(parent, { data }, { visitService }, info) {
            if (!data)
                throw new apollo_server_core_1.UserInputError('Invalid visit data');
            return visitService.create(data);
        },
        updateVisit(parent, { data, visitId }, { visitService }, info) {
            if (!data || !visitId)
                throw new apollo_server_core_1.UserInputError('Invalid visit data');
            return visitService.update({ id: visitId, data });
        },
        deleteVisit(parent, { data, visitId }, { visitService }, info) {
            if (!data || !visitId)
                throw new apollo_server_core_1.UserInputError('Invalid visit data');
            return visitService.delete({ id: visitId });
        },
    }
};
