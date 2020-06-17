
import payuService from '../services/payu.ts'

export default async function(ctx: any, next: any){   
    if(!ctx.state.payuToken || payuService.isExpired(ctx.state.payuToken)){
        ctx.state.payuToken = await payuService.getToken();
    }
    
    await next();
}