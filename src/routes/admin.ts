import { Router } from "../deps.ts";
import AdminController from '../controllers/AdminController.ts'

import AuthController from '../controllers/AuthController.ts'

const router = new Router({
    prefix: '/admin'
});

router.get("/", AuthController.isSignedIn, AdminController.index)
      .get("/login", AdminController.getLogin)
      .post("/login", AdminController.postLogin);

export default router;