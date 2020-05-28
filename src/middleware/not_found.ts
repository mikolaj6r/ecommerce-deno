
export default async function(ctx: any, next: any){   
    if(!ctx.response.body){
        console.error(`Couldn't find resource at ${ctx.request.url.pathname}`)

        ctx.response.status = 404;
        ctx.response.body = "Resource not found.";
    }
    await next();
}