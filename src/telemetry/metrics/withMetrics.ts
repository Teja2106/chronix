import { NextRequest, NextResponse } from "next/server";
import { recordHttpRequest } from "./recordHttpRequest";

export function withMetrics(handler: (request: NextRequest) => Promise<NextResponse>) {
    return async (request: NextRequest): Promise<NextResponse> => {
        const start = performance.now();

        try {
            const response = await handler(request);

            recordHttpRequest({
                method: request.method,
                route: request.nextUrl.pathname,
                status: response.status,
                durationMs: performance.now() - start
            });

            return response;
        } catch(error) {
            recordHttpRequest({
                method: request.method,
                route: request.nextUrl.pathname,
                status: 500,
                durationMs: performance.now() - start
            });

            throw error;
        }
    }
}