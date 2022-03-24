import express from 'express'

import userRoute from './user.routes'
import authRoute from './auth.routes'
import firebaseStorageRoute from './firebase.storage.routes'
import appartmentRoute from './appartment.routes'

import { validationService, JWTService } from '../services'
import { AppartmentController, AuthController, UserController, firebaseStorageController } from '../controllers'

export default () => {
    const app = express()

    authRoute({ app, ValidationManager: validationService, AuthController })

    userRoute({ app, ValidationManager: validationService, JWTService, UserController })

    firebaseStorageRoute({ app, ValidationManager: validationService, JWTManager: JWTService, firebaseStorageController })

    appartmentRoute({ app, AppartmentController })

    return app
}