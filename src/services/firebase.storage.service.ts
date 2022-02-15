/* eslint-disable no-useless-catch */
/* eslint-disable prettier/prettier */

import { uuid } from 'uuidv4';

export default ({ firebaseAdmin }: { firebaseAdmin: any }) => class firebaseStorageService {
  async upload({ filePath, file }: { filePath: string, file : any }) {
    try {
      const bucket = firebaseAdmin.storage().bucket();
      const fileToUpload = bucket.file(filePath);
      await fileToUpload.save(file.buffer, {
        destination: filePath,
        metadata: {
          metadata: {
            firebaseStorageDownloadTokens: uuid(),
          },
        },
      });

      const response = await fileToUpload.getSignedUrl({
        action: 'read',
        expires: '03-09-6491',
      });
      return response[0];
    } catch (error) { throw error; }
  }

  async download({ filePath }: { filePath: string }) {
    try {
      const bucket = firebaseAdmin.storage().bucket();
      const fileToDownload = bucket.file(filePath);
      const response = await fileToDownload.getSignedUrl({
        action: 'read',
        expires: '03-09-2491',
      });
      return response[0];
    } catch (error) { throw error; }
  }

  async delete({ filePath }: { filePath: string }) {
    try {
      const bucket = firebaseAdmin.storage().bucket();
      const fileToDownload = bucket.file(filePath);
      const response = await fileToDownload.delete();
      return response;
    } catch (error) { throw error; }
  }
};
