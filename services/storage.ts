import { storage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const StorageService = {
  /**
   * Uploads a file to Firebase Storage and returns the public download URL.
   * @param file The File object to upload
   * @param path The folder path in bucket (e.g., 'resources' or 'blogs')
   */
  uploadFile: async (file: File, path: string): Promise<string> => {
    try {
      // Create a unique filename to prevent overwrites
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
      const storagePath = `${path}/${timestamp}_${safeName}`;
      
      const storageRef = ref(storage, storagePath);
      
      // Upload
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Storage Upload Error:", error);
      throw error;
    }
  }
};