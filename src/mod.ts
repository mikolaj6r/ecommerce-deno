import * as flags from "https://deno.land/std/flags/mod.ts";

import { Application, Router, send, Context } from "https://deno.land/x/oak/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
  ViewConfig
} from "https://deno.land/x/view_engine/mod.ts";

const DEFAULT_PORT = 8080;
const argPort = flags.parse(Deno.args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

if (isNaN(port)) {
  console.error("Port is not a number.");
  Deno.exit(1);
}

const app = new Application();
const router = new Router();

const denjuckEngine = await engineFactory.getDenjuckEngine();
const oakAdapter = await adapterFactory.getOakAdapter();

const viewConfig: ViewConfig = {
  viewRoot: "./views",
}

// simple static files server
app.use(async (ctx, next) => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/static`,
  });
  next();
});

// view middleware
app.use(viewEngine(oakAdapter, denjuckEngine, viewConfig));


router.get("/", (ctx) => {
  ctx.render("index.html", { data: { msg: "World" } });
});

//Adding middleware to require our router
app.use(router.routes());
app.use(router.allowedMethods());

console.log("App is listening to port: 8000");
await app.listen({ port: 8000 });
