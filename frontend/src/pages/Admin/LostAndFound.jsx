import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Topbar = ({ onSearch }) => {
  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-white border-b border-slate-100 flex justify-between items-center px-6">
      <div className="flex items-center gap-6">
        <button className="text-slate-500 hover:text-indigo-600 transition-colors">
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>
      </div>
      
      <div className="flex-1 max-w-xl px-4 hidden md:block">
        <div className="relative">
           <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[18px]">search</span>
           <input 
             type="text" 
             placeholder="Search lost or found items..." 
             className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-shadow" 
             onChange={(e) => onSearch(e.target.value)}
           />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-full transition-colors group">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1 right-1 w-2.5 h-2.5 flex items-center justify-center text-[8px] font-bold text-white bg-red-500 border-2 border-white rounded-full group-hover:scale-125 transition-transform">5</span>
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs uppercase">
             U
          </div>
          <div className="hidden sm:block text-left">
            <h4 className="text-xs font-bold text-slate-800 leading-tight uppercase">User</h4>
            <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
               Student <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const LostAndFound = () => {
  const [showLostModal, setShowLostModal] = useState(false);
  const [showFoundModal, setShowFoundModal] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('Filter Category');
  const [search, setSearch] = useState('');

  // Form States
  const [form, setForm] = useState({ 
    type: 'Lost',
    title: '', 
    location: '', 
    category: 'Electronics', 
    date: '', 
    description: '',
    image: '' 
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [filterType, filterCategory, search]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:5000/api/lost?type=${filterType}&category=${filterCategory}&search=${search}`;
      const res = await axios.get(url);
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching lost items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to report items');
        return;
      }

      await axios.post('http://localhost:5000/api/lost', form, {
        headers: { 'x-auth-token': token }
      });

      setShowLostModal(false);
      setShowFoundModal(false);
      setForm({ type: 'Lost', title: '', location: '', category: 'Electronics', date: '', description: '', image: '' });
      fetchItems();
    } catch (err) {
      console.error('Error reporting item:', err);
      alert(err.response?.data?.message || 'Error reporting item');
    } finally {
      setSubmitting(false);
    }
  };

  const categories = ['Electronics', 'Wallets & Keys', 'Books & Papers', 'Accessories', 'Other'];

  return (
    <div className="w-full bg-[#f8f9fc] font-inter min-h-screen">
      <Topbar onSearch={setSearch} />
      
      <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-slate-200 pb-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                   <span className="material-symbols-outlined text-indigo-600 text-[32px]">manage_search</span> 
                   Campus Lost & Found
                </h1>
                <p className="text-slate-500 text-sm mt-2 font-medium">Easily report and recover items mislaid within the campus boundaries.</p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
                <button 
                  onClick={() => { setForm({ ...form, type: 'Lost' }); setShowLostModal(true); }} 
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-500 hover:text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-sm"
                >
                   <span className="material-symbols-outlined text-[20px]">campaign</span> Report Lost
                </button>
                <button 
                  onClick={() => { setForm({ ...form, type: 'Found' }); setShowFoundModal(true); }} 
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-500 hover:text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-sm"
                >
                   <span className="material-symbols-outlined text-[20px]">check_circle</span> Report Found
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border-l-4 border-l-red-500 border-y border-r border-slate-200 p-6 rounded-r-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                <div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Items Currently Lost</p>
                   <h2 className="text-3xl font-bold text-slate-900">{items.filter(i => i.type === 'Lost' && i.status === 'Active').length}</h2>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center"><span className="material-symbols-outlined text-[24px]">search</span></div>
            </div>
            
            <div className="bg-white border-l-4 border-l-emerald-500 border-y border-r border-slate-200 p-6 rounded-r-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                <div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Items Found</p>
                   <h2 className="text-3xl font-bold text-slate-900">{items.filter(i => i.type === 'Found' && i.status === 'Active').length}</h2>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center"><span className="material-symbols-outlined text-[24px]">inventory_2</span></div>
            </div>
            
            <div className="bg-white border-l-4 border-l-blue-500 border-y border-r border-slate-200 p-6 rounded-r-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                <div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Recovered/Returned</p>
                   <h2 className="text-3xl font-bold text-slate-900">{items.filter(i => i.status !== 'Active').length}</h2>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center"><span className="material-symbols-outlined text-[24px]">handshake</span></div>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 pt-4 border-t border-slate-100">
           <div className="flex items-center bg-white p-1 border border-slate-200 rounded-full shadow-sm w-full lg:w-auto overflow-x-auto custom-scrollbar">
              <button onClick={() => setFilterType('All')} className={`px-5 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap ${filterType === 'All' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}>All Items</button>
              <button onClick={() => setFilterType('Lost')} className={`px-5 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap border-r border-slate-100 ${filterType === 'Lost' ? 'bg-red-500 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}>Only Lost</button>
              <button onClick={() => setFilterType('Found')} className={`px-5 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap ${filterType === 'Found' ? 'bg-emerald-500 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}>Only Found</button>
           </div>
           
           <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-64">
                 <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[18px]">search</span>
                 <input 
                    type="text" 
                    placeholder="Search by name..." 
                    className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-xs font-medium focus:ring-2 focus:ring-indigo-500 shadow-sm" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                 />
              </div>
              <select 
                className="bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-bold text-slate-600 shadow-sm outline-none cursor-pointer"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                 <option>Filter Category</option>
                 {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
           </div>
        </div>

        {loading ? (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        ) : items.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">inventory_2</span>
              <p className="text-gray-500 font-medium">No reports found matching your criteria</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item) => (
                    <div key={item._id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                        <div className="relative h-48 overflow-hidden bg-slate-100 border-b border-slate-100">
                            <span className={`absolute top-3 left-3 z-10 px-3 py-1 text-[9px] uppercase tracking-widest font-black rounded-sm shadow-md ${item.type === 'Lost' ? 'bg-red-500 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                                {item.type}
                            </span>
                            <img 
                              src={item.image || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=400&q=80'} 
                              alt={item.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                        </div>
                        
                        <div className="p-5 flex flex-col flex-1">
                            <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1">{item.title}</h3>
                            <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5 mb-4"><span className="material-symbols-outlined text-[14px] text-slate-400">location_on</span> {item.location}</p>
                            <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-600 w-max mb-5`}>{item.category}</span>
                            
                            <div className="mt-auto pt-4 border-t border-slate-100 space-y-3">
                                <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
                                    <span className="material-symbols-outlined text-[14px]">calendar_today</span> {new Date(item.date).toLocaleDateString()} <span className="inline-block w-1 h-1 bg-slate-200 rounded-full mx-1"></span> {item.time || 'Not specified'}
                                </div>
                                <div className="flex items-center justify-between text-xs w-full group/btn cursor-pointer bg-slate-50 hover:bg-indigo-50 p-2 rounded-lg transition-colors border border-slate-100">
                                    <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                                        <span className="material-symbols-outlined text-[16px] text-indigo-500">account_circle</span> 
                                        {item.reporter?.name || 'Anonymous'}
                                    </div>
                                    <span className="material-symbols-outlined text-[16px] text-indigo-600 transition-colors">arrow_forward</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}

      </div>

      {(showLostModal || showFoundModal) && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
           <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] w-full max-w-[480px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
              <div className={`p-5 border-b border-slate-100 flex justify-between items-center ${form.type === 'Lost' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'}`}>
                 <h2 className="font-bold text-lg flex items-center gap-2">
                    <span className="material-symbols-outlined">{form.type === 'Lost' ? 'campaign' : 'check_circle'}</span> 
                    {form.type === 'Lost' ? 'Report Misplaced Item' : 'Report Discovered Item'}
                 </h2>
                 <button type="button" onClick={() => { setShowLostModal(false); setShowFoundModal(false); }} className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${form.type === 'Lost' ? 'bg-red-100/50 hover:bg-red-200' : 'bg-emerald-100/50 hover:bg-emerald-200'}`}>
                    <span className="material-symbols-outlined text-[20px]">close</span>
                 </button>
              </div>
              
              <div className="p-6 space-y-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Item Name *</label>
                    <input 
                      required 
                      type="text" 
                      value={form.title} 
                      onChange={e => setForm({...form, title: e.target.value})} 
                      className={`w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 transition-all ${form.type === 'Lost' ? 'focus:ring-red-500/30' : 'focus:ring-emerald-500/30'}`} 
                      placeholder="E.g., AirPods Pro Generation 2" 
                    />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Date {form.type}</label>
                        <input 
                          type="date" 
                          value={form.date} 
                          onChange={e => setForm({...form, date: e.target.value})} 
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Category</label>
                        <select 
                          value={form.category} 
                          onChange={e => setForm({...form, category: e.target.value})} 
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                        >
                           {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                 </div>
                 
                 <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">{form.type === 'Lost' ? 'Expected Lost Location' : 'Discovery Location'}</label>
                    <input 
                      type="text" 
                      value={form.location} 
                      onChange={e => setForm({...form, location: e.target.value})} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" 
                      placeholder="E.g., Basketball Court Area" 
                    />
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Image URL (Optional)</label>
                    <input 
                      type="text" 
                      value={form.image} 
                      onChange={e => setForm({...form, image: e.target.value})} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" 
                      placeholder="Paste image link here" 
                    />
                 </div>
              </div>
              
              <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                 <button type="button" onClick={() => { setShowLostModal(false); setShowFoundModal(false); }} className="px-5 py-2 font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors text-sm shadow-sm">Cancel</button>
                 <button 
                   disabled={submitting}
                   type="submit" 
                   className={`px-6 py-2 font-bold text-white border rounded-lg shadow-sm transition-colors text-sm ${form.type === 'Lost' ? 'bg-red-500 hover:bg-red-600 border-red-600' : 'bg-emerald-600 hover:bg-emerald-700 border-emerald-700'}`}
                 >
                   {submitting ? 'Submitting...' : `Post ${form.type} Alert`}
                 </button>
              </div>
           </form>
        </div>
      )}

    </div>
  );
};

export default LostAndFound;
