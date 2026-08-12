import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const MarketplaceListItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    condition: '',
    price: '',
    description: '',
    location: 'The Quad / Library',
    images: []
  });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/market/${id}`);
      const item = res.data;
      setFormData({
        title: item.title,
        category: item.category,
        condition: item.condition,
        price: item.price,
        description: item.description,
        location: item.location,
        images: item.images || [],
        imageUrl: item.images?.[0] || ''
      });
    } catch (err) {
      console.error('Error fetching item:', err);
      alert('Error fetching item data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        navigate('/login');
        return;
      }

      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/market/${id}`, formData, {
          headers: { 'x-auth-token': token }
        });
      } else {
        await axios.post('http://localhost:5000/api/market', formData, {
          headers: { 'x-auth-token': token }
        });
      }

      navigate('/dashboard/marketplace/storefront');
    } catch (err) {
      console.error('Error saving listing:', err);
      alert(err.response?.data?.message || 'Error saving listing');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-[#f9f9ff]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006948]"></div>
    </div>
  );

  return (
    <div className="bg-[#f9f9ff] font-body-md text-slate-800 min-h-screen">
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 h-16 w-full mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-lg active:scale-95 duration-200 text-slate-500">
              <span className="material-symbols-outlined mt-0.5">close</span>
            </button>
            <span className="text-xl font-black tracking-tight text-emerald-600 hidden sm:block">CampusMarket</span>
          </div>
          <div className="flex items-center gap-6">
            <button disabled={submitting} form="list-form" type="submit" className="text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg font-bold transition-colors text-sm disabled:opacity-50">
                {submitting ? 'Saving...' : (isEditMode ? 'Update Listing' : 'Post Item')}
            </button>
          </div>
        </div>
      </header>

      <main className="pt-10 pb-20 px-6 max-w-3xl mx-auto w-full">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{isEditMode ? 'Edit Listing' : 'List an Item'}</h1>
          <p className="text-slate-500 text-sm">Reach thousands of students on campus. Verification ensures a safe trade.</p>
        </div>

        <form id="list-form" onSubmit={handlePost} className="space-y-8">
          <section className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#006948] text-white flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-emerald-50">1</div>
              <h2 className="text-xl font-bold text-slate-800">Item Image</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-sm text-slate-700 mb-2">Image URL</label>
                <input 
                  name="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={(e) => setFormData({ ...formData, images: [e.target.value], imageUrl: e.target.value })}
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#006948]/40 focus:border-[#006948] focus:bg-white text-sm font-medium outline-none transition-all shadow-sm" 
                  placeholder="Paste an image link here" 
                  type="text"
                />
              </div>
              
              {formData.images?.[0] && (
                <div className="mt-4 aspect-[4/3] max-w-sm rounded-xl overflow-hidden border border-gray-100">
                  <img src={formData.images[0]} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#006948] text-white flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-emerald-50">2</div>
              <h2 className="text-xl font-bold text-slate-800">Item Details</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block font-bold text-sm text-slate-700 mb-2">Listing Title</label>
                <input 
                  required 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#006948]/40 focus:border-[#006948] focus:bg-white text-sm font-medium outline-none transition-all shadow-sm" 
                  placeholder="e.g. Organic Chemistry Textbook" 
                  type="text"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-bold text-sm text-slate-700 mb-2">Category</label>
                  <select 
                    required 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#006948]/40 focus:bg-white text-sm font-bold text-slate-600 outline-none shadow-sm cursor-pointer"
                  >
                    <option value="">Select Category</option>
                    <option>Books & Study Material</option>
                    <option>Electronics</option>
                    <option>Dorm Essentials</option>
                    <option>Clothing</option>
                    <option>Furniture</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-sm text-slate-700 mb-2">Condition</label>
                  <select 
                    required 
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#006948]/40 focus:bg-white text-sm font-bold text-slate-600 outline-none shadow-sm cursor-pointer"
                  >
                    <option value="">Select Condition</option>
                    <option>Like New</option>
                    <option>Good</option>
                    <option>Fair</option>
                    <option>Poor</option>
                  </select>
                </div>
              </div>

              <div className="w-full sm:w-1/2">
                <label className="block font-bold text-sm text-slate-700 mb-2">Pricing</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                  <input 
                    required 
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full h-12 pl-8 pr-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#006948]/40 focus:border-[#006948] focus:bg-white text-sm font-bold outline-none transition-all shadow-sm" 
                    placeholder="0.00" 
                    type="number" 
                    step="0.01"
                  />
                </div>
              </div>
              
              <div>
                <label className="block font-bold text-sm text-slate-700 mb-2">Detailed Description</label>
                <textarea 
                  rows="4" 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#006948]/40 focus:border-[#006948] focus:bg-white text-sm font-medium outline-none transition-all shadow-sm" 
                  placeholder="Describe the item..."
                ></textarea>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#006948] text-white flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-emerald-50">3</div>
              <h2 className="text-xl font-bold text-slate-800">Pickup Details</h2>
            </div>
            
            <div className="mb-6">
              <label className="block font-bold text-sm text-slate-700 mb-4">Campus Location Preference</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'quad', label: 'The Quad / Library', sub: 'Central, high visibility' },
                  { id: 'north', label: 'North Housing', sub: 'Near residential halls' },
                  { id: 'union', label: 'Student Union', sub: 'Inside the food court' },
                  { id: 'other', label: 'Other / DM me', sub: 'Specify in chat' }
                ].map((loc) => (
                  <label key={loc.id} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.location === loc.label ? 'border-[#006948] bg-emerald-50/30' : 'border-slate-200 hover:border-[#006948] hover:bg-emerald-50/10'}`}>
                    <input 
                      type="radio"
                      name="location"
                      value={loc.label}
                      checked={formData.location === loc.label}
                      onChange={handleChange}
                      className="w-5 h-5 text-[#006948] border-slate-300 focus:ring-[#006948]"
                    />
                    <div className="ml-3">
                      <p className="font-bold text-sm text-slate-800">{loc.label}</p>
                      <p className="font-medium text-xs text-slate-400 mt-0.5">{loc.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </section>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-end border-t border-slate-200 pt-8">
            <button type="button" onClick={() => navigate(-1)} className="w-full sm:w-auto px-8 py-3 font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all shadow-sm">
                Cancel
            </button>
            <button disabled={submitting} type="submit" className="w-full sm:w-auto px-10 py-3 font-bold text-white bg-[#006948] shadow-md hover:bg-[#005137] rounded-xl transition-all disabled:opacity-50">
                {submitting ? 'Saving...' : (isEditMode ? 'Update Listing' : 'Publish Listing')}
            </button>
          </div>
        </form>

      </main>
    </div>
  );
};

export default MarketplaceListItem;
