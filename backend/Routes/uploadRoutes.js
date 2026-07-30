import express from 'express';
import { receiveChunk, completeUpload } from '../controllers/uploadController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// chunk endpoint expects raw binary body
router.post('/chunk', protect, express.raw({ type: 'application/octet-stream', limit: '10mb' }), receiveChunk);
router.post('/complete', protect, express.json(), completeUpload);

export default router;
