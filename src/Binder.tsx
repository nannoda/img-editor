import {createRoot} from "react-dom/client";
import * as React from "react";
import ImageEditor from "./ImageEditor";

export function bindElement(element: HTMLElement) {
    const root = createRoot(element);
    root.render(
        <React.StrictMode>
            <ImageEditor/>
        </React.StrictMode>
    );
    console.log("App.tsx: App() rendered");
}