/* Libraries */
import { getStatusText } from 'http-status-codes';

export class RequestError extends Error {
    public code: number;
    public status: string;

    constructor (message: string, code: number) {
        super(message);

        this.name = 'RequestError';
        this.code = code;
        this.status = getStatusText(code);
    }
}
