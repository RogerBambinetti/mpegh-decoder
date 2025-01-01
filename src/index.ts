import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFilePromise = promisify(execFile);

const paths: { [key: string]: string } = {
    'win32': './src/mpeghdecoder/mpeghDecoder.exe'
};

interface IO {
    input: string;
    output: string;
}

interface Options {
    cicp?: string;
}

const mpeghdecode = async (IO: IO, options: Options): Promise<string> => {
    try {
        const args = ['-if', IO.input, '-of', IO.output];

        if (options.cicp) {
            args.push('-tl');
            args.push(options.cicp);
        }

        const { stdout } = await execFilePromise(paths[process.platform], args);

        return stdout;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default mpeghdecode;