'use client';

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Space_Grotesk } from "next/font/google";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useUser, SignOutButton } from "@clerk/nextjs";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [isRestartDialogOpen, setIsRestartDialogOpen] = useState(false);
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const taskInputRef = useRef<HTMLInputElement | null>(null);

  //Task adding functionality
  const handleAddTask = () => {
    if (taskInput.trim() === "") return;
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(), text: taskInput.trim(), completed: false
      }
    ]);

    setTaskInput("");
    setShowInput(false);
  }

  //Focus input when it becomes visible
  useEffect(() => {
    if (showInput && taskInputRef.current) {
      taskInputRef.current.focus();
    }
  }, [showInput]);

  //Timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  //Keyboard event listener for start/pause and reload buttons
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {

      //Start/pause
      if (e.shiftKey && e.code === "Space") {
        e.preventDefault();
        setIsRunning((prev) => {
          const nextState = !prev;
          toast(nextState ? "⏯ Timer Started" : "⏸ Timer Paused");
          return nextState;
        });
      }

      //Restart
      if (e.shiftKey && e.code === "KeyR") {
        e.preventDefault();
        setIsRestartDialogOpen(true);
      }

      //Open Task Input
      if (e.shiftKey && e.code === "Enter") {
        e.preventDefault();
        setShowInput(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  //Keyboard event listener for closing the "Add Task for Today" input bar.
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (editTaskId !== null) {
          setEditTaskId(null);
        } else if (showInput) {
          setShowInput(false);
          setTaskInput("");
        }
      }
    };

    if (showInput) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    }
  }, [showInput, editTaskId]);

  const restartTimer = () => {
    setTime(0);
    setIsRunning(false);
    setTasks([]);
  }

  return (
    <>
      {/* Parent div in which everything is rendered. */}
      <div className="h-screen bg-[#181825] flex justify-center items-center flex-col relative">

        {/* Time rendering component */}
        <div>
          <p className={`text-[#89dceb] text-6xl ${ spaceGrotesk.className }`}>{ formatTime(time) }</p>
        </div>

        {/* Start/Pause and Restart container */}
        <div className="pt-3 flex">
          <div className="pr-3">
            <Button className={`${spaceGrotesk.className} hover:cursor-pointer hover:bg-[#cba6f7]`} onClick={() => setIsRunning((prev) => {
              const nextState = !prev;
              toast(nextState ? '⏯ Timer Started' : '⏸ Timer Paused')
              return nextState;
            })}>{ isRunning ? 'Pause' : 'Start' }</Button>
          </div>
          <div>
            <AlertDialog open={isRestartDialogOpen} onOpenChange={setIsRestartDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant={"outline"} className={`${spaceGrotesk.className} hover:cursor-pointer hover:bg-[#cba6f7] border border-[#cba6f7] bg-background-none text-white`} onClick={() => setIsRestartDialogOpen(true)}>Restart</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className={`${spaceGrotesk.className}`}>Are you sure you want to Restart?</AlertDialogTitle>
                  <AlertDialogDescription>
                    If you have not saved your progress it will be lost and the timer will be reset along with the tasks.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsRestartDialogOpen(false)}>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => {
                    restartTimer();
                    setIsRestartDialogOpen(false);
                  }}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="absolute right-4 top-4 bottom-4 flex flex-col gap-2.5">

          {/* todo list container */}
          <div className="w-[500px] h-[750px] bg-[#cdd6f4]  shadow-lg rounded-[1.2rem] right-4 top-2.5 bottom-2.5 overflow-y-auto flex flex-col p-4">
            <Button className={`${spaceGrotesk.className} bg-[#b589d6] hover:bg-[#cba6f7]`} onClick={() => {setShowInput((prev) => !prev)}}>Add Task for Today</Button>
            <p className={`text-black text-sm ${spaceGrotesk.className}`}>
              {
                isSignedIn ? (
                  <SignOutButton>
                    <span className="underline cursor-pointer hover:text-blue-600">Logout</span>
                  </SignOutButton>
                ) : (
                  <>
                    Want to keep track of your day-to-day tasks?{" "}
                    <span className="underline cursor-pointer hover:text-blue-600" onClick={() => router.push('/sign-in')}>Sign In</span>
                  </>
                )
              }
            </p>

            {/* Adding to-do items input field */}
            <div className="pt-3">
              {
                showInput && (
                  <Input ref={taskInputRef} type="text" placeholder="Item" className={`shadow-2xl border border-gray-600`} value={taskInput} onChange={(e) => setTaskInput(e.target.value)} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTask();
                    }
                  }}/>
              )}

              {/* Rendering Added items as a list */}
              <div className="mt-3">
                {tasks.map((task) => (
                  <div key={task.id} className="hover:bg-[#f5e0dc] rounded-[0.35rem] p-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <Checkbox className={`border border-[#7300ff] mr-2`} checked={task.completed} onCheckedChange={(checked) => setTasks((prev) => 
                        prev.map((t) =>
                          t.id === task.id ? { ...t, completed : !!checked } : t
                        ))} />

                        {/* Editing existing task funcitonality */}
                        {editTaskId === task.id ? (
                          <Input
                          className="bg-[#fff]"
                          type="text" 
                          value={editTaskText} 
                          onChange={(e) => setEditTaskText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              setTasks((prev) =>
                              prev.map((t) =>
                              t.id === task.id ? { ...t, text: editTaskText } : t));
                              setEditTaskId(null);
                            }
                            if (e.key === "Escape") {
                              setEditTaskId(null);
                            }
                          }}
                          />
                        ) : (
                          //Default render of tasks.
                          <span className={`${task.completed ? "line-through text-gray-500" : "text-black"} ${spaceGrotesk.className}`}>{ task.text }</span>
                        )}
                    </div>
                    <div className="flex items-center justify-between gap-1.5">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Priority"/>
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel className={`${spaceGrotesk.className}`}>Priority</SelectLabel>
                            <SelectItem value="kickstart">Low</SelectItem>
                            <SelectItem value="in-progess">Medium</SelectItem>
                            <SelectItem value="backlog">High</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-icon lucide-pencil hover:cursor-pointer" onClick={() => {setEditTaskId(task.id); setEditTaskText(task.text)}}><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Keybinds container (will change into a component later on) */}
          <div className="w-[500px] h-[200px] bg-[#f5e0dc] shadow-lg rounded-[1.2rem] flex flex-col p-2 z-10">
            <div>
              <p className={`${spaceGrotesk.className} text-black font-semibold mb-4 text-center w-full text-lg`}>Keybinds</p>
            </div>
            <ScrollArea>
              <div className="flex">
                Start/Pause Timer - Shift + Spacebar ( {/* Shift key icon */} <svg xmlns="http://www.w3.org/2000/svg" width="14" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-up-icon lucide-move-up"><path d="M8 6L12 2L16 6"/><path d="M12 2V22"/></svg> + {/* Space key icon */} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-space-icon lucide-space"><path d="M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1"/></svg>)
              </div>

              <Separator />
              <div className="flex">
                Restart Timer - Shift + R (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-up-icon lucide-move-up"><path d="M8 6L12 2L16 6"/><path d="M12 2V22"/></svg> + R)
              </div>
              <Separator />
              <div className="flex">
                Add Task to List - Enter ({/* Enter icon */}<svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-corner-down-left-icon lucide-corner-down-left"><path d="M20 4v7a4 4 0 0 1-4 4H4"/><path d="m9 10-5 5 5 5"/></svg>)
              </div>
              <Separator />
              <div className="flex">
                Open To-Do Input - Shift + Enter (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-up-icon lucide-move-up"><path d="M8 6L12 2L16 6"/><path d="M12 2V22"/></svg> + <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-corner-down-left-icon lucide-corner-down-left"><path d="M20 4v7a4 4 0 0 1-4 4H4"/><path d="m9 10-5 5 5 5"/></svg>)
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}