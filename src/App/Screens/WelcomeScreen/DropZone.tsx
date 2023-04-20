import React from "react";
import {blue} from "@mui/material/colors";

export interface DropZoneProps {
    onDrop: (file: HTMLImageElement) => void;
    children: React.ReactNode;

}

export function DropZone(props: DropZoneProps){
    const [dragging, setDragging] = React.useState(false);
    return (
        <div
            style={
                {
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: dragging ? blue[50]: "white",
                }
            }
            onDragEnter={
                (event: React.DragEvent<HTMLDivElement>) => {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log("DragEnter")
                    setDragging(true);
                }
            }
            onDragLeave={
                (event: React.DragEvent<HTMLDivElement>) => {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log("DragEnd")
                    setDragging(false);
                }
            }
            onDragOver={
                (event: React.DragEvent<HTMLDivElement>) => {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log("DragOver")
                    setDragging(true);
                }
            }
            onDrop={
                (event: React.DragEvent<HTMLDivElement>) => {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log("Drop")
                    setDragging(false);
                    const files = event.dataTransfer.files;
                    if (files.length === 0) {
                        console.log("Files length is 0")
                        return;
                    }
                    const file = files[0];
                    const reader = new FileReader();
                    reader.onload = (event: any) => {
                        const image = new Image();
                        image.src = event.target.result;
                        image.onload = () => {
                            props.onDrop(image);
                        };
                    }
                    reader.readAsDataURL(file);
                }
            }
        >
            {props.children}
        </div>
    );

}