import { RequestHandler } from 'express';

export default ({ AuthManager }: { AuthManager: any }) => class AuthController {
  signUp: RequestHandler = async ( req, res, next ) => {
    try {
      const signupData = res.locals.validatedData

      const token = await AuthManager.signUp(signupData)

      res.send({ success: 1, data: { ...token }})
    } catch( err ) { next(err) }
  }

  signIn: RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = res.locals.validatedData

      const token = await AuthManager.signIn({ email, password })

      res.send({ success: 1, data: { ...token }})
    } catch( err ) { next(err) }
  }

  refresh: RequestHandler = async (req, res, next) => {
    try {
      const refreshToken  = res.locals.validatedData['refresh-token']

      const token = await AuthManager.refreshTokenService({ refreshToken })

      res.send({ success: 1, data: { ...token }})

    } catch( err ) { next(err) }
  }

  resetPassword: RequestHandler = async (req, res, next) => {
    try {

    } catch (error) { next(error) }
  }
}


