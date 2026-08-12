import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Hash, Phone, BookOpen, Calendar, Lock, ArrowRight, GraduationCap, CheckCircle2, ShieldCheck, Key } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollno: '',
    phone: '',
    branch: '',
    year: '1',
    role: 'student',
    adminCode: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        rollno: formData.rollno,
        phone: formData.phone,
        branch: formData.branch,
        year: parseInt(formData.year),
        role: formData.role,
        adminCode: formData.adminCode,
        password: formData.password
      });
      
      if (res.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl z-10"
      >
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Left Side: Info */}
            <div className="flex-1 space-y-8">
              <div>
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 mb-6"
                >
                  <GraduationCap className="w-8 h-8 text-white" />
                </motion.div>
                <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">Join EduCore</h1>
                <p className="text-slate-400 font-medium text-lg leading-relaxed">
                  Start your journey with the most advanced student management platform.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  'Personalized academic dashboard',
                  'Real-time attendance tracking',
                  'Seamless material access',
                  'Performance analytics & reports'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <p className="text-slate-400 font-medium">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-500 hover:text-blue-400 font-bold underline underline-offset-4 decoration-2 decoration-blue-500/30 hover:decoration-blue-500 transition-all">
                    Log In
                  </Link>
                </p>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="flex-[1.5]">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 overflow-hidden"
                  >
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></div>
                      {error}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Role Selection */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Account Type</label>
                  <div className="flex gap-4">
                    {['student', 'admin'].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setFormData({ ...formData, role: r })}
                        className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition-all flex items-center justify-center gap-2 ${formData.role === r ? 'bg-blue-600/10 border-blue-600 text-blue-500 shadow-lg shadow-blue-500/10' : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'}`}
                      >
                        {r === 'admin' ? <ShieldCheck className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {formData.role === 'admin' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-1.5 sm:col-span-2 overflow-hidden"
                    >
                      <label className="text-xs font-bold text-rose-400 uppercase tracking-wider ml-1">Admin Passcode</label>
                      <div className="relative group/input">
                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500 transition-colors" />
                        <input 
                          type="password" 
                          name="adminCode"
                          required
                          value={formData.adminCode}
                          onChange={handleChange}
                          className="w-full bg-rose-500/5 border border-rose-500/20 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500 transition-all"
                          placeholder="Enter Secret Passcode"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                  <div className="relative group/input">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                      placeholder="Niraj Pandey"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                  <div className="relative group/input">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                      placeholder="niraj@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Roll Number</label>
                  <div className="relative group/input">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                    <input 
                      type="text" 
                      name="rollno"
                      required
                      value={formData.rollno}
                      onChange={handleChange}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                      placeholder="22011p0533"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Phone Number</label>
                  <div className="relative group/input">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Year</label>
                  <div className="relative group/input">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                    <select 
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all appearance-none"
                    >
                      <option value="1" className="bg-[#1e293b]">1st Year</option>
                      <option value="2" className="bg-[#1e293b]">2nd Year</option>
                      <option value="3" className="bg-[#1e293b]">3rd Year</option>
                      <option value="4" className="bg-[#1e293b]">4th Year</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Branch / Department</label>
                  <div className="relative group/input">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                    <input 
                      type="text" 
                      name="branch"
                      required
                      value={formData.branch}
                      onChange={handleChange}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                      placeholder="Computer Science Engineering"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
                  <div className="relative group/input">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                    <input 
                      type="password" 
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Confirm Password</label>
                  <div className="relative group/input">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                    <input 
                      type="password" 
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 pt-4">
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit" 
                    disabled={loading}
                    className={`w-full bg-gradient-to-r ${formData.role === 'admin' ? 'from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-rose-500/20' : 'from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/20'} text-white font-bold py-4 rounded-xl shadow-xl transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>{formData.role === 'admin' ? 'Create Admin Account' : 'Create Student Account'}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
