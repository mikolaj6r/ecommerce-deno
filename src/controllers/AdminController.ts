export default {
    async index(ctx: any){
        const products = ctx.db.collection("products");
        

        ctx.render("accounts/admin");

    },
    async getLogin(ctx: any){
        if (ctx.request.user) return ctx.response.redirect('/');
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
    }
}