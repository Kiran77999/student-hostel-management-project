import React from 'react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <div className="flex justify-between items-center px-8 h-16 w-full max-w-[1440px] mx-auto">
        <div className="flex items-center gap-4">
          <button className="text-slate-500 hover:text-slate-900 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="h-6 w-px bg-slate-200"></div>
          <h2 className="font-headline-lg text-slate-900 tracking-tight">Student Profile</h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-full w-64 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all" placeholder="Search student records..." type="text"/>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-full transition-colors active:scale-95">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-full transition-colors active:scale-95">
              <span className="material-symbols-outlined">help_outline</span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1"></div>
            <img alt="Administrator profile photo" className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCECcTbMsSpKdWQBQhVLCaOa-8c7Ldfw0lLz4bUcLWcYCfOhwDKITfWiFXOYnZ8k1_PRlm9ceIl3_H3wqPuy7E7X3s5XKXG-7M5hp2dFpA5vknDlrTexDX4PzPD8TutVCynjRxGN4MvP5CJF7BMCI9McF9tuAIAu-zUzQ6pVd7Q7XmHbHEf24M-hpn8AccCLmKKxgirMr6X2RmDe_RFw9wfJgymiZ3tGf8mC3l2_nP_pstUEH2-c_6MCiQQ-tx-m-Qm7xGCmxl3Aoy2"/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
