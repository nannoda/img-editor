import {IEditorPlugin} from "../IEditorPlugin";
import React from "react";
import {ContentPaste} from "@mui/icons-material";
import {showError} from "../MessageSnackbar";
import {Button} from "@mui/material";
import {WelcomeScreenProps} from "../Screens/WelcomeScreen/WelcomeScreen";

export function PasteImagePlugin(): IEditorPlugin {
  return {
    getWelcomeScreenItem: (props: WelcomeScreenProps) => {
      return <PasteButton {...props} />;
    }
  };
}

async function pasteImageButtonOnClick(props: WelcomeScreenProps) {
  const permission = await navigator.permissions.query({
    // @ts-ignore
    name: "clipboard-read",
  });
  if (permission.state === "denied") {
    throw new Error("Not allowed to read clipboard.");
  }
  const clipboardContents = await navigator.clipboard.read();
  if (clipboardContents.length === 0) {
    throw new Error("Clipboard is empty.");
  }
  let item = clipboardContents[0];

  for (const clipboardItem of clipboardContents) {
    if (clipboardItem.types.includes("image/png")) {
      item = clipboardItem;
      break;
    }
  }

  if (!item.types.includes("image/png")) {
    throw new Error("Clipboard does not contain an image.");
  }
  const blob = await item.getType("image/png");

  const image = new Image();
  image.src = URL.createObjectURL(blob);
  image.onload = () => {
    props.onImageDone(image);
  }
}

function PasteButton(props: WelcomeScreenProps) {
  return (
    <Button variant="outlined"
            startIcon={<ContentPaste/>}
            onClick={
              async () => {
                try {
                  await pasteImageButtonOnClick(props);
                } catch (error: unknown) {
                  if (!(error instanceof Error)) {
                    throw error;
                  }
                  showError(error as Error);
                }
              }
            }>
      Paste Image
    </Button>
  );
}