import React from "react";

export interface EditorScreenProps {
    image: HTMLImageElement;
}

export function EditorScreen(props: EditorScreenProps) {
    return (
        <div>
            <h1>Editor</h1>

            <img src={props.image.src}/>
        </div>
    );
}