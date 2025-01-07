import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { InvalidInputError, InvalidOutputError, PlatformNotSupportedError, RelativePathError } from './error/Errors';

const execFilePromise = promisify(execFile);

interface IO {
    input: string;
    output?: string;
}

interface Options {
    cicp?: string;
}

interface DecodeResponse {
    outputFilePath: string;
    stdout: string;
}

const paths: { [key: string]: string } = {
    'win32': '../src/mpegh-decoder/mpeghDecoder.exe'
};

function validateIO(IO: IO) {
    if (!paths[process.platform]) {
        throw new PlatformNotSupportedError();
    }

    if (!path.extname(IO.input)) {
        throw new InvalidInputError();
    }

    IO.output = IO.output || IO.input.replace(path.extname(IO.input), '.wav');

    if (!IO.output.endsWith('.wav')) {
        throw new InvalidOutputError();
    }

    if (!path.isAbsolute(IO.input)) {
        throw new RelativePathError(IO.input);
    }

    if (!path.isAbsolute(IO.output)) {
        throw new RelativePathError(IO.output);
    }
}

async function decode(IO: IO, options?: Options): Promise<DecodeResponse> {
    try {
        validateIO(IO);

        const args = ['-if', IO.input, '-of', IO.output as string];

        if (options?.cicp) {
            args.push('-tl');
            args.push(options.cicp);
        }

        const { stdout } = await execFilePromise(path.resolve(__dirname, paths[process.platform]), args);

        return {
            outputFilePath: IO.output as string,
            stdout
        };
    } catch (error) {
        throw error;
    }
}

async function bulkDecode(IO: IO[], options?: Options) {
    const promises: Promise<DecodeResponse>[] = IO.map(io => decode(io, options));
    return await Promise.all(promises);
}

export { bulkDecode, decode };