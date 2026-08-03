import { configure, getConsoleSink, getLogger } from '@logtape/logtape';
import { getOpenTelemetrySink } from '@logtape/otel';

const otelURL = process.env.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT!;

let initialized = false;

export async function configureLogging() {
    if (initialized) return;

    await configure({
        sinks: {
            console: getConsoleSink(),
            otel: getOpenTelemetrySink({
                serviceName: 'chronix',
                otlpExporterConfig: {
                    url: otelURL
                }
            })
        },
        loggers: [
            {
                category: [],
                lowestLevel: 'info',
                sinks: ['console', 'otel']
            },
            {
                category: ['logtape', 'meta'],
                sinks: [],
                lowestLevel: 'warning'
            }
        ]
    });

    initialized = true;
}