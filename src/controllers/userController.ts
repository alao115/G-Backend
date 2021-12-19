import { RequestHandler } from 'express';

export default ({ userService }: { userService: any }) => class UserController {
  create: RequestHandler = async (req, res, next) => {
    try {

    } catch (error) { next(error); }
  }

  getOne: RequestHandler = async (req, res, next) => {
    try {

    } catch (error) { next(error); }
  }

  getAuthUser: RequestHandler = async (req, res, next) => {
    try {
      res.send({ data: { user: res.locals.authUser }})

    } catch (error) { next(error); }
  }

  getAll: RequestHandler = async (req, res, next) => {
    try {

    } catch (error) { next(error); }
  }

  update: RequestHandler = async (req, res, next) => {
    try {

    } catch (error) { next(error); }
  }

  delete: RequestHandler = async (req, res, next) => {
    try {

    } catch (error) { next(error); }
  }
};