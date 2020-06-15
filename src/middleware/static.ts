import { send } from "../deps.ts";
import { resolvePath } from 'https://deno.land/x/oak@v5.2.0/util.ts'

export default async (context: any, next: any) => {
        if(context.request.url.pathname.includes("/public")){
            try{
            await send(context, context.request.url.pathname);
            } catch(e){
                console.log(e)
            }
        }
        else return next();

};
