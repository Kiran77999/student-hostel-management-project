import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MarketplaceStorefront = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyItems();
  }, []);

  const fetchMyItems = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const res = await axios.get('http://localhost:5000/api/market/my/listings', {
        headers: { 'x-auth-token': token }
      });
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching my items:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/market/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const markSold = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/market/${id}`, { status: 'Sold' }, {
        headers: { 'x-auth-token': token }
      });
      setItems(items.map(item => item._id === id ? { ...item, status: 'Sold' } : item));
    } catch (err) {
      console.error('Error updating item:', err);
    }
  };

  return (
    <div className="font-body-md text-slate-800 bg-[#f9fafb] min-h-screen">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-40 h-16 flex items-center">
        <div className="px-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard/marketplace')} className="p-2 hover:bg-gray-100 rounded-xl active:scale-95 duration-200 text-slate-500 transition-all">
              <span className="material-symbols-outlined mt-1">arrow_back</span>
            </button>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">My Storefront</h2>
          </div>
          <button 
            onClick={() => navigate('/dashboard/marketplace/post-item')}
            className="bg-[#006948] text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg shadow-emerald-100 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">add</span> New Listing
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 w-full">
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-16 w-full">
          <div className="flex-shrink-0">
            <div className="relative group">
              <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-br from-[#85f8c4] to-[#006948] flex items-center justify-center text-4xl font-black text-white shadow-xl shadow-emerald-100 ring-8 ring-white group-hover:rotate-6 transition-transform">
                 {items[0]?.seller?.name?.[0] || 'U'}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-2xl shadow-md border border-gray-50 text-emerald-600">
                  <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0 text-center md:text-left">
             <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight leading-none">Manage Your Listings</h1>
             <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-3xl">
               Track your items, mark them as sold, or remove listings you no longer need. 
               Keep your profile fresh and trustworthy to attract more buyers!
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-50 group hover:border-emerald-100 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">inventory_2</span>
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.1em] mb-1">Active</p>
                <p className="text-4xl font-black text-slate-900">{items.filter(i => i.status === 'Available').length}</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-50 group hover:border-amber-100 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">shopping_cart_checkout</span>
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.1em] mb-1">Sold</p>
                <p className="text-4xl font-black text-slate-900">{items.filter(i => i.status === 'Sold').length}</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-emerald-50 bg-gradient-to-br from-white to-emerald-50/30 group hover:shadow-emerald-100 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-100">
                    <span className="material-symbols-outlined">payments</span>
                </div>
                <p className="text-xs font-black text-emerald-700 uppercase tracking-[0.1em] mb-1">Total Value</p>
                <p className="text-4xl font-black text-emerald-700">₹{items.reduce((acc, i) => acc + i.price, 0).toLocaleString()}</p>
            </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-emerald-600 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-600 animate-pulse">storefront</span>
                </div>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
            <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-5xl text-slate-200">storefront</span>
            </div>
            <p className="text-slate-400 font-bold text-xl mb-8">You haven't listed any items yet</p>
            <button 
                onClick={() => navigate('/dashboard/marketplace/post-item')} 
                className="bg-[#006948] text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:brightness-110 transition-all active:scale-95"
            >
                Start Selling Now
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Your Inventory</h3>
                <span className="text-sm font-bold text-slate-400">{items.length} items total</span>
            </div>
            {items.map((item) => (
              <div key={item._id} className="bg-white p-5 rounded-[2.5rem] border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col md:flex-row gap-6 items-center group hover:shadow-xl transition-all duration-300">
                <div className="w-full md:w-32 h-48 md:h-32 rounded-3xl overflow-hidden flex-shrink-0 bg-slate-50 relative">
                   <img 
                    alt={item.title} 
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${item.status === 'Sold' ? 'grayscale opacity-50' : ''}`} 
                    src={item.images?.[0] || 'https://images.unsplash.com/photo-1586769852044-692d6e677378?auto=format&fit=crop&w=300&q=80'}
                   />
                   {item.status === 'Sold' && (
                     <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="bg-white text-black px-3 py-1 rounded-full text-[10px] font-black uppercase">Sold</span>
                     </div>
                   )}
                </div>
                <div className="flex-1 min-w-0 w-full text-center md:text-left">
                   <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                     <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider ${item.status === 'Available' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                       {item.status}
                     </span>
                     <span className="text-xs text-slate-400 font-bold uppercase tracking-tight">{item.category}</span>
                   </div>
                   <h4 className="font-bold text-xl text-slate-900 truncate mb-1">{item.title}</h4>
                   <p className="text-[#006948] font-black text-2xl">₹{item.price.toLocaleString()}</p>
                </div>
                <div className="flex flex-row w-full md:w-auto gap-3">
                   <button onClick={() => navigate(`/dashboard/marketplace/product/${item._id}`)} className="flex-1 md:flex-none px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-200 transition-colors">View</button>
                   {item.status === 'Available' && (
                     <>
                       <button onClick={() => navigate(`/dashboard/marketplace/edit-item/${item._id}`)} className="flex-1 md:flex-none px-6 py-3 bg-blue-50 text-blue-600 rounded-2xl text-sm font-bold hover:bg-blue-100 transition-colors">Edit</button>
                       <button onClick={() => markSold(item._id)} className="flex-1 md:flex-none px-6 py-3 bg-[#006948] text-white rounded-2xl text-sm font-bold hover:bg-[#005137] transition-colors shadow-md shadow-emerald-50">Mark Sold</button>
                     </>
                   )}
                   <button onClick={() => deleteItem(item._id)} className="p-3 text-red-400 hover:bg-red-50 rounded-2xl transition-colors">
                     <span className="material-symbols-outlined text-[24px]">delete</span>
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MarketplaceStorefront;
