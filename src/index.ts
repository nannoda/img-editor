import {bindElement} from "./Binder";

async function main() {
  const root = document.getElementById("root") as HTMLDivElement;
  root.innerHTML = "";
  bindElement(root);
}

main().then(() => {
  console.log("main done");
})