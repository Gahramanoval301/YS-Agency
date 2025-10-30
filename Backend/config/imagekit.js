// services/imageService.js
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadImage(file) {
  if (!file) return null;

  const uploadResponse = await imagekit.upload({
    file: file.buffer.toString("base64"), // if file in memory
    fileName: file.originalname,
    folder: "/app",
  });

  return uploadResponse.url;
}
async function uploadImage(file) {
  if (!file) return null;

  const uploadResponse = await imagekit.upload({
    file: file.buffer.toString("base64"), // if file in memory
    fileName: file.originalname,
    folder: "/app",
  });

  console.log(uploadResponse);

  // Return both url and fileId
  return {
    url: uploadResponse.url,
    fileId: uploadResponse.fileId,
  };
}
const deleteImage = (fileId) => {
  return new Promise((resolve, reject) => {
    imagekit.deleteFile(fileId, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// async function uploadImage(file) {
//   if (!file) return null;

//   const uploadResponse = await imagekit.upload({
//     file: file.buffer.toString("base64"), // if file is in memory
//     fileName: file.originalname,
//     folder: "/app", // your folder
//   });

//   // Return both URL and fileId
//   return {
//     url: uploadResponse.url,
//     fileId: uploadResponse.fileId,
//   };
// }

module.exports = { uploadImage, deleteImage };
