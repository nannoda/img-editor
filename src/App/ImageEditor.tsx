import * as React from 'react';
import {SetupDependencies} from "./SetupDependencies";
import {WelcomeScreen} from "./Screens/WelcomeScreen/WelcomeScreen";
import {EditorScreen} from "./Screens/EditorScreen/EditorScreen";
import {Box, createTheme, Theme, ThemeProvider, useTheme} from "@mui/material";
import {IEditorPlugin} from "./IEditorPlugin";
import {defaultPlugins} from "./Plugins";

SetupDependencies();

export interface ImageEditorProps {
  image?: HTMLImageElement;
  theme?: Theme;
  onEditDone?: (image: HTMLImageElement) => void;
  plugins?: IEditorPlugin[];
}



function ImageEditor(props: ImageEditorProps) {
  if (props.image === undefined) {
    console.log("ImageEditor: image is undefined");
  }

  const [image,
    setImage] =
    React.useState(undefined as HTMLImageElement | undefined);
  function handleImageDone(image: HTMLImageElement) {
    console.log("ImageEditor: handleImageDone")
    setImage(image);
  }

  if (props.image) {

    if (props.image.complete && image === undefined) {
      // console.log("ImageEditor: props.image.complete")
      setImage(props.image);
    } else {
      console.log("ImageEditor: !props.image.complete")
      props.image.onload = () => {
        console.log("ImageEditor: props.image.onload")
        setImage(props.image);
      }
    }
  }
  let theme = props.theme;
  if (theme === undefined) {
    theme = useTheme() || createTheme();
  }

  const plugins = props.plugins || defaultPlugins;

  const items = plugins.map((plugin) => {
    if (plugin.getGlobalItem) {
      return plugin.getGlobalItem(props);
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <Box
        style={
          {
            width: "100%",
            height: "100%",
          }
        }>
        {...items}
        {
          image === undefined ?
            <WelcomeScreen onImageDone={handleImageDone} plugins={plugins}/> :
            <EditorScreen image={image} onEditDone={props.onEditDone} plugins={plugins}/>
        }
      </Box>
    </ThemeProvider>
  );
}

export default ImageEditor;