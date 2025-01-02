import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { PlatformNotSupported } from './error/Errors';

const execFilePromise = promisify(execFile);

const paths: { [key: string]: string } = {
    'win32': '../src/mpeghdecoder/mpeghDecoder.exe'
};

interface IO {
    input: string;
    output: string;
}

interface Options {
    cicp?: string;
}

const mpeghdecode = {
    decode: async (IO: IO, options?: Options): Promise<string> => {
        try {

            if (!paths[process.platform]) {
                throw new PlatformNotSupported();
            }

            const args = ['-if', IO.input, '-of', IO.output];

            if (options?.cicp) {
                args.push('-tl');
                args.push(options.cicp);
            }

            const { stdout } = await execFilePromise(paths[process.platform], args);

            return stdout;
        } catch (error) {
            throw error;
        }
    },
    bulkDecode: async (IO: IO[], options?: Options): Promise<string[]> => {
        const promises: Promise<string>[] = IO.map(io => mpeghdecode.decode(io, options));
        return await Promise.all(promises);
    }
};

export { mpeghdecode };