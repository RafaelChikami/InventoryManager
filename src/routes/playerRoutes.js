import { Router } from "express";
import PlayerController from "../controllers/PlayerController";
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, PlayerController.show);
router.post('/', PlayerController.store);
router.put('/', loginRequired, PlayerController.update);
router.delete('/', loginRequired, PlayerController.delete);

export default router;
