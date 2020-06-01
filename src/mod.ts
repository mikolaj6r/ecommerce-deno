import * as flags from "https://deno.land/std/flags/mod.ts";

// auto load env vars
import "https://deno.land/x/dotenv/load.ts";

import { Application , Router, send, Middleware, RouterMiddleware } from "./deps.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
  ViewConfig
} from "https://deno.land/x/view_engine/mod.ts";
import { Session } from "https://deno.land/x/session/mod.ts";


import mainRouter from './routes/main.ts'
import adminRouter from './routes/admin.ts'

import notFound from './middleware/not_found.ts'
import database from './middleware/db.ts'

const DEFAULT_PORT = 8080;
const argPort = flags.parse(Deno.args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

if (isNaN(port)) {
  console.error("Port is not a number.");
  Deno.exit(1);
}

const app = new Application();

// Configuring Session for the Oak framework
const session = new Session({ framework: "oak" });
await session.init();


const denjuckEngine = await engineFactory.getDenjuckEngine();
const oakAdapter = await adapterFactory.getOakAdapter();

const viewConfig: ViewConfig = {
  viewRoot: "./views",
  viewExt: ".njk"
}


// session middleware
app.use(session.use()(session));

// view middleware
app.use(viewEngine(oakAdapter, denjuckEngine, viewConfig));

// provide database to context
app.use(database);

//Adding middleware to require our router
const parentRouter = new Router();

parentRouter.all("mainRouter", "(.*)", mainRouter.routes());
parentRouter.all("adminRouter", "/admin(/.*)?", adminRouter.routes());

app.use(parentRouter.routes());

app.use(notFound);

app.addEventListener("listen", () => {
  console.log("App is listening to port: 8000");

});

app.addEventListener("error", (error) => {
  console.error("Error", error);
});

try {
  await app.listen({ port: 8000 });
}
catch {
  console.error("App cannot bind");
}
