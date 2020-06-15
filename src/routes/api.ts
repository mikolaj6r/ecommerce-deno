import productService from '../services/product.ts'
import checkoutService from '../services/checkout.ts'


import { Router } from "../deps.ts";

const router = new Router({
    prefix: '/api'
});
router.post( "/cart", async ( ctx: any, next: any) => {
    const { value } = await ctx.request.body();

    switch(value.type){
        case "add": {
            const { id, quantity } = value;
            const product = await productService.findOne(id);

            
            if(product){
                const cart = await ctx.session.get("cart") || {};
                const newCart = {
                    ...cart,
                    items: {
                        ...(cart.items || {}),
                        [id]: {
                            ...((cart.items && cart.items[id]) || product),
                            quantity: ((cart.items && cart.items[id] && cart.items[id].quantity) || 0 ) + quantity
                        }
                    }

                }

                interface CartItem {
                    quantity: number
                }

                const total = Object.values<CartItem>(newCart.items).reduce<number>((acc: number, el: CartItem) => {
                    return acc + el.quantity
                }, 0)

                newCart.total = total;

                await ctx.session.set("cart", newCart);
            }
        }
    }

    ctx.response.status = 200;
    ctx.response.body = 'OK'
})

router.post( "/payment-notify", async ( ctx: any, next: any) => {
    const { value } = await ctx.request.body();

    const checkout = await checkoutService.findOne(value.order.extOrderId);

    if(checkout && value.order.status == "COMPLETED"){
        const newCheckout = {
            status: "COMPLETED"
        };

        const success = await checkoutService.edit(newCheckout, checkout._id["$oid"]);
        if(success){
            ctx.response.status = 200;
            ctx.response.body = 'OK'
            return;
        }
        
    }
    else if(checkout && value.order.status == "CANCELED"){
        const newCheckout = {
            status: "CANCELED"
        };

        const success = await checkoutService.edit(newCheckout, checkout._id["$oid"]);
        if(success){
            ctx.response.status = 200;
            ctx.response.body = 'OK'
        }
        
    }
    
    ctx.response.status = 200;
    ctx.response.body = 'OK'
})
export default router;