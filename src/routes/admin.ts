import { Router } from "../deps.ts";
import AdminController from '../controllers/AdminController.ts'

import AuthController from '../controllers/AuthController.ts'

const router = new Router({
    prefix: '/admin'
});

router.get("/", AuthController.isSignedIn, AdminController.index)
      .get("/login", AdminController.getLogin)
      .post("/login", AdminController.postLogin)
      .get("/add-product", AuthController.isSignedIn, AdminController.getNewProduct)
      .post("/add-product", AuthController.isSignedIn, AdminController.postNewProduct)
      .get("/edit-product/:id", AuthController.isSignedIn, AdminController.getEditProduct)
      .post("/edit-product/:id", AuthController.isSignedIn, AdminController.postEditProduct)


export default router;