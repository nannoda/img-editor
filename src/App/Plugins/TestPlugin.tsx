import {EditorPlugin} from "../EditorPlugin";
import {EditorScreenProps} from "../Screens/EditorScreen/EditorScreen";
import {EditorScreenItem} from "../IEditorPlugin";
import React from "react";
import {ViewerCanvasState} from "../Screens/EditorScreen/EditorImageViewer";

export class TestPlugin extends EditorPlugin{
  getEditorScreenItem(props:ViewerCanvasState): EditorScreenItem {
    return {
      displayName: 'Test',
      toolPanel: [
        <div>
          <h1>Test</h1>
        </div>
      ],
      canvasPainter: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };
  }
}