import * as React from 'react';
import {useEffect} from "react";
import {SetupDependencies} from "./SetupDependencies";
import {WelcomeScreen} from "./Screens/WelcomeScreen/WelcomeScreen";
import {EditorScreen} from "./Screens/EditorScreen/EditorScreen";

SetupDependencies();

export interface ImageEditorProps {
    image?: HTMLImageElement;
}

function ImageEditor(props: ImageEditorProps) {
    if (props.image === undefined) {
        console.log("ImageEditor: image is undefined");
    }

    const [image, setImage] = React.useState(props.image);

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

    return (
        <div
            style={
                {
                    width: "100%",
                    height: "100%",
                    overflow: "scroll",
                }
            }
        >
            {
                image === undefined ?
                    <WelcomeScreen onImageDone={handleImageDone}/> :
                    <EditorScreen image={image}/>
            }
        </div>
    );
}

export default ImageEditor;