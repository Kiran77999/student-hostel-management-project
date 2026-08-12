import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import LostAndFound from './pages/Admin/LostAndFound';
import AdminMasterSettings from './pages/Admin/AdminMasterSettings';
import MarketplaceHome from './pages/Admin/Marketplace/MarketplaceHome';
import MarketplaceProductDetail from './pages/Admin/Marketplace/MarketplaceProductDetail';
import MarketplaceStorefront from './pages/Admin/Marketplace/MarketplaceStorefront';
import MarketplaceListItem from './pages/Admin/Marketplace/MarketplaceListItem';
import Landing from './pages/Landing';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Application from './pages/Admin/OpenElective/Application';
import Results from './pages/Admin/OpenElective/Results';
import Attendance from './pages/Admin/Attendance';
import Timetable from './pages/Admin/Timetable';

// Layout wrapper for the admin dashboard since it uses a Sidebar
const DashboardLayout = () => {
  return (
    <div className="bg-background min-h-screen text-on-surface font-body-md flex">
      <Sidebar />
      <main className="flex-1 min-h-screen flex flex-col ml-[260px]">
        <Outlet />
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="lost-and-found" element={<LostAndFound />} />
          <Route path="marketplace" element={<MarketplaceHome />} />
          <Route path="marketplace/storefront" element={<MarketplaceStorefront />} />
          <Route path="marketplace/product/:id" element={<MarketplaceProductDetail />} />
          <Route path="marketplace/post-item" element={<MarketplaceListItem />} />
          <Route path="marketplace/edit-item/:id" element={<MarketplaceListItem />} />
          <Route path="open-elective/application" element={<Application />} />
          <Route path="open-elective/results" element={<Results />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="admin/master" element={<AdminMasterSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
