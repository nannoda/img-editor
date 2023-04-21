import React from "react";

export interface EditorImageViewerProps {
  image: HTMLImageElement;
  canvasWidth: number;
  canvasHeight: number;
  imageScale?: number;
  imageOffsetX?: number;
  imageOffsetY?: number;
}

interface CanvasProps extends EditorImageViewerProps {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  imageScale: number;
  deviceScale: number;
  imageOffsetX: number;
  imageOffsetY: number;
}

function canvasUpdate(props: CanvasProps) {
  const ctx = props.ctx;
  const canvas = props.canvas;
  const width = canvas.width;
  const height = canvas.height;
  const scale = props.imageScale;
  const imageOffsetX = props.imageOffsetX;
  const imageOffsetY = props.imageOffsetY;

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(props.image,
    imageOffsetX, imageOffsetY,
    props.image.width * scale,
    props.image.height * scale
  );
}

function setImageXY(props:CanvasProps, x:number, y:number, margin:number=10) {
  // bound *= props.deviceScale * props.imageScale;
  const rWidth = props.canvas.width;
  const rHeight = props.canvas.height;
  const imageWidth = props.image.width * props.imageScale ;
  const imageHeight = props.image.height * props.imageScale ;
  const targetX = x;
  const targetY = y;
  let touchBoundX = false;
  let touchBoundY = false;

  const imageTopIsVisible = targetY < rHeight;
  console.log("imageTopIsVisible", imageTopIsVisible);
  if (!imageTopIsVisible) {
    props.imageOffsetY = rHeight;
    touchBoundY = true;
  }
  const imageBottomIsVisible = targetY + imageHeight > 0;
  console.log("imageBottomIsVisible", imageBottomIsVisible);
  if (!imageBottomIsVisible) {
    props.imageOffsetY = 0 - imageHeight;
    touchBoundY = true;
  }
  const imageLeftIsVisible = targetX < rWidth;
  if (!imageLeftIsVisible) {
    props.imageOffsetX = rWidth;
    touchBoundX = true;
  }
  console.log("imageLeftIsVisible", imageLeftIsVisible);
  const imageRightIsVisible = targetX + imageWidth > 0;
  if (!imageRightIsVisible) {
    props.imageOffsetX = 0 - imageWidth;
    touchBoundX = true;
  }
  console.log("imageRightIsVisible", imageRightIsVisible);

  if (!touchBoundY) {
    props.imageOffsetY = targetY;
  }
  if (!touchBoundX) {
    props.imageOffsetX = targetX;
  }
}
function shiftImage(props: CanvasProps, dx: number, dy: number) {
  const targetX = props.imageOffsetX - dx;
  const targetY = props.imageOffsetY - dy;
  setImageXY(props, targetX, targetY);
  // let touchBoundX = false;
  // let touchBoundY = false;
  // if (targetX < bound) {
  //   props.imageOffsetX = bound;
  //   touchBoundX = true;
  // }
  // if (targetY < bound) {
  //   props.imageOffsetY = bound;
  //   touchBoundY = true;
  // }
  // if (targetX + imageWidth > rWidth - bound) {
  //   props.imageOffsetX = rWidth - bound - imageWidth;
  //   touchBoundX = true;
  // }
  // if (targetY + imageHeight > rHeight - bound) {
  //   props.imageOffsetY = rHeight - bound - imageHeight;
  //   touchBoundY = true;
  // }
  // if (!touchBoundX) {
  //   props.imageOffsetX = targetX;
  // }
  // if (!touchBoundY) {
  //   props.imageOffsetY = targetY;
  // }
}

function scaleCanvas(props: CanvasProps,
                     dScale: number,
                     pointerX: number,
                     pointerY: number) {
  const targetScale = props.imageScale * dScale;

  if (targetScale < 0.1) {
    return;
  }
  if (targetScale > 10) {
    return;
  }

  props.imageScale = targetScale;
  // props.imageOffsetX = x - (x - props.imageOffsetX) * dScale;

  const absoluteX = pointerX * props.deviceScale;
  const absoluteY = pointerY * props.deviceScale;

  const relativeX = absoluteX - props.imageOffsetX;
  const relativeY = absoluteY - props.imageOffsetY;

  // props.imageOffsetX = absoluteX - relativeX * dScale;
  // props.imageOffsetY = absoluteY - relativeY * dScale;
  setImageXY(props, absoluteX - relativeX * dScale, absoluteY - relativeY * dScale);
}

function setupOnScrollEvent(props: CanvasProps) {
  const canvas = props.canvas;
  canvas.onwheel = (e) => {
    e.preventDefault();
    if (e.ctrlKey) {
      const dScale = 1 - e.deltaY / 500;
      const x = e.clientX - canvas.offsetLeft;
      const y = e.clientY - canvas.offsetTop;
      scaleCanvas(props, dScale, x, y);
    }else if (e.altKey) {
      // props.imageOffsetX -= e.deltaX;
      shiftImage(props, e.deltaY, 0);
    }else{
      // props.imageOffsetX -= e.deltaX;
      // props.imageOffsetY -= e.deltaY;
      shiftImage(props, e.deltaX, e.deltaY);
    }
    // const scale = 1 - e.deltaY / 1000;
    //
    // const targetScale = props.imageScale * scale;
    //
    // if (targetScale < 0.1) {
    //   return;
    // }
    // if (targetScale > 10) {
    //   return;
    // }
    //
    // props.imageScale = targetScale;
    //
    // const absoluteX = (e.clientX - canvas.offsetLeft) * props.deviceScale;
    // const absoluteY = (e.clientY - canvas.offsetTop) * props.deviceScale;
    //
    // const relativeX = absoluteX - props.imageOffsetX;
    // const relativeY = absoluteY - props.imageOffsetY;
    //
    // props.imageOffsetX = absoluteX - relativeX * scale;
    // props.imageOffsetY = absoluteY - relativeY * scale;
  }
}

function initializeCanvas(props: EditorImageViewerProps,
                          canvas: HTMLCanvasElement) {
  console.log("EditorImageViewer: initializeCanvas")
  const context = canvas.getContext("2d");
  if (context === null) {
    throw new Error("EditorImageViewer: initializeCanvas: context is null");
  }

  const canvasProps: CanvasProps = {
    canvas: canvas,
    ctx: context,
    image: props.image,
    canvasWidth: props.canvasWidth,
    canvasHeight: props.canvasHeight,
    imageScale: props.imageScale || 1,
    imageOffsetX: props.imageOffsetX ||
      props.canvasWidth * window.devicePixelRatio / 2 - props.image.width / 2,
    imageOffsetY: props.imageOffsetY ||
      props.canvasHeight * window.devicePixelRatio / 2 - props.image.height / 2,
    deviceScale: window.devicePixelRatio,
  }
  const currentScale = window.devicePixelRatio;
  context.scale(currentScale, currentScale);
  canvas.width = props.canvasWidth * currentScale;
  canvas.height = props.canvasHeight * currentScale;
  canvasUpdate(canvasProps);
  setupOnScrollEvent(canvasProps);
  return canvasProps;
}

export function EditorImageViewer(props: EditorImageViewerProps) {


  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    console.log("EditorImageViewer: useEffect")
    if (canvasRef.current === null) {
      return;
    }
    const canvas = canvasRef.current;
    const canvasProps = initializeCanvas(props, canvas);
    let requestId = 0;
    const callUpdate = () => {
      canvasUpdate(canvasProps);
      requestId = requestAnimationFrame(callUpdate)
    }
    callUpdate();

    return () => {
      console.log("EditorImageViewer: useEffect: cleanup")
      cancelAnimationFrame(requestId);
    }
  });

  return (
    <canvas
      ref={canvasRef}
      style={
        {
          width: `${props.canvasWidth}px`,
          height: `${props.canvasHeight}px`,
        }
      }
    ></canvas>
  );
}