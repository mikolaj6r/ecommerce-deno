import productService from '../services/product.ts'

export default {
    async index(ctx: any){
        const products = await productService.find();

        const cart = ctx.session.get("cart");

        ctx.render("index", { products, cart });
    },

    async getCart(ctx: any){
        const cart = ctx.session.get("cart");

        const products = await productService.find();

        ctx.render("cart", { products, cart });

    }
}