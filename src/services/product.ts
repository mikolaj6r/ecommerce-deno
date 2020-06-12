import { db } from '../middleware/db.ts'

import { ObjectId } from "https://deno.land/x/mongo/mod.ts";

export default {
    async find() {
        const productCollection = await db.collection("products");
        const data = await productCollection.find();
        return data;
    },

    async findOne(id: string) {
      const productCollection = await db.collection("products");
      const data = await productCollection.findOne({ _id: ObjectId(id) });
      return data;
    },

    async add(product: any) {
      const productCollection = await db.collection("products");

      if(!product) return false;

      product.created_at = parseInt((new Date().getTime() / 1000).toString());
      
      const id = await productCollection.insertOne(product);

      return id;
    },

    async edit(product: any, id: string) {
      const productCollection = await db.collection("products");

      if(!product) return false;

      try {
        await productCollection.updateOne({ _id: ObjectId(id) }, { $set: product });
        return true;
      } catch (e) {
        return false;
      }
    },

    async delete(id: string) {
      const productCollection = await db.collection("products")
  
      if(!id) return false;
      
      try {
        await productCollection.deleteOne({ _id: ObjectId(id) });
        return true;
      } catch (e) {
        return false;
      }
    },
}