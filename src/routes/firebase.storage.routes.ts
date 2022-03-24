/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Router from 'express';

import multer from 'multer';

const uploadMiddleware = multer({
  /* storage, */
});

const router = Router();

export default ({ app, ValidationManager, JWTManager, firebaseStorageController }: { app: any, ValidationManager: any, JWTManager: any; firebaseStorageController: any }) => {
  app.use('/storage', router);

  // router.use(JWTManager.verifyAccessToken);

  router.post('/upload', uploadMiddleware.single('file'), ValidationManager.validationHelper(ValidationManager.schemas().fileUpload), firebaseStorageController.upload);

  router.post('/download', ValidationManager.validationHelper(ValidationManager.schemas().fileDownloadDeletion), firebaseStorageController.download);

  router.post('/delete', ValidationManager.validationHelper(ValidationManager.schemas().fileDownloadDeletion), firebaseStorageController.delete);
};
