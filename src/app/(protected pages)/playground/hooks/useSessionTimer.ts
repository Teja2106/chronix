'use client';

import { useEffect, useRef, useState } from "react";

export default function useSessionTimer() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedMs, setElapsedMs] = useState(0);
    const [pausedMs, setPausedMs] = useState(0);
    const [startedAt, setStartedAt] = useState<Date | null>(null);

    const timerRef = useRef<number | null>(null);
    const pauseTimerRef = useRef<number | null>(null);

    const lastTickRef = useRef(0);
    const lastPauseTickRef = useRef(0);

    const startWorkingTimer = () => {
        lastTickRef.current = Date.now();

        timerRef.current = window.setInterval(() => {
            const now = Date.now();
            const delta = now - lastTickRef.current;
            
            lastTickRef.current = now;
            setElapsedMs((prev) => prev + delta);

        }, 10);
    };

    const stopWorkingTimer = () => {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const startPauseTimer = () => {
        lastPauseTickRef.current = Date.now();

        pauseTimerRef.current = window.setInterval(() => {
            const now = Date.now();
            const delta = now - lastPauseTickRef.current;

            lastPauseTickRef.current = now;
            setPausedMs((prev) => prev + delta);

        }, 1000);
    };

    const stopPauseTimer = () => {
        if (pauseTimerRef.current !== null) {
            clearInterval(pauseTimerRef.current);
            pauseTimerRef.current = null;
        }
    };

    const handlePlayPause = () => {
        if (!isRunning) {
            if (!startedAt) {
                setStartedAt(new Date());
            }

            stopPauseTimer();

            startWorkingTimer();

            setIsRunning(true);
        } else {
            stopWorkingTimer();

            startPauseTimer();

            setIsRunning(false);
        }
    };

    const handleStop = () => {
        stopWorkingTimer();
        stopPauseTimer();

        setElapsedMs(0);
        setPausedMs(0);
        setStartedAt(null);
        setIsRunning(false);
    };

    useEffect(() => {
        return () => {
            stopWorkingTimer();
            stopPauseTimer();
        };
    }, []);

    function formatStopwatch(ms: number) {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);

        return {
            hours: String(hours).padStart(2, "0"),
            minutes: String(minutes).padStart(2, "0"),
            seconds: String(seconds).padStart(2, "0"),
            centiseconds: String(centiseconds).padStart(2, "0"),
        };
    }

    return {
        isRunning, elapsedMs, pausedMs, startedAt,
        handlePlayPause, handleStop,
        formatStopwatch,
        startWorkingTimer, stopWorkingTimer, startPauseTimer, stopPauseTimer
    }
}