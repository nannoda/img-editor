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
  // canvasScale: number;
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

  console.log("EditorImageViewer: canvasUpdate")
}

function setupOnScrollEvent(props: CanvasProps) {
  const canvas = props.canvas;
  canvas.onwheel = (event) => {
    const dy = (event.deltaY * -1) / 100;
    const x = event.offsetX;
    const y = event.offsetY;


    console.log("EditorImageViewer: onwheel: dy: " + dy)
    console.log("EditorImageViewer: onwheel: x: " + x)
    console.log("EditorImageViewer: onwheel: y: " + y)

    props.imageScale += dy;
    props.imageOffsetX += (x - props.imageOffsetX) * dy;
    props.imageOffsetY -= (y - props.imageOffsetY) * dy;
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
    imageOffsetX: props.imageOffsetX || props.canvasWidth / 2 - props.image.width * (props.imageScale || 1) / 2,
    imageOffsetY: props.imageOffsetY || props.canvasHeight / 2 - props.image.height * (props.imageScale || 1) / 2,
  }
  canvas.width = props.canvasWidth;
  canvas.height = props.canvasHeight;
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