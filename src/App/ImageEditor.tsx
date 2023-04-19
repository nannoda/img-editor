import * as React from 'react';
import {WelcomeScreen} from "./WelcomeScreen";
import {EditorScreen} from "./EditorScreen";
import {SetupDependencies} from "./SetupDependencies";

SetupDependencies();

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