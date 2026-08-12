import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MarketplaceHome = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchItems();
  }, [category]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:5000/api/market${category !== 'All' ? `?category=${category}` : ''}`;
      const res = await axios.get(url);
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="font-body-md text-slate-800 bg-[#f8fafc] min-h-screen antialiased">
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm h-16 md:flex hidden">
        <div className="flex items-center justify-between px-8 h-16 w-full mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006948] text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>storefront</span>
            <span className="text-xl font-black tracking-tight text-slate-900">CampusMarket</span>
          </div>
          <div className="flex-1 max-w-2xl mx-12 hidden md:block">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#006948] transition-colors">search</span>
              <input 
                className="w-full bg-slate-100/50 border-2 border-transparent rounded-2xl pl-12 pr-4 py-2.5 text-sm focus:bg-white focus:border-[#006948]/20 focus:ring-4 focus:ring-[#006948]/5 outline-none transition-all" 
                placeholder="Search for textbooks, electronics, dorm essentials..." 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
             <button className="text-slate-600 font-bold hover:text-[#006948] transition-colors text-sm" onClick={() => navigate('/dashboard/marketplace/storefront')}>My Storefront</button>
             <button onClick={() => navigate('/dashboard/marketplace/post-item')} className="bg-[#006948] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-100 hover:brightness-110 active:scale-95 transition-all">
                Post Item
             </button>
          </div>
        </div>
      </header>

      <main className="w-full max-w-[1400px] mx-auto px-6 py-10">
        <section className="relative rounded-[3rem] overflow-hidden mb-16 aspect-[21/9] md:aspect-[3.5/1] bg-[#006948] group shadow-2xl shadow-emerald-100">
          <img alt="Students working on campus" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 scale-105 group-hover:scale-100 transition-transform duration-1000" src="https://images.unsplash.com/photo-1523240715630-9918c13bc1ad?auto=format&fit=crop&w=1200&q=80"/>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex flex-col justify-center p-10 md:p-16">
            <div className="bg-emerald-400/20 backdrop-blur-sm border border-white/20 w-fit px-4 py-1 rounded-full mb-6">
                <span className="text-emerald-300 text-xs font-black uppercase tracking-widest">Community Hub</span>
            </div>
            <h1 className="font-black text-white text-4xl md:text-6xl max-w-2xl mb-8 leading-[1.1] tracking-tight">Buy & Sell with your fellow students.</h1>
            <div className="flex flex-wrap gap-5">
              <button onClick={() => navigate('/dashboard/marketplace/post-item')} className="bg-white text-[#006948] px-10 h-14 rounded-2xl font-black shadow-xl hover:bg-slate-50 transition-all active:scale-95 flex items-center gap-2">
                <span className="material-symbols-outlined">add_circle</span> Start Selling
              </button>
              <div className="hidden sm:flex items-center gap-3 px-6 h-14 rounded-2xl border border-white/30 backdrop-blur-md text-white font-bold">
                <div className="flex -space-x-3">
                    {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                    </div>)}
                </div>
                <span className="text-sm">Joined by 2k+ students</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Explore Categories</h3>
            <div className="flex gap-2">
                <button className="p-2 rounded-full border border-slate-200 hover:bg-white hover:shadow-md transition-all">
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="p-2 rounded-full border border-slate-200 hover:bg-white hover:shadow-md transition-all">
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'All', icon: 'grid_view', bg: 'bg-slate-100', text: 'text-slate-600' },
              { name: 'Textbooks', icon: 'menu_book', bg: 'bg-blue-50', text: 'text-blue-600' },
              { name: 'Electronics', icon: 'devices', bg: 'bg-purple-50', text: 'text-purple-600' },
              { name: 'Furniture', icon: 'chair', bg: 'bg-amber-50', text: 'text-amber-600' },
              { name: 'Clothing', icon: 'apparel', bg: 'bg-rose-50', text: 'text-rose-600' },
              { name: 'Dorm Essentials', icon: 'home_repair_service', bg: 'bg-emerald-50', text: 'text-emerald-600' }
            ].map((cat) => (
              <div 
                key={cat.name}
                onClick={() => setCategory(cat.name === 'All' ? 'All' : (cat.name === 'Textbooks' ? 'Books & Study Material' : cat.name))}
                className={`group cursor-pointer p-6 rounded-[2rem] border-2 transition-all duration-300 text-center ${category === (cat.name === 'All' ? 'All' : (cat.name === 'Textbooks' ? 'Books & Study Material' : cat.name)) ? 'bg-white border-[#006948] shadow-xl shadow-emerald-100/50 -translate-y-1' : 'bg-white border-transparent hover:border-slate-200 shadow-sm'}`}
              >
                <div 
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 ${cat.bg} ${cat.text}`}
                >
                  <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                </div>
                <span className="font-black text-xs uppercase tracking-wider">{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4 px-2">
            <div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{category === 'All' ? 'Featured Items' : category}</h3>
                <p className="text-slate-400 font-bold text-sm mt-1">Discover what your classmates are selling</p>
            </div>
            <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
                <button className="px-6 py-2 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-lg">Grid</button>
                <button className="px-6 py-2 rounded-xl text-slate-400 font-bold text-sm hover:text-slate-600">List</button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-32">
                <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-emerald-600 animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-emerald-600 text-3xl animate-pulse">local_mall</span>
                    </div>
                </div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
              <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-6xl text-slate-200">search_off</span>
              </div>
              <p className="text-slate-900 font-black text-2xl mb-2">No results found</p>
              <p className="text-slate-400 font-bold">Try adjusting your filters or search keywords</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredItems.map((item) => (
                <div 
                  key={item._id}
                  onClick={() => navigate(`/dashboard/marketplace/product/${item._id}`)} 
                  className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,105,72,0.1)] transition-all duration-500 group overflow-hidden cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-50">
                    <img 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      src={item.images?.[0] || 'https://images.unsplash.com/photo-1586769852044-692d6e677378?auto=format&fit=crop&w=600&q=80'}
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-wider shadow-sm border border-white/50">
                            {item.condition}
                        </span>
                    </div>
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg text-slate-300 hover:text-rose-500 transition-all active:scale-90">
                      <span className="material-symbols-outlined text-[24px]">favorite</span>
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/60 to-transparent">
                        <button className="w-full bg-white text-slate-900 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Quick View</button>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-emerald-50 text-emerald-700 text-[9px] px-3 py-1 rounded-full font-black tracking-widest flex items-center gap-1.5 uppercase border border-emerald-100/50">
                        <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span> Student Seller
                      </span>
                    </div>
                    <h4 className="font-bold text-xl text-slate-900 mb-2 truncate group-hover:text-[#006948] transition-colors">{item.title}</h4>
                    <p className="text-[#006948] font-black text-2xl mb-4">₹{item.price.toLocaleString()}</p>
                    
                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center text-[12px] font-black text-emerald-700 uppercase shadow-sm">
                                {item.seller?.name?.[0] || 'U'}
                            </div>
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-tight truncate max-w-[100px]">
                                {item.seller?.name || 'Anonymous'}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-300">
                            <span className="material-symbols-outlined text-[18px]">location_on</span>
                            <span className="text-[10px] font-black uppercase tracking-tighter">{item.location.split('/')[0]}</span>
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-gradient-to-br from-[#006948] to-[#005137] rounded-[3.5rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-emerald-200">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 relative z-10">Have something to sell?</h2>
            <p className="text-emerald-100 text-lg mb-10 max-w-xl mx-auto relative z-10 font-medium">Turn your used textbooks, gadgets, and dorm gear into cash while helping other students.</p>
            <button 
                onClick={() => navigate('/dashboard/marketplace/post-item')}
                className="bg-white text-[#006948] px-12 py-5 rounded-[2rem] font-black text-lg shadow-2xl hover:shadow-white/20 transition-all active:scale-95 relative z-10"
            >
                List Your First Item
            </button>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 mt-20">
        <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006948] text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>storefront</span>
                <span className="text-lg font-black tracking-tight text-slate-900">CampusMarket</span>
            </div>
            <p className="text-slate-400 text-sm font-bold">© 2026 Student Management System. Community Trust Verified.</p>
            <div className="flex gap-6">
                <span className="material-symbols-outlined text-slate-300 hover:text-[#006948] cursor-pointer transition-colors">facebook</span>
                <span className="material-symbols-outlined text-slate-300 hover:text-[#006948] cursor-pointer transition-colors">share</span>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketplaceHome;
