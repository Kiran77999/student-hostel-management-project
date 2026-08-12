import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MarketplaceProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/market/${id}`);
      setItem(res.data);
    } catch (err) {
      console.error('Error fetching item details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-[#f8fafc]">
      <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-emerald-600 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-emerald-600 text-3xl animate-pulse">local_mall</span>
          </div>
      </div>
    </div>
  );

  if (!item) return (
    <div className="text-center py-32 bg-[#f8fafc] min-h-screen flex flex-col items-center justify-center">
      <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-5xl text-slate-200">error</span>
      </div>
      <h2 className="text-3xl font-black text-slate-900 mb-2">Item not found</h2>
      <p className="text-slate-400 font-bold mb-8">The listing you're looking for might have been removed.</p>
      <button onClick={() => navigate('/dashboard/marketplace')} className="bg-[#006948] text-white px-10 py-4 rounded-2xl font-bold shadow-lg">Back to Marketplace</button>
    </div>
  );

  return (
    <div className="bg-[#f8fafc] font-body-md text-slate-800 min-h-screen antialiased pb-20">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-50 h-16 flex items-center">
        <div className="px-8 w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl active:scale-95 duration-200 transition-all">
              <span className="material-symbols-outlined mt-1 text-slate-500">arrow_back</span>
            </button>
            <div className="flex items-center gap-3">
                <span className="bg-slate-100 text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{item.category}</span>
                <span className="font-bold text-lg text-slate-900 truncate max-w-[200px] md:max-w-md">{item.title}</span>
            </div>
          </div>
          <div className="flex gap-4">
              <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                  <span className="material-symbols-outlined">favorite</span>
              </button>
              <button className="p-2 text-slate-300 hover:text-[#006948] transition-colors">
                  <span className="material-symbols-outlined">share</span>
              </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1300px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-white aspect-square relative group">
            <img 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              src={item.images?.[0] || 'https://images.unsplash.com/photo-1586769852044-692d6e677378?auto=format&fit=crop&w=800&q=80'}
            />
            <div className="absolute bottom-8 left-8 flex gap-3">
                {item.images?.map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${i === 0 ? 'bg-white' : 'bg-white/30'}`}></div>
                ))}
            </div>
          </div>
          
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-50">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-[#006948] rounded-full"></span>
                Product Description
            </h2>
            <p className="text-slate-500 leading-[1.8] text-lg whitespace-pre-wrap font-medium">{item.description}</p>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 border border-white sticky top-28">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-emerald-50 text-emerald-700 text-[10px] px-4 py-1.5 rounded-full font-black tracking-[0.1em] flex items-center gap-2 uppercase border border-emerald-100/50">
                <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span> Student Verified
              </span>
              <span className="bg-slate-100 text-slate-600 text-[10px] px-4 py-1.5 rounded-full font-black tracking-[0.1em] uppercase">
                  {item.condition}
              </span>
            </div>
            
            <h1 className="text-4xl font-black text-slate-900 mb-4 leading-tight">{item.title}</h1>
            <div className="flex items-baseline gap-2 mb-10">
                <span className="text-5xl font-black text-[#006948]">₹{item.price.toLocaleString()}</span>
                <span className="text-slate-400 font-bold text-sm">Fixed Price</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Category</p>
                <p className="font-bold text-sm text-slate-700">{item.category}</p>
              </div>
              <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Campus Loc</p>
                <p className="font-bold text-sm text-slate-700">{item.location.split('/')[0]}</p>
              </div>
            </div>

            <div className="space-y-4">
                <button onClick={() => alert('Chat functionality coming soon!')} className="w-full bg-[#006948] text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-emerald-200 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">chat_bubble</span>
                  Message Seller
                </button>
                <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                    Request Buy
                </button>
            </div>

            <div className="mt-10 pt-10 border-t border-slate-100">
                <h3 className="font-black text-sm uppercase tracking-[0.2em] text-slate-400 mb-6">Seller Details</h3>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 flex items-center justify-center text-2xl font-black text-emerald-700 uppercase shadow-sm group-hover:scale-105 transition-transform">
                    {item.seller?.name?.[0] || 'U'}
                  </div>
                  <div>
                    <p className="font-bold text-xl text-slate-900 group-hover:text-[#006948] transition-colors">{item.seller?.name || 'Student Seller'}</p>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-tight">{item.seller?.branch || 'User'} • Year {item.seller?.year || '1'}</p>
                  </div>
                  <span className="material-symbols-outlined ml-auto text-slate-200 group-hover:text-emerald-500 transition-colors">chevron_right</span>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarketplaceProductDetail;
