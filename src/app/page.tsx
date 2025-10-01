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
import type { Session } from "@/components/custom/task-metrics";

export default function Home() {
  const [startPause, setStartPause] = useState(false);
  const [reset, setReset] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('00:00:00');

  console.log(currentTime);

  // Additional state for task and time
  const [taskWithTime, setTaskWithTime] = useState<{ text: string; savedTime: string }[]>([]);

  // Full task state sync with Todo section
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  // Session State
  const [session, setSession] = useState<Session[]>([]);

  // State to control Reset Alert Dialog manually
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const handleReset = (clearSession: boolean) => {
    setReset(true);
    setStartPause(false);
    setTaskWithTime([]);

    if (clearSession) {
      setSession([]);
    }

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

  // Functionality to save the data (modification needed)
  const handleSave = () => {
    if (currentTime === '00:00:00') return;

    const newSession: Session = {
      id: `session_${session.length + 1}`,
      workingDuration: currentTime,
      tasks: allTasks
    };

    setSession((prev) => [...prev, newSession]);

    handleReset(false);
  }

  // Keybind functionality (Global keyboard shortcut)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {

      // Start / Pause: Shift + Space
      if (event.shiftKey && event.code === 'Space') {
        event.preventDefault();
        setStartPause(prev => !prev);
      }

      // Reset: Shift + r
      if (event.shiftKey && event.key.toLowerCase() === 'r') {
        event.preventDefault();
        setIsResetDialogOpen(true)
      }

      // Save Alt + s
      if (event.altKey && event.key.toLowerCase() === 's') {
        event.preventDefault();
        if (currentTime !== '00:00:00') handleSave();
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
            <AddTask onAddTask={handleAddTask} disabled={currentTime === '00:00:00'} />
          </div>
        </div>

        {/* container 2 */}
        <div className="flex flex-col justify-center items-center bg-[#f3e5f5] rounded-lg col-span-3 row-start-2 row-span-4 ml-2 mb-2">
          <Timer startPause={startPause} reset={reset} onTimeChange={(_, formatted) => setCurrentTime(formatted)} />

          <div>
            <div className="flex gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant={`secondary`} onClick={() => setStartPause(!startPause)}>{startPause ? 'Pause' : 'Start'}</Button>
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
                      <Button onClick={() => handleReset(true)}>Continue</Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={`secondary`} className="w-full mt-1 cursor-pointer" disabled={currentTime === '00:00:00'} onClick={handleSave}>Save</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-gray-500/50">
                <p>alt + s</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* container 3 */}
        <div className="bg-[#818cf8] rounded-lg col-span-2 row-span-5 col-start-4 mt-2 mb-2 mr-2">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel>
              <TodoSection taskWithTime={taskWithTime} currentTime={currentTime} onTaskChange={setAllTasks} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <TaskMetrics sessions={session} tasks={allTasks} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </>
  );
}
