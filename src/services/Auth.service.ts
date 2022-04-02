import createError from "http-errors";
import argon2 from "argon2";
import config from "../config";

import { Container, ContainerInstance, Service, Inject } from "typedi";

@Service('AuthManager')
export default class AuthManager {

  constructor(private JWTManager: any, private userService: any, private accountService: any, private mailService: any ) {}

  async signUp (data: any) {
    try {
      //Check if user already existed
      const { email, password } = data
      const isUserExisted = await this.userService.findByEmail({ email });

      if (isUserExisted) throw new createError.Conflict("Email already existed");

      //Hash user password
      const hashedPassword = await argon2.hash(password);

      //Create the user and save it in the db
      const user = await this.userService.create({
        ...data,
        password: hashedPassword
      });

      // Create user account
      const account = await this.accountService.create({ ...data, user: user.id})
      // console.log('Account: ', account)

      //Generate accessToken and refreshToken
      const accessToken = await this.JWTManager.signToken(user.id);
      const refreshToken = await this.JWTManager.signRefreshToken(user.id);

      return Object.freeze({ ...accessToken, refreshToken });
    } catch (err) { throw err; }
  };

  async signIn ({ email, password }: { email: string; password: string}) {
    try {
      //Check if user already existed
      const user = await this.userService.findByEmail({ email });

      if (!user) throw new createError.NotFound("User not found");

      //Check if password is correct
      const isPasswordCorrect = await argon2.verify(user.password, password);
      if (!isPasswordCorrect)
        throw new createError.Unauthorized("Email/Password not valid");

      //Generate accessToken and refreshToken
      const accessToken = await this.JWTManager.signToken(user.id);
      const refreshToken = await this.JWTManager.signRefreshToken(user.id);

      return Object.freeze({ ...accessToken, refreshToken });
    } catch (err) { throw err; }
  };

  async refreshTokenService ({ refreshToken }: { refreshToken: string }) {
    try {
      //Verify the refreshToken
      const data = await this.JWTManager.refreshTokenVerification({ refreshToken });

      //Generate new pair of access-refresh token
      const accessToken = await this.JWTManager.signToken(data);
      const refreshtoken = await this.JWTManager.signRefreshToken(data);

      return Object.freeze({ ...accessToken, refreshToken: refreshtoken });
    } catch (err) { throw err; }
  };

  async resetPassword ({ email, password }: { email: string; password: string }) {
    try {
      const user = await this.userService.findByEmail({ email });

      if (!user) throw new createError.NotFound("User not found");

      //Hash user password
      const hashedPassword = await argon2.hash(password);

      const response = await this.userService.update({ id: user._id, data: { password: hashedPassword }})

      return response
    } catch (error) { throw error }
  };

  async emailTokenVerification({ emailToken }: { emailToken: string }) {
    try {
      const user = await this.JWTManager.verifyEmailVerificationToken({ emailVerificationToken: emailToken });
      const response = await this.userService.update({ id: user._id, data: { emailVerified: true }})

      return { ...user, ...response }
    } catch (error) {
      throw error;
    }
  }

  // async passwordRecoveryTokenVerification({ emailToken }: { emailToken: string }) {
  //   try {
  //     const user = await this.JWTManager.verifyPasswordRecoveryToken({ emailVerificationToken: emailToken });
  //     return user
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async sendVerificationMail({ email, isPassword }: { email: string; isPassword: boolean }) {
    try {
      /* Check if user exist */
      const user = await this.userService.findByEmail({ email })

      if (!user) throw new createError.NotFound('No such user found in our records')

      /* Fetch user account data */
      const userAccount = await this.accountService.findOne({ user: user.id })


      /* Generate token to be sent with the mail */
      const { emailToken } = isPassword ? await this.JWTManager.passwordRecoveryTokenGen({ email }) : await this.JWTManager.emailVerificationTokenGen({ email })

      const verificationUrl = `${config.frontendUrl}/auth/${ !isPassword ? 'signup/email-verified' : 'password-forgotten/new-password'}?token=${emailToken}`,
            from = 'catch-all@rcg.studio',
            subject = isPassword ? 'Réinitialisation mot de passe.' : 'Vérification d\'adresse email',
            content = `
        <div style=" display: flex; flex-direction: column; overflow-wrap: break-word; padding-bottom: 28px; width: 100%;">
          <span _ngcontent-vhn-c70="" class="preview-label">Message</span><div _ngcontent-vhn-c70=""><p>Bonjour ${userAccount.firstname} ${userAccount.lastname},</p>
          <p>Cliquez sur ce lien pour ${ isPassword ? 'réinitialiser votre mot de passe.' : 'valider votre adresse e-mail.'}</p>
          <p><a href="${verificationUrl}">${verificationUrl}</a></p>
          <p>Si vous n'avez pas demandé à valider cette adresse, vous pouvez ignorer cet e-mail.</p>
          <p>Merci,</p>
        </div>`

      const response = await this.mailService.sendMail({ from, to: user.email, content, subject })
      console.log('Response: ', response)

      return { ...user, ...userAccount }

    } catch (error) {
      throw error;
    }
  }

  async passwordRecoveryTokenVerification({ passwordRecoveryToken }: { passwordRecoveryToken: string }) {
    try {
      const response = await this.JWTManager.verifyPasswordRecoveryToken({ passwordRecoveryToken })
      return response
    } catch (error) { throw error }
  }
}