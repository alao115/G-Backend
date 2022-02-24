/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Router from 'express';

import multer from 'multer';

import { firebaseStorageController } from '../controllers';

const uploadMiddleware = multer({
  /* storage, */
});

const router = Router();

export default ({ app, ValidationManager, JWTManager }: { app: any, ValidationManager: any, JWTManager: any }) => {
  app.use('/storage', router);

  // router.use(JWTManager.verifyAccessToken);

  router.post('/upload', uploadMiddleware.single('file'), ValidationManager.validationHelper(ValidationManager.schemas().fileUpload), firebaseStorageController.upload);

  router.post('/download', ValidationManager.validationHelper(ValidationManager.schemas().fileDownloadDeletion), firebaseStorageController.download);

  router.post('/delete', ValidationManager.validationHelper(ValidationManager.schemas().fileDownloadDeletion), firebaseStorageController.delete);
};
