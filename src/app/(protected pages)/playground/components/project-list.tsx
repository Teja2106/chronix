'use client';

import { ArrowRight, Lock, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProjects, Project } from "@/context/ProjectsContext";
import { formatLastWorked } from "@/lib/timeUtils";

interface ProjectListProps {
    sessionActive: boolean;
    selectedProjectId?: string | null;
    onSelectProject?: (id: string) => void;
}

export default function ProjectList({ sessionActive, selectedProjectId: propSelectedId, onSelectProject: propOnSelect }: ProjectListProps) {
    const { projects, selectedProjectId: contextSelectedId, selectProject: contextSelect } = useProjects();

    const currentSelectedId = propSelectedId !== undefined ? propSelectedId : contextSelectedId;
    const handleSelect = (id: string) => {
        if (propOnSelect) {
            propOnSelect(id);
        } else {
            contextSelect(id);
        }
    };

    if (!projects || projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100%-2.5rem)] mt-3 text-center p-6 text-muted-foreground">
                <FolderOpen className="w-8 h-8 opacity-40 mb-2" />
                <p className="font-darker-grotesque text-lg tracking-wide">
                    no projects available
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100%-2.5rem)] mt-3">
            <div className="flex-1 overflow-y-auto pr-1.5 space-y-1.5 max-h-[350px] scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                {projects.map((project: Project) => {
                    const isSelected = project.id === currentSelectedId;
                    const isLocked = sessionActive && !isSelected;

                    let subtitle = isSelected && sessionActive
                        ? "Active now"
                        : `Last worked: ${formatLastWorked(project.lastWorkedAt)}`;

                    return (
                        <button
                            key={project.id}
                            disabled={isLocked}
                            title={isLocked ? "End your session before switching projects" : undefined}
                            onClick={() => !isLocked && handleSelect(project.id)}
                            className={cn(
                                "group w-full flex items-center justify-between px-4 py-3 rounded-2xl border transition-all duration-200 text-left shrink-0",
                                isSelected
                                    ? "bg-white/5 border-border/60"
                                    : "border-transparent",
                                !isLocked && !isSelected
                                    ? "hover:bg-white/5 hover:border-border/40 cursor-pointer"
                                    : "",
                                isLocked ? "opacity-40 cursor-not-allowed" : ""
                            )}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <span
                                    className={cn(
                                        "w-2.5 h-2.5 rounded-full shrink-0",
                                        isSelected
                                    )}
                                    style={{ backgroundColor: project.colour || "#f58e49" }}
                                />
                                <div className="min-w-0">
                                    <p className={cn(
                                        "font-darker-grotesque text-[17px] leading-tight truncate transition-all",
                                        isSelected ? "font-semibold text-foreground" : "font-medium text-foreground/70"
                                    )}>
                                        {project.name}
                                    </p>
                                    <p className="font-darker-grotesque text-sm text-muted-foreground leading-tight truncate">
                                        {subtitle}
                                    </p>
                                </div>
                            </div>

                            <div className="shrink-0 ml-3">
                                {isSelected ? (
                                    <ArrowRight size={18} className="text-foreground/60" />
                                ) : isLocked ? (
                                    <Lock size={14} className="text-muted-foreground" />
                                ) : null}
                            </div>
                        </button>
                    );
                })}
            </div>

            {sessionActive && (
                <p className="text-xs text-muted-foreground font-darker-grotesque text-center mt-2 px-2 shrink-0">
                    End your session to switch projects
                </p>
            )}
        </div>
    );
}
