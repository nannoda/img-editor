import React, {useEffect} from "react";
import {Divider, Typography} from "@mui/material";
import {ImperativePanelHandle, Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import {EditorImageViewer} from "./EditorImageViewer";

export interface EditorScreenProps {
    image: HTMLImageElement;

}

export function EditorScreen(props: EditorScreenProps) {

    function handleOnDrag() {
        console.log("EditorScreen: handleOnDrag");
    }


    return (
        <PanelGroup direction="horizontal">
            <Panel >
                <EditorImageViewer
                    image={props.image}
                    resizeCallback={() => {

                    }}
                />
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