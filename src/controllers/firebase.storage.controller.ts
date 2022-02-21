/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */

import { RequestHandler } from "express"

export default ({ firebaseStorageService }: { firebaseStorageService: any }) => class firebaseStorageController {
  upload: RequestHandler = async (req, res, next) => {
    try {
      const { filePath } = res.locals.validatedData;
      const { file } = req;

      const fileInfo = await firebaseStorageService.upload({ filePath, file });

      res.send({ success: 1, data: { fileInfo } });
    } catch (error) { next(error); }
  }

  download: RequestHandler = async (req, res, next) => {
    try {
      const { filePath } = res.locals.validatedData;
      const file = await firebaseStorageService.download({ filePath });

      res.send({ success: 1, data: { file } });
    } catch (error) { next(error); }
  }

  delete: RequestHandler = async (req, res, next) => {
    try {
      const { filePath } = res.locals.validatedData;

      if (!filePath) throw new Error('File path is missing');

      const file = await firebaseStorageService.delete({ filePath });

      res.send({ success: 1, data: { file } });
    } catch (error) { next(error); }
  }
};
