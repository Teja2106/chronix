// Testing the functionality of timer used in Box1 component.
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useSessionTimer from '@/app/(protected pages)/playground/hooks/useSessionTimer';

describe('unit test for timer functionality', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test('test the  workTimer', async () => {
        const { result } = renderHook(() => useSessionTimer());

        act(() => {
            result.current.startWorkingTimer();
        });

        await act(async() => {
            await vi.advanceTimersByTimeAsync(2000);
        });

        expect(result.current.elapsedMs).toBeGreaterThan(1900);
        
        act(() => {
            result.current.stopWorkingTimer();
        });
    });

    test('test the pauseTimer', async () => {
        const { result } = renderHook(() => useSessionTimer());

        act(() => {
            result.current.startPauseTimer();
        });

        await act(async () => {
            await vi.advanceTimersByTimeAsync(4000);
        });

        expect(result.current.pausedMs).toBeGreaterThan(3900);

        act(() => {
            result.current.stopPauseTimer();
        });
    });
});