import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();
  const [allocation, setAllocation] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('allocatedElective');
    if (stored) {
      setAllocation(JSON.parse(stored));
    }
  }, []);

  if (!allocation) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col items-center justify-center p-6">
        <span className="material-symbols-outlined text-6xl text-slate-700 mb-6 font-light">find_in_page</span>
        <h2 className="text-3xl font-serif text-white mb-2">No Results Available</h2>
        <p className="text-slate-400 mb-8 max-w-md text-center">We couldn't find any elective allocation for your account. Please submit your application to view results.</p>
        <button 
            onClick={() => navigate('/dashboard/open-elective/application')}
            className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
        >
            <span className="material-symbols-outlined text-[20px]">add</span> Go to Application
        </button>
      </div>
    );
  }

  const { course, date } = allocation;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0f172a] p-8 lg:p-12">
      {/* Page Header */}
      <section className="mb-12 max-w-[1600px] mx-auto">
        <span className="text-orange-500 font-bold tracking-widest text-xs uppercase body-font">Academic Year 2024-25</span>
        <h1 className="text-5xl lg:text-6xl text-white font-serif mt-2 leading-tight">Selection Results</h1>
        <p className="text-slate-400 max-w-2xl mt-4 text-lg">Your elective course allocation for the upcoming semester has been finalized. Review your details below.</p>
      </section>

      {/* Results Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1600px] mx-auto">
        {/* Status & Course Card */}
        <div className="lg:col-span-8 space-y-8">
          {/* Allocation Status Badge */}
          <div className="bg-slate-800/60 border border-slate-700/50 p-8 rounded-2xl shadow-lg shadow-black/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 ring-4 ring-emerald-500/10">
                <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Current Status</p>
                <h2 className="text-2xl sm:text-3xl font-serif text-white mt-1">Successfully Allocated</h2>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full text-sm font-bold shadow-[inset_0_1px_4px_rgba(0,0,0,0.2)]">Confirmed</span>
            </div>
          </div>

          {/* Main Allocated Course Card */}
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl shadow-black/20 relative">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img alt="Course Cover" className="w-full h-full object-cover scale-105" src={course.img} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <span className="bg-orange-500/20 border border-orange-500/30 backdrop-blur-md px-3 py-1 text-orange-400 text-xs font-bold tracking-widest uppercase rounded mb-3 inline-block">
                  {course.id}
                </span>
                <h3 className="text-3xl sm:text-4xl text-white font-serif tracking-wide">{course.title}</h3>
                <p className="text-slate-300 mt-2 max-w-xl text-sm leading-relaxed">{course.desc}</p>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-slate-700/50 bg-[#0f172a]/40">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">apartment</span> Department
                </p>
                <p className="font-medium text-slate-200">{course.department}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">location_on</span> Venue
                </p>
                <p className="font-medium text-slate-200">Main Auditorium A-12</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">stars</span> Credits
                </p>
                <p className="font-medium text-slate-200">4.0 Units</p>
              </div>
            </div>

            <div className="p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <button className="w-full sm:w-auto bg-orange-600 text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-orange-500 transition-colors flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-orange-900/40">
                  <span className="material-symbols-outlined text-lg">download</span> Download Allocation Letter
                </button>
                <button className="w-full sm:w-auto border border-slate-600 px-8 py-3 rounded-lg font-bold text-sm hover:bg-slate-700 transition-colors active:scale-95 text-slate-300">
                  View Syllabus
                </button>
              </div>
              <p className="text-slate-500 text-xs italic font-semibold tracking-wide">Allocated on {date}</p>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-8">
          {/* Instructor Card */}
          <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-2xl shadow-lg">
            <h4 className="font-serif text-2xl text-white mb-6">Course Lead</h4>
            <div className="flex items-center gap-4">
              <img alt="Instructor" className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-600" src="https://ui-avatars.com/api/?name=JS&background=random" />
              <div>
                <p className="font-bold text-white text-lg">Dr. Julian Sahara</p>
                <p className="text-sm text-orange-400 font-medium">Head of Instruction</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700/50 space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-orange-400 text-sm">mail</span>
                </div>
                instructor@university.edu
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-orange-400 text-sm">calendar_month</span>
                </div>
                Office Hours: Mon, Wed 2-4 PM
              </div>
            </div>
          </div>

          {/* Schedule Card */}
          <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-2xl shadow-lg">
            <h4 className="font-serif text-2xl text-white mb-6">Weekly Schedule</h4>
            <ul className="space-y-4">
              <li className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                <span className="text-sm font-bold text-slate-400">Tuesday</span>
                <span className="text-sm font-medium text-white bg-slate-700 px-3 py-1 rounded">09:00 - 11:00</span>
              </li>
              <li className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                <span className="text-sm font-bold text-slate-400">Thursday</span>
                <span className="text-sm font-medium text-white bg-slate-700 px-3 py-1 rounded">14:00 - 16:00</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-400 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 block"></span> Friday (Lab)</span>
                <span className="text-sm font-medium text-white bg-slate-700 px-3 py-1 rounded">10:00 - 12:00</span>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="p-8 text-center bg-orange-950/20 rounded-2xl border border-orange-500/20 backdrop-blur-sm">
            <span className="material-symbols-outlined text-orange-500 text-4xl mb-4 opacity-80">help_center</span>
            <h4 className="font-serif text-xl text-white">Need a Change?</h4>
            <p className="text-sm text-orange-200/70 mt-2 mb-6 leading-relaxed">
              The elective swap window remains open until November 2nd. Priority drops will occur.
            </p>
            <button className="text-orange-400 font-bold text-sm bg-orange-950/50 px-6 py-2.5 rounded-lg border border-orange-500/30 hover:bg-orange-500 hover:text-white transition-colors">
                Request Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
