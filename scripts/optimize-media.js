import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIRS_TO_OPTIMIZE = [
    path.resolve(__dirname, '../public/Images'),
    path.resolve(__dirname, '../public/Blog')
];

async function optimizeImages(directory) {
    if (!fs.existsSync(directory)) {
        console.warn(`Directory not found: ${directory}`);
        return;
    }
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await optimizeImages(fullPath);
            continue;
        }

        if (/\.(jpe?g|png)$/i.test(file)) {
            const outputName = file.replace(/\.(jpe?g|png)$/i, '.webp');
            const outputPath = path.join(directory, outputName);

            if (fs.existsSync(outputPath)) {
                // console.log(`Skipping ${file}, WebP already exists.`);
                continue;
            }

            console.log(`Optimizing ${file} -> ${outputName}`);
            await sharp(fullPath)
                .webp({ quality: 80 })
                .toFile(outputPath);
        }
    }
}

async function run() {
    console.log('Starting image optimization...');
    for (const dir of DIRS_TO_OPTIMIZE) {
        await optimizeImages(dir);
    }
    console.log('Optimization complete!');
}

run().catch(err => console.error('Optimization failed:', err));
