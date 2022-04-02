import JWT, { SignOptions } from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import createError from 'http-errors'
import moment from 'moment'
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Service, Inject } from 'typedi'

@Service('JWTManager')
export default  class JWTManager {

  constructor (@Inject('RedisClient') private redisClientManager: any, @Inject('serviceGenerator') private userService: any) {}

  signToken = (userID: string) => {
    const privateKey = fs.readFileSync(path.join("dist/keys", "gontche_private.pem"), "utf-8");

    const payload = {};

    const options: SignOptions = {
      audience: String(userID),
      expiresIn: "1d",
      algorithm: "RS256",
    };

    return new Promise((resolve, reject) => {
      JWT.sign(payload, privateKey, options, (err, accessToken) => {
        if (err) {
          // console.error('Error: ', err)
          reject(new createError.InternalServerError());
        }

        resolve({ accessToken, expiresIn: moment().add(1, "days").unix() });
      });
    });
  };

  verifyAccessToken: RequestHandler = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) return next(new createError.Unauthorized());

    // const token = authHeader.split(" ")[1];
    const token = authHeader.replace('Bearer', '').replace('Bearer', '').trim()

    const publicKey = fs.readFileSync(path.join("dist/keys", "gontche_public.pem"), "utf-8");

    JWT.verify(token, publicKey, async (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.name;
        // console.error('Error: ', err)
        next(new createError.Unauthorized(message));
      }

      const isUserExist = await this.userService.findByID({ id: payload && payload.aud })

      if(!isUserExist) next(new createError.Unauthorized())

      res.locals.authUser = isUserExist;

      next();
    });
  };

  signRefreshToken = (userID: string) => {
    const privateKey = fs.readFileSync( path.join("dist/keys", "gontche_private_refresh.pem"), "utf-8");

    const payload = {};

    const options: SignOptions = {
      audience: String(userID),
      expiresIn: "1y",
      algorithm: "RS256",
    };

    return new Promise((resolve, reject) => {
      JWT.sign(payload, privateKey, options, async (err, token) => {
        if (err) {
          // console.error('Error: ', err)
          reject(new createError.InternalServerError());
        }

        try {
          const result = await this.redisClientManager.setKey(String(userID), String(token) as string);
          resolve(result);
        } catch (err: any) {
          // console.log(err)
          reject(new createError.InternalServerError(err.message));
        }
      });
    });
  };

  refreshTokenVerification = async ({ refreshToken }: { refreshToken: string; }) => {
    const publicKey = fs.readFileSync( path.join("dist/keys", "gontche_public_refresh.pem"), "utf-8");

    return new Promise((resolve, reject) => {
      JWT.verify(refreshToken, publicKey, async (err, payload) => {
        if (err) {
          // console.error('Error: ', err)
          return reject(new createError.Unauthorized());
        }

        try {
          const userID = payload!.aud as string;
          const result = await this.redisClientManager.getKey(userID);

          if (result !== refreshToken) reject(new createError.Unauthorized());

          resolve(userID);
        } catch (err) {
          // console.log(err);
          reject(new createError.InternalServerError());
        }
      });
    });
  };

  emailVerificationTokenGen({ email }: { email: string }) {
    const privateKey = fs.readFileSync(path.join('dist/keys', 'gontche_email_verification_private_key.pem'), 'utf-8');

    const payload = {};

    const options : SignOptions = {
      audience: email,
      expiresIn: '1d',
      algorithm: 'RS256',
    };

    return new Promise((resolve, reject) => {
      JWT.sign(payload, privateKey, options, (err, emailToken) => {
        if (err) {
          console.log(err)
          reject(new createError.InternalServerError());
        }
        resolve({ emailToken });
      });
    });
  }

  async verifyEmailVerificationToken({ emailVerificationToken }: { emailVerificationToken: string }) {
    const publicKey = fs.readFileSync(path.join('dist/keys', 'gontche_email_verification_public_key.pem'), 'utf-8');

    return new Promise((resolve, reject) => {
      JWT.verify(emailVerificationToken, publicKey, async (err, payload) => {
        if (err) {
          return reject(new createError.Unauthorized());
        }

        try {
          const email = payload!.aud;
          const isUserExist = await this.userService.findByEmail({ email });

          if (!isUserExist) reject(new createError.Unauthorized());

          resolve(isUserExist);
        } catch (err) { reject(new createError.InternalServerError()); }
      });
    });
  }

  passwordRecoveryTokenGen({ email }: { email: string }) {
    const privateKey = fs.readFileSync(path.join('dist/keys', 'gontche_password_recovery_private_key.pem'), 'utf-8');

    const payload = {};

    const options: SignOptions = {
      audience: email,
      expiresIn: '1d',
      algorithm: 'RS256',
    };

    return new Promise((resolve, reject) => {
      JWT.sign(payload, privateKey, options, (err, emailToken) => {
        if (err) {
          // console.log(err)
          reject(new createError.InternalServerError());
        }

        resolve({ emailToken });
      });
    });
  }

  async verifyPasswordRecoveryToken({ passwordRecoveryToken }: { passwordRecoveryToken: string }) {
    const publicKey = fs.readFileSync(path.join('dist/keys', 'gontche_password_recovery_public_key.pem'), 'utf-8');

    return new Promise((resolve, reject) => {
      JWT.verify(passwordRecoveryToken, publicKey, async (err, payload) => {
        if (err) {
          return reject(new createError.Unauthorized());
        }

        try {
          const email = payload!.aud;
          const isUserExist = await this.userService.findByEmail({ email });

          if (!isUserExist) reject(new createError.Unauthorized());

          resolve(isUserExist);
        } catch (err) { reject(new createError.InternalServerError()); }
      });
    });
  }
}