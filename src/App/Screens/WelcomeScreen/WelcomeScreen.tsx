import React from 'react';
import {Button, IconButton, Snackbar, Typography} from "@mui/material";
import {Close, ContentPaste, OpenInBrowser} from "@mui/icons-material";
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
    let item = clipboardContents[0];

    for (const clipboardItem of clipboardContents) {
        if (clipboardItem.types.includes("image/png")) {
            item = clipboardItem;
            break;
        }
    }

    if (!item.types.includes("image/png")) {
        throw new Error("Clipboard does not contain an image.");
    }
    const blob = await item.getType("image/png");

    const image = new Image();
    image.src = URL.createObjectURL(blob);
    image.onload = () => {
        props.onImageDone(image);
    }

}

export function WelcomeScreen(props: WelcomeScreenProps) {
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");

    function showError(error: Error) {
        // alert(error.message);
        console.log(error.message)
        setSnackbarMessage(error.message);
        setSnackbarOpen(true);
    }
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton onClick={handleClose} size="small" aria-label="close" color="inherit">
                <Close fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );


    return (
        <DropZone
            onDrop={
                (image: HTMLImageElement) => {
                    props.onImageDone(image);
                }
            }>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleClose}
                message={snackbarMessage}
                action={action}
            ></Snackbar>
            <Button variant="outlined"
                    startIcon={<OpenInBrowser/>}
                    onClick={
                        async () => {
                            await openImageButtonOnClick(props);
                        }
                    }>
                Open Image
            </Button>
            <br/>
            <Button variant="outlined"
                    startIcon={<ContentPaste/>}
                    onClick={
                        async () => {
                            try {
                                await pasteImageButtonOnClick(props);
                            } catch (error : unknown) {
                                if (!(error instanceof Error)) {
                                    throw error;
                                }
                                showError(error as Error);
                            }
                        }
                    }>
                Paste Image
            </Button>
        </DropZone>
    );
}