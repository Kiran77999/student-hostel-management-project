import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Application = () => {
  const [electives, setElectives] = useState([]);
  const [myElective, setMyElective] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { 'x-auth-token': token };

      const [availRes, myRes] = await Promise.all([
        axios.get('http://localhost:5000/api/electives/available', { headers }),
        axios.get('http://localhost:5000/api/electives/my', { headers })
      ]);

      setElectives(availRes.data);
      setMyElective(myRes.data);
    } catch (err) {
      console.error('Error fetching electives:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (id) => {
    if (myElective) {
      alert("You are already enrolled in an elective!");
      return;
    }

    try {
      setEnrollingId(id);
      const token = localStorage.getItem('token');
      const res = await axios.post(`http://localhost:5000/api/electives/enroll/${id}`, {}, {
        headers: { 'x-auth-token': token }
      });
      alert(res.data.message);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Enrollment failed');
    } finally {
      setEnrollingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-inter">
      <header className="bg-white border-b border-slate-200 px-8 py-10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-indigo-600 text-xs font-black uppercase tracking-[0.2em] mb-2 block">Student Portal</span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Open Elective Selection</h1>
            <p className="text-slate-500 text-sm mt-3 font-medium">Select your preferred subject for the current semester.</p>
          </div>
          
          {myElective && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Currently Enrolled</p>
                <p className="text-sm font-bold text-slate-900">{myElective.subjectName}</p>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-12">
        {myElective ? (
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl">verified</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Enrollment Confirmed</h2>
            <p className="text-slate-500 font-medium mb-8">You have successfully secured your seat in {myElective.subjectName}.</p>
            
            <div className="max-w-md mx-auto grid grid-cols-2 gap-4 text-left">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Subject Code</p>
                <p className="font-bold text-slate-900">{myElective.subjectCode}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Department</p>
                <p className="font-bold text-slate-900">{myElective.department}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {electives.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">school</span>
                <p className="text-slate-400 font-bold italic">No electives are currently open for enrollment.</p>
              </div>
            ) : (
              electives.map((elective) => (
                <div key={elective._id} className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-3xl">auto_stories</span>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-black text-slate-900 mb-1 leading-tight">{elective.subjectName}</h3>
                    <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">{elective.subjectCode}</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-slate-500 font-bold text-xs uppercase tracking-tight">
                      <span className="material-symbols-outlined text-lg">category</span>
                      {elective.department}
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 font-bold text-xs uppercase tracking-tight">
                      <span className="material-symbols-outlined text-lg">calendar_month</span>
                      Year {elective.year} • Sem {elective.semester}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100 mb-8">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Availability</p>
                      <p className="text-lg font-black text-slate-900">{elective.capacity - elective.enrolledStudents.length} Seats Left</p>
                    </div>
                    <div className="text-xs font-black text-slate-300">
                      Total {elective.capacity}
                    </div>
                  </div>

                  <button 
                    disabled={enrollingId === elective._id}
                    onClick={() => handleEnroll(elective._id)}
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    {enrollingId === elective._id ? (
                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-xl">login</span>
                        Enroll Now
                      </>
                    )}
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Application;
