import mpeghdecode from "../src";
import fs from 'fs';
import path from 'path';

describe("mpeghdecode tests", async () => {
    test("should bulk decode multiple files", async () => {
        const files: string[] = fs.readdirSync('./files');

        const test = files.map(file => ({
            input: `./files/${file}`,
            output: `./output/${file.replace(path.extname(file), '.wav')}`
        }));

        await mpeghdecode.bulkDecode(test);

        console.log('Terminou');
    });
});