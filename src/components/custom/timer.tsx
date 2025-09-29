'use client';

import { useEffect, useState } from "react";

type TimeProps = {
    startPause: boolean;
    reset: boolean;
    onTimeChange?: (time: number, formatted: string) => void;
}

export default function Timer({ startPause, reset, onTimeChange }: TimeProps) {
    const [time, setTime] = useState(0);

    // Start and pause functionality
    useEffect(() => {
        let intervalId: number | undefined;
        if (startPause) {
            intervalId = window.setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }

        return () => {
            if (intervalId !== undefined) clearInterval(intervalId);
        }
    }, [startPause]);

    // Saving the current time functionality
    useEffect(() => {
        if (onTimeChange) {
            const hours = Math.floor(time / 3600);
            const minutes = Math.floor((time % 3600) / 60);
            const seconds = time % 60;

            const formatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            onTimeChange(time, formatted);
        }
    }, [time, onTimeChange]);

    // Formatting current stopwatch timer
    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Reset functionality
    useEffect(() => {
        if (reset) {
            setTime(0);
        }
    }, [reset]);

    return (
        <>
            <p className="text-3xl pb-3 text-[#4b5563]">{ formatTime(time) }</p>
        </>
    )
}