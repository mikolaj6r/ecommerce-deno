import { Router } from "../deps.ts";

import MainController from '../controllers/MainController.ts'


const router = new Router();

router.get( "main", "/", MainController.index)
      .get("/cart", MainController.getCart)
      .post("/cart", MainController.postCart)
      .get("/checkout", MainController.getCheckout)
      .post("/checkout", MainController.postCheckout)
      .get("/checkout/:id", MainController.getCheckoutDetails)


export default router;