// import imageCompression from "browser-image-compression";

export const CANVAS_HEIGHT = 2160;
export const CANVAS_WIDTH = 3840;

export function downloadFile(dataURL: string, filename: string) {
  var link = document.createElement("a");
  link.href = dataURL;
  link.download = filename;
  link.click();
}

// export async function compressAndDownload(dataURL: string, filename: string) {
//   let imageFile = await imageCompression.getFilefromDataUrl(dataURL, filename);
//   // console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
//   // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

//   const options = {
//     maxSizeMB: 2,
//     maxWidthOrHeight: 1920,
//     useWebWorker: true,
//   };
//   try {
//     const compressedFile = await imageCompression(imageFile, options);
//     console.log(
//       "compressedFile instanceof Blob",
//       compressedFile instanceof Blob
//     ); // true
//     console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
//     let compDataURL = await imageCompression.getDataUrlFromFile(compressedFile);
//     downloadFile(compDataURL, filename);

//     // await uploadToServer(compressedFile); // write your own logic
//   } catch (error) {
//     console.log(error);
//   }
// }

export function getResizedImageDataURL(canvas: HTMLCanvasElement): string {
  var resizedCanvas = document.createElement("canvas");
  var resizedContext = resizedCanvas.getContext("2d");

  resizedCanvas.height = CANVAS_HEIGHT / 2;
  resizedCanvas.width = CANVAS_WIDTH / 2;

  resizedContext?.drawImage(canvas, 0, 0, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  return resizedCanvas.toDataURL();
}

export function openImageInNewTab(dataURL: string) {
  let win = window.open("about:blank");
  let image = new Image();
  image.src = dataURL;
  setTimeout(function () {
    win?.document.write(image.outerHTML);
  }, 0);
}

export function backgroundImageCalcScale(image: HTMLImageElement): number {
  let imageScaleX = CANVAS_WIDTH / image.width;
  let imageScaleY = CANVAS_HEIGHT / image.height;
  return image.height * imageScaleX < CANVAS_HEIGHT ? imageScaleY : imageScaleX;
}

export function imageGetCenterPoint(image: HTMLImageElement, scale: number) {
  let centerX = CANVAS_WIDTH / 2 - (image.width * scale) / 2;
  let centerY = CANVAS_HEIGHT / 2 - (image.height * scale) / 2;
  return { x: centerX, y: centerY };
}
