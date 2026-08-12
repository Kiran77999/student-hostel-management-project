import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminMasterSettings = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [electives, setElectives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Elective Form State
  const [showElectiveModal, setShowElectiveModal] = useState(false);
  const [electiveForm, setElectiveForm] = useState({
    subjectName: '',
    subjectCode: '',
    department: '',
    semester: 1,
    year: 1,
    capacity: 60,
    description: ''
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { 'x-auth-token': token };

      if (activeTab === 'students') {
        const res = await axios.get('http://localhost:5000/api/admin/students', { headers });
        setStudents(res.data);
      } else {
        const res = await axios.get('http://localhost:5000/api/admin/electives', { headers });
        setElectives(res.data);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateElective = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/admin/electives', electiveForm, {
        headers: { 'x-auth-token': token }
      });
      setShowElectiveModal(false);
      setElectiveForm({ subjectName: '', subjectCode: '', department: '', semester: 1, year: 1, capacity: 60, description: '' });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating elective');
    }
  };

  const deleteElective = async (id) => {
    if (!window.confirm('Delete this elective?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/electives/${id}`, {
        headers: { 'x-auth-token': token }
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="font-body-md bg-[#f4f7fe] min-h-screen antialiased">
      <header className="bg-white border-b border-gray-100 px-8 py-6 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Master Control</h1>
            <p className="text-slate-500 text-sm font-bold">Manage campus electives and student directory</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button 
              onClick={() => setActiveTab('students')}
              className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${activeTab === 'students' ? 'bg-white text-[#4318FF] shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Student Directory
            </button>
            <button 
              onClick={() => setActiveTab('electives')}
              className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${activeTab === 'electives' ? 'bg-white text-[#4318FF] shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Open Electives
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-10">
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input 
                    type="text" 
                    placeholder={`Search ${activeTab}...`} 
                    className="w-full bg-white border border-transparent rounded-2xl pl-12 pr-4 py-3 text-sm font-bold shadow-sm focus:ring-4 focus:ring-indigo-100 focus:border-indigo-200 outline-none transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {activeTab === 'electives' && (
                <button 
                    onClick={() => setShowElectiveModal(true)}
                    className="bg-[#4318FF] text-white px-8 py-3 rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                >
                    <span className="material-symbols-outlined">add_circle</span> Add Subject
                </button>
            )}
        </div>

        {loading ? (
            <div className="flex justify-center py-20">
                <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-indigo-600 animate-spin"></div>
            </div>
        ) : activeTab === 'students' ? (
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Student Info</th>
                            <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Roll No</th>
                            <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Branch/Year</th>
                            <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Status</th>
                            <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.rollno.toLowerCase().includes(search.toLowerCase())).map((student) => (
                            <tr key={student._id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#4318FF] flex items-center justify-center font-black text-xs uppercase">
                                            {student.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{student.name}</p>
                                            <p className="text-xs text-slate-400 font-medium">{student.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-sm font-black text-slate-600">{student.rollno}</span>
                                </td>
                                <td className="px-6 py-5">
                                    <p className="text-sm font-bold text-slate-700 uppercase tracking-tight">{student.branch}</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase">Year {student.year}</p>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="bg-emerald-50 text-emerald-600 text-[10px] px-3 py-1 rounded-full font-black uppercase border border-emerald-100/50">Active</span>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <button className="p-2 text-slate-300 hover:text-[#4318FF] transition-colors"><span className="material-symbols-outlined">edit</span></button>
                                    <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors"><span className="material-symbols-outlined">delete</span></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {electives.map((elective) => (
                    <div key={elective._id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-[#4318FF] flex items-center justify-center">
                                <span className="material-symbols-outlined text-3xl">import_contacts</span>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 bg-slate-50 text-slate-400 hover:text-[#4318FF] rounded-xl transition-all"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                                <button onClick={() => deleteElective(elective._id)} className="p-2 bg-rose-50 text-rose-400 hover:text-rose-600 rounded-xl transition-all"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                            </div>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight">{elective.subjectName}</h3>
                        <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">{elective.subjectCode}</p>
                        
                        <div className="flex gap-3 mb-6">
                            <span className="bg-slate-100 text-slate-600 text-[10px] px-3 py-1 rounded-lg font-black uppercase tracking-tight">{elective.department}</span>
                            <span className="bg-slate-100 text-slate-600 text-[10px] px-3 py-1 rounded-lg font-black uppercase tracking-tight">Sem {elective.semester}</span>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enrolled</p>
                                <p className="text-lg font-black text-slate-900">{elective.enrolledStudents?.length || 0} / {elective.capacity}</p>
                            </div>
                            <div className={`w-3 h-3 rounded-full ${elective.status === 'Open' ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`}></div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </main>

      {showElectiveModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <form onSubmit={handleCreateElective} className="bg-white rounded-[2.5rem] w-full max-w-[550px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-[#4318FF]/5">
                    <h2 className="font-black text-xl text-slate-900">Add New Elective</h2>
                    <button type="button" onClick={() => setShowElectiveModal(false)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 hover:bg-slate-50">
                        <span className="material-symbols-outlined text-slate-400">close</span>
                    </button>
                </div>
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.1em] mb-2">Subject Name</label>
                            <input required type="text" value={electiveForm.subjectName} onChange={e => setElectiveForm({...electiveForm, subjectName: e.target.value})} className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-4 py-3 font-bold text-sm focus:bg-white focus:border-indigo-100 transition-all outline-none" placeholder="e.g. Artificial Intelligence" />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.1em] mb-2">Subject Code</label>
                            <input required type="text" value={electiveForm.subjectCode} onChange={e => setElectiveForm({...electiveForm, subjectCode: e.target.value})} className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-4 py-3 font-bold text-sm focus:bg-white focus:border-indigo-100 transition-all outline-none" placeholder="e.g. CS401" />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.1em] mb-2">Capacity</label>
                            <input required type="number" value={electiveForm.capacity} onChange={e => setElectiveForm({...electiveForm, capacity: e.target.value})} className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-4 py-3 font-bold text-sm focus:bg-white focus:border-indigo-100 transition-all outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.1em] mb-2">Semester</label>
                            <input required type="number" value={electiveForm.semester} onChange={e => setElectiveForm({...electiveForm, semester: e.target.value})} className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-4 py-3 font-bold text-sm focus:bg-white focus:border-indigo-100 transition-all outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.1em] mb-2">Year</label>
                            <input required type="number" value={electiveForm.year} onChange={e => setElectiveForm({...electiveForm, year: e.target.value})} className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-4 py-3 font-bold text-sm focus:bg-white focus:border-indigo-100 transition-all outline-none" placeholder="e.g. 3" />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.1em] mb-2">Department</label>
                            <input required type="text" value={electiveForm.department} onChange={e => setElectiveForm({...electiveForm, department: e.target.value})} className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-4 py-3 font-bold text-sm focus:bg-white focus:border-indigo-100 transition-all outline-none" placeholder="e.g. CSE" />
                        </div>
                    </div>
                </div>
                <div className="p-8 bg-slate-50 border-t border-gray-100 flex justify-end gap-4">
                    <button type="button" onClick={() => setShowElectiveModal(false)} className="px-8 py-3 font-black text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
                    <button type="submit" className="bg-[#4318FF] text-white px-10 py-3 rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 hover:brightness-110 active:scale-95 transition-all">Create Subject</button>
                </div>
            </form>
        </div>
      )}
    </div>
  );
};

export default AdminMasterSettings;
