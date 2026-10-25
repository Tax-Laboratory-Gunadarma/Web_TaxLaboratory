import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import ScrollProgress from './ScrollProgress';
import MobileMenu from './MobileMenu';
import { IS_OPREC_OPEN } from '../data/oprecData';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const location = useLocation();

  const isTransparentHero = location.pathname === '/' || (location.pathname === '/oprec' && IS_OPREC_OPEN);
  const useWhiteText = isTransparentHero && !isScrolled;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 50;
          setIsScrolled(prev => {
            if (prev !== scrolled) return scrolled;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeAll();
  }, [location.pathname]);

  const toggleDropdown = (menuName) => setActiveDropdown(activeDropdown === menuName ? null : menuName);
  
  const closeAll = () => { 
    setActiveDropdown(null); 
    setIsMobileMenuOpen(false); 
  };

  const isActive = (path) => location.pathname === path;

  const isParentActive = (menuName) => {
    const paths = {
      profil: ['/tentang-kami', '/team', '/staff'],
      layanan: ['/tata-tertib', '/modul', '/software-pajak'],
      informasi: ['/oprec', '/lokasi', '/faq']
    };
    return paths[menuName]?.includes(location.pathname);
  };

  const getLinkStyle = (path) => {
    const active = isActive(path);
    if (useWhiteText) return active ? 'text-white font-extrabold' : 'text-purple-100 hover:text-white';
    return active ? 'text-purple-800 font-extrabold' : 'text-gray-600 hover:text-purple-800';
  };

  const getDropdownStyle = (menuName) => {
    const active = activeDropdown === menuName || isParentActive(menuName);
    if (useWhiteText) return active ? 'text-white font-extrabold' : 'text-purple-100 hover:text-white';
    return active ? 'text-purple-800 font-extrabold' : 'text-gray-600 hover:text-purple-800';
  };

  const getSubLinkStyle = (path) => {
    return isActive(path) 
      ? 'text-purple-800 font-extrabold bg-purple-50/80' 
      : 'text-gray-600 hover:bg-purple-50/80 hover:text-purple-800';
  };

  return (
    <div className={`fixed w-full z-[100] flex justify-center pointer-events-none lg:transition-all transition-[padding,top] duration-300 ease-out ${isScrolled ? 'top-4 px-4 sm:px-6' : 'top-0 px-0'}`}>
      <nav 
        className={`pointer-events-auto w-full lg:transition-all transition-[background-color,border-radius,box-shadow,padding,max-width,border-color] duration-300 ease-out flex flex-col items-center relative transform-gpu
          ${isScrolled 
            ? 'max-w-[1800px] rounded-full md:rounded-[2.5rem] lg:bg-white/95 bg-white lg:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.15)] shadow-md lg:backdrop-blur-xl py-3 px-6 md:px-8 border border-gray-100' 
            : `max-w-full rounded-none py-3 md:py-4 px-6 md:px-10 border-b ${isTransparentHero ? 'bg-transparent border-transparent' : 'bg-white border-gray-100 shadow-sm'}`
          }`}
      >
        <div className="w-full flex items-center justify-between relative z-20">
          
          <div className={`flex justify-start transition-all duration-300 ease-out ${isScrolled ? 'flex-1' : 'w-auto'}`}>
            <Link to="/" onClick={closeAll} className="flex items-center gap-3 shrink-0 group">
              <div className={`bg-white rounded-full flex items-center justify-center overflow-hidden border border-slate-100 shadow-sm transition-all duration-300 group-hover:scale-105 shrink-0
                ${isScrolled ? 'w-9 h-9 md:w-11 md:h-11' : 'w-11 h-11 md:w-13 md:h-13'}
              `}>
                <img src="/img-template/LogoTaxLab.webp" alt="Logo TaxLab" className="w-full h-full object-contain" onError={(e) => { e.target.src = "https://api.dicebear.com/8.x/initials/svg?seed=TL&backgroundColor=orange" }} />
              </div>
              <div className="flex flex-col justify-center leading-none">
                <span className={`font-black tracking-tight transition-colors duration-300 ${isScrolled ? 'text-base md:text-lg' : 'text-lg md:text-xl'} ${useWhiteText ? 'text-white' : 'text-gray-900'}`}>
                  Tax<span className={useWhiteText ? 'text-orange-400' : 'text-orange-500'}>Laboratory</span>
                </span>
                <span className={`font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${isScrolled ? 'text-[7px] md:text-[8px] mt-0.5' : 'text-[9px] md:text-[10px] mt-1'} ${useWhiteText ? 'text-purple-200' : 'text-gray-400'}`}>
                  Gunadarma
                </span>
              </div>
            </Link>
          </div>
          
          <div className={`hidden lg:flex gap-8 font-bold text-base items-center transition-all duration-300 ${isScrolled ? 'justify-center shrink-0' : 'flex-1 justify-end'}`}>
            <Link to="/" onClick={closeAll} className={`transition-colors relative group ${getLinkStyle('/')}`}>
              Beranda
              <span className={`absolute -bottom-1.5 left-0 w-0 h-0.5 transition-all group-hover:w-full ${useWhiteText ? 'bg-white' : 'bg-orange-500'}`}></span>
            </Link>
            
            <div className="relative group/item">
              <button onClick={() => toggleDropdown('profil')} className={`flex items-center gap-1.5 focus:outline-none transition-colors ${getDropdownStyle('profil')}`}>
                Profil <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'profil' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {activeDropdown === 'profil' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-7 w-60 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden py-3 animate-in fade-in slide-in-from-top-4 duration-200">
                  <Link to="/tentang-kami" onClick={closeAll} className={`block px-6 py-3 ${getSubLinkStyle('/tentang-kami')}`}>Tentang Kami</Link>
                  <Link to="/team" onClick={closeAll} className={`block px-6 py-3 ${getSubLinkStyle('/team')}`}>Team</Link>
                  <Link to="/staff" onClick={closeAll} className={`block px-6 py-3 ${getSubLinkStyle('/staff')}`}>Staff</Link>
                </div>
              )}
            </div>

            <div className="relative group/item">
              <button onClick={() => toggleDropdown('layanan')} className={`flex items-center gap-1.5 focus:outline-none transition-colors ${getDropdownStyle('layanan')}`}>
                Layanan <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'layanan' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {activeDropdown === 'layanan' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-7 w-60 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden py-3 animate-in fade-in slide-in-from-top-4 duration-200">
                  <Link to="/tata-tertib" onClick={closeAll} className={`block px-6 py-3 ${getSubLinkStyle('/tata-tertib')}`}>Tata Tertib</Link>
                  <Link to="/modul" onClick={closeAll} className={`block px-6 py-3 ${getSubLinkStyle('/modul')}`}>Modul</Link>
                  <Link to="/software-pajak" onClick={closeAll} className={`block px-6 py-3 ${getSubLinkStyle('/software-pajak')}`}>Software Pajak</Link>
                  <a href="https://pajak.go.id/" target="_blank" rel="noreferrer" onClick={closeAll} className="block px-6 py-3 text-blue-600 hover:bg-blue-50/80">Portal DJP</a>
                </div>
              )}
            </div>

            <div className="relative group/item">
              <button onClick={() => toggleDropdown('informasi')} className={`flex items-center gap-1.5 focus:outline-none transition-colors ${getDropdownStyle('informasi')}`}>
                Informasi <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'informasi' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {activeDropdown === 'informasi' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-7 w-60 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden py-3 animate-in fade-in slide-in-from-top-4 duration-200">
                  <Link to="/oprec" onClick={closeAll} className={`block px-6 py-3 ${isActive('/oprec') ? 'text-orange-600 font-extrabold bg-orange-50' : 'text-orange-500 font-bold hover:bg-orange-50'}`}>Oprec</Link>
                  <Link to="/lokasi" onClick={closeAll} className={`block px-6 py-3 ${getSubLinkStyle('/lokasi')}`}>Lokasi</Link>
                  <Link to="/faq" onClick={closeAll} className={`block px-6 py-3 ${getSubLinkStyle('/faq')}`}>FAQ</Link>
                </div>
              )}
            </div>

            <Link to="/kontak" onClick={closeAll} className={`transition-colors relative group ${getLinkStyle('/kontak')}`}>
              Kontak
              <span className={`absolute -bottom-1.5 left-0 w-0 h-0.5 transition-all group-hover:w-full ${useWhiteText ? 'bg-white' : 'bg-orange-500'}`}></span>
            </Link>
          </div>

          <div className={`flex justify-end transition-all duration-300 ease-out ${isScrolled ? 'flex-1' : 'w-auto'}`}>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full focus:outline-none transition-colors ${useWhiteText ? 'text-white bg-white/10 hover:bg-white/20' : 'text-purple-900 bg-purple-50 hover:bg-purple-100'}`}
            >
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6" : "M4 6h16M4 12h16m-7 6h7"} /></svg>
            </button>
          </div>
        </div>

        <ScrollProgress isScrolled={isScrolled} />

        <MobileMenu 
          isMobileMenuOpen={isMobileMenuOpen} 
          toggleDropdown={toggleDropdown} 
          activeDropdown={activeDropdown} 
          isActive={isActive} 
          getSubLinkStyle={getSubLinkStyle} 
          closeAll={closeAll} 
        />
      </nav>
    </div>
  );
}