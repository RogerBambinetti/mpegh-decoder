interface IO {
    input: string;
    output?: string;
}
interface Options {
    cicp?: string;
}
declare function decode(IO: IO, options?: Options): Promise<string>;
declare function bulkDecode(IO: IO[], options?: Options): Promise<string[]>;

export { bulkDecode, decode };
