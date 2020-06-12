import { Router } from "../deps.ts";

import MainController from '../controllers/MainController.ts'


const router = new Router();

router.get( "main", "/", MainController.index)

export default router;