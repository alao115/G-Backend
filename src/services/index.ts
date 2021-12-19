import JWTManager from './JWT.service'
import AuthService from './Auth.service'
import ValidationManager from './validation.service'
import RedisClientManager from './redisClient.service'
import serviceGeneratorService from './serviceGenerator.service'
import { User, Account, Appartment, AppartmentDetail, Publication, Reservation, Visit, AppartmentType } from "../models"


const RedisClientService = new RedisClientManager()

const userService = new serviceGeneratorService(User)

const accountService = new serviceGeneratorService(Account)

const appartmentService = new serviceGeneratorService(Appartment)

const appartmentDetailService = new serviceGeneratorService(AppartmentDetail)

const publicationService = new serviceGeneratorService(Publication)

const reservationService = new serviceGeneratorService(Reservation)

const visitService = new serviceGeneratorService(Visit)

const appartmentTypeService = new serviceGeneratorService(AppartmentType)

const JWTService = new JWTManager(RedisClientService, userService)

const AuthManager = new AuthService(JWTService, userService, accountService)

const validationService = new ValidationManager()


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
  validationService
}