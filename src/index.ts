import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { InvalidInput, InvalidOutput, PlatformNotSupported } from './error/Errors';

const execFilePromise = promisify(execFile);

interface IO {
    input: string;
    output?: string;
}

interface Options {
    cicp?: string;
}

const paths: { [key: string]: string } = {
    'win32': '../src/mpegh-decoder/mpeghDecoder.exe'
};

function validateIO(IO: IO) {
    if (!paths[process.platform]) {
        throw new PlatformNotSupported();
    }

    if (!path.extname(IO.input)) {
        throw new InvalidInput();
    }

    IO.output = IO.output ?? IO.input.replace(path.extname(IO.input), '.wav');

    if (!IO.output.endsWith('.wav')) {
        throw new InvalidOutput();
    }
}

const mpeghDecoder = {
    decode: async function (IO: IO, options?: Options) {
        try {
            validateIO(IO);

            const args = ['-if', IO.input, '-of', IO.output];

            if (options?.cicp) {
                args.push('-tl');
                args.push(options.cicp);
            }

            const { stdout } = await execFilePromise(path.resolve(__dirname, paths[process.platform]), args);

            return stdout;
        } catch (error) {
            throw error;
        }
    },
    bulkDecode: async function (IO: IO[], options?: Options): Promise<string[]> {
        const promises: Promise<string>[] = IO.map(io => mpeghDecoder.decode(io, options));
        return await Promise.all(promises);
    }
};

module.exports = mpeghDecoder;