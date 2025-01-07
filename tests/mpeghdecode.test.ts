import { decode, bulkDecode } from "../src";
import fs from 'fs';
import path from 'path';

describe("mpegh-decoder tests", () => {

    const testTimeout = 1000 * 60;

    const inputFilePath = './tests/sample.m4a';

    test("should decode file with specified output path", async () => {
        const { outputFilePath } = await decode({ input: path.resolve(inputFilePath), output: path.resolve('./tests/output.wav') });

        expect(fs.existsSync(outputFilePath)).toBe(true);
    }, testTimeout);

    test("should decode file without specified output path", async () => {
        const { outputFilePath } = await decode({ input: path.resolve(inputFilePath) });

        expect(fs.existsSync(outputFilePath)).toBe(true);
    }, testTimeout);
});