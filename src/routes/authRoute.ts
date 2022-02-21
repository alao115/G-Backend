import Router, { Express } from 'express'

import { AuthController } from '../controllers'

const router = Router()

export default ({ app, ValidationManager }: { app: Express; ValidationManager: any; }) => {
    app.use('/auth/', router)

    router.post('/signup', ValidationManager.validationHelper(ValidationManager.schemas().signup), AuthController.signUp)

    router.post('/signin', ValidationManager.validationHelper(ValidationManager.schemas().signin), AuthController.signIn)

    router.post('/refresh-token', ValidationManager.validationHelper(ValidationManager.schemas().refreshToken), AuthController.refresh)

    router.post('/password-reset', ValidationManager.validationHelper(ValidationManager.schemas().resetPassword), AuthController.resetPassword)
}