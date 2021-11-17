import express from 'express'

import userRoute from './userRoute'
import authRoute from './authRoute'

import { ValidationManager, JWTService } from '../services'

export default () => {
    const app = express()

    authRoute({ app, ValidationManager: new ValidationManager() })

    userRoute({ app, ValidationManager: new ValidationManager(), JWTService })

    return app
}