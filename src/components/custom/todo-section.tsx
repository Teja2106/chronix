import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export type Task = {
    text: string;
    completed: boolean;
    createdAt: string;
    completedAt?: string;
    savedTime: string; // Chronix Timer [Added]
    checkedAt?: string; // Chronix Timer [Checked]
    priority?: string;
};

export default function TodoSection({ taskWithTime, currentTime, onTaskChange }: { taskWithTime: { text: string; savedTime: string }[]; currentTime: string; onTaskChange?: (tasks: Task[]) => void }) {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        setTasks((prevTask) => {
            const existingMap = new Map(prevTask.map(t => [t.text, t]));

            return taskWithTime.map((t) => {
                const existing = existingMap.get(t.text);

                return {
                    text: t.text,
                    completed: existing?.completed ?? false,
                    createdAt: existing?.createdAt ?? new Date().toLocaleTimeString(),
                    completedAt: existing?.completedAt,
                    savedTime: t.savedTime, // Chronix [Added]
                    checkedAt: existing?.checkedAt, // Chornix [Checked]
                    priority: existing?.priority ?? 'cold'
                }
            })
        })
    }, [taskWithTime]);

    useEffect(() => {
        if (onTaskChange) {
            onTaskChange(tasks);
        }
    }, [tasks, onTaskChange]);

    const toggleTask = (index: number) => {
        setTasks((prev) => prev.map((t, i) => i === index ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toLocaleTimeString() : undefined, checkedAt: !t.completed ? currentTime : undefined, priority: !t.completed ? 'done' : 'cold' } : t
        ));
    }

    const updatePriority = (index: number, value: string) => {
        setTasks(prev =>
            prev.map((t, i) => (i === index ? { ...t, priority: value, completed: value === 'done' ? true : t.completed, completedAt: value === 'done' ? new Date().toLocaleTimeString() : t.completedAt, checkedAt: value === 'done' ? currentTime : t.checkedAt } : t))
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