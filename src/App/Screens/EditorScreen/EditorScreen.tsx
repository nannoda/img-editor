import React from "react";
import {Box, Button, Divider, Tab, Tabs} from "@mui/material";
import {EditorPlugin} from "../../EditorPlugin";
import {ImageEditWithCanvas} from "./ImageEditWithCanvas";
import {ViewerCanvasState} from "./EditorImageViewer";

export interface EditorScreenProps {
  image: HTMLImageElement;
  onEditDone?: (image: HTMLImageElement) => void;
  plugins: EditorPlugin[];
}

export function EditorScreen(props: EditorScreenProps) {
  const [value, setValue] = React.useState(0);
  const [canvasState, setCanvasState] = React.useState(null as ViewerCanvasState | null);
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
          <Tab label="start"/>
          <Tab label="Item Two"/>
          <Tab label="Item Three"/>
        </Tabs>
      </Box>
      <Divider/>
      <TabPanel value={value} index={0}>
        <ImageEditWithCanvas
          image={props.image}
          panel={
          <Box>
            <Button>Button</Button>
          </Box>
        }
          canvas={
            {
              state: canvasState,
              setState: setCanvasState,
            }
          }
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
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