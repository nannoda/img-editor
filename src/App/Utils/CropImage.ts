import {imagePromise} from "./ImagePromise";

export async function cropImage(image: HTMLImageElement,
                                offsetX: number, offsetY: number,
                                width: number, height: number): Promise<HTMLImageElement> {
  const tmpCanvas = document.createElement('canvas');
  const tmpCtx = tmpCanvas.getContext('2d');
  if (!tmpCtx) throw new Error('Could not create canvas context');
  tmpCanvas.width = width;
  tmpCanvas.height = height;
  tmpCtx.drawImage(image, offsetX, offsetY, width, height, 0, 0, width, height);

  const newImg = new Image();
  newImg.src = tmpCanvas.toDataURL();

  return imagePromise(newImg);
}