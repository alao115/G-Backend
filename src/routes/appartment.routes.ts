import Router, { Express } from 'express'

const router = Router()

export default ({ app, AppartmentController }: { app: Express; AppartmentController: any }) => {
    app.use('/appartments/', router)

    router.get('/', AppartmentController.getAllAppartment)

    router.get('/appartmenttypes', AppartmentController.getAllAppartmentType)

    router.post('/search', AppartmentController.searchAppartment)
}