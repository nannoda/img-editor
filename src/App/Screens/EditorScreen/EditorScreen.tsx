import React, {useEffect} from "react";
import {Divider, Typography} from "@mui/material";
import {ImperativePanelHandle, Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import {EditorImageViewer} from "./EditorImageViewer";

export interface EditorScreenProps {
    image: HTMLImageElement;
}

export function EditorScreen(props: EditorScreenProps) {


    const [canvasWidth, setCanvasWidth] = React.useState(0);
    const [canvasHeight, setCanvasHeight] = React.useState(0);
    const canvasDivRef = React.useRef<HTMLDivElement>(null);


    function handleOnDrag() {
        console.log("EditorScreen: handleOnDrag");

        if (canvasDivRef.current === null) {
            return;
        }
        const canvasDiv = canvasDivRef.current;
        const canvasDivWidth = canvasDiv.clientWidth;
        const canvasDivHeight = canvasDiv.clientHeight;
        setCanvasWidth(canvasDivWidth);
        setCanvasHeight(canvasDivHeight);
    }

    useEffect(() => {
        handleOnDrag();
    });

    // add a resize listener to the window
    useEffect(() => {
        window.addEventListener("resize", handleOnDrag);
        return () => {
            window.removeEventListener("resize", handleOnDrag);
        };
    });

    return (
        <PanelGroup direction="horizontal">
            <Panel
            onResize={
                () => {
                    console.log("EditorScreen: onResize");
                    handleOnDrag();
                }
            }>
                <div ref={
                    canvasDivRef
                }
                style={
                    {
                        width: "100%",
                        height: "100%",
                    }
                }
                >
                    <EditorImageViewer
                        image={props.image}
                        canvasWidth={canvasWidth}
                        canvasHeight={canvasHeight}
                    />
                </div>
            </Panel>
            <PanelResizeHandle onDragging={handleOnDrag}>
                <Divider orientation="vertical"/>
            </PanelResizeHandle>
            <Panel defaultSize={25}>
                <Typography>Panel 2</Typography>
            </Panel>
        </PanelGroup>
    );
}