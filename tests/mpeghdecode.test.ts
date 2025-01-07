import { decode, bulkDecode } from "../src";
import fs from 'fs';
import path from 'path';

describe("mpegh-decoder tests", () => {

    const inputFilePath = './tests/sample.m4a';
    const outputPath = './tests/output';

    beforeAll(() => {
        // Create output dir
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }
    });

    test("should decode file with specified output path", async () => {
        const { outputFilePath } = await decode({ input: inputFilePath, output: path.resolve(outputPath, 'output.wav') });

        expect(fs.existsSync(outputFilePath)).toBe(true);
    }, 1000 * 60);

    test("should decode file without specified output path", async () => {
        const { outputFilePath } = await decode({ input: inputFilePath });

        expect(fs.existsSync(outputFilePath)).toBe(true);
    }, 1000 * 60);
});