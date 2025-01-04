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
declare function decode(IO: IO, options?: Options): Promise<DecodeResponse>;
declare function bulkDecode(IO: IO[], options?: Options): Promise<DecodeResponse[]>;

export { bulkDecode, decode };
