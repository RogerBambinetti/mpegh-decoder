import { decode, bulkDecode } from "../src";
import fs from 'fs';
import path from 'path';

describe("mpegh-decoder tests", () => {

    const inputFilePath = './tests/sample.m4a';
    const outputPath = './tests/output';

    beforeAll(() => {
        // Create output dir
        fs.mkdirSync(outputPath);
    });

    afterEach(() => {
        // Remove output files generated from tests
        fs.rmSync(outputPath, { recursive: true });

        // Recreate output dir
        fs.mkdirSync(outputPath);
    });

    afterAll(() => {
        // Remove output files generated from tests
        fs.rmSync(outputPath, { recursive: true });
    });

    test("should decode file with specified output path", async () => {
        const { outputFilePath } = await decode({ input: inputFilePath, output: path.resolve(outputPath, 'output.wav') });

        expect(fs.existsSync(outputFilePath)).toBe(true);
    }, 0);

    test("should decode file without specified output path", async () => {
        const { outputFilePath } = await decode({ input: inputFilePath });

        expect(fs.existsSync(outputFilePath)).toBe(true);
    }, 0);

    test("should not decode file without specified input path", async () => {

    });

});