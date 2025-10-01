import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export type Task = {
    text: string;
    completed: boolean;

    // Chronix Timestamp
    createdAt: string;
    completedAt?: string;
    savedTime: string;
    checkedAt?: string;
    priority?: string;
    coldAt?: string;
    activeAt?: string;
    doneAt?: string;

    // System Timestamp
    systemCreatedAt?: string;
    systemCompletedAt?: string;
    systemColdAt?: string;
    systemActiveAt?: string;
    systemDoneAt?: string;
};

export default function TodoSection({ taskWithTime, currentTime, onTaskChange }: { taskWithTime: { text: string; savedTime: string }[]; currentTime: string; onTaskChange?: (tasks: Task[]) => void }) {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        setTasks((prevTask) => {
            const existingMap = new Map(prevTask.map(t => [t.text, t]));

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
                    checkedAt: existing?.checkedAt,
                    priority: existing?.priority ?? 'cold',
                    coldAt: existing?.coldAt ?? currentTime,
                    activeAt: existing?.activeAt,
                    doneAt: existing?.doneAt,

                    // System
                    systemCreatedAt: existing?.systemCreatedAt ?? nowSystem,
                    systemCompletedAt: existing?.systemCompletedAt,
                    systemColdAt: existing?.systemColdAt ?? nowSystem,
                    systemActiveAt: existing?.systemActiveAt,
                    systemDoneAt: existing?.systemDoneAt
                }
            })
        })
    }, [taskWithTime, currentTime]);

    useEffect(() => {
        if (onTaskChange) {
            onTaskChange(tasks);
        }
    }, [tasks, onTaskChange]);

    const toggleTask = (index: number) => {
        setTasks((prev) =>
            prev.map((t, i) => {
                if (i !== index) return t;

                const nowSystem = new Date().toLocaleTimeString();

                return {
                    ...t,
                    completed: !t.completed,
                    completedAt: !t.completed ? currentTime : undefined,
                    checkedAt: !t.completed ? currentTime : undefined,
                    priority: !t.completed ? 'done' : 'cold',
                    doneAt: !t.completed ? currentTime : undefined,

                    // System update
                    systemCompletedAt: !t.completed ? nowSystem : undefined,
                    systemDoneAt: !t.completed ? nowSystem : undefined,
                    systemColdAt: t.completed ? nowSystem : t.systemColdAt,
                }
            })
        )
    };

    const updatePriority = (index: number, value: string) => {
        setTasks((prev) =>
            prev.map((t, i) => {
                if (i !== index) return t;

                const nowSystem = new Date().toLocaleTimeString();
                if (value === 'cold') {
                    return {
                        ...t,
                        priority: 'cold',
                        coldAt: currentTime,
                        systemColdAt: nowSystem,
                        completed: false
                    }
                }

                if (value === 'active') {
                    return { 
                        ...t, 
                        priority: 'active', 
                        activeAt: currentTime, 
                        systemActiveAt: nowSystem,
                        completed: false
                    }
                }

                if (value === 'done') {
                    return {
                        ...t,
                        priority: 'done',
                        completed: true,
                        completedAt: currentTime,
                        checkedAt: currentTime,
                        doneAt: currentTime,

                        // System Update
                        systemCompletedAt: nowSystem,
                        systemDoneAt: nowSystem
                    }
                }

                return t;
            })
        )
    }

    return (
        <>
            <div className="w-full p-2 mt-2.5">
                <p className="text-3xl ">Tasks To Complete</p>
                <ul className="mt-5">
                    {
                        tasks.map((t, index) => (
                            <li key={index} className="flex gap-2 mt-2 items-center text-gray-100 group hover:bg-gray-50 p-1.5 rounded-sm">
                                <div className="flex items-center gap-2">
                                    <Checkbox checked={t.completed} onCheckedChange={() => toggleTask(index)} className="dark:data-[state=checked]:bg-gray-200" />
                                    <p className={`${t.completed ? 'line-through text-gray-700' : 'text-white group-hover:text-gray-400'}`}>{t.text} </p>
                                </div>

                                <Select value={t.priority} onValueChange={(value) => updatePriority(index, value)}>
                                    <SelectTrigger className="ml-auto w-[130px] data-[placeholder]:text-black *:data-[slot=select-value]:text-black">
                                        <SelectValue placeholder="Priortiy" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cold">Cold</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="done">Done</SelectItem>
                                    </SelectContent>
                                </Select>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}