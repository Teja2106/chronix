'use client';

import { Separator } from "@/components/ui/separator";
import { Pause, Play, Square } from "lucide-react";
import useSessionTimer from "../hooks/useSessionTimer";

export default function Box1() {
    const { isRunning, elapsedMs, pausedMs, startedAt, handlePlayPause, handleStop, formatStopwatch } = useSessionTimer();

    const time = formatStopwatch(elapsedMs);

    return (
        <>
            <div className="w-full flex items-center justify-between">
                <div className="flex-col h-20">
                    <div className="flex items-center gap-3">
                        <p className="font-darker-grotesque text-primary lg:text-2xl tracking-[3px] max-sm:text-lg">
                            ACTIVE SESSION
                        </p>

                        {isRunning && (
                            <div className="bg-primary/30 rounded-full px-6 py-[3px] flex items-center justify-center gap-2.5 border border-primary/40 max-sm:hidden">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                <p className="text-primary font-darker-grotesque lg:text-md">
                                    Running
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="pt-4">
                        <p className="lg:text-7xl font-darker-grotesque tracking-[1px] font-bold max-sm:text-4xl">
                            Project Name
                        </p>
                    </div>
                </div>

                <div className="flex gap-2 self-start">
                    <button
                        aria-label={ isRunning ? 'Pause session' : 'Start session' }
                        onClick={handlePlayPause}
                        className="bg-white/30 p-2 rounded hover:bg-white/50 transition cursor-pointer"
                    >
                        {isRunning ? <Pause size={20} data-testid='pause-icon' /> : <Play size={20} data-testid='start-icon' />}
                    </button>

                    <button
                        aria-label="Stop session"
                        onClick={handleStop}
                        disabled={!startedAt}
                        className={`p-2 rounded transition ${
                            startedAt
                                ? "bg-destructive/20 hover:bg-destructive/50 cursor-pointer"
                                : "bg-muted opacity-40 cursor-not-allowed"
                        }`}
                    >
                        <Square size={20} data-testid='stop-icon' />
                    </button>
                </div>
            </div>

            <div className="lg:text-8xl lg:mt-20 max-sm:text-4xl max-sm:mt-20">
                <p className="font-darker-grotesque" data-testid='session-timer'>
                    {time.hours}:{time.minutes}:{time.seconds}
                    <span className="lg:text-xl font-darker-grotesque">
                        .{time.centiseconds}
                    </span>
                </p>
            </div>

            <div className="mt-auto">
                <Separator />

                <div className="flex items-center pt-3 lg:gap-10 max-sm:gap-6">
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