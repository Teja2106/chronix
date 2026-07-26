"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import { Button } from "./button";
import { Plus } from "lucide-react";
import { Grid3Bold } from 'mx-icons';
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

function FolderIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 0 0-3-3h-3.879a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H6a3 3 0 0 0-3 3v3.162A3.756 3.756 0 0 1 4.094 9h15.812ZM4.094 10.5a2.25 2.25 0 0 0-2.227 2.568l.857 6A2.25 2.25 0 0 0 4.951 21H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-2.227-2.568H4.094Z" />
        </svg>
    )
}

// Define all sidebar navigation items here for automatic conditional highlighting
const navItems = [
    {
        title: "Playground",
        href: "/playground",
        icon: Grid3Bold,
    },
    {
        title: "Projects",
        href: "/projects",
        icon: FolderIcon
    }
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader>
                <p className="font-bitcount-single max-sm:text-3xl 2xl:text-[30px]">Chronix</p>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <Button variant={'secondary'}>
                        <div>
                            <Plus />
                        </div>
                        <div>
                            <p>New Session</p>
                        </div>
                    </Button>
                </SidebarGroup>
                <SidebarGroup className="mt-3 flex flex-col gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (pathname ? pathname.startsWith(`${item.href}/`) : false);
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex gap-3 items-center justify-start px-3.5 py-2.5 rounded-xl transition-all duration-200 border border-transparent",
                                    isActive
                                        ? "bg-[#231a33] text-[#d3bbfb] font-semibold border-r-[3px] border-r-[#d3bbfb] shadow-[0_0_10px_rgba(211,187,251,0.12)]"
                                        : "text-zinc-400 hover:bg-[#231a33]/40 hover:text-zinc-200"
                                )}>
                                <div>
                                    <Icon size={24} color={isActive ? "#d3bbfb" : "#94a3b8"} />
                                </div>
                                <div>
                                    <p className="font-darker-grotesque text-xl leading-none">{item.title}</p>
                                </div>
                            </Link>
                        );
                    })}
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}