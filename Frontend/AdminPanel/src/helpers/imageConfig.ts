import axios from "axios";
import sizeOf from "image-size";
export interface ImageDimensions {
  width: number;
  height: number;
}

export async function getRemoteImageSize(imageUrl: string) {
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const dimensions = sizeOf(response.data);
  return dimensions;
}

export function getImageDimensions(file: File): Promise<ImageDimensions> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(img.src);
    };

    img.onerror = (error) => reject(error);
  });
}

export function getImageSizeFromUrl(url: string) {
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
