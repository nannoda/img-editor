import {IEditorPlugin} from "./IEditorPlugin";
import {MessageSnackbarPlugin} from "./MessageSnackbar";
import {OpenFilePlugin} from "./Plugins/OpenFilePlugin";
import {PasteImagePlugin} from "./Plugins/PasteImagePlugin";
import {TestPlugin} from "./Plugins/TestPlugin";

export const defaultPlugins: IEditorPlugin[] = [
  new MessageSnackbarPlugin(),
  new OpenFilePlugin(),
  PasteImagePlugin(),
  new TestPlugin(),
];

export const fullPlugins: IEditorPlugin[] = [
  new MessageSnackbarPlugin(),
  new OpenFilePlugin(),
  PasteImagePlugin(),
];