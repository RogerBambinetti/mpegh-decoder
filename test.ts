import mpeghdecode from './src/index';
import fs from 'fs';
import path from 'path';

async function init(): Promise<void> {
    const files: string[] = fs.readdirSync('./files');

    const promises: Promise<string>[] = files.map(file => {
        const inputFilePath: string = `./files/${file}`;
        const outputFilePath: string = `./output/${file.replace(path.extname(file), '.wav')}`;
        return mpeghdecode.decode({ input: inputFilePath, output: outputFilePath }, { cicp: '10' });
    });

    await Promise.all(promises);

    console.log('Terminou');
}

init().catch(error => console.error('Error:', error));
