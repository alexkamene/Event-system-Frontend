// src/Images/UploadImage.js
import React, { useState } from 'react';
import  storage  from '../Firebase/Firebase'; // Adjust the path to your firebase.js file
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UploadImage = ({ setImageUrl }) => {
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setUploading(true);
      const storageRef = ref(storage, `eventImages/${file.name}`);

      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef); // Get the download URL after upload
        setImageUrl(url); // Pass the URL back to CreateEvent
        
      } catch (error) {
        console.error("Error uploading image:", error);
       
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="mb-4">
        <label className="label">Upload Image</label>

        <input type="file"  accept="image/*"  onChange={handleImageUpload}
          className="file-input file-input-bordered file-input-accent w-full max-w-xs" />
      
      {uploading && <p className='text-green-400'>Uploading...</p>}
    

    </div>
  );
};

export default UploadImage;
