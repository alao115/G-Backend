import express from 'express'

import userRoute from './userRoute'
import authRoute from './authRoute'

import { validationService, JWTService } from '../services'

export default () => {
    const app = express()

    authRoute({ app, ValidationManager: validationService })

    userRoute({ app, ValidationManager: validationService, JWTService })

    return app
}