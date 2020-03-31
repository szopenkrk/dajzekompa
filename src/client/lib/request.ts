/* Application files */
import Config from 'client/lib/config';
import { RequestError } from 'client/lib/error';

export function request<T> (method: string, path: string, body?: any): Promise<T> {
    const headers = new Headers();

    return new Promise<T>(async (resolve, reject) => {
        if (body && !(body instanceof FormData)) {
            headers.append('Content-Type', 'application/json');
        }

        try {
            const response = await fetch(`${Config.API_URL}${path}`, {
                method,
                headers,
                body
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

export function get<T> (path: string): Promise<T> {
    return request('GET', path);
}

export function post<T> (path: string, body: any): Promise<T> {
    return request('POST', path, body);
}
