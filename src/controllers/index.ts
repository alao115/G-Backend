import authControllerManager from './authController'
import userControllerManager from './userController';

import { AuthManager, userService } from '../services'

const AuthController = new (authControllerManager({ AuthManager }))()
const UserController = new (userControllerManager({ userService }))()


export {
  AuthController,
  UserController
}