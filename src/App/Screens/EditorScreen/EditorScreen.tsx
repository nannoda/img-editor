import React from "react";
import {Box, Button, Divider, Tab, Tabs} from "@mui/material";
import {IEditorPlugin} from "../../IEditorPlugin";
import {ImageEditWithCanvas} from "./ImageEditWithCanvas";
import {ViewerCanvasState} from "./EditorImageViewer";

export interface EditorScreenProps {
  image: HTMLImageElement;
  onEditDone?: (image: HTMLImageElement) => void;
  plugins: IEditorPlugin[];
}

export function EditorScreen(props: EditorScreenProps) {
  const [value, setValue] = React.useState(0);
  const [canvasState, setCanvasState] = React.useState(null as ViewerCanvasState | null);

  const [plugin, setPlugin] = React.useState(null as IEditorPlugin | null);


  const tabs: React.ReactNode[] = [];

  console.log(props.plugins)
  for (const plugin of props.plugins) {
    if (!canvasState) {
      console.log("EditorScreen: !canvasState")
      break;
    }
    if (!plugin.getEditorScreenItem) {
      console.log("EditorScreen: !plugin.getEditorScreenItem")
      continue;
    }
    const editorScreenItem = plugin.getEditorScreenItem(
      canvasState as ViewerCanvasState
    );
    console.log("EditorScreen: editorScreenItem", editorScreenItem.displayName);
    tabs.push(
      <Tab label={editorScreenItem.displayName}
           onClick={
             () => {
               setPlugin(plugin);
               console.log("EditorScreen: setPlugin")
             }
           }
           key={editorScreenItem.displayName}
      />
    );
  }

  const panel = <Box style={
    {

    }
  }>
    {
      (
        () => {
          if (!plugin) {
            return null;
          }
          if (!canvasState) {
            return null;
          }
          if (!plugin.getEditorScreenItem) {
            return null;
          }
          const editorScreenItem = plugin.getEditorScreenItem(
            canvasState as ViewerCanvasState
          );
          return (
            editorScreenItem.toolPanel
          );
        }
      )()
    }
  </Box>;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box
      style={
        {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }
      }
    >
      <Box>
        <Tabs value={value} onChange={handleChange}>
          {tabs}
        </Tabs>
      </Box>
      <Divider/>
      <ImageEditWithCanvas
        image={props.image}
        panel={
          panel
        }
        canvas={
          {
            state: canvasState,
            setState: setCanvasState,
          }
        }
      />
    </Box>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index} = props;
  return (
    <div
      hidden={value !== index}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {
        value === index && (
          children
        )
      }
    </div>
  );
}
