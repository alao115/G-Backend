/* eslint-disable prettier/prettier */
import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../keys/gontche-project-firebase-adminsdk-x3f17-e3118f7198';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: 'https://gontche-project-default-rtdb.firebaseio.com/',
  storageBucket: 'gs://gontche-project.appspot.com',
});

export default { admin };
