import axios from "axios";
import sizeOf from "image-size";

export async function getRemoteImageSize(imageUrl) {
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const dimensions = sizeOf(response.data);
  return dimensions; // { width, height, type }
}

export function getImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(img.src); // cleanup
    };

    img.onerror = (error) => reject(error);
  });
}

export function getImageSizeFromUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };

    img.onerror = (error) => reject(error);
  });
}
