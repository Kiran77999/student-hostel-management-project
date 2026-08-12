import React from 'react';

const Timetable = () => {
  return (
    <div className="bg-[#081425] min-h-[calc(100vh-64px)] font-sans text-slate-200 p-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#334155 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-bold text-white mb-2">Weekly Schedule</h2>
                    <p className="text-slate-400 flex items-center gap-2 text-sm font-medium">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        Dept. of Computer Science | Room #G2
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-[#152031] hover:bg-[#1f2a3c] border border-slate-700/50 px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all">
                        <span className="material-symbols-outlined text-[18px]">print</span>
                        Export PDF
                    </button>
                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] transition-all">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        New Task
                    </button>
                </div>
            </div>

            {/* Timetable Component */}
            <div className="bg-[#0f172a]/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-slate-800/80">
                {/* Day Headers */}
                <div className="grid grid-cols-[100px_repeat(6,1fr)] bg-slate-900/80 border-b border-slate-800/50 py-4">
                    <div className="text-center text-xs font-bold text-slate-500 self-center uppercase tracking-widest">TIME</div>
                    <div className="text-center">
                        <span className="block font-bold text-white text-sm uppercase tracking-wide">Monday</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1 block">OCT 23</span>
                    </div>
                    <div className="text-center">
                        <span className="block font-bold text-white text-sm uppercase tracking-wide">Tuesday</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1 block">OCT 24</span>
                    </div>
                    <div className="text-center">
                        <span className="block font-bold text-cyan-400 text-sm uppercase shadow-cyan-400">Wednesday</span>
                        <span className="text-[10px] text-cyan-500/80 font-bold uppercase tracking-wider mt-1 block">OCT 25</span>
                    </div>
                    <div className="text-center">
                        <span className="block font-bold text-white text-sm uppercase tracking-wide">Thursday</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1 block">OCT 26</span>
                    </div>
                    <div className="text-center">
                        <span className="block font-bold text-white text-sm uppercase tracking-wide">Friday</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1 block">OCT 27</span>
                    </div>
                    <div className="text-center">
                        <span className="block font-bold text-white text-sm uppercase tracking-wide">Saturday</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1 block">OCT 28</span>
                    </div>
                </div>

                <div className="relative">
                    {/* Current Time Indicator */}
                    <div className="absolute w-full h-[2px] z-30 pointer-events-none" style={{ top: '245px', background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)' }}>
                        <div className="absolute -left-1 -top-1 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] animate-pulse"></div>
                    </div>

                    {/* 10:00 - 11:30 */}
                    <div className="grid grid-cols-[100px_repeat(6,1fr)] border-b border-slate-800/30">
                        <div className="p-4 flex flex-col items-center justify-center border-r border-slate-800/30 text-xs font-bold text-slate-400">
                            <span>10:00</span>
                            <div className="h-8 w-px bg-slate-800/80 my-1"></div>
                            <span>11:30</span>
                        </div>
                        <div className="p-2">
                            <div className="h-full bg-blue-500/10 border-l-4 border-blue-500 rounded-lg p-3 hover:bg-blue-500/20 transition-all cursor-pointer">
                                <span className="text-[10px] font-bold text-blue-400 block mb-1 tracking-widest uppercase">PGPE-I</span>
                                <h4 className="text-sm font-semibold text-white leading-tight">Advanced Algorithms</h4>
                                <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1 font-bold"><span className="material-symbols-outlined text-[12px]">apartment</span> Room #G2</p>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="h-full bg-purple-500/10 border-l-4 border-purple-500 rounded-lg p-3 hover:bg-purple-500/20 transition-all cursor-pointer">
                                <span className="text-[10px] font-bold text-purple-400 block mb-1 tracking-widest uppercase">ELECTIVE</span>
                                <h4 className="text-sm font-semibold text-white leading-tight">MFCS</h4>
                                <p className="text-[10px] text-slate-500 mt-2 font-bold">Prof. Zhang</p>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="h-full bg-blue-500/10 border-l-4 border-blue-500 rounded-lg p-3 hover:bg-blue-500/20 transition-all cursor-pointer">
                                <span className="text-[10px] font-bold text-blue-400 block mb-1 tracking-widest uppercase">PGPE-I</span>
                                <h4 className="text-sm font-semibold text-white leading-tight">Advanced Algorithms</h4>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="h-full bg-purple-500/10 border-l-4 border-purple-500 rounded-lg p-3 hover:bg-purple-500/20 transition-all cursor-pointer">
                                <span className="text-[10px] font-bold text-purple-400 block mb-1 tracking-widest uppercase">ELECTIVE</span>
                                <h4 className="text-sm font-semibold text-white leading-tight">MFCS</h4>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="h-full bg-blue-500/10 border-l-4 border-blue-500 rounded-lg p-3 hover:bg-blue-500/20 transition-all cursor-pointer">
                                <span className="text-[10px] font-bold text-blue-400 block mb-1 tracking-widest uppercase">PGPE-I</span>
                                <h4 className="text-sm font-semibold text-white leading-tight">Advanced Algorithms</h4>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="h-full bg-emerald-500/10 border-emerald-500/30 rounded-lg p-3 flex flex-col justify-center items-center text-center opacity-80 border-dashed border-2">
                                <span className="material-symbols-outlined text-emerald-400 mb-1">event_available</span>
                                <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">Library Hours</span>
                            </div>
                        </div>
                    </div>

                    {/* 11:30 - 01:00 */}
                    <div className="grid grid-cols-[100px_repeat(6,1fr)] border-b border-slate-800/30">
                        <div className="p-4 flex flex-col items-center justify-center border-r border-slate-800/30 text-xs font-bold text-slate-400">
                            <span>11:30</span>
                            <div className="h-8 w-px bg-slate-800/80 my-1"></div>
                            <span>01:00</span>
                        </div>
                        <div className="p-2">
                            <div className="h-full bg-cyan-500/10 border-l-4 border-cyan-500 rounded-lg p-3 hover:bg-cyan-500/20 transition-all cursor-pointer">
                                <span className="text-[10px] font-bold text-cyan-400 block mb-1 tracking-widest uppercase">PGPE-II</span>
                                <h4 className="text-sm font-semibold text-white leading-tight">Deep Learning</h4>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="h-full bg-orange-500/10 border-l-4 border-orange-500 rounded-lg p-3 hover:bg-orange-500/20 transition-all cursor-pointer">
                                <span className="text-[10px] font-bold text-orange-400 block mb-1 tracking-widest uppercase">CORE</span>
                                <h4 className="text-sm font-semibold text-white leading-tight">Software Quality Engineering</h4>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="h-full bg-cyan-500/10 border-l-4 border-cyan-500 rounded-lg p-3 hover:bg-cyan-500/20 transition-all cursor-pointer">
                                <span className="text-[10px] font-bold text-cyan-400 block mb-1 tracking-widest uppercase">PGPE-II</span>
                                <h4 className="text-sm font-semibold text-white leading-tight">Deep Learning</h4>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="h-full bg-orange-500/10 border-l-4 border-orange-500 rounded-lg p-3 hover:bg-orange-500/20 transition-all cursor-pointer">
                                <span className="text-[10px] font-bold text-orange-400 block mb-1 tracking-widest uppercase">CORE</span>
                                <h4 className="text-sm font-semibold text-white leading-tight">SQE</h4>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="h-full bg-cyan-500/10 border-l-4 border-cyan-500 rounded-lg p-3 hover:bg-cyan-500/20 transition-all cursor-pointer">
                                <span className="text-[10px] font-bold text-cyan-400 block mb-1 tracking-widest uppercase">PGPE-II</span>
                                <h4 className="text-sm font-semibold text-white leading-tight">Deep Learning</h4>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="h-full bg-slate-800/30 rounded-lg p-3 flex items-center justify-center border border-slate-700/50">
                                <span className="text-[10px] text-slate-500 font-bold italic uppercase tracking-tighter">Self Study</span>
                            </div>
                        </div>
                    </div>

                    {/* 01:00 - 02:00 LUNCH */}
                    <div className="grid grid-cols-[100px_repeat(6,1fr)] bg-slate-900/40 border-b border-slate-800/30">
                        <div className="p-2 flex flex-col items-center justify-center border-r border-slate-800/30">
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest rotate-180" style={{ writingMode: 'vertical-lr' }}>Break</span>
                        </div>
                        <div className="col-span-6 flex items-center justify-center gap-4 py-4">
                            <div className="h-px w-24 bg-gradient-to-r from-transparent to-slate-700"></div>
                            <span className="material-symbols-outlined text-slate-500 text-lg">restaurant</span>
                            <span className="font-bold text-slate-500 text-[10px] tracking-widest uppercase">Research Recess & Lunch Interval (01:00 PM - 02:00 PM)</span>
                            <div className="h-px w-24 bg-gradient-to-l from-transparent to-slate-700"></div>
                        </div>
                    </div>

                    {/* 02:00 - 03:30 */}
                    <div className="grid grid-cols-[100px_repeat(6,1fr)] border-b border-slate-800/30">
                        <div className="p-4 flex flex-col items-center justify-center border-r border-slate-800/30 text-xs font-bold text-slate-400">
                            <span>02:00</span>
                            <div className="h-8 w-px bg-slate-800/80 my-1"></div>
                            <span>03:30</span>
                        </div>
                        <div className="p-2">
                            <div className="h-full bg-rose-500/10 border-l-4 border-rose-500 rounded-lg p-3 hover:bg-rose-500/20 transition-all cursor-pointer">
                                <span className="text-[10px] font-bold text-rose-400 block mb-1 tracking-widest uppercase">RESEARCH</span>
                                <h4 className="text-sm font-semibold text-white leading-tight">RM & IPR</h4>
                                <p className="text-[10px] text-slate-500 mt-2 font-bold">Dr. Sarah Miller</p>
                            </div>
                        </div>

                        {/* Lab Session Spans */}
                        <div className="p-2 row-span-2">
                            <div className="h-[200px] bg-indigo-500/10 border-l-4 border-indigo-500 rounded-lg p-4 hover:bg-indigo-500/20 transition-all cursor-pointer flex flex-col">
                                <span className="text-[10px] font-bold text-indigo-400 block mb-1 tracking-widest uppercase">LAB SESSION</span>
                                <h4 className="text-sm font-semibold text-white leading-tight mb-2">DL Lab (G5)</h4>
                                <p className="text-[10px] text-slate-400 mt-1 mb-auto">Practical Implementation</p>
                                <div className="mt-auto pt-4 border-t border-indigo-500/20 flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-700 border-2 border-slate-900 border-indigo-500/50"></div>
                                        <div className="w-6 h-6 rounded-full bg-slate-600 border-2 border-slate-900 border-indigo-500/50"></div>
                                        <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[8px] font-bold text-white border-2 border-slate-900">+12</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-2">
                            <div className="h-full bg-rose-500/10 border-l-4 border-rose-500 rounded-lg p-3 hover:bg-rose-500/20 transition-all cursor-pointer">
                                <span className="text-[10px] font-bold text-rose-400 block mb-1 tracking-widest uppercase">RESEARCH</span>
                                <h4 className="text-sm font-semibold text-white leading-tight">RM & IPR</h4>
                            </div>
                        </div>

                        <div className="p-2 row-span-2">
                            <div className="h-[200px] bg-indigo-500/10 border-l-4 border-indigo-500 rounded-lg p-4 hover:bg-indigo-500/20 transition-all cursor-pointer flex flex-col">
                                <span className="text-[10px] font-bold text-indigo-400 block mb-1 tracking-widest uppercase">LAB SESSION</span>
                                <h4 className="text-sm font-semibold text-white leading-tight">AA Lab</h4>
                                <div className="mt-auto pt-4 border-t border-indigo-500/20 flex items-center gap-2 text-indigo-400">
                                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
                                    <span className="text-[10px] uppercase font-bold tracking-widest">In Progress</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-2">
                            <div className="h-full bg-rose-500/10 border-l-4 border-rose-500 rounded-lg p-3 hover:bg-rose-500/20 transition-all cursor-pointer">
                                <span className="text-[10px] font-bold text-rose-400 block mb-1 tracking-widest uppercase">RESEARCH</span>
                                <h4 className="text-sm font-semibold text-white leading-tight">RM & IPR</h4>
                            </div>
                        </div>
                        
                        <div className="p-2">
                            <div className="h-full border-2 border-slate-800/50 border-dashed rounded-lg p-3 flex flex-col justify-center items-center text-slate-600 bg-slate-900/20">
                                <span className="material-symbols-outlined mb-1">block</span>
                                <span className="text-[8px] font-bold uppercase tracking-widest">No Class</span>
                            </div>
                        </div>
                    </div>

                    {/* 03:30 - 05:00 */}
                    <div className="grid grid-cols-[100px_repeat(6,1fr)] border-b border-slate-800/30">
                        <div className="p-4 flex flex-col items-center justify-center border-r border-slate-800/30 text-xs font-bold text-slate-400">
                            <span>03:30</span>
                            <div className="h-8 w-px bg-slate-800/80 my-1"></div>
                            <span>05:00</span>
                        </div>
                        <div className="p-2">
                            <div className="h-full bg-slate-800/20 border-l-4 border-slate-600 rounded-lg p-3">
                                <span className="text-[10px] font-bold text-slate-500 block mb-1 tracking-widest uppercase">SEMINAR</span>
                                <h4 className="text-sm font-semibold text-slate-400 leading-tight">Departmental Briefing</h4>
                            </div>
                        </div>

                        {/* Empty spacing for rowSpan labs above */}
                        <div></div>
                        <div className="p-2">
                            <div className="h-full bg-slate-800/20 border-l-4 border-slate-600 rounded-lg p-3">
                                <h4 className="text-sm font-semibold text-slate-400 leading-tight block mt-3">Project Mentoring</h4>
                            </div>
                        </div>
                        <div></div>
                        <div className="p-2">
                            <div className="h-full bg-slate-800/20 border-l-4 border-slate-600 rounded-lg p-3">
                                <h4 className="text-sm font-semibold text-slate-400 leading-tight block mt-3">Weekly Review</h4>
                            </div>
                        </div>

                        <div className="p-2">
                            <div className="h-full bg-amber-500/10 border-l-4 border-amber-500 rounded-lg p-3 hover:bg-amber-500/20 transition-all cursor-pointer">
                                <span className="text-[10px] font-bold text-amber-400 block mb-1 tracking-widest uppercase">CLUB ACTIVITY</span>
                                <h4 className="text-sm font-semibold text-white leading-tight">Coding Society</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Summary Blocks */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#152031]/80 backdrop-blur-md p-6 rounded-2xl flex items-center gap-5 border border-slate-800/60 shadow-lg shadow-black/20">
                    <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                        <span className="material-symbols-outlined text-[28px]">school</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Academic Head</p>
                        <p className="text-sm font-semibold text-slate-200">Dept. of Computer Science</p>
                    </div>
                </div>
                <div className="bg-[#152031]/80 backdrop-blur-md p-6 rounded-2xl flex items-center gap-5 border border-slate-800/60 shadow-lg shadow-black/20">
                    <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                        <span className="material-symbols-outlined text-[28px]">meeting_room</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Assigned Venue</p>
                        <p className="text-sm font-semibold text-slate-200">Main Lab - Room #G2</p>
                    </div>
                </div>
                <div className="bg-[#152031]/80 backdrop-blur-md p-6 rounded-2xl flex items-center gap-5 border border-slate-800/60 shadow-lg shadow-black/20">
                    <div className="w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                        <span className="material-symbols-outlined text-[28px]">info</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Current Period</p>
                        <p className="text-sm font-semibold text-slate-200">Deep Learning Lab (Active)</p>
                    </div>
                </div>
            </div>
        </div>

        {/* FAB */}
        <button className="fixed bottom-10 right-10 w-16 h-16 bg-cyan-400 text-slate-950 rounded-full shadow-[0_0_25px_rgba(34,211,238,0.5)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50 group">
            <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_add_on</span>
        </button>
    </div>
  );
};

export default Timetable;
