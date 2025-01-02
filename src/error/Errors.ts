export class PlatformNotSupported extends Error {
    constructor() {
        super('Platform not supported');
    }
}

export class InvalidInput extends Error {
    constructor() {
        super('Invalid input path');
    }
}

export class InvalidOutput extends Error {
    constructor() {
        super('Invalid output path');
    }
}