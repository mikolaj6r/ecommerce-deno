import { send } from "../deps.ts";

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
