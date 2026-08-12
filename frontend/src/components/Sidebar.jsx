import React, { useState, useEffect } from 'react';

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [isOpenElectivesOpen, setIsOpenElectivesOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-[#1e2330] text-slate-300 z-50 flex flex-col font-inter">
      {/* Brand / Logo Area */}
      <div className="flex items-center gap-3 px-6 py-6 mb-2">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
          <span className="material-symbols-outlined text-white text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>school</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-white leading-tight">Student Portal</h1>
          <p className="text-[10px] text-slate-400 font-medium">Dashboard</p>
        </div>
      </div>

      {/* User Profile */}
      <div className="px-6 py-4 border-t border-b border-slate-700/50 mb-4 bg-[#232938]">
        <div className="flex items-center gap-3">
          <img src={user?.avatar || "https://ui-avatars.com/api/?name=" + (user?.name || "User") + "&background=random"} alt="User" className="w-10 h-10 rounded-full object-cover border-2 border-slate-600" />
          <div>
            <h3 className="text-[10px] font-bold text-white tracking-wide uppercase truncate w-32">{user?.name || 'STUDENT'}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              <span className="text-[10px] text-slate-400 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 pb-6 space-y-1 custom-scrollbar">
        <a className="flex items-center gap-3 px-3 py-2.5 bg-indigo-600 text-white rounded-lg transition-all font-medium text-xs shadow-md shadow-indigo-600/20" href="#">
          <span className="material-symbols-outlined text-[18px]">home</span> Dashboard
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium text-xs" href="#">
          <span className="material-symbols-outlined text-[18px]">person</span> Profile
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium text-xs" href="#">
          <span className="material-symbols-outlined text-[18px]">folder_shared</span> Student Documents
        </a>
        
        <a className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium text-xs" href="https://jntuh-exams-papers.onrender.com" target="_blank" rel="noopener noreferrer">
          <span className="material-symbols-outlined text-[18px]">menu_book</span> Jntu Papers
        </a>
        
        <div className="relative group">
          <a className="flex items-center justify-between px-3 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium text-xs" href="#">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[18px]">notifications</span> Notifications
            </div>
            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white group-hover:scale-110 transition-transform">3</span>
          </a>
        </div>
        
        <a className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium text-xs" href="#">
          <span className="material-symbols-outlined text-[18px]">find_in_page</span> Rec / Rev Notifications
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium text-xs" href="https://learn-loop.in" target="_blank" rel="noopener noreferrer">
          <span className="material-symbols-outlined text-[18px]">quiz</span> Quick test
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 text-sky-400 font-bold bg-sky-500/10 hover:bg-sky-500/20 shadow-[inset_2px_0_0_0_#38bdf8] rounded-lg transition-all text-xs" href="/dashboard/attendance">
          <span className="material-symbols-outlined text-[18px]">how_to_reg</span> Attendance
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 text-cyan-400 font-bold bg-cyan-500/10 hover:bg-cyan-500/20 shadow-[inset_2px_0_0_0_#22d3ee] rounded-lg transition-all text-xs" href="/dashboard/timetable">
          <span className="material-symbols-outlined text-[18px]">calendar_today</span> Schedule
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 text-indigo-400 font-bold bg-indigo-500/10 hover:bg-indigo-500/20 shadow-[inset_2px_0_0_0_#818cf8] rounded-lg transition-all text-xs" href="/dashboard/lost-and-found">
          <span className="material-symbols-outlined text-[18px]">inventory_2</span> Lost & Found
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 text-emerald-400 font-bold bg-emerald-500/10 hover:bg-emerald-500/20 shadow-[inset_2px_0_0_0_#34d399] rounded-lg transition-all text-xs" href="/dashboard/marketplace">
          <span className="material-symbols-outlined text-[18px]">storefront</span> Marketplace
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium text-xs" href="#">
          <span className="material-symbols-outlined text-[18px]">workspace_premium</span> Certificates
        </a>
        
        {/* Open Elective Collapsible Menu */}
        <div className="flex flex-col">
          <button 
            onClick={() => setIsOpenElectivesOpen(!isOpenElectivesOpen)}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all font-medium text-xs ${isOpenElectivesOpen ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[18px]">menu_book</span> Open Elective
            </div>
            <span className={`material-symbols-outlined text-[16px] transition-transform ${isOpenElectivesOpen ? 'rotate-180' : ''}`}>expand_more</span>
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpenElectivesOpen ? 'max-h-32 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
            <div className="pl-9 pr-3 py-1 space-y-1 border-l-2 border-indigo-500/30 ml-4 mb-2">
              <a className="flex items-center gap-2 py-2 text-slate-400 hover:text-indigo-400 transition-colors text-xs font-semibold" href="/dashboard/open-elective/application">
                <span className="material-symbols-outlined text-[14px]">description</span> Application Form
              </a>
              <a className="flex items-center gap-2 py-2 text-slate-400 hover:text-indigo-400 transition-colors text-xs font-semibold" href="/dashboard/open-elective/results">
                <span className="material-symbols-outlined text-[14px]">verified</span> Selection Results
              </a>
            </div>
          </div>
        </div>
        <a className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium text-xs" href="#">
          <span className="material-symbols-outlined text-[18px]">payments</span> Payments
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium text-xs" href="#">
          <span className="material-symbols-outlined text-[18px]">description</span> Re-Admission / Project / Late
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium text-xs" href="#">
          <span className="material-symbols-outlined text-[18px]">auto_stories</span> Subjects - Course Materials
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium text-xs" href="#">
          <span className="material-symbols-outlined text-[18px]">feedback</span> Student Feedback
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium text-xs" href="#">
          <span className="material-symbols-outlined text-[18px]">receipt_long</span> Miscellaneous Payments
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium text-xs" href="#">
          <span className="material-symbols-outlined text-[18px]">campaign</span> News Bulletin
        </a>
        <a className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium text-xs" href="#">
          <span className="material-symbols-outlined text-[18px]">gavel</span> Grievance
        </a>

        {/* Admin Master Section */}
        {user?.role === 'admin' && (
          <div className="pt-4 mt-4 border-t border-slate-700/50">
            <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Admin Tools</p>
            <a className="flex items-center gap-3 px-3 py-2.5 text-rose-400 font-bold bg-rose-500/10 hover:bg-rose-500/20 shadow-[inset_2px_0_0_0_#f43f5e] rounded-lg transition-all text-xs" href="/dashboard/admin/master">
              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span> Admin Master
            </a>
          </div>
        )}
      </nav>

      {/* Footer Actions */}
      <div className="mt-auto px-4 py-4 border-t border-slate-700/50">
        <button className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">chevron_left</span> Collapse Menu
          </div>
          <span className="material-symbols-outlined text-[16px]">keyboard_double_arrow_left</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
