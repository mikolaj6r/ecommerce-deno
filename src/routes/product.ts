import { Router } from "../deps.ts";
import ProductController from "../controllers/ProductController.ts";

const router = new Router({
    prefix: '/product'
});

router.get("/:id", ProductController.index)

export default router;