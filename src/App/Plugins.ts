import {IEditorPlugin} from "./IEditorPlugin";
import {MessageSnackbarPlugin} from "./MessageSnackbar";
import {OpenFilePlugin} from "./Plugins/OpenFilePlugin";
import {PasteImagePlugin} from "./Plugins/PasteImagePlugin";

export const defaultPlugins: IEditorPlugin[] = [
  new MessageSnackbarPlugin(),
  new OpenFilePlugin(),
  PasteImagePlugin(),
];

export const fullPlugins: IEditorPlugin[] = [
  new MessageSnackbarPlugin(),
  new OpenFilePlugin(),
  PasteImagePlugin(),
];