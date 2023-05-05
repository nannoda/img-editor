import React from "react";
import {WelcomeScreenProps} from "./Screens/WelcomeScreen/WelcomeScreen";
import {ImageEditorProps} from "./ImageEditor";
import {EditorScreenProps} from "./Screens/EditorScreen/EditorScreen";

export interface EditorScreenItem {
  readonly displayName: string;
  readonly toolPanel: React.ReactNode[];
  readonly canvasPainter: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void;
}

export interface IEditorPlugin {
  readonly name: string;
  readonly getGlobalItem?: (props: ImageEditorProps) => React.ReactNode;
  readonly getWelcomeScreenItem?: (props: WelcomeScreenProps) => React.ReactNode;
  readonly getSettingsScreenItem?: () => React.ReactNode;
  readonly getEditorScreenItem?: (props: EditorScreenProps) => EditorScreenItem;
}