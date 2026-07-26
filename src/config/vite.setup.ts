import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '../config/mock/node';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handler that might be added during any test
afterEach(() => server.resetHandlers());

// Clean up after tests are finished
afterAll(() => server.close());