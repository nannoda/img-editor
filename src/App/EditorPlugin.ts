import React from "react";
import {WelcomeScreenProps} from "./Screens/WelcomeScreen/WelcomeScreen";
import {ImageEditorProps} from "./ImageEditor";
import {EditorScreenProps} from "./Screens/EditorScreen/EditorScreen";

export interface EditorPlugin {
  // name: string;
  getGlobalItem?: (props: ImageEditorProps) => React.ReactNode;
  getWelcomeScreenItem?: (props: WelcomeScreenProps) => React.ReactNode;
  getSettingsScreenItem?: () => React.ReactNode;
  getEditorScreenItem?: (props:EditorScreenProps) => React.ReactNode;
}