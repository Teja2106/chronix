import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defaultConfig } from 'next/dist/server/config-shared';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/config/vite.setup.ts',
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
})