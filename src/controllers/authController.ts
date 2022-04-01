import { RequestHandler, Request, Response, NextFunction } from 'express';

export default ({ AuthManager }: { AuthManager: any }) => class AuthController {
  signUp: RequestHandler = async ( req, res, next ) => {
    try {
      const signupData = res.locals.validatedData

      const token = await AuthManager.signUp(signupData)

      const emailData = await AuthManager.sendVerificationMail({ email: signupData.email, isPassword: false })

      res.send({ success: 1, data: { ...emailData }})
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

  emailVerification: RequestHandler = async (req, res, next) => {
    try {
      const emailToken = res.locals.validatedData['email-token'];

      const response = await AuthManager.emailTokenVerification({ emailToken });

      res.send({ success: 1, data: { emailVerified: !!response.nModified } });
    } catch (err) { next(err); }
  }

  sendVerificationMail({ isPassword } = { isPassword: false }) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email } = res.locals.validatedData;

        await AuthManager.sendVerificationMail({ email, isPassword })

        res.send({ success: 1, message: 'Verification mail sent successfully' });

      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  }

  passwordRecoveryTokenVerification: RequestHandler = async (req, res, next) => {
    try {
      const passwordRecoveryToken = res.locals.validatedData['password-recovery-token']
      const response = await AuthManager.passwordRecoveryTokenVerification({ passwordRecoveryToken })

      res.send({ success: 1, data: { id: response.id } })
    } catch (error) {
      console.log(error)
      next(error) }
  }
}


