import express from 'express';
import { receiveChunk, completeUpload } from '../controllers/uploadController.js';

const router = express.Router();

// chunk endpoint expects raw binary body
router.post('/chunk', express.raw({ type: 'application/octet-stream', limit: '10mb' }), receiveChunk);
router.post('/complete', express.json(), completeUpload);

export default router;
