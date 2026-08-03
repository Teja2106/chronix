'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface FeatureModule {
    id: string;
    title: string;
    completed?: boolean;
}

export interface Project {
    id: string;
    name: string;
    description?: string;
    colour: string;
    createdAt: string;
    lastWorkedAt: string;
    totalHours: number;
    totalMinutes: number;
    totalFeatures: number;
    completedFeatures: number;
    modules: FeatureModule[];
}

/**
 * Empty array acting as a dummy in-memory database store for testing project creation and Drizzle ORM integration.
 */
export const DUMMY_PROJECTS_DATABASE: Project[] = [];

const STORAGE_KEY = "chronix_projects_list_v2";
const SELECTED_KEY = "chronix_selected_project_id_v2";

interface ProjectsContextType {
    projects: Project[];
    selectedProjectId: string | null;
    selectedProject: Project | null;
    selectProject: (id: string) => void;
    addProject: (data: { name: string; description?: string; colour: string }) => Project;
    updateProjectLastWorked: (id: string, timestamp?: string) => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
    const [projects, setProjects] = useState<Project[]>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    return JSON.parse(stored);
                } catch {
                    // fallback to empty dummy array
                }
            }
        }
        return DUMMY_PROJECTS_DATABASE;
    });

    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem(SELECTED_KEY);
            if (stored) return stored;
        }
        return null;
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
        }
    }, [projects]);

    useEffect(() => {
        if (typeof window !== "undefined" && selectedProjectId) {
            localStorage.setItem(SELECTED_KEY, selectedProjectId);
        }
    }, [selectedProjectId]);

    const selectProject = (id: string) => {
        setSelectedProjectId(id);
    };

    const addProject = ({ name, description, colour }: { name: string; description?: string; colour: string }): Project => {
        const now = new Date().toISOString();
        const newProj: Project = {
            id: `project-${Date.now()}`,
            name,
            description: description || "",
            colour: colour || "#f58e49",
            createdAt: now,
            lastWorkedAt: now,
            totalHours: 0,
            totalMinutes: 0,
            totalFeatures: 0,
            completedFeatures: 0,
            modules: [],
        };

        // Update in-memory dummy database array as well
        DUMMY_PROJECTS_DATABASE.unshift(newProj);

        setProjects((prev) => [newProj, ...prev]);
        setSelectedProjectId(newProj.id);
        return newProj;
    };

    const updateProjectLastWorked = (id: string, timestamp?: string) => {
        const timeStr = timestamp || new Date().toISOString();
        setProjects((prev) =>
            prev.map((p) => (p.id === id ? { ...p, lastWorkedAt: timeStr } : p))
        );
    };

    const selectedProject =
        projects.find((p) => p.id === selectedProjectId) || projects[0] || null;

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                selectedProjectId: selectedProject ? selectedProject.id : null,
                selectedProject,
                selectProject,
                addProject,
                updateProjectLastWorked,
            }}
        >
            {children}
        </ProjectsContext.Provider>
    );
}

export function useProjects() {
    const context = useContext(ProjectsContext);
    if (!context) {
        throw new Error("useProjects must be used within a ProjectsProvider");
    }
    return context;
}
