import * as esbuild from 'esbuild'

console.log("build.js is running");

async function main(
    mode = "watch" // "watch", "build", or "serve"
) {
    const buildCtx = await esbuild.context({
        entryPoints: ["src/index.ts"],
        outdir: "docs",
        sourcemap: true,
        bundle: true,
        logLevel: "info",
    })
    if (mode === "watch") {
        await buildCtx.watch()
        return
    }
    if (mode === "build") {
        await buildCtx.rebuild()
        return
    }
    if (mode === "serve") {
        await buildCtx.serve({
            servedir: "docs",
            port: 8080,
            host: "localhost",
        })
        return
    }
}

main().then(() => {
        console.log("build.js is done");
    }
);
