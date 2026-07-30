import path from 'path';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const MAX_UPLOAD_BYTES = 500 * 1024;
const uploadBuffers = new Map();

const s3 = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_REGION && process.env.AWS_S3_BUCKET_NAME
  ? new AWS.S3({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    })
  : null;

const sanitizeFileName = (fileName = 'file') => {
  const ext = path.extname(fileName || 'file');
  const baseName = path.basename(fileName || 'file', ext).replace(/[^a-zA-Z0-9._-]/g, '-');
  return `${Date.now()}-${baseName || 'file'}${ext}`;
};

const getContentType = (fileName = 'file') => {
  const ext = path.extname(fileName || 'file').toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
};

const uploadToS3 = async (buffer, fileName, userId) => {
  if (!s3) {
    throw new Error('AWS S3 is not configured. Check AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and AWS_S3_BUCKET_NAME in your .env file.');
  }

  if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
    throw new Error('Upload buffer is empty.');
  }

  const key = `users/${userId || 'anonymous'}/${sanitizeFileName(fileName)}`;
  await s3.putObject({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: getContentType(fileName),
  }).promise();

  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

const cleanupParts = (uploadId) => {
  if (!uploadId) return;
  uploadBuffers.delete(uploadId);
};

export const receiveChunk = async (req, res) => {
  try {
    const uploadId = req.headers['upload-id'] || req.query.uploadId;
    const chunkIndex = req.headers['chunk-index'] || req.query.chunkIndex;

    if (!uploadId || typeof chunkIndex === 'undefined') {
      return res.status(400).json({ success: false, message: 'uploadId and chunkIndex required' });
    }

    if (!Buffer.isBuffer(req.body) && typeof req.body !== 'string') {
      return res.status(400).json({ success: false, message: 'Chunk body must be a binary buffer' });
    }

    const chunk = Buffer.from(req.body);
    const index = Number(chunkIndex);
    const uploadState = uploadBuffers.get(uploadId) || { chunks: [], size: 0 };

    if (uploadState.chunks[index]) {
      uploadState.size -= uploadState.chunks[index].length;
    }

    uploadState.chunks[index] = chunk;
    uploadState.size += chunk.length;

    if (uploadState.size > MAX_UPLOAD_BYTES) {
      cleanupParts(uploadId);
      return res.status(413).json({ success: false, message: 'Image must be 500KB or smaller.' });
    }

    uploadBuffers.set(uploadId, uploadState);

    return res.status(200).json({ success: true, message: 'Chunk received' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const completeUpload = async (req, res) => {
  try {
    const { uploadId, fileName, totalChunks } = req.body || {};

    if (!uploadId || !fileName) {
      return res.status(400).json({ success: false, message: 'uploadId and fileName required' });
    }

    const storedState = uploadBuffers.get(uploadId);
    if (!storedState || !storedState.chunks?.length) {
      return res.status(400).json({ success: false, message: 'Upload is still incomplete' });
    }

    const expectedChunks = Number(totalChunks || storedState.chunks.length);
    const buffers = storedState.chunks.filter(Boolean);
    if (buffers.length !== expectedChunks) {
      return res.status(400).json({ success: false, message: 'Some upload chunks are missing' });
    }

    if (storedState.size > MAX_UPLOAD_BYTES) {
      cleanupParts(uploadId);
      return res.status(413).json({ success: false, message: 'Image must be 500KB or smaller.' });
    }

    const fullBuffer = Buffer.concat(buffers);
    if (fullBuffer.length > MAX_UPLOAD_BYTES) {
      cleanupParts(uploadId);
      return res.status(413).json({ success: false, message: 'Image must be 500KB or smaller.' });
    }

    const publicUrl = await uploadToS3(fullBuffer, fileName, req.user?._id);

    cleanupParts(uploadId);

    return res.status(200).json({ success: true, url: publicUrl });
  } catch (error) {
    cleanupParts(req.body?.uploadId);
    console.error('Upload error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Upload failed' });
  }
};


