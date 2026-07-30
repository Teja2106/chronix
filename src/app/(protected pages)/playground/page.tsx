import Box1 from "./components/box1";

export default function Playground() {
    return (
        <div className="w-full p-4 sm:p-6 md:p-8">
            {/* Bento Grid: 12-Column Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* Top Left Bento Box (Wider: 7/8 cols) */}
                <div className="lg:col-span-7 xl:col-span-8 h-[400px] sm:h-[440px] md:h-[460px] rounded-[28px] border border-border/60 bg-card p-6 shadow-sm transition-all flex flex-col justify-between">
                    <Box1 />
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