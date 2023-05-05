import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import {CanvasStateManager, EditorImageViewer} from "./EditorImageViewer";
import {Divider, Typography} from "@mui/material";
import React, {useEffect} from "react";

export interface ImageEditWithCanvasProps {
  image: HTMLImageElement;
  panel: React.ReactNode;
  canvas: CanvasStateManager;
}

export function ImageEditWithCanvas(props: ImageEditWithCanvasProps) {
  if (!props.image.complete) {
    return (
      <Typography>
        Loading image...
      </Typography>
    );
  }
  const [canvasWidth, setCanvasWidth] = React.useState(0);
  const [canvasHeight, setCanvasHeight] = React.useState(0);

  const canvasDivRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("resize", handleCanvasSizeChange);
    return () => {
      window.removeEventListener("resize", handleCanvasSizeChange);
    };
  });

  function handleCanvasSizeChange() {
    console.log("EditorScreen: handleCanvasSizeChange");
    if (canvasDivRef.current === null) {
      return;
    }
    const canvasDiv = canvasDivRef.current;
    const canvasDivWidth = canvasDiv.clientWidth;
    const canvasDivHeight = canvasDiv.clientHeight;
    setCanvasWidth(canvasDivWidth);
    setCanvasHeight(canvasDivHeight);
  }

  return (
    <PanelGroup direction="horizontal" style={
      {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }
    }>
      <Panel
        onResize={
          () => {
            handleCanvasSizeChange();
          }
        }>
        <div ref={canvasDivRef}
             style={
               {
                 width: "100%",
                 height: "100%",
                 overflow: "hidden",
               }
             }
        >
          <EditorImageViewer
            image={props.image}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            canvas={props.canvas}
          />
        </div>
      </Panel>
      <PanelResizeHandle onDragging={handleCanvasSizeChange}>
        <div
          style={
            {
              width: "10px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start"
            }
          }
        >
          <Divider orientation="vertical"/>
        </div>
      </PanelResizeHandle>
      <Panel defaultSize={25}>
        {props.panel}
      </Panel>
    </PanelGroup>
  )
}