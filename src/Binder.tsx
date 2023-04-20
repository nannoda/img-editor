import {createRoot} from "react-dom/client";
import * as React from "react";
import ImageEditor from "./App/ImageEditor";

const testImage =(
    (() => {
        const image = new Image();
        image.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Pleiades_large.jpg/1024px-Pleiades_large.jpg";
        return image;
    })()
)

export function bindElement(element: HTMLElement) {
    const root = createRoot(element);
    root.render(
        <React.StrictMode>
            <ImageEditor
                // image={testImage}
            />
        </React.StrictMode>
    );
    console.log("Binder: bindElement");
}