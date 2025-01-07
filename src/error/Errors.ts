export class PlatformNotSupportedError extends Error {
    constructor() {
        super('Platform not supported');
    }
}

export class InvalidInputError extends Error {
    constructor() {
        super('Invalid input path');
    }
}

export class InvalidOutputError extends Error {
    constructor() {
        super('Invalid output path');
    }
}

export class RelativePathError extends Error {
    constructor(path: string) {
        super(`Path must be absolute. Invalid path provided: ${path}`);
    }
}