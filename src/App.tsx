
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import Agenda from './pages/Agenda';
import EventDetail from './pages/Agenda/EventDetail';
import Videos from './pages/Videos';
import Artistes from './pages/Artistes';
import ArtistDetail from './pages/Artistes/ArtistDetail';
import Collaborer from './pages/Collaborer';
import Magazine from './pages/Magazine';
import ArticleDetail from './pages/Magazine/ArticleDetail';
import { AdminProvider } from './context/AdminContext';
import AdminPanel from './pages/Admin/AdminPanel';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/agenda/:id" element={<EventDetail />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/artistes" element={<Artistes />} />
          <Route path="/artistes/:id" element={<ArtistDetail />} />
          <Route path="/collaborer" element={<Collaborer />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/magazine/:id" element={<ArticleDetail />} />
        </Routes>
      </main>
      <Footer />

      {/* Admin Trigger Button */}
      <button
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 left-6 z-[999] bg-black text-white w-10 h-10 flex items-center justify-center font-black text-xs hover:bg-[#FF5733] hover:scale-110 transition-all border-2 border-white/10"
        title="Ouvrir le CMS AK"
      >
        AK
      </button>

      {/* Full Screen Admin Panel */}
      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AdminProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AdminProvider>
  );
};

export default App;
