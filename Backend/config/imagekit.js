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

const deleteImages = async (fileIds = []) => {
  if (!fileIds.length) return [];
  const results = [];

  for (const id of fileIds) {
    try {
      const res = await deleteImage(id);
      results.push({ fileId: id, status: "deleted", result: res });
    } catch (err) {
      results.push({ fileId: id, status: "error", error: err.message });
    }
  }

  return results;
};

module.exports = { uploadImage, deleteImage, deleteImages };
