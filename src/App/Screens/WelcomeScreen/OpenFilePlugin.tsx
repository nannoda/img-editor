import {EditorPlugin} from "../../EditorPlugin";
import {WelcomeScreenProps} from "./WelcomeScreen";
import {OpenInBrowser} from "@mui/icons-material";
import {Button} from "@mui/material";
import React from "react";

export function OpenFilePlugin(): EditorPlugin {
  return {
    getWelcomeScreenItem: (props) => {
      return <OpenFile
        {...props}
      />
    }
  }
}


async function openImageButtonOnClick(props: WelcomeScreenProps) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (event: Event) => {
    if (event.target === null) {
      throw new Error("Target is null");
    }
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("Target is not HTMLInputElement");
    }
    if (event.target.files === null) {
      throw new Error("Files is null");
    }
    if (event.target.files.length === 0) {
      throw new Error("Files length is 0");
    }
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const image = new Image();
      image.src = event.target.result;
      image.onload = () => {
        props.onImageDone(image);
      };
    }
    reader.readAsDataURL(file);
  };
  input.click();
}

function OpenFile(props:WelcomeScreenProps) {
  return (
    <Button variant="outlined"
            startIcon={<OpenInBrowser/>}
            onClick={
              async () => {
                await openImageButtonOnClick(props);
              }
            }>
      Open Image
    </Button>
  )

}