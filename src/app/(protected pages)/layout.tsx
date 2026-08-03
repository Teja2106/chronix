import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProjectsProvider } from "@/context/ProjectsContext";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ProjectsProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <main>
                        <SidebarTrigger />
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </ProjectsProvider>
    )
}