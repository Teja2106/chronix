'use client';

import AddTask from "@/components/custom/add-task";
import TaskMetrics from "@/components/custom/task-metrics";
import Timer from "@/components/custom/timer";
import TodoSection, { Task } from "@/components/custom/todo-section";
import UserAvatar from "@/components/custom/user-avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

export default function Home() {
  const [startPause, setStartPause] = useState(false);
  const [reset, setReset] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('00:00:00');

  // Additional state for task and time
  const [taskWithTime, setTaskWithTime] = useState<{ text: string; savedTime: string }[]>([]);

  // Full task state sync with Todo section
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  // State to control Reset Alert Dialog manually
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);


  const handleReset = () => {
    setReset(true);
    setStartPause(false);
    setTaskWithTime([]);

    setTimeout(() => setReset(false), 0);
    setIsResetDialogOpen(false);
  }

  // Function to handle task and date
  const handleAddTask = (taskText: string) => {
    if (!taskText) return;
    setTaskWithTime((prev) => [
      ...prev,
      { text: taskText, savedTime: currentTime }
    ]);
  }

  // Global Start Pause button logic
  const handleGlobalStartPause = () => {
    const activeTaskExists = allTasks.some((t) => t.priority === 'active' && !t.completed);

    if (!activeTaskExists) {
      const firstPendingIndex = allTasks.findIndex((t) => t.priority !== 'done');
      if (firstPendingIndex !== -1) {
        setStartPause(true);
      }
    } else {
      setStartPause(prev => !prev);
    }
  }

  // Keybind functionality (Global keyboard shortcut)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {

      // Start / Pause: Shift + Space
      if (event.shiftKey && event.code === 'Space') {
        event.preventDefault();
        
        if (taskWithTime.length > 0) {
          handleGlobalStartPause();
        }
      }

      // Reset: Shift + r
      if (event.shiftKey && event.key.toLowerCase() === 'r') {
        event.preventDefault();
        setIsResetDialogOpen(true)
      }

      if (event.key === 'Escape') {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  });

  return (
    <>
      <div className="grid grid-cols-5 grid-rows-5 gap-2 h-screen">

        {/* container 1 */}
        <div className="bg-[#d1d5db] rounded-lg col-span-3 ml-2 mt-2">
          <div>
            <UserAvatar />
          </div>

          <div className="p-2 flex gap-1.5 mt-2">
            <AddTask onAddTask={handleAddTask} />
          </div>
        </div>

        {/* container 2 */}
        <div className="flex flex-col justify-center items-center bg-[#f3e5f5] rounded-lg col-span-3 row-start-2 row-span-4 ml-2 mb-2">
          <Timer startPause={startPause} reset={reset} onTimeChange={(_, formatted) => setCurrentTime(formatted)} />

          <div>
            <div className="flex gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant={`secondary`} onClick={handleGlobalStartPause} disabled={taskWithTime.length === 0}>{startPause ? 'Pause' : 'Start'}</Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-500/50" side="left">
                  <p>shift + space</p>
                </TooltipContent>
              </Tooltip>
              <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                      <Button variant={`secondary`}>Reset</Button>
                    </AlertDialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-gray-500/50">
                    <p>shift + r</p>
                  </TooltipContent>
                </Tooltip>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>You will lose your todo&apos;s and the tracked time.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button onClick={handleReset}>Continue</Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        {/* container 3 */}
        <div className="bg-[#818cf8] rounded-lg col-span-2 row-span-5 col-start-4 mt-2 mb-2 mr-2">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel>
              <TodoSection taskWithTime={taskWithTime} currentTime={currentTime} onTaskChange={setAllTasks} startPause={startPause} onToggleStartPause={() => setStartPause(prev => !prev)} onGlobalPause={() => setStartPause(false)} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <TaskMetrics tasks={allTasks} currentTime={currentTime} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </>
  );
}
