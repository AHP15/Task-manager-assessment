type Options = {
    method: string,
    body?: string,
    headers?: {
        'Content-Type': 'application/json';
    },
};


export type Response = {
    success: boolean,
    error: string,
    data: any,
};
const base = 'http://localhost:8080';

export default async function request(url: string, options: Options): Promise<Response> {
    try {
        const res = await fetch(base + url, { ...options, credentials: 'include' });
        return res.json();
    } catch (err) {
        if (err instanceof Error) {
            return {
                success: false,
                error: err.message,
                data: null,
            };
        }

        return {
            success: false,
            error: 'An unexpected error occurred',
            data: null,
        };
    }
}