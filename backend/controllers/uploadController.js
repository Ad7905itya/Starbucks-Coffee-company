import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TMP_DIR = path.join(__dirname, '..', 'uploads', 'tmp');
const FINAL_DIR = path.join(__dirname, '..', 'uploads');

fs.mkdirSync(TMP_DIR, { recursive: true });
fs.mkdirSync(FINAL_DIR, { recursive: true });

export const receiveChunk = async (req, res) => {
  try {
    const uploadId = req.headers['upload-id'] || req.query.uploadId;
    const chunkIndex = req.headers['chunk-index'] || req.query.chunkIndex;
    const fileName = req.headers['file-name'] || req.query.fileName || 'file';
    if (!uploadId || typeof chunkIndex === 'undefined') {
      return res.status(400).json({ success: false, message: 'uploadId and chunkIndex required' });
    }

    const chunkPath = path.join(TMP_DIR, `${uploadId}.${chunkIndex}.part`);
    fs.writeFileSync(chunkPath, req.body);

    return res.status(200).json({ success: true, message: 'Chunk received' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const completeUpload = async (req, res) => {
  try {
    const { uploadId, fileName, totalChunks } = req.body;
    if (!uploadId || !fileName) return res.status(400).json({ success: false, message: 'uploadId and fileName required' });

    const outPath = path.join(FINAL_DIR, `${Date.now()}-${fileName}`);
    const writeStream = fs.createWriteStream(outPath);

    const parts = fs.readdirSync(TMP_DIR)
      .filter((f) => f.startsWith(uploadId + '.'))
      .sort((a, b) => {
        const ai = Number(a.split('.').slice(-2, -1)[0]);
        const bi = Number(b.split('.').slice(-2, -1)[0]);
        return ai - bi;
      });

    for (const part of parts) {
      const partPath = path.join(TMP_DIR, part);
      const data = fs.readFileSync(partPath);
      writeStream.write(data);
      fs.unlinkSync(partPath);
    }

    writeStream.end();

    const publicUrl = `${req.protocol}://${req.get('host')}/uploads/${path.basename(outPath)}`;
    return res.status(200).json({ success: true, url: publicUrl });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
