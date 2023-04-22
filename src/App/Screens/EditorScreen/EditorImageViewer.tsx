import React from "react";

export interface CanvasStateManager {
  state: ViewerCanvasState | null;
  setState: (props: ViewerCanvasState | null) => void;
}

interface EditorImageViewerProps {
  image: HTMLImageElement;
  canvasWidth: number;
  canvasHeight: number;
  canvas: CanvasStateManager;
}

export interface ViewerCanvasState {
  image: HTMLImageElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  imageScale: number;
  deviceScale: number;
  imageOffsetX: number;
  imageOffsetY: number;
  canvasPainter?: (props: ViewerCanvasState) => void;
}

function canvasUpdate(props: ViewerCanvasState) {
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
  if (props.canvasPainter) {
    props.canvasPainter(props);
  }
}

function setImageXY(props: ViewerCanvasState, x: number, y: number) {
  const rWidth = props.canvas.width;
  const rHeight = props.canvas.height;
  const imageWidth = props.image.width * props.imageScale;
  const imageHeight = props.image.height * props.imageScale;
  const targetX = x;
  const targetY = y;
  let touchBoundX = false;
  let touchBoundY = false;

  const imageTopIsVisible = targetY < rHeight;
  if (!imageTopIsVisible) {
    props.imageOffsetY = rHeight;
    touchBoundY = true;
  }
  const imageBottomIsVisible = targetY + imageHeight > 0;
  if (!imageBottomIsVisible) {
    props.imageOffsetY = 0 - imageHeight;
    touchBoundY = true;
  }
  const imageLeftIsVisible = targetX < rWidth;
  if (!imageLeftIsVisible) {
    props.imageOffsetX = rWidth;
    touchBoundX = true;
  }
  const imageRightIsVisible = targetX + imageWidth > 0;
  if (!imageRightIsVisible) {
    props.imageOffsetX = 0 - imageWidth;
    touchBoundX = true;
  }
  if (!touchBoundY) {
    props.imageOffsetY = targetY;
  }
  if (!touchBoundX) {
    props.imageOffsetX = targetX;
  }
}

function shiftImage(props: ViewerCanvasState, dx: number, dy: number) {
  const targetX = props.imageOffsetX - dx;
  const targetY = props.imageOffsetY - dy;
  setImageXY(props, targetX, targetY);
}

function scaleCanvas(props: ViewerCanvasState,
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
  const absoluteX = pointerX * props.deviceScale;
  const absoluteY = pointerY * props.deviceScale;

  const relativeX = absoluteX - props.imageOffsetX;
  const relativeY = absoluteY - props.imageOffsetY;

  setImageXY(props, absoluteX - relativeX * dScale, absoluteY - relativeY * dScale);
}

function setupOnScrollEvent(props: ViewerCanvasState) {
  const canvas = props.canvas;
  canvas.onwheel = (e) => {
    e.preventDefault();
    console.log(e.deltaX)
    // console.log(e.deltaY)
    if (e.ctrlKey) {
      console.log("ctrl")
      const dScale = 1 - e.deltaY / 500;
      const x = e.clientX - canvas.offsetLeft;
      const y = e.clientY - canvas.offsetTop;
      scaleCanvas(props, dScale, x, y);
    } else if (e.altKey) {
      shiftImage(props, e.deltaY, 0);
    } else {
      shiftImage(props, e.deltaX, e.deltaY);
    }
  }
}

function initializeCanvas(props: EditorImageViewerProps,
                          canvasState: ViewerCanvasState) {
  const currentScale = window.devicePixelRatio;
  canvasState.ctx.scale(currentScale, currentScale);
  canvasState.canvas.width = props.canvasWidth * currentScale;
  canvasState.canvas.height = props.canvasHeight * currentScale;
  canvasUpdate(canvasState);
  setupOnScrollEvent(canvasState);
}

function createCanvasState(props: EditorImageViewerProps, canvas: HTMLCanvasElement): ViewerCanvasState {
  console.log("EditorImageViewer: initializeCanvas")
  const context = canvas.getContext("2d");
  if (context === null) {
    throw new Error("EditorImageViewer: initializeCanvas: context is null");
  }
  return {
    canvas: canvas,
    ctx: context,
    image: props.image,
    imageScale: 1,
    imageOffsetX: props.canvasWidth * window.devicePixelRatio / 2 - props.image.width / 2,
    imageOffsetY: props.canvasHeight * window.devicePixelRatio / 2 - props.image.height / 2,
    deviceScale: window.devicePixelRatio,
  };
}

export function EditorImageViewer(props: EditorImageViewerProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    console.log("EditorImageViewer: useEffect")
    if (canvasRef.current === null) {
      return;
    }
    const canvas = canvasRef.current;
    if (props.canvas.state === null){
      props.canvas.setState(createCanvasState(props, canvas));
      return;
    }
    const canvasState = props.canvas.state as ViewerCanvasState;
    initializeCanvas(props, canvasState);
    let requestId = 0;
    const callUpdate = () => {
      canvasUpdate(canvasState);
      requestId = requestAnimationFrame(callUpdate)
    }
    callUpdate();
    return () => {
      console.log("EditorImageViewer: useEffect: cleanup")
      cancelAnimationFrame(requestId);
    }
  });

  return (
    <div
      style={
        {
          width: props.canvasWidth + "px",
          height: props.canvasHeight + "px",
        }
      }
    >
      <canvas
        ref={canvasRef}
        style={
          {
            width: "100%",
            height: "100%",
          }
        }
      ></canvas>
    </div>
  );
}