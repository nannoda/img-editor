import {createRoot} from "react-dom/client";
import * as React from "react";
import ImageEditor from "./App/ImageEditor";


export function bindElement(element: HTMLElement) {
    const root = createRoot(element);
    root.render(
        <React.StrictMode>
            <ImageEditor
            //     image={
            //     (() => {
            //         const image = new Image();
            //         image.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Cat_poster_1.jpg/1200px-Cat_poster_1.jpg";
            //         return image;
            //     })()
            // }
            />
        </React.StrictMode>
    );
    console.log("Binder: bindElement");
}