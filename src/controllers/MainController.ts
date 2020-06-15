import productService from '../services/product.ts'
import checkoutService from '../services/checkout.ts'


export default {
    async index(ctx: any){
        const products = await productService.find();

        const cart = await ctx.session.get("cart");

        ctx.render("index", { products, cart });
    },

    async getCart(ctx: any){
        const cart = await ctx.session.get("cart");

        const products = await productService.find();

        ctx.render("cart", { products, cart });

    },

    async getCheckout(ctx: any){
        const cart = await ctx.session.get("cart");

        const products = await productService.find();

        ctx.render("checkout", { products, cart });

    },

    async postCheckout(ctx: any){
        const cart = await ctx.session.get("cart");

        const { value: data } = await ctx.request.body();

        interface CartItem {
            quantity: number,
            price: number
        }

        const price = Object.values<CartItem>(cart.items).reduce<number>((acc: number, el: CartItem) => {
            return acc + ( el.quantity * el.price )
        }, 0)

        const firstname = data.get("firstname");
        const lastname = data.get("lastname");
        const address = data.get("address");
        const postal = data.get("address");
        const email = data.get("address");
        const phone = data.get("address");
        const method = data.get("method");

        const checkout = {
            type: method,
            price,
            status: "PENDING",
            firstname,
            lastname,
            address,
            postal,
            email,
            phone
        };

        const { ["$oid"]: id } = await checkoutService.add(checkout);

        if(id){
            ctx.response.redirect(`/checkout/${id}`)
        }
        else {
            ctx.response.redirect("/");
        }


    },

    async getCheckoutDetails(ctx: any){
        const id = ctx.params && ctx.params.id;

        if(!id){
            ctx.response.redirect("/");
            return;
        }    

        const cart = await ctx.session.get("cart");

        const checkout = await checkoutService.findOne(id);

        ctx.render("status", { checkout, cart });

    }
}