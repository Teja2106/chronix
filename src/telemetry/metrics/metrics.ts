import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

const exporter = new OTLPMetricExporter({
    url: process.env.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT
});

const reader = new PeriodicExportingMetricReader({
    exporter,
    exportIntervalMillis: 10000
});

const meterProvider = new MeterProvider({
    resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: 'chronix'
    }),
    readers: [reader]
});

export const meter = meterProvider.getMeter('chronix');