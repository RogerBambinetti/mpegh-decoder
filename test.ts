import mpeghdecode from './src/index';
import fs from 'fs';
import path from 'path';

async function init(): Promise<void> {
    const files: string[] = fs.readdirSync('./files');

    const test = files.map(file => ({
        input: `./files/${file}`,
        output: `./output/${file.replace(path.extname(file), '.wav')}`
    }));

    await mpeghdecode.bulkDecode(test)

    console.log('Terminou');
}

init().catch(error => console.error('Error:', error));
