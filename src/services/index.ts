import JWTManager from './JWT.service'
import AuthService from './Auth.service'
import ValidationManager from './validation.service'
import RedisClientManager from './redisClient.service'
import serviceGeneratorService from './serviceGenerator.service'
import firebaseStorageManager from './firebase.storage.service'
import mailServiceManager from './email.service'

import appartmentServiceManager from './appartment.service'

import { User, Account, Appartment, AppartmentDetail, Publication, Reservation, Visit, AppartmentType, Favory } from "../models"
import firebaseApp from '../loaders/firebase'

const mailService = new mailServiceManager()

const RedisClientService = new RedisClientManager()

const userService = new serviceGeneratorService(User)

const accountService = new serviceGeneratorService(Account)

const appartmentService = new (appartmentServiceManager({ Appartment, ServiceGenerator: serviceGeneratorService })) //serviceGeneratorService(Appartment))

const appartmentDetailService = new serviceGeneratorService(AppartmentDetail)

const publicationService = new serviceGeneratorService(Publication)

const reservationService = new serviceGeneratorService(Reservation)

const favoryService = new serviceGeneratorService(Favory)

const visitService = new serviceGeneratorService(Visit)

const appartmentTypeService = new serviceGeneratorService(AppartmentType)

const JWTService = new JWTManager(RedisClientService, userService)

const AuthManager = new AuthService(JWTService, userService, accountService, mailService)

const validationService = new ValidationManager()

const firebaseStorageService = new (firebaseStorageManager({ firebaseAdmin: firebaseApp.admin }))()


export {
  RedisClientService as RedisClientManager,
  JWTService,
  userService,
  accountService,
  appartmentService,
  appartmentDetailService,
  appartmentTypeService,
  publicationService,
  reservationService,
  visitService,
  AuthManager,
  ValidationManager,
  validationService,
  firebaseStorageService,
  mailService,
  favoryService,
}