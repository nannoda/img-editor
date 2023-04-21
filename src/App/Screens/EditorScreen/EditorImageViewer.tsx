import React from "react";

export interface EditorImageViewerProps {
  image: HTMLImageElement;
  canvasWidth: number;
  canvasHeight: number;
}

export function EditorImageViewer(props: EditorImageViewerProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    if (canvasRef.current === null) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context === null) {
      return;
    }
    canvas.width = props.canvasWidth;
    canvas.height = props.canvasHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(props.image, 0, 0, canvas.width, canvas.height);
    for (let i = 0; i < canvas.width; i += 10) {
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, canvas.height);
      context.stroke();
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