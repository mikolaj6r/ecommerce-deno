import { MongoClient } from "../deps.ts";

const client = new MongoClient();

client.connectWithUri(Deno.env.get("DB_URI") || "");

export const db = client.database("ecommerce1");

export default async function(ctx: any, next: () => {}){
    ctx.db = db;

    await next();
}