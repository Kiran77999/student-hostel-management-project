import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-body-md text-slate-800">
      
      {/* Dark Hero Section matching the image */}
      <section className="relative bg-[#0d1527] text-white pt-6 pb-32 overflow-hidden">
        {/* Navigation */}
        <nav className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-sm" style={{fontVariationSettings: "'FILL' 1"}}>school</span>
            </div>
            <span className="font-bold text-xl tracking-tight">EduCore</span>
          </div>
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#" className="text-white">Home</a>
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">How it works</a>
            <a href="#" className="hover:text-white transition-colors">Testimonials</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium hover:text-indigo-300 transition-colors">
              Log in
            </Link>
            <Link to="/signup" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-indigo-600/30">
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="max-w-[1440px] mx-auto px-8 mt-24 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-600/20 text-indigo-300 text-xs font-semibold mb-8 border border-indigo-500/30">
            <span className="material-symbols-outlined text-[14px]">stars</span> All-in-one solution for modern faculties
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl leading-tight">
            Smart Student
            <br />Management System.
            <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Simplify. Manage. Grow.</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
            Manage attendance, students, materials, grades, and more - all in one powerful, highly-scalable platform designed for educational institutions.
          </p>
          
          <div className="flex items-center gap-4">
            <Link to="/login" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-2">
              Log In
            </Link>
            <Link to="/signup" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-all flex items-center gap-2">
              Create Account
            </Link>
          </div>

          <div className="mt-16 flex items-center gap-12 text-sm font-medium text-slate-400">
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-indigo-400">check_circle</span> Easy to use</span>
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-indigo-400">lock</span> Secure & Reliable</span>
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-indigo-400">cloud</span> Cloud Based</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* Features Section */}
      <section className="max-w-[1440px] mx-auto px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="lg:col-span-1">
            <div className="inline-block px-3 py-1 rounded bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">Features</div>
            <h2 className="text-3xl font-headline-xl text-slate-900 leading-tight mb-4 tracking-tight">Everything you need to <span className="text-indigo-600">manage</span> your students</h2>
            <p className="text-slate-500 leading-relaxed">Powerful features to streamline academic operations and enhance the learning experience.</p>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined">how_to_reg</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Attendance Tracking</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Manage attendance rates, automatically detect absences, and keep student data perfectly organized.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Course Materials</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Upload and distribute PDFs, assignments, and notes to student class portals securely.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Performance Analytics</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Track grades, generate reports and transcript sheets, and identify students needing specific intervention.</p>
            </div>
          </div>
          
        </div>
      </section>

      {/* Stats Banner */}
      <section className="max-w-[1440px] mx-auto px-8 mb-24">
        <div className="bg-indigo-600 rounded-3xl p-12 text-white flex flex-wrap justify-between items-center gap-8 shadow-xl shadow-indigo-600/20">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-4xl text-indigo-300">account_balance</span>
            <div>
              <div className="text-3xl font-bold">250+</div>
              <div className="text-indigo-200 text-sm font-medium">Courses Handled</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-4xl text-indigo-300">group</span>
            <div>
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-indigo-200 text-sm font-medium">Students Database</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-4xl text-indigo-300">receipt_long</span>
            <div>
              <div className="text-3xl font-bold">₹2Cr+</div>
              <div className="text-indigo-200 text-sm font-medium">Transactions</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-4xl text-indigo-300">star</span>
            <div>
              <div className="text-3xl font-bold">98%</div>
              <div className="text-indigo-200 text-sm font-medium">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Preview */}
      <section className="max-w-[1200px] mx-auto px-8 mb-32 -mt-[500px] pointer-events-none opacity-0 invisible hidden">
        {/* Spacer for proper layout matching image exactly - but we omit the hardcoded image block for cleanliness */}
      </section>

      {/* Steps Section */}
      <section className="bg-white py-24 border-y border-slate-100">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">How it works</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">Get started in <span className="text-indigo-600">3 simple steps</span></h2>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-12 text-center max-w-4xl mx-auto">
            
            <div className="flex-1 relative flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-600/30 z-10">
                <span className="material-symbols-outlined text-2xl">person_add</span>
              </div>
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-slate-200 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmMWY1ZjkiLz48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjY2JkNWUxIi8+PC9zdmc+')]"></div>
              <h3 className="font-bold text-slate-900 mb-2">Step 1<br/>Log in to portal</h3>
              <p className="text-sm text-slate-500">Access your secure institutional dashboard instantly.</p>
            </div>
            
            <div className="flex-1 relative flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 z-10">
                 <span className="material-symbols-outlined text-2xl">domain_add</span>
              </div>
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-slate-200 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmMWY1ZjkiLz48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjY2JkNWUxIi8+PC9zdmc+')]"></div>
              <h3 className="font-bold text-slate-900 mb-2">Step 2<br/>View Analytics</h3>
              <p className="text-sm text-slate-500">Add course modules and check attendance structures.</p>
            </div>
            
            <div className="flex-1 relative flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30 z-10">
                 <span className="material-symbols-outlined text-2xl">monitoring</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Step 3<br/>Start Managing</h3>
              <p className="text-sm text-slate-500">Effortlessly manage students and performance tasks.</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Pricing Options */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-[1000px] mx-auto px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">Pricing</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">Simple, <span className="text-indigo-600">transparent pricing</span></h2>
            <p className="text-slate-500 mt-4">Choose the plan that's right for your institution.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col pt-10">
              <h3 className="font-bold text-slate-900 text-lg mb-2">Basic</h3>
              <p className="text-slate-500 text-sm mb-6">Perfect for small campuses</p>
              <div className="text-3xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-8">₹999 <span className="text-sm font-normal text-slate-500">/month</span></div>
              <ul className="space-y-4 mb-8 text-sm text-slate-600 flex-1">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-500 text-sm">check</span> Up to 50 students</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-500 text-sm">check</span> Course management</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-500 text-sm">check</span> Basic reporting</li>
              </ul>
              <button className="w-full py-3 rounded-lg border border-indigo-200 text-indigo-600 font-bold hover:bg-indigo-50 transition-colors">Get started</button>
            </div>
            
            {/* Highlighted pricing */}
            <div className="bg-white rounded-2xl rounded-t-xl p-8 border-2 border-indigo-600 shadow-xl flex flex-col relative pt-10 ring-4 ring-indigo-50 scale-105 z-10">
              <div className="absolute top-0 left-0 w-full bg-indigo-600 text-center text-white text-[10px] font-bold py-1 uppercase tracking-widest rounded-t-lg">Most Popular</div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 mt-4">Standard</h3>
              <p className="text-slate-500 text-sm mb-6">Ideal for growing institutions</p>
              <div className="text-3xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-8">₹1,999 <span className="text-sm font-normal text-slate-500">/month</span></div>
              <ul className="space-y-4 mb-8 text-sm text-slate-600 flex-1">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-500 text-sm">check</span> Up to 250 students</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-500 text-sm">check</span> All Basic features</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-500 text-sm">check</span> Notification system</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-500 text-sm">check</span> Advanced reports</li>
              </ul>
              <button className="w-full py-3 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors">Get started</button>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col pt-10">
              <h3 className="font-bold text-slate-900 text-lg mb-2">Premium</h3>
              <p className="text-slate-500 text-sm mb-6">For global universities</p>
              <div className="text-3xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-8">₹3,999 <span className="text-sm font-normal text-slate-500">/month</span></div>
              <ul className="space-y-4 mb-8 text-sm text-slate-600 flex-1">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-500 text-sm">check</span> Unlimited students</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-500 text-sm">check</span> All Standard features</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-500 text-sm">check</span> Multi-campus management</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-500 text-sm">check</span> Priority support</li>
              </ul>
              <button className="w-full py-3 rounded-lg border border-indigo-200 text-indigo-600 font-bold hover:bg-indigo-50 transition-colors">Get started</button>
            </div>
          </div>
        </div>
      </section>

      {/* Final dark CTA & Footer */}
      <section className="bg-[#0b1221] pt-24 pb-8 text-slate-400">
        <div className="max-w-[1440px] mx-auto px-8">
          
          <div className="bg-[#152038] rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
            <div className="flex items-start gap-6 max-w-xl">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-indigo-600/20 flex items-center justify-center mt-1">
                <span className="material-symbols-outlined text-indigo-400 text-3xl">token</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-3">Ready to simplify your student management?</h2>
                <p className="text-slate-400">Join hundreds of administrators who trust EduCore SMS.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
               <Link to="/login" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-xl shadow-indigo-600/20">
                 Log In
               </Link>
               <Link to="/signup" className="bg-transparent border border-slate-600 hover:border-slate-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-all">
                 Sign Up Free
               </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-sm border-b border-slate-800 pb-12 mb-8">
            <div className="col-span-2 md:col-span-1">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                   <span className="material-symbols-outlined text-white text-sm" style={{fontVariationSettings: "'FILL' 1"}}>school</span>
                 </div>
                 <span className="font-bold text-lg text-white tracking-tight">EduCore</span>
               </div>
               <p className="max-w-xs">Smart student management for a better tomorrow.</p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">About us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="text-sm flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500">
             <p>© 2024 EduCore SMS. All rights reserved.</p>
             <div className="flex items-center gap-4">
               <a href="#" className="hover:text-white"><span className="material-symbols-outlined text-[20px]">public</span></a>
               <a href="#" className="hover:text-white"><span className="material-symbols-outlined text-[20px]">code</span></a>
             </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Landing;
