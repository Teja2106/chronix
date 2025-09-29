import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

export default function AddTask({ onAddTask }: { onAddTask: (task: string) => void }) {
    const [task, setTask] = useState('');
    
    const handleAddTask = () => {
        if (task.trim() === '') return;
        onAddTask(task);
        setTask('');
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && task.trim() !== '') {
            handleAddTask();
        }
    }

    return (
        <>
            <Input className="border-none text-black placeholder:text-[#646464]" placeholder="Enter Task" value={task} onChange={(event) => setTask(event.target.value)} onKeyDown={handleKeyDown} />
            <Button variant={`secondary`} onClick={handleAddTask}>Add Task</Button>
        </>
    )
}