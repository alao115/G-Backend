import Router, { Express } from 'express'

const router = Router()

export default ({ app, AppartmentController }: { app: Express; AppartmentController: any }) => {
    app.use('/appartments/', router)

    router.post('/', AppartmentController.getAllAppartment)

    router.post('/appartmenttypes', AppartmentController.getAllAppartmentType)
}