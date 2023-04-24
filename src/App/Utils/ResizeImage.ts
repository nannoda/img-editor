import {imagePromise} from "./ImagePromise";

export async function resizeImage(img: HTMLImageElement,
                             targetX: number, targetY: number): Promise<HTMLImageElement> {
  const tmpCanvas = document.createElement('canvas');
  const tmpCtx = tmpCanvas.getContext('2d');
  if (!tmpCtx) throw new Error('Could not create canvas context');
  tmpCanvas.width = targetX;
  tmpCanvas.height = targetY;
  tmpCtx.drawImage(img, 0, 0, targetX, targetY);

  const newImg = new Image();
  newImg.src = tmpCanvas.toDataURL();

  return imagePromise(newImg);
}