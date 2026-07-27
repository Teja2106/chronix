import { Separator } from "@/components/ui/separator";
import { Play, Square } from "lucide-react";

export default function Playground() {
    return (
        <div className="w-full p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
            {/* Bento Grid: 12-Column Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* Top Left Bento Box (Wider: 7/8 cols) */}
                <div className="lg:col-span-7 xl:col-span-8 h-[400px] sm:h-[440px] md:h-[460px] rounded-[28px] border border-border/60 bg-card p-6 shadow-sm transition-all flex flex-col justify-between">
                    <div className="w-full flex items-center justify-between">
                        <div className="flex-col h-20">
                            <div className="flex items-center gap-3">
                                <p className="font-darker-grotesque text-primary lg:text-2xl tracking-[3px]">ACTIVE SESSION</p>
                                <div className="bg-primary/30 rounded-full px-6 py-[3px] flex items-center justify-center gap-2.5 border border-primary/40">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                    <p className="text-primary font-darker-grotesque lg:text-md">Running</p>
                                </div>
                            </div>
                            <div className="pt-4">
                                <p className="lg:text-7xl font-darker-grotesque tracking-[1px] font-bold">Project Name</p>
                            </div>
                        </div>
                        <div className="flex gap-2 self-start">
                            <span className="bg-white/30 p-2 rounded hover:bg-white/50">
                                <Play />
                            </span>
                            <span className="bg-destructive/20 p-2 rounded hover:bg-destructive/50">
                                <Square />
                            </span>
                        </div>
                    </div>

                    <div className=" lg:text-8xl lg:mt-20">
                        <p className="font-darker-grotesque">00:00:00</p>
                    </div>

                    <div className="mt-auto">
                        <Separator />

                        <div className="flex items-center pt-3 lg:gap-10">
                            <div className="flex-col">
                                <p className="font-darker-grotesque lg:text-xl">Started At</p>
                                <p className="font-darker-grotesque">00:00 AM</p>
                            </div>

                            <div>
                                <p className="font-darker-grotesque lg:text-xl">Project ID</p>
                                <p className="font-darker-grotesque">CHRONIX-001</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Right Bento Box (Narrower: 5/4 cols) */}
                <div className="lg:col-span-5 xl:col-span-4 h-[400px] sm:h-[440px] md:h-[460px] rounded-[28px] border border-border/60 bg-card p-6 shadow-sm transition-all">
                
                </div>

                {/* Bottom Left Bento Box (Shrunk: 5 cols) */}
                <div className="lg:col-span-7 xl:col-span-7 h-[360px] sm:h-[400px] md:h-[420px] rounded-[28px] border border-border/60 bg-card p-6 shadow-sm transition-all">
                
                </div>

                {/* Bottom Right Bento Box (Expanded: 5 cols) */}
                <div className="lg:col-span-5 xl:col-span-5 h-[360px] sm:h-[400px] md:h-[420px] rounded-[28px] border border-border/60 bg-card p-6 shadow-sm transition-all">
                
                </div>

            </div>
        </div>
    );
}