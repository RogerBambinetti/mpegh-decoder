import { decode, bulkDecode } from "../src";
import fs from 'fs';
import path from 'path';

describe("mpegh-decoder tests", () => {

    const testTimeout = 1000 * 60;

    const inputFilePath = './tests/sample.mp4';
    const outputs: string[] = [];

    afterAll(() => {
        outputs.forEach(outputFilePath => {
            fs.unlinkSync(outputFilePath);
        });
    });

    test("should decode file with specified output path", async () => {
        const { outputFilePath } = await decode({ input: path.resolve(inputFilePath), output: path.resolve('./tests/output.wav') });
        outputs.push(outputFilePath);

        expect(fs.existsSync(outputFilePath)).toBe(true);
    }, testTimeout);

    test("should decode file without specified output path", async () => {
        const { outputFilePath } = await decode({ input: path.resolve(inputFilePath) });
        outputs.push(outputFilePath);

        expect(fs.existsSync(outputFilePath)).toBe(true);
    }, testTimeout);
});