"use client";

import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Pause, Play, Square } from "lucide-react";

export default function TempBox1() {
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

            setElapsedMs((prev) => prev + (now - lastTickRef.current));

            lastTickRef.current = now;
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

            setPausedMs((prev) => prev + (now - lastPauseTickRef.current));

            lastPauseTickRef.current = now;
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

    const time = formatStopwatch(elapsedMs);

    return (
        <>
            <div className="w-full flex items-center justify-between">
                <div className="flex-col h-20">
                    <div className="flex items-center gap-3">
                        <p className="font-darker-grotesque text-primary lg:text-2xl tracking-[3px]">
                            ACTIVE SESSION
                        </p>

                        {isRunning && (
                            <div className="bg-primary/30 rounded-full px-6 py-[3px] flex items-center justify-center gap-2.5 border border-primary/40">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                <p className="text-primary font-darker-grotesque lg:text-md">
                                    Running
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="pt-4">
                        <p className="lg:text-7xl font-darker-grotesque tracking-[1px] font-bold">
                            Project Name
                        </p>
                    </div>
                </div>

                <div className="flex gap-2 self-start">
                    <button
                        onClick={handlePlayPause}
                        className="bg-white/30 p-2 rounded hover:bg-white/50 transition cursor-pointer"
                    >
                        {isRunning ? <Pause size={20} /> : <Play size={20} />}
                    </button>

                    <button
                        onClick={handleStop}
                        disabled={!startedAt}
                        className={`p-2 rounded transition ${
                            startedAt
                                ? "bg-destructive/20 hover:bg-destructive/50 cursor-pointer"
                                : "bg-muted opacity-40 cursor-not-allowed"
                        }`}
                    >
                        <Square size={20} />
                    </button>
                </div>
            </div>

            <div className="lg:text-8xl lg:mt-20">
                <p className="font-darker-grotesque">
                    {time.hours}:{time.minutes}:{time.seconds}
                    <span className="lg:text-xl font-darker-grotesque">
                        .{time.centiseconds}
                    </span>
                </p>
            </div>

            <div className="mt-auto">
                <Separator />

                <div className="flex items-center pt-3 lg:gap-10">
                    <div className="flex-col">
                        <p className="font-darker-grotesque lg:text-xl">
                            Started At
                        </p>

                        <p className="font-darker-grotesque">
                            {startedAt
                                ? startedAt.toLocaleTimeString(undefined, {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                  })
                                : "--:-- --"}
                        </p>
                    </div>

                    <div>
                        <p className="font-darker-grotesque lg:text-xl">
                            Project ID
                        </p>

                        <p className="font-darker-grotesque">
                            CHRONIX-001
                        </p>
                    </div>
                </div>

                {/* Temporary debug information */}
                {/* <div className="mt-4 text-sm text-muted-foreground">
                    Paused Time: {Math.floor(pausedMs / 1000)}s
                </div> */}
            </div>
        </>
    );
}