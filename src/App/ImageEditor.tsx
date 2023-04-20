import * as React from 'react';
import {useEffect} from "react";
import {SetupDependencies} from "./SetupDependencies";
import {WelcomeScreen} from "./Screens/WelcomeScreen/WelcomeScreen";
import {EditorScreen} from "./Screens/EditorScreen/EditorScreen";
import {Box, Container, createTheme, Theme, ThemeProvider} from "@mui/material";

SetupDependencies();

export interface ImageEditorProps {
    image?: HTMLImageElement;
    theme?: Theme;
}

function ImageEditor(props: ImageEditorProps) {
    if (props.image === undefined) {
        console.log("ImageEditor: image is undefined");
    }

    const [image, setImage] = React.useState(undefined as HTMLImageElement | undefined);

    function handleImageDone(image: HTMLImageElement) {
        console.log("ImageEditor: handleImageDone")
        setImage(image);
    }

    if (props.image) {
        props.image.onload = () => {
            console.log("ImageEditor: props.image.onload")
            setImage(props.image);
        }
    }
    let theme = props.theme;
    if (theme === undefined) {
        theme = createTheme()
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
                style={
                    {
                        width: "100%",
                        height: "100%",
                        // overflow: "scroll",
                    }
                }
            >
                {
                    image === undefined ?
                        <WelcomeScreen onImageDone={handleImageDone}/> :
                        <EditorScreen image={image}/>
                }
            </Box>
        </ThemeProvider>

    );
}

export default ImageEditor;