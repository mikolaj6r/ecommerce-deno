import { MongoClient } from "https://deno.land/x/mongo/mod.ts";

const client = new MongoClient();
client.connectWithUri(Deno.env.get("DB_URI"));

//const db = client.database("test");
//const users = db.collection("users");