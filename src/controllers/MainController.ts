import productService from '../services/product.ts'

export default {
    async index(ctx: any){
        const products = await productService.find();

        ctx.render("index", { products });
    },
}