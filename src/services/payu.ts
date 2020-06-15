export default {
    async getToken(){
        const res = await fetch("https://secure.snd.payu.com/pl/standard/user/oauth/authorize", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=client_credentials&client_id=${Deno.env.get("CLIENT_ID")}&client_secret=${Deno.env.get("CLIENT_SECRET")}`
        })
        const data = await res.json();
        return {
            ...data,
            createdAt: Date.now()
        }
    },

    async isExpired(token: any){
        return Date.now() > token.createdAt + token.expires_in; 
    }
}