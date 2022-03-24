import createError from "http-errors";
import argon2 from "argon2";

import { Container, ContainerInstance, Service, Inject } from "typedi";

@Service('AuthManager')
export default class AuthManager {

  constructor(private JWTManager: any, private userService: any, private accountService: any ) {}

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

  async resetPassword ({ email }: { email: string }) {
    try {
      const user = await this.userService.findByEmail({ email });

       if (!user) throw new createError.NotFound("User not found");

        //Generate new password or set new password manually
    } catch (error) { throw error }
  };
}