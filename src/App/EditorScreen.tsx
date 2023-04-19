import React from "react";
import {Divider, Typography} from "@mui/material";
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";

export interface EditorScreenProps {
    image: HTMLImageElement;
}

export function EditorScreen(props: EditorScreenProps) {
    return (
        <PanelGroup direction="horizontal">
            <Panel>
                <img src={props.image.src}
                style={
                    {
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",

                    }
                }
                />
            </Panel>
            <PanelResizeHandle>
                <Divider orientation="vertical"/>
            </PanelResizeHandle>
            <Panel defaultSize={25}>
                <Typography>Panel 2</Typography>
            </Panel>
        </PanelGroup>
    );
}