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

module.exports = { uploadImage };
