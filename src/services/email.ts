import { sendSimpleMail } from "https://deno.land/x/sendgrid/mod.ts"

export default {
    async send(mail: any){
        const res = await sendSimpleMail(
            mail,
            {
              apiKey: Deno.env.get("MAIL_API_KEY") || "",
            },
        );
        return res;
        
    }
}