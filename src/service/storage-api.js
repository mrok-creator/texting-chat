import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../js/config';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';

import { loaderWrapper, createDataObject } from '../';
import { pushData } from './';

const app = initializeApp(firebaseConfig);
const storage = getStorage();

function uploadUserFile(file) {
  const storageRef = ref(storage, 'images/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);
  console.log(file.name);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    'state_changed',
    snapshot => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      loaderWrapper(parseInt(progress));
    },
    error => {
      console.log(error.code);
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        console.log('File available at', downloadURL);
        pushData(createDataObject('', '', 'picture', downloadURL));
      });
    },
  );
}

export { uploadUserFile };
