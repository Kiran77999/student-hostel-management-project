import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom Academic Calendar built based on user's specific PDF parse instructions
const AcademicCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)); // Started at May 2025 like the mockup

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Holidays from User prompt
  const holidays = [
    { m: 0, d: 1 }, { m: 0, d: 13 }, { m: 0, d: 14 }, { m: 0, d: 15 }, { m: 0, d: 26 }, // Jan
    { m: 1, d: 3 }, { m: 1, d: 15 }, // Feb
    { m: 2, d: 10 }, { m: 2, d: 21 }, { m: 2, d: 22 }, { m: 2, d: 27 }, { m: 2, d: 31 }, // Mar
    { m: 3, d: 1 }, { m: 3, d: 3 }, { m: 3, d: 4 }, { m: 3, d: 14 }, // Apr
    { m: 4, d: 1 }, // May (Buddha Purnima)
    { m: 5, d: 27 }, // Jun
    { m: 6, d: 15 }, // Jul
    { m: 7, d: 10 }, { m: 7, d: 15 }, { m: 7, d: 26 }, // Aug
    { m: 8, d: 4 }, // Sep
    { m: 9, d: 2 }, { m: 9, d: 18 }, { m: 9, d: 19 }, { m: 9, d: 20 }, // Oct
    { m: 10, d: 8 }, // Nov
    { m: 11, d: 24 }, { m: 11, d: 25 }, { m: 11, d: 26 } // Dec
  ];
  
  // Optional holidays from User prompt
  const optionalHolidays = [
    { m: 2, d: 19 }, // Mar
    { m: 3, d: 20 }, // Apr
    { m: 6, d: 4 }, // Jul
    { m: 7, d: 10 }, // Aug
    { m: 8, d: 21 }, // Sep
    { m: 10, d: 26 } // Nov
  ];

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  // Generate grid
  const days = [];
  for (let i = 0; i < firstDayIndex; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const prevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));

  const checkHoliday = (day) => {
    return holidays.some(h => h.m === currentMonth && h.d === day);
  };
  const checkOptionalHoliday = (day) => {
    return optionalHolidays.some(h => h.m === currentMonth && h.d === day);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex-1">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
           <span className="material-symbols-outlined text-indigo-500">calendar_month</span> Calendar
        </h3>
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm text-slate-700">{monthNames[currentMonth]} {currentYear}</span>
          <div className="flex gap-1">
            <button onClick={prevMonth} className="w-6 h-6 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors"><span className="material-symbols-outlined text-[14px]">chevron_left</span></button>
            <button onClick={nextMonth} className="w-6 h-6 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors"><span className="material-symbols-outlined text-[14px]">chevron_right</span></button>
          </div>
        </div>
      </div>

      {/* Legend mapping */}
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-50">
         <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase"><span className="w-2.5 h-2.5 rounded bg-red-500"></span> Holiday</div>
         <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase"><span className="w-2.5 h-2.5 rounded bg-amber-400"></span> Optional</div>
         <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase"><span className="w-2.5 h-2.5 rounded bg-indigo-600"></span> Today</div>
      </div>

      <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center">
        {daysOfWeek.map(d => (
          <div key={d} className="text-xs font-semibold text-slate-400 mb-2">{d}</div>
        ))}
        {days.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`}></div>;
          
          let classes = "w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-medium transition-all cursor-pointer ";
          let hasEvent = false;

          if (checkHoliday(day)) {
            classes += "bg-red-50 text-red-600 font-bold ring-1 ring-red-200 hover:bg-red-500 hover:text-white";
          } else if (checkOptionalHoliday(day)) {
            classes += "bg-amber-50 text-amber-600 font-bold ring-1 ring-amber-200 hover:bg-amber-400 hover:text-white";
          } else if (day === 19 && currentMonth === 4 && currentYear === 2025) { // Mock "Today"
            classes += "bg-indigo-600 text-white shadow-md shadow-indigo-600/30";
          } else {
            classes += "text-slate-600 hover:bg-slate-100";
            hasEvent = [4, 11, 26, 30].includes(day); // Make fake event dots
          }

          return (
            <div key={day} className="relative">
              <button className={classes}>{day}</button>
              {hasEvent && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400"></span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};


// Top Global Navbar
const Topbar = ({ user, handleLogout }) => {
  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-[#4A3AFF] text-white flex justify-between items-center px-6 shadow-sm">
      <div className="flex items-center gap-6">
        <button className="text-white hover:text-indigo-200 transition-colors">
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>
      </div>
      <div className="flex items-center gap-6">
        <button className="hidden md:flex items-center gap-2 bg-indigo-500/30 hover:bg-indigo-500/50 transition-colors border border-indigo-400/30 px-3 py-1.5 rounded-lg text-xs font-semibold">
          <span className="material-symbols-outlined text-[16px]">group</span> Student Clubs
        </button>
        <button className="hidden md:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 transition-colors px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg shadow-emerald-500/20">
          <span className="material-symbols-outlined text-[16px]">domain</span> Hostel Management
        </button>
        
        <div className="h-6 w-px bg-indigo-400/30 mx-2"></div>
        
        <button className="relative w-8 h-8 flex items-center justify-center hover:bg-indigo-500/30 rounded-full transition-colors group">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-[#4A3AFF] rounded-full group-hover:scale-125 transition-transform"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-2 group relative cursor-pointer">
          <img src={user?.avatar || "https://ui-avatars.com/api/?name=" + (user?.name || "User") + "&background=random"} alt="User" className="w-8 h-8 rounded-full object-cover border border-white/20" />
          <div className="hidden sm:block text-left">
            <h4 className="text-xs font-bold leading-tight uppercase">{user?.name || 'STUDENT'}</h4>
            <div className="flex items-center gap-1 text-[10px] text-indigo-100 font-medium">
               {user?.role || 'Student'} <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </div>
          </div>
          
          {/* Logout Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span> Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="w-full bg-[#f8f9fc] text-slate-800 font-inter min-h-screen">
      <Topbar user={user} handleLogout={handleLogout} />
      
      <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
          <div>
            <h1 className="text-3xl md:text-5xl font-serif text-slate-800 tracking-tight flex items-center gap-2">
              Welcome back, <br className="hidden md:block" /><span className="italic">{user?.name || 'Julianna'} {user?.name ? '' : 'Thorne'}.</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-[#FAF5EE] border border-orange-100 rounded-2xl p-4 px-6 text-center shadow-sm">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Current CGPA</p>
                <p className="text-3xl font-serif font-bold text-[#c2652a]">3.84</p>
            </div>
            <div className="bg-[#FAF5EE] border border-orange-100 rounded-2xl p-4 px-6 text-center shadow-sm">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Total Credits</p>
                <p className="text-xl font-bold text-slate-800 mt-2">112 <span className="text-slate-400 text-sm">/ 140</span></p>
            </div>
          </div>
        </div>

        {/* Open Elective Banner Row */}
        <div className="w-full relative bg-gradient-to-r from-[#ca6829] to-[#d97736] rounded-[1.5rem] p-6 md:px-8 md:py-6 text-white overflow-hidden shadow-lg border border-orange-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-2">
            {/* Decorative background blocks */}
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 flex gap-4 pointer-events-none p-8" style={{ transform: 'rotate(5deg) scale(1.2)' }}>
                <div className="w-1/3 h-full bg-white/20 rounded-lg blur-sm"></div>
                <div className="w-1/3 h-3/4 bg-white/20 rounded-lg blur-[2px] mt-4"></div>
                <div className="w-1/3 h-5/6 bg-white/10 rounded-lg blur-md mt-2"></div>
            </div>

            <div className="relative z-10 max-w-3xl flex-1">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold tracking-widest uppercase text-orange-200">Open Elective</span>
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[12px]">school</span>
                    </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif mb-2 leading-tight">Open Elective Registration</h2>
                <p className="text-orange-50/90 text-sm leading-relaxed mb-0 font-medium">
                    Curate your academic journey for the upcoming Spring 2024 semester. Over 45 interdisciplinary courses available.
                </p>
            </div>
            
            <div className="relative z-10 flex flex-wrap shrink-0 items-center justify-start gap-3">
                <button onClick={() => navigate('/dashboard/open-elective/application')} className="bg-white text-[#ca6829] px-5 py-2.5 rounded-lg font-bold text-sm hover:scale-105 transition-transform shadow-md">Explore Courses</button>
                <button className="bg-white/10 text-white border border-white/20 px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-white/20 transition-colors">View Roadmap</button>
            </div>
        </div>

        {/* Top Feature Cards Layout tightly matching image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white border text-center border-slate-100 p-6 rounded-2xl shadow-sm relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center mb-4 ring-4 ring-indigo-50/50">
               <span className="material-symbols-outlined text-[24px]">emoji_events</span>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Attendance</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-1">92%</h2>
            <div className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded inline-block">This Month</div>
          </div>
          
          <div className="bg-white border text-center border-slate-100 p-6 rounded-2xl shadow-sm relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-4 ring-4 ring-emerald-50/50">
               <span className="material-symbols-outlined text-[24px]">currency_rupee</span>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Fees Status</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-1">₹12,500</h2>
            <div className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded inline-block">Paid</div>
          </div>
          
          <div className="bg-white border text-center border-slate-100 p-6 rounded-2xl shadow-sm relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center mb-4 ring-4 ring-amber-50/50">
               <span className="material-symbols-outlined text-[24px]">assignment</span>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Assignments</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-1">04</h2>
            <div className="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded inline-block">Pending</div>
          </div>
          
          <div className="bg-white border text-center border-slate-100 p-6 rounded-2xl shadow-sm relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-500 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 mx-auto flex items-center justify-center mb-4 ring-4 ring-purple-50/50">
               <span className="material-symbols-outlined text-[24px]">notifications_active</span>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Notifications</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-1">03</h2>
            <div className="text-[10px] text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded inline-block">Unread</div>
          </div>
          
          <div className="bg-white border text-center border-slate-100 p-6 rounded-2xl shadow-sm relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-4 ring-4 ring-blue-50/50">
               <span className="material-symbols-outlined text-[24px]">science</span>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">CGPA</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-1">8.75</h2>
            <div className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded inline-block">Current</div>
          </div>
        </div>

        {/* Dashboard Middle Section (Announcements, Events, Quick Actions) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-500">campaign</span> Announcements
              </h3>
              <button className="text-[10px] uppercase font-bold text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded transition-colors">View All</button>
            </div>
            <div className="space-y-5">
              <div className="flex gap-4 group">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center mt-1 group-hover:scale-105 transition-transform"><span className="material-symbols-outlined text-[18px]">emoji_events</span></div>
                <div>
                   <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">Annual Sports Meet 2025 <span className="bg-indigo-50 text-indigo-600 text-[9px] px-1.5 py-0.5 rounded">NEW</span></h4>
                   <p className="text-xs text-slate-500 mt-1 line-clamp-2">Inter-department sports meet from May 25. Registration is mandatory.</p>
                   <p className="text-[10px] font-semibold text-slate-400 mt-2">May 18, 2025</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mt-1 group-hover:scale-105 transition-transform"><span className="material-symbols-outlined text-[18px]">menu_book</span></div>
                <div>
                   <h4 className="font-bold text-sm text-slate-800">Library Hours Updated</h4>
                   <p className="text-xs text-slate-500 mt-1 line-clamp-2">Library will now close at 7:00 PM on weekdays and remain closed on Sundays.</p>
                   <p className="text-[10px] font-semibold text-slate-400 mt-2">May 17, 2025</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center mt-1 group-hover:scale-105 transition-transform"><span className="material-symbols-outlined text-[18px]">event</span></div>
                <div>
                   <h4 className="font-bold text-sm text-slate-800">Semester Exam Schedule</h4>
                   <p className="text-xs text-slate-500 mt-1 line-clamp-2">End semester exams from June 1. Check details.</p>
                   <p className="text-[10px] font-semibold text-slate-400 mt-2">May 15, 2025</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-500">event_upcoming</span> Upcoming Events
              </h3>
              <button className="text-[10px] uppercase font-bold text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded transition-colors">View Calendar</button>
            </div>
             <div className="space-y-4">
               {/* Event Items */}
               <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 hover:bg-indigo-50/50 transition-colors cursor-pointer group">
                 <div className="shrink-0 bg-white border border-slate-200 rounded-lg w-12 h-12 flex flex-col items-center justify-center shadow-sm group-hover:border-indigo-200">
                    <span className="text-[9px] uppercase font-bold text-indigo-500">May</span>
                    <span className="text-lg font-bold text-slate-800 leading-tight">25</span>
                 </div>
                 <div>
                   <h4 className="font-bold text-sm text-slate-900 leading-tight mb-1">Sports Meet 2025</h4>
                   <p className="text-[11px] font-semibold text-slate-500">8:00 AM - 5:00 PM</p>
                   <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5"><span className="material-symbols-outlined text-[12px]">location_on</span> College Ground</p>
                 </div>
               </div>
               
               <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 hover:bg-indigo-50/50 transition-colors cursor-pointer group">
                 <div className="shrink-0 bg-white border border-slate-200 rounded-lg w-12 h-12 flex flex-col items-center justify-center shadow-sm group-hover:border-indigo-200">
                    <span className="text-[9px] uppercase font-bold text-indigo-500">May</span>
                    <span className="text-lg font-bold text-slate-800 leading-tight">30</span>
                 </div>
                 <div>
                   <h4 className="font-bold text-sm text-slate-900 leading-tight mb-1">Project Submission</h4>
                   <p className="text-[11px] font-semibold text-slate-500">11:59 PM</p>
                   <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5"><span className="material-symbols-outlined text-[12px]">location_on</span> Online Submission</p>
                 </div>
               </div>
               
               <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 hover:bg-indigo-50/50 transition-colors cursor-pointer group">
                 <div className="shrink-0 bg-white border border-slate-200 rounded-lg w-12 h-12 flex flex-col items-center justify-center shadow-sm group-hover:border-indigo-200">
                    <span className="text-[9px] uppercase font-bold text-indigo-500">Jun</span>
                    <span className="text-lg font-bold text-slate-800 leading-tight">01</span>
                 </div>
                 <div>
                   <h4 className="font-bold text-sm text-slate-900 leading-tight mb-1">Semester Exams Begin</h4>
                   <p className="text-[11px] font-semibold text-slate-500">9:00 AM</p>
                   <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5"><span className="material-symbols-outlined text-[12px]">location_on</span> Exam Hall</p>
                 </div>
               </div>
             </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
             <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-amber-500">bolt</span> Quick Actions
             </h3>
             <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-purple-50/50 border border-purple-100 hover:bg-purple-100 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-[20px]">calendar_view_week</span></div>
                  <span className="text-xs font-semibold text-purple-800">View Timetable</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 hover:bg-emerald-100 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-[20px]">badge</span></div>
                  <span className="text-xs font-semibold text-emerald-800">Download ID</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-orange-50/50 border border-orange-100 hover:bg-orange-100 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-[20px]">receipt_long</span></div>
                  <span className="text-xs font-semibold text-orange-800">Fee Receipt</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100 hover:bg-blue-100 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-[20px]">bar_chart</span></div>
                  <span className="text-xs font-semibold text-blue-800">Attendance</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-amber-50/50 border border-amber-100 hover:bg-amber-100 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-[20px]">edit_document</span></div>
                  <span className="text-xs font-semibold text-amber-800">Apply Leave</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 hover:bg-indigo-100 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-[20px]">local_library</span></div>
                  <span className="text-xs font-semibold text-indigo-800">Library Portal</span>
                </button>
             </div>
          </div>
        </div>

        {/* Bottom Row - Attendance Chart, Donut, Calendar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           
           {/* Mock Bar Chart matching the image */}
           <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
             <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-500">trending_up</span> Attendance Overview
                </h3>
                <select className="text-xs border border-slate-200 rounded px-2 py-1 bg-slate-50 text-slate-600 font-semibold outline-none focus:border-indigo-400">
                   <option>This Month</option>
                </select>
             </div>
             
             <div className="relative h-[200px] w-full flex items-end justify-between px-2 pt-6 border-b border-slate-100">
               {/* Y Grid lines */}
               <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between z-0">
                  {[100, 75, 50, 25, 0].map((v, i) => (
                    <div key={i} className="flex items-center w-full h-0 border-b border-slate-100 border-dashed">
                      <span className="absolute -left-2 -translate-x-full text-[10px] text-slate-400 font-medium bg-white pr-2">{v}%</span>
                    </div>
                  ))}
               </div>
               
               {/* Bars */}
               <div className="relative z-10 w-8 md:w-10 bg-indigo-400 rounded-t-md cursor-pointer hover:opacity-80 transition-opacity" style={{height: '63%'}}>
                 <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-500 whitespace-nowrap">Week 1</span>
               </div>
               <div className="relative z-10 w-8 md:w-10 bg-indigo-400 rounded-t-md cursor-pointer hover:opacity-80 transition-opacity" style={{height: '68%'}}>
                 <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-500 whitespace-nowrap">Week 2</span>
               </div>
               <div className="relative z-10 w-8 md:w-10 bg-indigo-400 rounded-t-md cursor-pointer hover:opacity-80 transition-opacity" style={{height: '68%'}}>
                 <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-500 whitespace-nowrap">Week 3</span>
               </div>
               <div className="relative z-10 w-8 md:w-10 bg-indigo-500 rounded-t-md cursor-pointer hover:opacity-80 transition-opacity" style={{height: '92%'}}>
                 <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-indigo-600 whitespace-nowrap">Week 4</span>
               </div>
               <div className="relative z-10 w-8 md:w-10 bg-indigo-400 rounded-t-md cursor-pointer hover:opacity-80 transition-opacity" style={{height: '65%'}}>
                 <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-500 whitespace-nowrap">Week 5</span>
               </div>
             </div>
           </div>

           {/* Donut Chart matching the image */}
           <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
             <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-8">
                <span className="material-symbols-outlined text-emerald-500">donut_small</span> Academic Performance
             </h3>
             <div className="flex flex-col items-center justify-center gap-6">
                
                {/* CSS Donut representation using conic-gradient */}
                <div className="relative w-40 h-40 rounded-full flex items-center justify-center shadow-inner" style={{background: 'conic-gradient(#10b981 0% 60%, #3b82f6 60% 85%, #f59e0b 85% 95%, #ef4444 95% 100%)'}}>
                  <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center shadow-md">
                     <p className="text-2xl font-bold text-slate-900 leading-tight">8.75</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CGPA</p>
                  </div>
                </div>

                {/* Legend */}
                <div className="w-full space-y-2.5 mt-2">
                   <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                      <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Excellent (A)</div>
                      <span className="font-bold text-slate-800">60%</span>
                   </div>
                   <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                      <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Good (B)</div>
                      <span className="font-bold text-slate-800">25%</span>
                   </div>
                   <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                      <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Average (C)</div>
                      <span className="font-bold text-slate-800">10%</span>
                   </div>
                   <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                      <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Need Improvement (D)</div>
                      <span className="font-bold text-slate-800">5%</span>
                   </div>
                </div>
             </div>
           </div>

           {/* The Custom Calendar Widget */}
           <AcademicCalendar />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
