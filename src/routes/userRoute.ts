import Router, { Express } from 'express'

import { UserController } from '../controllers'

const router = Router()

export default ({ app, ValidationManager, JWTService }: { app: Express; ValidationManager: any; JWTService: any; }) => {
	app.use('/users', router)

	router.use(JWTService.verifyAccessToken)

  router.post('/', UserController.create)

  router.get('/', UserController.getAll)

	router.get('/me', UserController.getAuthUser)

  router.patch('/:userID', UserController.update)

  router.delete('/:userID', UserController.delete)
}
