import { Router } from "../deps.ts";
import AdminController from '../controllers/AdminController.ts'

const router = new Router({
    prefix: '/admin'
});

router.get("/", AdminController.index);

router.get("/login", AdminController.getLogin);

router.post("/login", AdminController.postLogin);

export default router;