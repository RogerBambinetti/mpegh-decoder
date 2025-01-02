export class PlatformNotSupported extends Error {
    constructor() {
        super('Platform not supported');
    }
}

export class InvalidOption extends Error {
    constructor() {
        super('Invalid option');
    }
}