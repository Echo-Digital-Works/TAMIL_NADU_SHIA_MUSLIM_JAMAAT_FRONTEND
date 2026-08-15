import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const photoDir = path.join(__dirname, 'public', 'photo');
const images = ['hero1.jpeg', 'hero2.jpeg', 'hero3.jpeg'];

async function processImages() {
  for (const img of images) {
    const inputPath = path.join(photoDir, img);
    const outputPath = path.join(photoDir, `processed_${img}`);
    
    // Get image metadata to know dimensions
    const metadata = await sharp(inputPath).metadata();
    
    // Calculate new width by removing 15% from the right side (to cut out the baked-in UI arrow)
    const cropWidth = Math.floor(metadata.width * 0.85);
    const cropHeight = metadata.height;
    
    console.log(`Processing ${img}: original ${metadata.width}x${metadata.height}, cropping to ${cropWidth}x${cropHeight}`);
    
    await sharp(inputPath)
      // Crop 15% off the right side
      .extract({ left: 0, top: 0, width: cropWidth, height: cropHeight })
      // Resize to 1920x1080 (16:9 High Quality) 
      .resize(1920, 1080, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 90 }) // High quality output
      .toFile(outputPath);
      
    // Replace original with processed
    fs.renameSync(outputPath, inputPath);
    console.log(`Successfully processed and overwrote ${img}`);
  }
}

processImages().catch(console.error);
