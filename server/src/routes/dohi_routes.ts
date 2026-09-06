import { Router } from 'express';
import { chatWithDohi } from '../controllers/dohi_controllers';

const router = Router();

router.post('/chat', chatWithDohi);

export default router;