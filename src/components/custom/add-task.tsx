import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function AddTask({ onAddTask }: { onAddTask: (task: string) => void }) {
    const [task, setTask] = useState('');
    const inputRef = useRef<HTMLInputElement>(null)

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

    // Global keybind to focus input
    useEffect(() => {
        const handleGlobalKeyDown = (event: KeyboardEvent) => {
            if (event.shiftKey && event.key === 'Enter') {
                event.preventDefault();
                inputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);

        return () => {
            window.removeEventListener('keydown', handleGlobalKeyDown);
        }
    }, []);

    return (
        <>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Input className="border-none text-black placeholder:text-[#646464]" placeholder="Enter Task" value={task} onChange={(event) => setTask(event.target.value)} onKeyDown={handleKeyDown} ref={inputRef} />
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-gray-500/50">
                    <p>shift + enter/return</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={`secondary`} onClick={handleAddTask}>Add Task</Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-gray-500/50">
                    <p>enter/return</p>
                </TooltipContent>
            </Tooltip>
        </>
    )
}