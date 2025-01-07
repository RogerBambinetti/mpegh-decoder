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