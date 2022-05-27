
export default ({ Appartment, ServiceGenerator }: { Appartment: any; ServiceGenerator: any}) => class AppartmentService extends ServiceGenerator {
  constructor () {
    super(Appartment);
  }

  async searchAppartment (searchOpts: any) {
    try {
      const response =  await Appartment.find({
        geometry: {
          // $near: {
          //   $geometry: { type: 'Point', coordinates: [ searchOpts.location.lng, searchOpts.location.lat] },
          //   $maxDistance: 10000
          // }
          $geoWithin: {
            $centerSphere: [
              [ searchOpts.location.lng, searchOpts.location.lat ],
              10 / 6378.1
            ]
          }
        },
        rooms: { $gte: searchOpts.roomQty },
        rent: { $gte: searchOpts.budgetMin }
      })
      return response
    } catch (error) { throw error }
  }
}