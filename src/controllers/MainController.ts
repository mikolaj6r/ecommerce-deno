import productService from '../services/product.ts'
import checkoutService from '../services/checkout.ts'
import emailService from '../services/email.ts'

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
            price: number,
            name: string
        }

        const price = Object.values<CartItem>(cart.items).reduce<number>((acc: number, el: CartItem) => {
            return acc + ( el.quantity * el.price )
        }, 0)

        const firstname = data.get("firstname");
        const lastname = data.get("lastname");
        const address = data.get("address");
        const postal = data.get("postal");
        const email = data.get("email");
        const phone = data.get("phone");
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
            //send mail
            const res = await emailService.send({
                subject: "Order confirmation",
                to: [{ email }],
                from: { email: Deno.env.get("EMAIL") || "" },
                content: [
                { type: "text/html", value: `<a href="${`http://4219af7f767c.ngrok.io/checkout/${id}`}" >Click here to check Your order status!</a>` },
                ],
            })
            console.log(res);
        }
        if(id && checkout.type == "online"){
            // reset cart
            ctx.session.set("cart", {});
            // payu
            const products = Object.values<CartItem>(cart.items).map(product => ({
                name: product.name,
                quantity: product.quantity,
                unitPrice: product.price
            }));

            const { access_token: token } = ctx.state.payuToken;
            
            const response = await fetch("https://secure.snd.payu.com/api/v2_1/orders", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
              },
              body: JSON.stringify({
                    "notifyUrl": "http://4219af7f767c.ngrok.io/api/payment-notify",
                    "continueUrl": `http://4219af7f767c.ngrok.io/checkout/${id}`,
                    "customerIp": "127.0.0.1",
                    "merchantPosId": "388914",
                    "description": "E-commerce labs",
                    "currencyCode": "PLN",
                    "totalAmount": price * 100,
                    "extOrderId": id,
                    "buyer": {
                        "email": email,
                        "phone": phone,
                        "firstName": firstname,
                        "lastName": lastname,
                        "language": "pl"
                    },
                    "settings":{
                        "invoiceDisabled":"true"
                    },
                    "products": products,
              })
            })

            if(response.status == 200 || response.status == 302){
                if(response.redirected){
                    const paymentLink = response.url;

                    const newCheckout = {
                        paymentLink
                    };
            
                    await checkoutService.edit(newCheckout, id);

                    ctx.response.redirect(paymentLink);
                    return;
                }

                else {
                    const json = await response.json();

                    if(json.status == "SUCCESS"){
                        ctx.response.redirect(json.redirectUri)
                        return;
                    }
                }
            }


        }
        else if(id){
            // reset cart
            ctx.session.set("cart", {});

            ctx.response.redirect(`/checkout/${id}`);
            return;
        }
        else {
            ctx.response.redirect("/");
            return;
        }


        ctx.response.redirect("/");

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