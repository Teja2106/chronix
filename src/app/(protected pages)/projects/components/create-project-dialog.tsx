'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Pipette } from "lucide-react";
import { useProjects } from "@/context/ProjectsContext";

const PRESET_COLORS = ["#f58e49", "#a881f3", "#2dd4bf"];

interface CreateProjectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateProjectDialog({ open, onOpenChange }: CreateProjectDialogProps) {
    const { addProject } = useProjects();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
    const [customColor, setCustomColor] = useState("#8b5cf6");

    const isCustomSelected = !PRESET_COLORS.includes(selectedColor);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        addProject({
            name: name.trim(),
            description: description.trim(),
            colour: selectedColor,
        });

        // Reset form and close dialog
        setName("");
        setDescription("");
        setSelectedColor(PRESET_COLORS[0]);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-card border-border/80 text-foreground p-6 rounded-2xl shadow-xl">
                <DialogHeader className="gap-1">
                    <DialogTitle className="font-semibold tracking-wide font-darker-grotesque text-2xl">
                        Create New Project
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Initialize a new project workspace. Define a name, description, and signature color.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5 mt-2">
                    {/* Project Name */}
                    <div className="space-y-4">
                        <label className="text-lg font-medium leading-none text-foreground/90 font-darker-grotesque pl-1 ">
                            Project Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                            type="text"
                            placeholder="e.g. Obsidian UI System"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="bg-background/50 border-border/60 focus-visible:ring-primary/50 focus-visible:ring-2 text-foreground my-1.5"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-lg font-medium leading-none text-foreground/90 font-darker-grotesque pl-1">
                            Description <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Brief summary of your project goals or features..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full min-w-0 rounded-md border border-input bg-background/50 px-3 py-2 text-sm shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 text-foreground placeholder:text-muted-foreground resize-none mt-1.5"
                        />
                    </div>

                    {/* Signature Color */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-foreground/90 font-darker-grotesque">
                            Signature Color
                        </label>
                        <div className="flex items-center gap-3 pt-1">
                            {PRESET_COLORS.map((color) => {
                                const isSelected = selectedColor === color;
                                return (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => setSelectedColor(color)}
                                        className={`relative w-9 h-9 rounded-full transition-transform flex items-center justify-center cursor-pointer ${
                                            isSelected ? "ring-2 ring-offset-2 ring-primary scale-110" : "hover:scale-105"
                                        }`}
                                        style={{ backgroundColor: color }}
                                        title={`Select ${color}`}
                                    >
                                        {isSelected && <Check className="w-4 h-4 text-slate-950 font-bold" />}
                                    </button>
                                );
                            })}

                            {/* Custom Color Selector */}
                            <div className="relative flex items-center">
                                <label
                                    htmlFor="custom-color-picker"
                                    className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-transform cursor-pointer border border-border/80 ${
                                        isCustomSelected ? "ring-2 ring-offset-2 ring-primary scale-110" : "hover:scale-105"
                                    }`}
                                    style={{ backgroundColor: isCustomSelected ? selectedColor : customColor }}
                                    title="Choose custom color"
                                >
                                    {isCustomSelected ? (
                                        <Check className="w-4 h-4 text-slate-950 font-bold" />
                                    ) : (
                                        <Pipette className="w-4 h-4 text-white/80" />
                                    )}
                                </label>
                                <input
                                    id="custom-color-picker"
                                    type="color"
                                    value={isCustomSelected ? selectedColor : customColor}
                                    onChange={(e) => {
                                        setCustomColor(e.target.value);
                                        setSelectedColor(e.target.value);
                                    }}
                                    className="opacity-0 absolute w-0 h-0 pointer-events-auto cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="pt-4 flex items-center justify-end gap-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            className="hover:bg-white/5"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={!name.trim()}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-5 cursor-pointer"
                        >
                            Create Project
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
