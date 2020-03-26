import Config from './config';
import { RequestError } from './error';

export function get<T> (path: string): Promise<T> {
    return request('GET', path);
}

export function post<T> (path: string, body: any): Promise<T> {
    return request('POST', path, body);
}

export function request<T> (method: string, path: string, body?: any): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
        try {
            const response = await fetch(`${Config.API_URL}${path}`, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                ...(body ? { body: JSON.stringify(body) } : {})
            });

            let error = '';
            let content;

            if (!response.ok) {
                error += `Request failure: ${response.status} ${response.statusText}. `
            }

            try {
                content = await response.json();
                if (error) console.error(content.data.message);
            } catch (error) {
                error += 'Failed to parse response JSON.';
            }

            if (error) {
                throw new RequestError(error, response.status);
            }

            return resolve(content.data);
        } catch (error) {
            return reject(error);
        }
    });
}
