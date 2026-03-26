export class HttpError extends Error {
    constructor(public status: number, public data: unknown, message: string) {
        super(message);
        this.status = status;
    }
}
