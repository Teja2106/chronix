import { Task } from "./todo-section";

export type Session = {
    id: string,
    latestSavedTime: string;
    tasks: Task[];
}

export default function TaskMetrics({ sessions }: { sessions: Session[]; }) {
    return (
        <>
            <div className="w-full p-2 mt-2.5">
                <p>Task Metrics</p>

                {
                    sessions.length === 0 ? (
                        <p className="mt-2">No sessions saved yet.</p>
                    ) : (
                        <ul className="overflow-y-scroll">
                            {
                                sessions.map((session) => (
                                    <li key={session.id}>
                                        <p>{session.id} -- Latest Saved Time: {session.latestSavedTime}</p>

                                        <ul>
                                            {
                                                session.tasks.map((t, index) => (
                                                    <li key={index}>
                                                        <p><span className="font-medium">Task:</span> {t.text}</p>
                                                        <p><span className="font-medium">Created At:</span> {t.createdAt}</p>
                                                        <p><span className="font-medium">Completed At:</span> {t.completedAt ?? "—"}</p>
                                                        <p><span className="font-medium">Chronix Timer [Added]:</span> {t.savedTime}</p>
                                                        <p><span className="font-medium">Chronix Timer [Checked]:</span> {t.checkedAt ?? "—"}</p>
                                                        <p><span className="font-medium">Priority:</span> {t.priority}</p>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </>
    )
}