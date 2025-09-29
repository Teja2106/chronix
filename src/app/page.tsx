'use client';

import AddTask from "@/components/custom/add-task";
import Timer from "@/components/custom/timer";
import TodoSection from "@/components/custom/todo-section";
import UserAvatar from "@/components/custom/user-avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useState } from "react";

export default function Home() {
  const [startPause, setStartPause] = useState(false);
  const [reset, setReset] = useState(false);
  const [latestSavedTime, setLatestSavedTime] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState<string>('00:00:00');

  // State for task input field
  const [task, setTask] = useState<string[]>([]);

  const handleReset = () => {
    setReset(true);
    setStartPause(false);
    setTask([]);
    setTimeout(() => setReset(false), 0);
  }

  const handleSave = () => {
    setLatestSavedTime((prev) => [...prev, currentTime])
  }

  return (
    <>
      <div className="grid grid-cols-5 grid-rows-5 gap-2 h-screen">
        
        {/* container 1 */}
        <div className="bg-[#d1d5db] rounded-lg col-span-3 ml-2 mt-2">
          <div>
            <UserAvatar />
          </div>

          <div className="p-2 flex gap-1.5 mt-2">
            <AddTask onAddTask={(task) => setTask((prev) => [...prev, task])} />
          </div>
        </div>

        {/* container 2 */}
        <div className="flex flex-col justify-center items-center bg-[#f3e5f5] rounded-lg col-span-3 row-start-2 row-span-4 ml-2 mb-2">
          <Timer startPause={ startPause } reset={ reset } onTimeChange={(_, formatted) => setCurrentTime(formatted)} />

            <div>
              <div className="flex gap-1">
                <Button variant={`secondary`} onClick={() => setStartPause(!startPause)}>{ startPause ? 'Pause' : 'Start' }</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={`secondary`}>Reset</Button>
                  </AlertDialogTrigger>
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
              <Button variant={`secondary`} className="w-full mt-1 cursor-pointer" disabled={ currentTime === '00:00:00' } onClick={ handleSave }>Save</Button>
            </div>
        </div>

        {/* container 3 */}
        <div className="bg-[#818cf8] rounded-lg col-span-2 row-span-5 col-start-4 mt-2 mb-2 mr-2">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel><TodoSection task={task} /></ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>Bottom</ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </>
  );
}
