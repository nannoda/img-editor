import {bindElement} from "./Binder";

console.log("index.ts");


async function main(){
    const root = document.getElementById("root") as HTMLDivElement;
    bindElement(root);
}

main().then(() => {
    console.log("main done!");
})