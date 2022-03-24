import Router, { Express } from 'express'

const router = Router()

export default ({ app, ValidationManager, JWTService, UserController }: { app: Express; ValidationManager: any; JWTService: any; UserController: any }) => {
	app.use('/users', router)

	router.use(JWTService.verifyAccessToken)

  router.post('/', UserController.create)

  router.get('/', UserController.getAll)

	router.get('/me', UserController.getAuthUser)

  router.patch('/:userID', UserController.update)

  router.delete('/:userID', UserController.delete)
}
