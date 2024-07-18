const cloudinary = require('cloudinary').v2;
require("dotenv").config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (filePath) => {
    try {
      const result = await cloudinary.uploader.upload(filePath);
      return result.secure_url; // URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  
  
//   const createCourse = async (courseData, imagePath) => {
//     const imageUrl = await uploadImage(imagePath);
//     const newCourse = new Course({
//       ...courseData,
//       image: imageUrl, // Store the image URL in MongoDB
//     });
//     await newCourse.save();
//     console.log('Course created successfully:', newCourse);
//   };
  