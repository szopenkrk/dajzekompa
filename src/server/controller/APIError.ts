/* Models */
import { getStatusText } from 'http-status-codes';
import { HTTPCode } from 'server/model/HTTP';

export default class APIError {
    public message: string;
    public code: number;
    public name: string;

    constructor (message: string, code: number = HTTPCode.INTERNAL_SERVER_ERROR) {
        this.message = message;
        this.code = code;
        this.name = getStatusText(code);
    }
}
