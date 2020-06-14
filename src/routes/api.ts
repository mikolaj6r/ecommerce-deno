import { Router } from "../deps.ts";

const router = new Router({
    prefix: '/api'
});
router.post( "/cart", async ( ctx: any, next: any) => {
    const data = await ctx.request.body();

    await ctx.session.set("cart", data );

    ctx.response.status = 200;
    ctx.response.body = 'OK'
})

export default router;