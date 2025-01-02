import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { PlatformNotSupported } from './error/Errors';

const execFilePromise = promisify(execFile);

interface IO {
    input: string;
    output: string;
}

interface Options {
    cicp?: string;
}

class MpeghDecoder {
    private static paths: { [key: string]: string } = {
        'win32': '../src/mpeghdecoder/mpeghDecoder.exe'
    };

    static async decode(IO: IO, options?: Options): Promise<string> {
        try {
            if (!MpeghDecoder.paths[process.platform]) {
                throw new PlatformNotSupported();
            }

            const args = ['-if', IO.input, '-of', IO.output];

            if (options?.cicp) {
                args.push('-tl');
                args.push(options.cicp);
            }

            const { stdout } = await execFilePromise(MpeghDecoder.paths[process.platform], args);

            return stdout;
        } catch (error) {
            throw error;
        }
    }

    static async bulkDecode(IO: IO[], options?: Options): Promise<string[]> {
        const promises: Promise<string>[] = IO.map(io => MpeghDecoder.decode(io, options));
        return await Promise.all(promises);
    }
}

module.exports = MpeghDecoder;