import { Router } from "express";
import PlayerController from "../controllers/PlayerController";

const router = new Router();

router.get('/', PlayerController.show);
router.post('/', PlayerController.store);
router.put('/', PlayerController.update);
router.delete('/', PlayerController.delete);

export default router;
