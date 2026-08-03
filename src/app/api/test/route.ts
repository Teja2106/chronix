import { withMetrics } from "@/telemetry/metrics/withMetrics";
import { getLogger } from "@logtape/logtape";
import { NextResponse } from "next/server";

const logger = getLogger(['chronix', '/api/test']);

export const GET = withMetrics(async (request) => {
    logger.info('/api/test GET Request Handler.');
    return NextResponse.json({ message: 'GET Works!' }, { status: 200 });
});

export const POST = withMetrics(async (request) => {
    logger.info('/api/test POST Request Handler.')
    return NextResponse.json({ message: 'POST Works.' }, { status: 200 });
});