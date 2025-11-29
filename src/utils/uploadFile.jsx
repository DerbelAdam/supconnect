import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export const uploadFile = (file, fileType) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `${fileType}s/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => reject(error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          url: downloadURL,
          name: file.name,
          type: fileType,
          path: uploadTask.snapshot.ref.fullPath,
        });
      }
    );
  });
};
