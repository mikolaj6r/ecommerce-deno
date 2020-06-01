export default {
    async isSignedIn(context: any, next: any){
        const user = await context.session.get("user");
        if(user) return next();

        return context.response.redirect("/admin/login");
    }
}