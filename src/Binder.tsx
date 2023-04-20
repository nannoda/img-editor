import {createRoot} from "react-dom/client";
import * as React from "react";
import ImageEditor from "./App/ImageEditor";
import {colors, createTheme} from "@mui/material";

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
                theme={
                createTheme(
                    {
                        palette: {
                            primary: {
                                main: colors.cyan[900],
                            }
                        }
                    }
                )
                }
                // image={testImage}
            />
        </React.StrictMode>
    );
    console.log("Binder: bindElement");
}