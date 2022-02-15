import authControllerManager from './authController'
import userControllerManager from './userController';
import firebaseStorageManager from './firebase.storage.controller';

import { AuthManager, userService, firebaseStorageService } from '../services'

const AuthController = new (authControllerManager({ AuthManager }))()
const UserController = new (userControllerManager({ userService }))()
const firebaseStorageController = new (firebaseStorageManager({ firebaseStorageService }))()


export {
  AuthController,
  UserController,
  firebaseStorageController
}