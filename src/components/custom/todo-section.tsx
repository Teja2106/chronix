import { useEffect, useState } from "react";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { Pause, Play } from "lucide-react";

export type Task = {
    text: string;
    completed: boolean;

    // Chronix Timestamp
    createdAt: string;
    completedAt?: string;
    savedTime: string;
    priority?: 'pending' | 'active' | 'done';
    activeAt?: string;
    doneAt?: string;

    // System Timestamp
    systemCreatedAt?: string;
    systemCompletedAt?: string;
    systemActiveAt?: string;
    systemDoneAt?: string;
};

export default function TodoSection({ taskWithTime, currentTime, onTaskChange, startPause, onToggleStartPause, onGlobalPause }: { taskWithTime: { text: string; savedTime: string }[]; currentTime: string; onTaskChange?: (tasks: Task[]) => void; startPause: boolean; onToggleStartPause: () => void; onGlobalPause?: () => void }) {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        setTasks((prevTasks) => {
            const existingMap = new Map(prevTasks.map((t) => [t.text, t]));
            const nowSystem = new Date().toLocaleTimeString();

            return taskWithTime.map((t) => {
                const existing = existingMap.get(t.text);

                return {
                    text: t.text,
                    completed: existing?.completed ?? false,

                    // Chronix
                    createdAt: existing?.createdAt ?? currentTime,
                    completedAt: existing?.completedAt,
                    savedTime: t.savedTime,
                    priority: existing?.priority ?? "pending",
                    activeAt: existing?.activeAt,
                    doneAt: existing?.doneAt,

                    // System
                    systemCreatedAt: existing?.systemCreatedAt ?? nowSystem,
                    systemCompletedAt: existing?.systemCompletedAt,
                    systemActiveAt: existing?.systemActiveAt,
                    systemDoneAt: existing?.systemDoneAt,
                };
            });
        });
    }, [taskWithTime, currentTime]);

    useEffect(() => {
        if (onTaskChange) {
            onTaskChange(tasks);
        }
    }, [tasks, onTaskChange]);

    useEffect(() => {
        if (startPause) {
            const activeExists = tasks.some((t) => t.priority === 'active' && !t.completed);

            if (!activeExists) {
                const firstPendingIndex = tasks.findIndex((t) => t.priority !== 'done');
                if (firstPendingIndex !== -1) {
                    activateTask(firstPendingIndex);
                }
            }
        }
    });

    const activateTask = (index: number) => {
        setTasks((prev) =>
            prev.map((t, i) => {
                const nowSystem = new Date().toLocaleTimeString();

                if (i === index) {
                    return {
                        ...t,
                        priority: 'active',
                        activeAt: t.activeAt ?? currentTime,
                        systemActiveAt: t.systemActiveAt ?? nowSystem,
                        completed: false
                    }
                }

                if (i !== index && t.priority === 'active') {
                    return {
                        ...t,
                        priority: 'pending'
                    }
                }

                return t;
            })
        );

        if (!startPause) onToggleStartPause();
    }

    const completedTask = (index: number) => {
        if (onGlobalPause) onGlobalPause();
        setTasks((prev) => {
            const nowSystem = new Date().toLocaleTimeString();

            return prev.map((t, i) => {
                if (i === index) {
                    return {
                        ...t,
                        priority: 'done',
                        completed: true,
                        completedAt: currentTime,
                        doneAt: currentTime,

                        // System Timestamp
                        systemCompletedAt: nowSystem,
                        systemDoneAt: nowSystem
                    };
                }

                return t;
            })
        });
    }

    return (
        <>
            <div className="w-full p-2 mt-2.5">
                <p className="text-3xl ">Tasks To Complete</p>
                <ul className="mt-5">
                    {tasks.map((t, index) => {
                        const isActive = t.priority === "active";

                        return (
                            <li
                                key={index}
                                className="flex gap-2 mt-2 items-center text-gray-100 p-1.5 rounded-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <p
                                        className={`${t.completed
                                                ? "line-through text-gray-700"
                                                : "text-white"
                                            }`}
                                    >
                                        {t.text}
                                    </p>
                                </div>

                                <ButtonGroup className="ml-auto">
                                    <Button
                                        className="border bg-[#d1d5db]"
                                        onClick={() => {
                                            if (!isActive) {
                                                activateTask(index);
                                            } else {
                                                onToggleStartPause(); // toggle pause/resume
                                            }
                                        }}
                                    >
                                        {isActive && startPause ? (
                                            <Pause />
                                        ) : (
                                            <Play />
                                        )}
                                    </Button>

                                    <Button
                                        className="border bg-[#d1d5db]"
                                        onClick={() => completedTask(index)}
                                    >
                                        Done
                                    </Button>
                                </ButtonGroup>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    )
}