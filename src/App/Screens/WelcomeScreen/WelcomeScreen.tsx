import React from 'react';
import {Box} from "@mui/material";
import {DropZone} from "./DropZone";
import {IEditorPlugin} from "../../IEditorPlugin";

export interface WelcomeScreenProps {
    onImageDone: (
        image: HTMLImageElement,
    ) => void;
    plugins: IEditorPlugin[];
}

export function WelcomeScreen(props: WelcomeScreenProps) {

    const pluginNodes = props.plugins.map((plugin) => {
        if (plugin.getWelcomeScreenItem) {
            return plugin.getWelcomeScreenItem(props);
        }
    })

    const items: React.ReactNode[] = [];
    for (let i = 0; i < pluginNodes.length; i++) {
        const node = pluginNodes[i];
        if (node) {
            items.push(node);
            if (i !== pluginNodes.length - 1) {
                // items.push(<br/>);
                items.push((
                    <Box
                        style={
                            {
                                height: "5px"
                            }
                        }
                    ></Box>
                ))
            }
        }
    }
    return (
        <DropZone
            onDrop={
                (image: HTMLImageElement) => {
                    props.onImageDone(image);
                }
            }>
            {...items}
        </DropZone>
    );
}