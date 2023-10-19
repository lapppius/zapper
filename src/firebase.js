// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, updateCurrentUser, updateProfile } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import Compressor from "compressorjs";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASURMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
export const auth = getAuth(app);

export const upload = async (file, currentUser, setLoading) => {
  const fileRef = ref(storage, currentUser.uid + "_compressed"+Date.now()+ ".jpg");
  setLoading(true);

  new Compressor(file, {
    quality: 0.2,

    // The compression process is asynchronous,
    // which means you have to access the `result` in the `success` hook function.
    success(result) {
      const uploadTask = uploadBytesResumable(fileRef, result);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // setProgresspercent(progress);
          return progress;
        },
        (error) => {
          alert(error);
        }
      );
    },
    error(err) {
      console.log(err.message);
    },
  });

  const photoURL = await getDownloadURL(fileRef);
  await updateProfile(currentUser, {
    photoURL: photoURL + "/",
  });

  setLoading(false);
  console.log("uploaded file");
};

export const deleteP = async (imgURL, currentUser) => {
  // Create a reference to the file to delete
  const desertRef = ref(storage, imgURL);

  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
      console.log("File deleted successfully");
    })
    .then(() => {
      updateProfile(currentUser, {
        displayName: "Jane Q. User", photoURL: ""
      }).then(() => {
        // Profile updated!
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log("Uh-oh, an error occurred!");
    });
};

export default app;
