import React from 'react';
import {Button, Typography} from "@mui/material";
import {ContentPaste, OpenInBrowser} from "@mui/icons-material";
import {blue} from '@mui/material/colors';
import {DropZone} from "./DropZone";

export interface WelcomeScreenProps {
    onImageDone: (
        image: HTMLImageElement,
    ) => void;
}

async function openImageButtonOnClick(props: WelcomeScreenProps) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: Event) => {
        if (event.target === null) {
            console.log("Target is null")
            return;
        }
        if (!(event.target instanceof HTMLInputElement)) {
            console.log("Target is not HTMLInputElement")
            return;
        }
        if (event.target.files === null) {
            console.log("Files is null")
            return;
        }
        if (event.target.files.length === 0) {
            console.log("Files length is 0")
            return;
        }
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event: any) => {
            const image = new Image();
            image.src = event.target.result;
            image.onload = () => {
                props.onImageDone(image);
            };
        }
        reader.readAsDataURL(file);
    };
    input.click();
}

async function pasteImageButtonOnClick(props: WelcomeScreenProps) {
    const permission = await navigator.permissions.query({
        // @ts-ignore
        name: "clipboard-read",
    });
    if (permission.state === "denied") {
        throw new Error("Not allowed to read clipboard.");
    }
    const clipboardContents = await navigator.clipboard.read();
    if (clipboardContents.length === 0) {
        throw new Error("Clipboard is empty.");
    }
    const clipboardItem = clipboardContents[0];
    if (!clipboardItem.types.includes("image/png")) {
        throw new Error("Clipboard does not contain an image.");
    }
    const blob = await clipboardItem.getType("image/png");
    
    const image = new Image();
    image.src = URL.createObjectURL(blob);
    image.onload = () => {
        props.onImageDone(image);
    }

}

export function WelcomeScreen(props: WelcomeScreenProps) {

    const [dragging, setDragging] = React.useState(false);
    return (
        <DropZone
            onDrop={
                (image: HTMLImageElement) => {
                    props.onImageDone(image);
                }
            }>
            <Button variant="outlined"
                    startIcon={<OpenInBrowser/>}
                    onClick={
                        async () => {
                            await openImageButtonOnClick(props);
                        }
                    }>
                Open Image
            </Button>
            <Button variant="outlined"
                    startIcon={<ContentPaste/>}
                    onClick={
                        async () => {
                            await pasteImageButtonOnClick(props);
                        }
                    }>
                Paste Image
            </Button>
        </DropZone>
    );
}