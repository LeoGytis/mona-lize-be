import express from 'express';
import {
	menu_create,
	menu_delete,
	menu_details,
	menu_index,
	menu_update,
} from '../controllers/menuController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', menu_index);
router.get('/:id', menu_details);
router.post('/', upload.single('image'), menu_create);
router.patch('/:id', upload.single('image'), menu_update);
router.delete('/:id', menu_delete);

export default router;
