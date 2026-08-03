import { meter } from "./metrics";

export const httpRequests = meter.createCounter(
    'http_requests_total',
    {
        description: 'Total HTTP requests'
    }
);

export const httpErrors = meter.createCounter(
    'http_errors_total',
    {
        description: 'Total HTTP errors'
    }
);

export const requestDuration = meter.createHistogram(
    'http_request_duration_ms',
    {
        description: 'Request duration',
        unit: 'ms'
    }
);