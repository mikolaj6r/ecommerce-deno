import productService from '../services/product.ts'

export default {
  async index(ctx: any) {
    const id = ctx.params && ctx.params.id;

    if(!id){
        ctx.response.redirect("/");
        return;
    }

    const product = await productService.findOne(id);
    ctx.render("product", { product });
  },
};