interface IO {
    input: string;
    output: string;
}
interface Options {
    cicp?: string;
}
declare const mpeghdecode: {
    decode: (IO: IO, options?: Options) => Promise<string>;
    bulkDecode: (IO: IO[], options?: Options) => Promise<string[]>;
};

export { mpeghdecode as default };
