import {bindElement} from "./Binder";
(window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: true };
async function main() {
  const root = document.getElementById("root") as HTMLDivElement;
  root.innerHTML = "";
  bindElement(root);
}

main().then(() => {
  console.log("main done");
})