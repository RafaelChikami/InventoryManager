import { Router } from 'express';
import InventoryController from '../controllers/InventoryController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, InventoryController.show);
router.post('/', loginRequired, InventoryController.store);
router.put('/', loginRequired, InventoryController.update);
//não poderemos apagar o inventário por inteiro

export default router;
