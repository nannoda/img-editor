import * as React from 'react';
import {Button, Typography} from "@mui/material";
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
import {Label, ShoppingCartRounded} from "@mui/icons-material";

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
    image?: string;
}
function ImageEditor(props: ImageEditorProps){
    if (props.image === undefined) {
        console.log("ImageEditor: image is undefined");
    }
    return (
        <div>
            <Typography>Image Editor</Typography>
            <Button variant="text" startIcon={<ShoppingCartRounded />}>
                Add to Cart
            </Button>
            <Button variant="contained" startIcon={<ShoppingCartRounded />}>
                Add to Cart
            </Button>
            <Button variant="outlined" startIcon={<ShoppingCartRounded />}>
                Add to Cart
            </Button>
            <img src={props.image}/>
        </div>
    );
}
export default ImageEditor;