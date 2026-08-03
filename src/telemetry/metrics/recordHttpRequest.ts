import { httpRequests, httpErrors, requestDuration } from "./http";

interface RecordhttpRequestOptions {
    method: string;
    route: string;
    status: number;
    durationMs: number;
};

export function recordHttpRequest({ method, route, status, durationMs }: RecordhttpRequestOptions) {
    const attributes = {
        method, route, status: status.toString()
    };

    httpRequests.add(1, attributes);

    requestDuration.record(durationMs, attributes);

    if (status >= 400) {
        httpErrors.add(1, attributes);
    };
}