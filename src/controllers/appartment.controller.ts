import { RequestHandler } from "express"

export default ({ appartmentService, appartmentTypeService }: { appartmentService: any, appartmentTypeService: any }) => class AppartmentController {
  getAllAppartment: RequestHandler = async (req, res, next) => {
    try {
      const appartments = await appartmentService.getAll()
      return res.send({ success: 1, data: { appartments } })
    } catch (error: any) {
      next(error)
    }
  }

  getAllAppartmentType: RequestHandler = async (req, res, next) => {
    try {
      const appartmentTypes = await appartmentTypeService.getAll()
      return res.send({ success: 1, data: { appartmentTypes } })
    } catch (error) {
      next(error)
    }
  }
}