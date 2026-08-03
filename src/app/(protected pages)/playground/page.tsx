'use client';

import { Arrow2Linear } from "mx-icons";
import useSessionTimer from "./hooks/useSessionTimer";
import Box1 from "./components/box1";
import ProjectList from "./components/project-list";
import Link from "next/link";
import { getLogger } from "@logtape/logtape";
import { useProjects } from "@/context/ProjectsContext";

export default function Playground() {
    const logger = getLogger(['chronix', 'playground']);
    logger.info('This is from playground for dummy info.');

    const session = useSessionTimer();
    const { selectedProjectId, selectedProject, selectProject } = useProjects();

    // Session is "active" (started) when startedAt is set — even if currently paused
    const sessionActive = session.startedAt !== null;

    return (
        <div className="w-full p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                {/* Top Left — Active Session */}
                <div className="lg:col-span-7 xl:col-span-8 h-[400px] sm:h-[440px] md:h-[460px] rounded-[28px] border border-border/60 bg-card p-6 shadow-sm transition-all flex flex-col justify-between">
                    <Box1 session={session} projectName={selectedProject?.name || "No Project"} />
                </div>

                {/* Top Right — Quick Switch */}
                <div className="lg:col-span-5 xl:col-span-4 h-[400px] sm:h-[440px] md:h-[460px] rounded-[28px] border border-border/60 bg-card p-6 shadow-sm transition-all flex flex-col">
                    <div className="flex items-center justify-between shrink-0 mb-1">
                        <p className="font-darker-grotesque lg:text-xl tracking-[2px]">QUICK SWITCH</p>
                        <Link href={'/projects'}><Arrow2Linear size={30} color="#f8fafc" className="hover:bg-accent p-1 rounded-lg" /></Link>
                    </div>

                    <ProjectList
                        sessionActive={sessionActive}
                        selectedProjectId={selectedProjectId}
                        onSelectProject={selectProject}
                    />
                </div>

                {/* Bottom Left */}
                <div className="lg:col-span-7 xl:col-span-7 h-[360px] sm:h-[400px] md:h-[420px] rounded-[28px] border border-border/60 bg-card p-6 shadow-sm transition-all">
                </div>

                {/* Bottom Right */}
                <div className="lg:col-span-5 xl:col-span-5 h-[360px] sm:h-[400px] md:h-[420px] rounded-[28px] border border-border/60 bg-card p-6 shadow-sm transition-all">
                </div>

            </div>
        </div>
    );
}