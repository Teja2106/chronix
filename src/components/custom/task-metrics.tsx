import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { Task } from "./todo-section";

export type Session = {
    id: string,
    workingDuration: string;
    tasks: Task[];
}

const calculateChronixDuration = (start?: string, end?: string): string => {
    if (!start || !end) return "—";

    const [sh, sm, ss] = start.split(":").map(Number);
    const [eh, em, es] = end.split(":").map(Number);

    const startSeconds = sh * 3600 + sm * 60 + ss;
    const endSeconds = eh * 3600 + em * 60 + es;
    const diff = endSeconds - startSeconds;

    if (diff < 0) return "—"; // invalid case (done before active)

    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;

    return `${h.toString().padStart(2, "0")}:${m
        .toString()
        .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

export default function TaskMetrics({ tasks, sessions }: { tasks: Task[]; sessions: Session[] }) {
    return (
        <>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>
                    <div className="m-2">
                        <p className="text-xl font-bold mb-2">Live Task Metrics</p>
                        <ul>
                            {tasks.length === 0 && <p className="text-sm">No active tasks</p>}
                            {tasks.map((t, index) => (
                                <li key={index} className="mb-6 border-b pb-4">
                                    <p>
                                        <span className="font-semibold">Task: </span>
                                        {t.text}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Priority: </span>
                                        {t.priority}
                                    </p>

                                    {/* Chronix vs System Timestamps */}
                                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                        <div>
                                            <p className="font-semibold">Chronix Timestamps</p>
                                            <p>Created At: {t.createdAt}</p>
                                            <p>Completed At: {t.completedAt ?? "—"}</p>
                                            <p>Cold At: {t.coldAt ?? "—"}</p>
                                            <p>Active At: {t.activeAt ?? "—"}</p>
                                            <p>Done At: {t.doneAt ?? "—"}</p>
                                            <p>Checked At: {t.checkedAt ?? "—"}</p>
                                        </div>

                                        <div>
                                            <p className="font-semibold">System Timestamps</p>
                                            <p>Created At: {t.systemCreatedAt}</p>
                                            <p>Completed At: {t.systemCompletedAt ?? "—"}</p>
                                            <p>Cold At: {t.systemColdAt ?? "—"}</p>
                                            <p>Active At: {t.systemActiveAt ?? "—"}</p>
                                            <p>Done At: {t.systemDoneAt ?? "—"}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel>
                    <div className="m-2">
                        <p className="text-xl font-bold mb-2">Saved Sessions</p>
                        <ul>
                            {sessions.length === 0 && <p className="text-sm">No sessions saved</p>}
                            {sessions.map((s) => (
                                <li key={s.id} className="mb-6 border-b pb-4">
                                    <p>
                                        <span className="font-semibold">Session ID: </span>
                                        {s.id}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Working Duration: </span>
                                        {s.workingDuration}
                                    </p>
                                    <div className="mt-3">
                                        <p className="font-semibold">Tasks:</p>
                                        <ul className="ml-4 list-disc">
                                            {s.tasks.map((t, idx) => (
                                                <li key={idx} className="mt-2">
                                                    <p>
                                                        <span className="font-semibold">
                                                            {t.text}
                                                        </span>
                                                    </p>
                                                    <p>Cold At: {t.coldAt ?? "—"}</p>
                                                    <p>Active At: {t.activeAt ?? "—"}</p>
                                                    <p>Done At: {t.doneAt ?? "—"}</p>
                                                    <p>
                                                        Duration (Active → Done):{" "}
                                                        {calculateChronixDuration(
                                                            t.activeAt,
                                                            t.doneAt
                                                        )}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    )
}