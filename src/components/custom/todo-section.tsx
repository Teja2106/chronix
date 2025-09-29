import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";

type Task = {
    text: string;
    completed: boolean;
    createdAt: string;
    completedAt?: string;
    savedTime: string;
    checkedAt?: string;
};

export default function TodoSection({ taskWithTime, currentTime }: { taskWithTime: { text: string; savedTime: string }[]; currentTime: string}) {
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
                    savedTime: t.savedTime,
                    checkedAt: existing?.checkedAt
                }
            })
        })
    }, [taskWithTime]);

    const toggleTask = (index: number) => {
        setTasks((prev) =>
            prev.map((t, i) =>
                i === index ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toLocaleTimeString() : undefined, checkedAt: !t.completed ? currentTime : undefined } : t
            )
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
                                <Checkbox checked={t.completed} onCheckedChange={() => toggleTask(index)} className="dark:data-[state=checked]:bg-gray-200" />
                                <span className={`${t.completed ? 'line-through text-gray-700' : 'text-white group-hover:text-gray-400'}`}>{t.text} </span>
                                <span className="pl-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">({t.createdAt} | Chronix Timer [Added]: {t.savedTime} | Chronix Timer [Checked]: {t.checkedAt} {t.completed ? `| Completed: ${ t.completedAt }`: ''})</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}