import { Router } from "../deps.ts";

const router = new Router();

router.get( "main", "/", async (ctx: any) => {
    ctx.render("index", { data: { msg: "World" } });
});


export default router;