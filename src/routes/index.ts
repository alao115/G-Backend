import express from 'express'

import userRoute from './userRoute'
import authRoute from './authRoute'
import firebaseStorageRoute from './firebase.storage.route'

import { validationService, JWTService } from '../services'

export default () => {
    const app = express()

    authRoute({ app, ValidationManager: validationService })

    userRoute({ app, ValidationManager: validationService, JWTService })

    firebaseStorageRoute({ app, ValidationManager: validationService, JWTManager: JWTService })

    return app
}