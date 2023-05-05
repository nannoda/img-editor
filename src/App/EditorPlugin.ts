import {EditorScreenItem, IEditorPlugin} from "./IEditorPlugin";
import {EditorScreenProps} from "./Screens/EditorScreen/EditorScreen";
import {WelcomeScreenProps} from "./Screens/WelcomeScreen/WelcomeScreen";
import {ImageEditorProps} from "./ImageEditor";

export abstract class EditorPlugin implements IEditorPlugin {
  get name(): string {
    return this.constructor.name;
  }

  getGlobalItem?(props: ImageEditorProps): React.ReactNode;

  getWelcomeScreenItem?(props: WelcomeScreenProps): React.ReactNode;

  getSettingsScreenItem?(): React.ReactNode;

  getEditorScreenItem?(props: EditorScreenProps): EditorScreenItem;
}