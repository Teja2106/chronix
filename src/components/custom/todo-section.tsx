import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";

type Task = {
    text: string;
    completed: boolean;
};

export default function TodoSection({ task }: { task: string[] }) {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        setTasks((prevTask) => {
            const existingMap = new Map(prevTask.map(t => [t.text, t.completed]));

            return task.map(t => ({
                text: t,
                completed: existingMap.get(t) ?? false
            }))
        })
    }, [task]);

    const toggleTask = (index: number) => {
        setTasks((prev) =>
            prev.map((t, i) =>
                i === index ? { ...t, completed: !t.completed } : t
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
                            <li key={index} className="flex gap-2 mt-2 items-center text-gray-100">
                                <Checkbox checked={t.completed} onCheckedChange={() => toggleTask(index)} className="dark:data-[state=checked]:bg-gray-200" />
                                <span className={t.completed ? 'line-through text-gray-200' : 'text-white'}>{ t.text }</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}