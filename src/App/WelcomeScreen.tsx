import React from 'react';
import {Button, Typography} from "@mui/material";
import {OpenInBrowser} from "@mui/icons-material";

export interface WelcomeScreenProps {
    onImageDone: (
        image: HTMLImageElement,
    ) => void;
}

function openImageButtonOnClick(props: WelcomeScreenProps) {
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

export function WelcomeScreen(props: WelcomeScreenProps) {
    return (
        <div>
            <Typography>Welcome to Image Editor</Typography>
            <Typography>Please select an image to edit</Typography>
            <Button variant="outlined"
                    startIcon={<OpenInBrowser/>}
                    onClick={
                        () => {
                            openImageButtonOnClick(props);
                        }
                    }>
                Open Image
            </Button>
        </div>
    );
}