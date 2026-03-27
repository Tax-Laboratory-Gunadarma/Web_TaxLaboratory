import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // <-- IMPORT INI
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Import Halaman
import Home from './pages/Home';
import Oprec from './pages/Oprec';
import TentangKami from './pages/TentangKami';
import Team from './pages/Team';
import Staff from './pages/Staff';
import TataTertib from './pages/TataTertib';
import Modul from './pages/Modul';
import SoftwarePajak from './pages/SoftwarePajak';
import Lokasi from './pages/Lokasi';
import Faq from './pages/Faq';
import Kontak from './pages/Kontak';

export default function App() {
  return (
    // BUNGKUS DENGAN HELMET PROVIDER DI SINI
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="bg-[#fafafa] min-h-screen font-sans text-gray-800 scroll-smooth">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/oprec" element={<Oprec />} />
            <Route path="/tentang-kami" element={<TentangKami />} />
            <Route path="/team" element={<Team />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/tata-tertib" element={<TataTertib />} />
            <Route path="/modul" element={<Modul />} />
            <Route path="/software-pajak" element={<SoftwarePajak />} />
            <Route path="/lokasi" element={<Lokasi />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/kontak" element={<Kontak />} />
          </Routes>
          <Footer />
        </div>
        <Analytics />
      </BrowserRouter>
    </HelmetProvider>
  );
}