'use client';

import React, { useState } from 'react';
import { useProjects, Project } from "@/context/ProjectsContext";
import { formatLastWorked, formatInvestedTime } from "@/lib/timeUtils";
import { CreateProjectDialog } from "./components/create-project-dialog";
import { Plus, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Projects() {
    const { projects, selectProject, selectedProjectId } = useProjects();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

    const toggleModule = (projId: string, modId: string) => {
        const key = `${projId}-${modId}`;
        setExpandedModules((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 md:p-8 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
                <div>
                    <h1 className="text-3xl font-bold font-darker-grotesque tracking-wide text-foreground">
                        Projects Overview
                    </h1>
                    <p className="text-sm text-muted-foreground font-darker-grotesque">
                        Manage workspace sessions, track module features, and monitor invested time.
                    </p>
                </div>

                <button
                    onClick={() => setIsDialogOpen(true)}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2.5 rounded-xl font-medium font-darker-grotesque text-lg transition-all shadow-md cursor-pointer self-start sm:self-auto"
                >
                    <Plus className="w-5 h-5" />
                    <span>New Project</span>
                </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {projects.map((project: Project) => {
                    const isSelected = project.id === selectedProjectId;
                    const investedText = formatInvestedTime(project.totalHours, project.totalMinutes);
                    const lastWorkedText = formatLastWorked(project.lastWorkedAt);

                    return (
                        <div
                            key={project.id}
                            className={cn(
                                "group relative flex flex-col justify-between rounded-[24px] border border-border/60 bg-card p-6 shadow-sm transition-all duration-200 hover:border-border/90",
                                isSelected && "ring-1 ring-primary/40 border-primary/50"
                            )}
                        >
                            <div className="space-y-4">
                                {/* Top Header Row: Project Title with Signature Color Square & Time Invested */}
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className="w-7 h-7 rounded-xl shrink-0 shadow-md transition-transform"
                                                style={{ backgroundColor: project.colour || "#f58e49" }}
                                            />
                                            <h2 className="text-2xl font-bold font-darker-grotesque tracking-tight text-foreground group-hover:text-primary transition-colors truncate">
                                                {project.name}
                                            </h2>
                                        </div>
                                        {project.description && (
                                            <p className="mt-1.5 text-sm text-muted-foreground font-darker-grotesque line-clamp-2 leading-relaxed">
                                                {project.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="text-right shrink-0">
                                        <p className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
                                            TIME INVESTED
                                        </p>
                                        <p
                                            className="font-mono text-sm font-semibold"
                                            style={{ color: project.colour || "#f58e49" }}
                                        >
                                            {investedText}
                                        </p>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-2 pb-2">
                                    <div>
                                        <p className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase">
                                            TOTAL FEATURES
                                        </p>
                                        <p className="font-mono text-base font-semibold text-foreground">
                                            {project.totalFeatures}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase">
                                            COMPLETED
                                        </p>
                                        <p className="font-mono text-base font-semibold text-foreground">
                                            {project.completedFeatures}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase">
                                            HOURS INVESTED
                                        </p>
                                        <p className="font-mono text-base font-semibold text-foreground">
                                            {investedText}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase">
                                            LAST WORKED
                                        </p>
                                        <p className="font-mono text-base font-semibold text-foreground">
                                            {lastWorkedText}
                                        </p>
                                    </div>
                                </div>

                                {/* Modules Dropdowns */}
                                {project.modules && project.modules.length > 0 && (
                                    <div className="space-y-2 pt-2">
                                        {project.modules.map((mod) => {
                                            const isExpanded = expandedModules[`${project.id}-${mod.id}`];
                                            return (
                                                <div
                                                    key={mod.id}
                                                    className="rounded-xl border border-white/5 bg-white/2 overflow-hidden transition-colors hover:bg-white/4"
                                                >
                                                    <button
                                                        onClick={() => toggleModule(project.id, mod.id)}
                                                        className="w-full px-4 py-3 flex items-center justify-between text-left text-sm font-mono text-foreground/90 cursor-pointer"
                                                    >
                                                        <span>{mod.title}</span>
                                                        <ChevronDown
                                                            className={cn(
                                                                "w-4 h-4 text-muted-foreground transition-transform duration-200",
                                                                isExpanded && "rotate-180"
                                                            )}
                                                        />
                                                    </button>
                                                    {isExpanded && (
                                                        <div className="px-4 pb-3 pt-1 text-xs text-muted-foreground border-t border-white/5 font-mono">
                                                            <div className="flex items-center justify-between">
                                                                <span>Status:</span>
                                                                <span className={mod.completed ? "text-emerald-400 font-medium" : "text-amber-400 font-medium"}>
                                                                    {mod.completed ? "Completed" : "In Progress"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Select Project Footer Action */}
                            <div className="pt-4 mt-4 border-t border-border/30 flex items-center justify-between">
                                <span className="text-xs text-muted-foreground font-mono">
                                    {isSelected ? "Currently Selected" : "Click to select"}
                                </span>
                                <button
                                    onClick={() => selectProject(project.id)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-colors cursor-pointer",
                                        isSelected
                                            ? "bg-primary/20 text-primary border border-primary/30"
                                            : "bg-white/5 hover:bg-white/10 text-foreground/80"
                                    )}
                                >
                                    {isSelected ? "Active Workspace" : "Switch Workspace"}
                                </button>
                            </div>
                        </div>
                    );
                })}

                {/* "+ New Project" Card */}
                <button
                    onClick={() => setIsDialogOpen(true)}
                    className="group flex flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-border/60 hover:border-border bg-card/40 hover:bg-card/70 min-h-[360px] p-8 text-center transition-all duration-200 cursor-pointer space-y-3"
                >
                    <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-primary/20 border border-border/60 group-hover:border-primary/40 flex items-center justify-center text-foreground group-hover:text-primary transition-colors">
                        <Plus className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-2xl font-bold font-darker-grotesque tracking-wide text-foreground group-hover:text-primary transition-colors">
                            New Project
                        </h3>
                        <p className="text-xs text-muted-foreground font-mono">
                            Initialize a new workspace session
                        </p>
                    </div>
                </button>
            </div>

            {/* Create Project Dialog Modal */}
            <CreateProjectDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />
        </div>
    );
}