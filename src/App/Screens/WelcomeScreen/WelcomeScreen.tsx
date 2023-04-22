import React from 'react';
import {Box, Button, IconButton, Snackbar, Typography} from "@mui/material";
import {Close, ContentPaste, OpenInBrowser} from "@mui/icons-material";
import {blue} from '@mui/material/colors';
import {DropZone} from "./DropZone";
import {showError} from "../../MessageSnackbar";
import {EditorPlugin} from "../../EditorPlugin";

export interface WelcomeScreenProps {
    onImageDone: (
        image: HTMLImageElement,
    ) => void;
    plugins: EditorPlugin[];
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