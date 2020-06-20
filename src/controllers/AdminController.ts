import productService from '../services/product.ts'

export default {
    async index(ctx: any){
        const products = await productService.find();

        const user = await ctx.state.session.get("user");

        ctx.render("accounts/admin", { user, products });

    },
    async getLogin(ctx: any){
        const user = await ctx.state.session.get("user");
        
        if (user) return ctx.response.redirect('/admin');
        ctx.render('accounts/login', { messages: ["Login first, please"]});
    },
    
    async postLogin(ctx: any){
        const data = await ctx.request.body();

        const errors = [];
        let checkedEmail = false;
        let checkedPass = false;

        for (const [key, value] of data.value) {
            switch(key){
                case 'email': {
                    // validation
                    if(value == "test@test.pl") checkedEmail = true; 
                    break;
                }
                case 'password': {
                    // validation
                    if(value == "123456") checkedPass = true; 
                    break;
                }
            }
        }

        if(errors.length === 0 && checkedEmail === true && checkedPass === true){
            // user validated
            console.log('validated')

            const email = data.value.get('email');

            await ctx.state.session.set("user", email );

            ctx.response.redirect('/admin');

        }
        else {
            console.log('wrong')
            // errors
            if(errors.length === 0){
                errors.push("Wrong data. Please use the form.")
            }

            ctx.render('accounts/login', { messages: errors});
        }
    },

    async getNewProduct(ctx: any){
        const user = await ctx.state.session.get("user");

        ctx.render("accounts/new-product", { user });

    },

    async postNewProduct(ctx: any){
        const user = await ctx.state.session.get("user");
        const { value: data } = await ctx.request.body();


        const name = data.get("name");
        const price = data.get("price");
        const image = data.get("image");

        const product = {
            name,
            price,
            image
        };

        const productId = await productService.add(product);

        if(productId){
            ctx.response.redirect('/admin');
        }
        else {
            ctx.render("accounts/new-product", { user });
        }
    },

    async getEditProduct(ctx: any){
        const user = await ctx.state.session.get("user");

        const id = ctx.params && ctx.params.id;

        if(!id){
            ctx.response.redirect("/admin");
            return;
        }

        const product = await productService.findOne(id);


        ctx.render("accounts/edit-product", { user, product });

    },

    async postEditProduct(ctx: any){
        const user = await ctx.state.session.get("user");

        const id = ctx.params && ctx.params.id;

        if(!id){
            ctx.response.redirect("/admin");
            return;
        }

        const { value: data } = await ctx.request.body();

        const name = data.get("name");
        const price = data.get("price");
        const image = data.get("image");

        const product = {
            name,
            price,
            image
        };

        const success = await productService.edit(product, id);
        
        if(success){
            ctx.response.redirect('/admin');
        }
        else {
            ctx.render("accounts/edit-product", { user, product });

        }

    },

    async getDeleteProduct(ctx: any){
        const id = ctx.params && ctx.params.id;

        if(!id){
            ctx.response.redirect("/admin");
            return;
        }

        const success = await productService.delete(id);

        if(success){
            ctx.response.redirect("/admin");   
        }
        else {
            ctx.response.redirect("/admin");
        }
    },
}