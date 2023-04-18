import * as React from 'react';
import {Button, Typography} from "@mui/material";
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
import {Label, OpenInBrowser, ShoppingCartRounded} from "@mui/icons-material";
import {WelcomeScreen} from "./WelcomeScreen";
import {EditorScreen} from "./EditorScreen";

// add <link
//   rel="stylesheet"
//   href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
// /> to index.html

const head = document.getElementsByTagName('head')[0];
const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap';
link.media = 'all';
head.appendChild(link);


export interface ImageEditorProps {
    image?: string | HTMLImageElement;
}

function ImageEditor(props: ImageEditorProps) {
    if (props.image === undefined) {
        console.log("ImageEditor: image is undefined");
    }
    if (typeof props.image === "string") {
        console.log("ImageEditor: image is string");
        props.image = new Image();
        props.image.src = (props.image as any);
    }
    if (props.image instanceof HTMLImageElement) {
        console.log("ImageEditor: image is HTMLImageElement");
    }

    const [image, setImage] = React.useState(props.image);

    function handleImageDone(image: HTMLImageElement) {
        console.log("ImageEditor: handleImageDone")
        setImage(image);
    }

    return (
        image === undefined ?
            <WelcomeScreen onImageDone={handleImageDone}/> :
            <EditorScreen image={image}/>
    );
}

export default ImageEditor;