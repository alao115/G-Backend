import { RequestHandler } from "express"

export default ({ appartmentService, appartmentTypeService }: { appartmentService: any, appartmentTypeService: any }) => class AppartmentController {
  getAllAppartment: RequestHandler = async (req, res, next) => {
    try {
      const searchOpts = [
        {
          $lookup: {
            from: 'publications',
            localField: 'id',
            foreignField: 'appartment',
            as: 'published_appart'
          }
        },
        {
          $set: {
            publication: {
              $mergeObjects: [ { $arrayElemAt:["$published_appart", 0] }, "$publication"]
            }
          }
        },
        {
          $project: { published_appart: 0 }
        },
        {
          $match: {
            "publication.id": {
              $exists: true
            }
          }
        },
        {
          $project: {
            "publication.appartment": 0,
            "publication.createdAt": 0,
            "publication.createdBy": 0,
            "publication._id": 0,
            "publication.__v": 0,
            "publication.updatedAt": 0,
          }
        }
      ]
      const appartments = await appartmentService.aggregate(searchOpts)
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

  searchAppartment: RequestHandler = async (req, res, next) => {
    try {
      const searchOpts = req.body
      const response = await appartmentService.searchAppartment(searchOpts)
      return res.send({ success: 1, data: { appartments: response }})
    } catch (error) {
      next(error)
    }
  }
}