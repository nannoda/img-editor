import React, {useEffect} from "react";
import {Box, Divider, Tab, Tabs, Typography} from "@mui/material";
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import {EditorImageViewer} from "./EditorImageViewer";
import {EditorPlugin} from "../../EditorPlugin";
import {Crop, Start} from "@mui/icons-material";

export interface EditorScreenProps {
  image: HTMLImageElement;
  onEditDone?: (image: HTMLImageElement) => void;
  plugins: EditorPlugin[];
}

export function EditorScreen(props: EditorScreenProps) {
  const [canvasWidth, setCanvasWidth] = React.useState(0);
  const [canvasHeight, setCanvasHeight] = React.useState(0);
  const canvasDivRef = React.useRef<HTMLDivElement>(null);
  const tabBoxRef = React.useRef<HTMLDivElement>(null);

  function handleOnDrag() {
    console.log("EditorScreen: handleOnDrag");
    if (canvasDivRef.current === null) {
      return;
    }
    if (tabBoxRef.current === null) {
      return;
    }
    const canvasDiv = canvasDivRef.current;
    const tabBox = tabBoxRef.current;
    const canvasDivWidth = canvasDiv.clientWidth;
    const canvasDivHeight = canvasDiv.clientHeight - 4; // ok, this is a hack
    setCanvasWidth(canvasDivWidth);
    setCanvasHeight(canvasDivHeight);
  }
  // add a resize listener to the window
  useEffect(() => {
    window.addEventListener("resize", handleOnDrag);
    return () => {
      window.removeEventListener("resize", handleOnDrag);
    };
  });

  const testNode = (
    <PanelGroup direction="horizontal" style={
      {
        width: "100%",
        height: "100%", // 99% to avoid growing the window
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }
    }>
      <Panel
        onResize={
          () => {
            handleOnDrag();
          }
        }>
        <div ref={canvasDivRef}
             style={
               {
                 width: "100%",
                 height: "100%",
               }
             }
        >
          <EditorImageViewer
            image={props.image}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
          />
        </div>
      </Panel>
      <PanelResizeHandle onDragging={handleOnDrag}>
        <Divider orientation="vertical"/>
      </PanelResizeHandle>
      <Panel defaultSize={25}>
        <Typography>Panel 2</Typography>
      </Panel>
    </PanelGroup>
  )
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{
      width: '100%',
      height: "100%"
    }}
         style={
           {
             width: "100%",
             height: "100%",
             display: "flex",
             flexDirection: "column",
           }
         }
    >
      <Box ref={tabBoxRef}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="start"/>
          <Tab label="Item Two"/>
          <Tab label="Item Three"/>
        </Tabs>
      </Box>
      <Divider/>
      <TabPanel value={value} index={0}>
        {testNode}
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
  const {children, value, index, ...other} = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{
        width: "100%",
        height: "100%",
        //
        // display: value === index ? "block" : "none",

        // overflow: "hidden",
        // visibility: value === index ? "visible" : "hidden",
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