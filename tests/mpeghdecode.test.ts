import mpeghdecoder from "../src";
import fs from 'fs';
import path from 'path';

describe("mpegh-decoder tests", async () => {
    test("should bulk decode multiple files", async () => {
        const files: string[] = fs.readdirSync('./files');

        const test = files.map(file => ({
            input: `./files/${file}`,
            output: `./output/${file.replace(path.extname(file), '.wav')}`
        }));

        await mpeghdecoder.bulkDecode(test);

        console.log('Terminou');
    });
});