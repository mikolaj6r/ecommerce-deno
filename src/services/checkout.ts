import { db } from '../middleware/db.ts'

import { ObjectId } from "../deps.ts";

export default {
    async find() {
        const checkoutCollection = await db.collection("checkouts");
        const data = await checkoutCollection.find();
        return data;
    },

    async findOne(id: string) {
      const checkoutCollection = await db.collection("checkouts");
      const data = await checkoutCollection.findOne({ _id: ObjectId(id) });
      return data;
    },

    async add(checkout: any) {
      const checkoutCollection = await db.collection("checkouts");

      if(!checkout) return false;

      checkout.created_at = parseInt((new Date().getTime() / 1000).toString());
      
      const id = await checkoutCollection.insertOne(checkout);

      return id;
    },

    async edit(checkout: any, id: string) {
      const checkoutCollection = await db.collection("checkouts");

      if(!checkout) return false;

      try {
        await checkoutCollection.updateOne({ _id: ObjectId(id) }, { $set: checkout });
        return true;
      } catch (e) {
        return false;
      }
    },

    async delete(id: string) {
      const checkoutCollection = await db.collection("checkouts")
  
      if(!id) return false;
      
      try {
        await checkoutCollection.deleteOne({ _id: ObjectId(id) });
        return true;
      } catch (e) {
        return false;
      }
    },
}