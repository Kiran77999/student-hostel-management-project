import React, { useState } from 'react';

const mockSubjects = [
  {
    id: 1,
    name: 'Advanced Algorithms',
    professor: 'Dr. Carter',
    icon: 'memory',
    attended: 28,
    missed: 2,
    history: [
      { date: '2024-10-24', status: 'present', topic: 'Dynamic Programming' },
      { date: '2024-10-22', status: 'present', topic: 'Greedy Approaches' },
      { date: '2024-10-20', status: 'missed', topic: 'Intro to Combinatorics' },
    ]
  },
  {
    id: 2,
    name: 'MFCS',
    professor: 'Prof. Zhang',
    icon: 'functions',
    attended: 24,
    missed: 1,
    history: [
      { date: '2024-10-25', status: 'present', topic: 'Number Theory' },
      { date: '2024-10-23', status: 'present', topic: 'Graph Theory' },
      { date: '2024-10-21', status: 'missed', topic: 'Logics & Sets' },
    ]
  },
  {
    id: 3,
    name: 'Deep Learning',
    professor: 'Dr. Sarah Miller',
    icon: 'mindfulness',
    attended: 30,
    missed: 0,
    history: [
      { date: '2024-10-25', status: 'present', topic: 'Generative Adversarial Nets' },
      { date: '2024-10-23', status: 'present', topic: 'Backpropagation' },
      { date: '2024-10-21', status: 'present', topic: 'Neural Architecture' },
    ]
  },
  {
    id: 4,
    name: 'Software Quality Eng.',
    professor: 'Dr. T. Lin',
    icon: 'build',
    attended: 22,
    missed: 2,
    history: [
      { date: '2024-10-24', status: 'missed', topic: 'Test Coverage Metrics' },
      { date: '2024-10-22', status: 'present', topic: 'QA Pipelines' },
    ]
  },
  {
    id: 5,
    name: 'RM & IPR',
    professor: 'Dr. Sarah Miller',
    icon: 'gavel',
    attended: 26,
    missed: 0,
    history: [
      { date: '2024-10-25', status: 'present', topic: 'Intellectual Property Rights' },
      { date: '2024-10-23', status: 'present', topic: 'Academic Formatting' },
    ]
  },
  {
    id: 6,
    name: 'DL Lab (G5)',
    professor: 'Dr. Sarah Miller',
    icon: 'computer',
    attended: 12,
    missed: 1,
    history: [
      { date: '2024-10-24', status: 'present', topic: 'PyTorch Implementations' },
    ]
  },
  {
    id: 7,
    name: 'AA Lab',
    professor: 'Dr. Carter',
    icon: 'code',
    attended: 11,
    missed: 0,
    history: [
      { date: '2024-10-25', status: 'present', topic: 'Algorithm Complexity' },
    ]
  }
];

const Attendance = () => {
    const [selectedSubject, setSelectedSubject] = useState(null);

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200">
            {/* Header Area */}
            <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex justify-between items-center h-16 px-8 sticky top-0 z-40">
                <h2 className="text-lg font-semibold text-white">Attendance Tracking</h2>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 transition-all">
                        <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
                        <input className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm w-48 px-2 text-white placeholder-slate-500" placeholder="Search classes..." type="text"/>
                    </div>
                </div>
            </header>

            <main className="p-6 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-10">
                <header>
                    <h2 className="text-3xl font-serif text-white mb-2">Overview</h2>
                    <p className="text-slate-400">Track your academic presence and upcoming schedule.</p>
                </header>

                {/* Top Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Overall Summary Card */}
                    <div className="col-span-1 lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden shadow-lg shadow-black/20">
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-slate-300">Overall Attendance</h3>
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                    <span className="material-symbols-outlined text-slate-400 text-sm">monitoring</span>
                                </div>
                            </div>
                            <div className="mt-6 flex items-end gap-3">
                                <span className="text-5xl font-serif font-bold text-sky-400">92%</span>
                                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md mb-1.5 border border-emerald-500/20 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 2%
                                </span>
                            </div>
                            <p className="text-sm font-medium text-slate-500 mt-2 tracking-wide">Target goal: 90% minimum</p>
                        </div>
                        {/* Decorative glow */}
                        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                    </div>

                    {/* Upcoming Classes Card */}
                    <div className="col-span-1 lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-lg shadow-black/20">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-medium text-slate-300">Upcoming Classes</h3>
                            <button className="text-sm font-bold text-sky-400 hover:text-sky-300">View Schedule</button>
                        </div>
                        
                        <div className="space-y-4">
                            {/* Class 1 */}
                            <div className="flex items-center justify-between p-4 bg-[#0f172a] rounded-xl border border-slate-800/50 hover:border-slate-700 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-lg bg-sky-500/10 border border-sky-500/20 flex flex-col items-center justify-center text-sky-400">
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Today</span>
                                        <span className="text-lg font-bold leading-none mt-1">10</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">Mathematics II</h4>
                                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">schedule</span> 10:00 AM - 11:30 AM
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden sm:flex items-center gap-2">
                                    <span className="text-xs font-semibold px-3 py-1.5 bg-slate-800 text-slate-300 rounded-full flex items-center gap-1.5 border border-slate-700">
                                        <span className="material-symbols-outlined text-[14px] text-slate-500">location_on</span> Room 302
                                    </span>
                                </div>
                            </div>
                            
                            {/* Class 2 */}
                            <div className="flex items-center justify-between p-4 bg-[#0f172a] rounded-xl border border-slate-800/50 hover:border-slate-700 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-lg bg-slate-800 border border-slate-700 flex flex-col items-center justify-center text-slate-400">
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Today</span>
                                        <span className="text-lg font-bold leading-none mt-1">13</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">Data Structures</h4>
                                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">schedule</span> 1:00 PM - 2:30 PM
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden sm:flex items-center gap-2">
                                    <span className="text-xs font-semibold px-3 py-1.5 bg-slate-800 text-slate-300 rounded-full flex items-center gap-1.5 border border-slate-700">
                                        <span className="material-symbols-outlined text-[14px] text-slate-500">location_on</span> Lab A
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subj Cards */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-serif text-white">Current Subjects</h2>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest px-3 py-1 bg-slate-900 border border-slate-800 rounded-full">Fall Semester 2024</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockSubjects.map((sub) => {
                            const total = sub.attended + sub.missed;
                            const percentage = Math.round((sub.attended / total) * 100);
                            const circumference = 2 * Math.PI * 32; // r=32
                            const offset = circumference - (percentage / 100) * circumference;

                            return (
                                <div 
                                    key={sub.id} 
                                    onClick={() => setSelectedSubject(sub)}
                                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-900/20 cursor-pointer transition-all group"
                                >
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">{sub.name}</h3>
                                            <p className="text-xs font-medium text-slate-500 mt-1">{sub.professor}</p>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-sky-500/10 group-hover:text-sky-400 transition-colors">
                                            <span className="material-symbols-outlined text-lg">{sub.icon}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-6">
                                        <div className="relative w-20 h-20 shrink-0">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle className="text-slate-800" cx="40" cy="40" fill="transparent" r="32" stroke="currentColor" strokeWidth="6"></circle>
                                                <circle 
                                                    className="text-sky-500 transition-all duration-1000 ease-out" 
                                                    cx="40" cy="40" fill="transparent" r="32" stroke="currentColor" 
                                                    strokeDasharray={circumference} strokeDashoffset={offset} strokeWidth="6" strokeLinecap="round"
                                                ></circle>
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-sm font-bold text-white">{percentage}%</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col gap-2.5">
                                            <div className="flex items-center gap-2.5">
                                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                                <span className="text-xs font-bold text-slate-300">{sub.attended} Attended</span>
                                            </div>
                                            <div className="flex items-center gap-2.5">
                                                {sub.missed > 0 ? (
                                                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></span>
                                                ) : (
                                                    <span className="w-2.5 h-2.5 rounded-full border-2 border-slate-700 bg-transparent"></span>
                                                )}
                                                <span className="text-xs font-bold text-slate-400">{sub.missed} Missed</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-sky-400 text-xs font-bold">View History Details</span>
                                        <span className="material-symbols-outlined text-sm text-sky-400">arrow_forward</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            {/* Attendance History Interactive Modal Overlay */}
            {selectedSubject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        onClick={() => setSelectedSubject(null)}
                    ></div>
                    
                    {/* Modal Content */}
                    <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="p-6 md:p-8 border-b border-slate-800 bg-slate-900/50 flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex flex-col items-center justify-center text-sky-400">
                                    <span className="material-symbols-outlined">{selectedSubject.icon}</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif text-white">{selectedSubject.name}</h3>
                                    <p className="text-sm text-slate-400 font-medium">Detailed Attendance Timeline</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedSubject(null)}
                                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>

                        {/* Summary Bar inside modal */}
                        <div className="bg-[#0f172a] p-4 mx-6 md:mx-8 mt-6 rounded-xl border border-slate-800 flex divide-x divide-slate-800 shrink-0">
                            <div className="flex-1 text-center px-4">
                                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Total Classes</p>
                                <p className="text-xl font-bold text-white">{selectedSubject.attended + selectedSubject.missed}</p>
                            </div>
                            <div className="flex-1 text-center px-4">
                                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Attended</p>
                                <p className="text-xl font-bold text-emerald-400">{selectedSubject.attended}</p>
                            </div>
                            <div className="flex-1 text-center px-4">
                                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Missed</p>
                                <p className="text-xl font-bold text-rose-400">{selectedSubject.missed}</p>
                            </div>
                        </div>

                        {/* Scrollable Timeline */}
                        <div className="p-6 md:p-8 overflow-y-auto flex-1 custom-scrollbar">
                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-800">
                                {selectedSubject.history.map((record, idx) => {
                                    const isPresent = record.status === 'present';
                                    
                                    return (
                                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                            {/* Node indicator */}
                                            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${isPresent ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                <span className={`material-symbols-outlined text-xl ${isPresent ? 'bg-emerald-500/20' : 'bg-rose-500/20'} w-full h-full rounded-full flex items-center justify-center`}>
                                                    {isPresent ? 'check_circle' : 'cancel'}
                                                </span>
                                            </div>
                                            
                                            {/* Content Card */}
                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 transition-colors">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className={`text-xs font-bold uppercase tracking-wide ${isPresent ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                        {record.status}
                                                    </span>
                                                    <time className="text-[10px] font-bold text-slate-500">{new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                                                </div>
                                                <div className="text-sm font-medium text-slate-300">
                                                    {record.topic}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Attendance;
