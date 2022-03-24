import authControllerManager from './authController'
import userControllerManager from './userController';
import firebaseStorageManager from './firebase.storage.controller';
import appartmentControllerManager from './appartment.controller';

import { AuthManager, userService, firebaseStorageService, appartmentService, appartmentTypeService } from '../services'

const AuthController = new (authControllerManager({ AuthManager }))()
const UserController = new (userControllerManager({ userService }))()
const firebaseStorageController = new (firebaseStorageManager({ firebaseStorageService }))()
const AppartmentController = new (appartmentControllerManager({ appartmentService, appartmentTypeService }))()


export {
  AuthController,
  UserController,
  firebaseStorageController,
  AppartmentController
}