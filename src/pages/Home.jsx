import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import PageTransition from '../components/PageTransition';
import { Helmet } from 'react-helmet-async';

// IMPORT DATA DAN KOMPONEN DARI LUAR FILE
import { ARTICLES_DATA } from '../data/articlesData';
import { CloseIcon } from '../components/Icons';


// KOMPONEN SCROLL REVEAL

const ScrollReveal = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        // Kalau elemen udah masuk layar
        if (entry.isIntersecting) {
          // Nyalakan animasinya
          setTimeout(() => setIsVisible(true), delay);
          // Lalu matikan sensornya selamanya (biar nggak ngulang pas di-scroll ke atas)
          if (ref.current) obs.unobserve(ref.current); 
        }
      },
      // Trigger pas elemen masuk 15% dari bawah layar
      { rootMargin: "0px 0px -15% 0px", threshold: 0 }
    );
    
    if (ref.current) observer.observe(ref.current);
    
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [delay]);

  return (
    <div 
      ref={ref} 
      className={`${className} transition-all duration-700 transform-gpu will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const isOprecOpen = true; 
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // STATE UNTUK EFEK HERO CARD DI HP
  const [heroInView, setHeroInView] = useState(false);
  const heroRef = useRef(null);

  // Lock scroll saat modal terbuka
  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isModalOpen]);

  // Observer khusus untuk Hero Card di HP
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setHeroInView(true);
          if (heroRef.current) obs.unobserve(heroRef.current);
        }
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => { if (heroRef.current) observer.unobserve(heroRef.current); };
  }, []);

  return (
    <PageTransition>
    {/* INJEKSI SEO & SCHEMA MARKUP */}
    <Helmet>
      <title>Tax Laboratory - Laboratorium Akuntansi Lanjut B Gunadarma</title>
      <meta name="description" content="Pusat informasi dan unduhan modul TaxLaboratory (Tax Lab Gundar). Platform resmi Laboratorium Akuntansi Lanjut B Universitas Gunadarma untuk praktikum perpajakan." />
      <meta name="keywords" content="tax laboratory, taxlaboratory, laboratorium akuntansi lanjut b, lab akuntansi lanjut b, tax lab gundar, lab pajak gunadarma" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "TaxLaboratory - Laboratorium Akuntansi Lanjut B",
          "alternateName": ["Lab Pajak Gunadarma", "Lab Akuntansi Gunadarma", "Taxlab", "Tax Lab Gundar", "Taxlaboratory"],
          "url": "https://www.taxlaboratory.my.id/",
          "logo": "https://www.taxlaboratory.my.id/img-template/LogoTaxLab.webp",
          "parentOrganization": {
            "@type": "CollegeOrUniversity",
            "name": "Universitas Gunadarma",
            "url": "https://gunadarma.ac.id/"
          }
        })}
      </script>
    </Helmet>

    <main className="bg-[#fafafa] font-sans text-gray-800 scroll-smooth relative z-0">
      
      {/* BACKGROUND DOTS */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[#fafafa] bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* HERO SECTION */}

      <section className="relative pt-32 md:pt-36 pb-20 lg:pb-24 bg-purple-900 border-b-[12px] border-orange-500 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-gradient-to-bl from-purple-800 to-transparent rounded-full opacity-60 translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            
            <header className="w-full lg:w-6/12 flex flex-col justify-center mt-6 lg:mt-0">
              <h1 className="text-4xl md:text-5xl lg:text-[3.8rem] font-black text-white leading-[1.1] mb-6 tracking-tighter animate-[fadeIn_0.5s_ease-out]">
                Laboratorium <br/> 
                <span className="text-orange-500">Akuntansi Lanjut B</span>
              </h1>
              
              <p className="text-purple-100/90 text-base md:text-lg font-medium mb-8 max-w-lg leading-relaxed text-justify animate-[fadeIn_0.7s_ease-out]">
                Pusat praktikum <strong>Laboratorium Pajak</strong> terpadu. Solusi cerdas pendalaman teori menuju implementasi <strong>Lab Akuntansi Pajak</strong> berstandar industri modern di <strong>Laboratorium Akuntansi Lanjut B</strong> Universitas Gunadarma.
              </p>

              <div className="hidden lg:flex flex-wrap items-center gap-4 animate-[fadeIn_0.9s_ease-out]">
                <Link to="/modul" className="bg-orange-500 hover:bg-white hover:text-orange-600 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg transition-colors flex items-center gap-3 text-base" aria-label="Download Modul tax laboratory Laboratorium Akuntansi Lanjut B">
                  Ambil Modul <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </div>
            </header>

            {/* CARD FOTO PREMIUM GLASSMORPHISM */}
            <figure className="lg:w-6/12 w-full flex justify-center items-center mt-8 lg:mt-0 relative animate-[fadeIn_0.5s_ease-out]">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/40 to-purple-500/40 rounded-[3rem] blur-3xl -z-10 opacity-70"></div>
              <div 
                ref={heroRef}
                className={`relative w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-4 sm:p-5 transition-all duration-500 group cursor-pointer transform-gpu
                  /* EFEK PC */
                  lg:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] lg:hover:-translate-y-2 lg:hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]
                  /* EFEK HP (Maju sekali pas di-scroll) */
                  ${heroInView ? 'max-lg:-translate-y-2 max-lg:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]' : 'max-lg:translate-y-0 max-lg:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]'}
                `}
                onClick={() => setIsModalOpen(true)}
              >
                
                {/* Pakai aspect-[4/3] murni biar bentuknya proporsional dan hapus semua animasi zoom di HP */}
                <div className="w-full aspect-[4/2] lg:aspect-[16/9] rounded-[1.8rem] overflow-hidden relative shadow-inner">
                    <img 
                      src="/img-team/foto-taxlab.webp" 
                      alt="Suasana Praktikum tax laboratory di Laboratorium Akuntansi Lanjut B (Tax Lab Gundar)" 
                      fetchPriority="high"
                      decoding="async"
                      className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out transform-gpu
                        lg:group-hover:scale-105
                        ${heroInView ? 'max-lg:scale-105' : 'max-lg:scale-100'}
                      `} 
                    />
                    
                  {/* Overlay Icon Zoom dibikin hanya muncul di PC */}
                  <div className="absolute inset-0 transition-colors duration-500 hidden lg:flex items-center justify-center lg:bg-transparent lg:group-hover:bg-slate-900/30">
                    <div className="bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-all duration-500 shadow-2xl border border-white/30 transform-gpu lg:opacity-0 lg:scale-50 lg:group-hover:opacity-100 lg:group-hover:scale-100">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                    </div>
                  </div>
                </div>
                
                <figcaption className="mt-4 px-2 pb-1 flex items-center justify-between">
                   <div>
                     <h4 className="text-white font-bold text-sm sm:text-base tracking-wide">Asisten Laboratorium Akuntansi Lanjut B</h4>
                     <p className="text-orange-400 font-black text-xs sm:text-sm mt-0.5 uppercase tracking-widest">2025/2026</p>
                   </div>
                   <div className={`w-10 h-10 border rounded-full flex items-center justify-center text-white transition-all shadow-sm
                     lg:bg-white/10 lg:border-white/20 lg:group-hover:bg-orange-500 lg:group-hover:border-orange-400
                     ${heroInView ? 'max-lg:bg-orange-500 max-lg:border-orange-400' : 'max-lg:bg-white/10 max-lg:border-white/20'}
                   `}>
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v8m0 0v8m0-8h8m-8 0H4" /></svg>
                   </div>
                </figcaption>
              </div>
            </figure>

            <div className="w-full lg:hidden flex justify-center mt-4 relative z-20">
              <Link to="/modul" className="bg-orange-500 hover:bg-white hover:text-orange-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-colors flex items-center gap-3 text-base w-full justify-center">
                Ambil Modul <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* PROFIL BOX */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <header className="mb-10 border-b border-gray-200 pb-4">
            <h2 className="text-sm font-black text-orange-500 uppercase tracking-widest mb-1">Informasi Umum</h2>
            <h3 className="text-3xl font-black text-gray-900">Profil TaxLaboratorium</h3>
          </header>
        </ScrollReveal>
        
        <article className="grid lg:grid-cols-12 gap-8">
          <ScrollReveal className="lg:col-span-8">
            <div className="bg-white rounded-xl p-10 lg:p-14 border border-gray-100 shadow-sm flex flex-col justify-center hover:border-purple-300 transition-colors h-full">
              <h3 className="text-3xl md:text-4xl font-black text-purple-900 mb-6">Pusat Studi & Praktik Pajak Terpadu</h3>
              {/* Injeksi keyword "Lab akuntansi gunadarma" */}
              <p className="text-gray-600 text-lg mb-8 leading-relaxed text-justify">
                Sebagai pusat pembelajaran yang unggul, <strong>Lab akuntansi gunadarma</strong> terus berkomitmen untuk menjembatani kesenjangan antara teori akademis dan kebutuhan industri perpajakan. Kami memfasilitasi mahasiswa dengan simulasi pelaporan pajak riil di <strong>Laboratorium Akuntansi Lanjut B</strong>.
              </p>
              <Link to="/tentang-kami" className="text-orange-500 font-bold hover:text-orange-600 flex items-center gap-2 w-max border-b-2 border-orange-500 pb-1" aria-label="Profil dan Sejarah Tax Lab Gundar">
                Baca Sejarah & Visi Misi Lengkap <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </ScrollReveal>

          <aside className="lg:col-span-4 flex flex-col gap-6">
            {isOprecOpen && (
              <ScrollReveal delay={150} className="h-full flex flex-col">
                <div className="bg-orange-50 rounded-xl p-8 border border-orange-100 flex-grow flex flex-col justify-center hover:border-orange-300 transition-colors shadow-sm">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4 w-max">Rekrutmen Belum di Buka</span>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">Oprec Asisten Lab</h3>
                  <p className="text-gray-600 mb-6">Pendaftaran asisten angkatan 2026 telah dibuka. Persiapkan dirimu untuk bergabung bersama Lab Akuntansi Pajak.</p>
                  <Link to="/oprec" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-lg text-center hover:bg-orange-600 transition-colors shadow-sm">
                    Lihat Persyaratan
                  </Link>
                </div>
              </ScrollReveal>
            )}
          </aside>
        </article>
      </section>

      {/* LAYANAN PRAKTIKUM */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <header className="mb-12 border-b border-gray-200 pb-4 text-center">
              <h2 className="text-sm font-black text-purple-800 uppercase tracking-widest mb-1">Fasilitas Mahasiswa</h2>
              <h3 className="text-3xl font-black text-gray-900">Layanan Praktikum TaxLaboratorium</h3>
            </header>
          </ScrollReveal>

          <div className="flex flex-col gap-12">
            
            <ScrollReveal>
              <article className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 bg-white rounded-xl p-10 lg:p-14 border border-gray-100 shadow-sm flex flex-col justify-center order-2 lg:order-1 hover:border-purple-300 transition-colors">
                  <h3 className="text-3xl md:text-4xl font-black text-purple-900 mb-6">Aturan & Ketentuan Praktikum</h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed text-justify">
                    Pedoman wajib bagi seluruh praktikan Laboratorium Pajak. Mencakup aturan berpakaian, batas keterlambatan, format penjilidan laporan, serta sanksi pelanggaran demi menjaga kedisiplinan.
                  </p>
                  <Link to="/tata-tertib" className="text-orange-500 font-bold hover:text-orange-600 flex items-center gap-2 w-max border-b-2 border-orange-500 pb-1">
                    Baca Tata Tertib Lengkap <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
                <figure className="lg:col-span-4 bg-slate-100 rounded-xl border border-gray-200 overflow-hidden h-64 lg:h-auto order-1 lg:order-2 shadow-sm">
                  <img src="/img-template/TataTertib.webp" alt="Aturan dan Tata Tertib Praktikum lab akuntansi lanjut b Universitas Gunadarma" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </figure>
              </article>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <article className="grid lg:grid-cols-12 gap-8">
                <figure className="lg:col-span-4 bg-slate-100 rounded-xl border border-gray-200 overflow-hidden h-64 lg:h-auto shadow-sm">
                  <img src="/img-template/Software.webp" alt="Software Lab Akuntansi Pajak TaxLaboratorium" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </figure>
                <div className="lg:col-span-8 bg-white rounded-xl p-10 lg:p-14 border border-gray-100 shadow-sm flex flex-col justify-center hover:border-purple-300 transition-colors">
                  <h3 className="text-3xl md:text-4xl font-black text-purple-900 mb-6">Pusat Unduhan Software</h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed text-justify">
                    Akses langsung ke berbagai aplikasi pajak yang digunakan selama masa praktikum di Lab Akuntansi Lanjut B. Mulai dari e-SPT PPh, e-Faktur, hingga patch update terbaru.
                  </p>
                  <Link to="/software-pajak" className="text-orange-500 font-bold hover:text-orange-600 flex items-center gap-2 w-max border-b-2 border-orange-500 pb-1">
                    Akses Halaman Software <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </article>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <article className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 bg-white rounded-xl p-10 lg:p-14 border border-gray-100 shadow-sm flex flex-col justify-center order-2 lg:order-1 hover:border-purple-300 transition-colors">
                  <h3 className="text-3xl md:text-4xl font-black text-purple-900 mb-6">Materi & Modul Pembelajaran</h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed text-justify">
                    Buku panduan komprehensif berformat PDF yang disusun khusus oleh tim ahli TaxLaboratorium. Modul ini menjadi referensi utama praktikan dalam memahami studi kasus riil pelaporan pajak.
                  </p>
                  <Link to="/modul" className="text-orange-500 font-bold hover:text-orange-600 flex items-center gap-2 w-max border-b-2 border-orange-500 pb-1">
                    Unduh Modul Sekarang <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
                <figure className="lg:col-span-4 bg-slate-100 rounded-xl border border-gray-200 overflow-hidden h-64 lg:h-auto order-1 lg:order-2 shadow-sm">
                  <img src="/img-template/Modul.webp" alt="Buku Modul Praktikum Tax Lab Gundar" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </figure>
              </article>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* LOKASI BOX */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="bg-purple-900 rounded-xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-lg">
              <div className="md:w-1/2 text-white">
                <h2 className="text-sm font-bold text-orange-400 uppercase tracking-widest mb-2">Informasi Akses</h2>
                <h3 className="text-4xl font-black mb-6">Lokasi Laboratorium Pajak</h3>
                <p className="text-purple-200 font-medium text-lg leading-relaxed mb-8">Gedung Laboratorium Terpadu Universitas Gunadarma, Laboratorium Akuntansi Lanjut B siap melayani kebutuhan praktikum Anda.</p>
                <Link to="/lokasi" className="inline-block bg-white text-purple-900 px-8 py-3.5 rounded-lg font-bold hover:bg-orange-500 hover:text-white transition-colors shadow-sm">
                  Lihat Detail Peta
                </Link>
              </div>
              <figure className="md:w-1/2 w-full">
                 <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="Lokasi Gedung tax laboratory Laboratorium Akuntansi Lanjut B" loading="lazy" decoding="async" className="w-full h-64 object-cover rounded-lg shadow-inner opacity-90" />
              </figure>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ & KONTAK */}
      <section className="py-24 bg-white border-t border-gray-200">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-sm font-black text-purple-800 uppercase tracking-widest mb-2">Pusat Bantuan</h2>
            <h3 className="text-3xl font-black text-gray-900 mb-6">Butuh Informasi Lebih Lanjut?</h3>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              Jika Anda memiliki kendala terkait instalasi software, aturan praktikum TaxLaboratorium, atau pertanyaan umum lainnya, silakan merujuk pada halaman FAQ atau hubungi tim kami.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/faq" className="bg-white text-purple-900 border border-purple-200 font-bold px-8 py-3.5 rounded-lg hover:border-purple-400 transition-colors shadow-sm">
                Baca FAQ
              </Link>
              <Link to="/kontak" className="bg-orange-500 text-white font-bold px-8 py-3.5 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
                Hubungi Kontak
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* MODAL INTERAKTIF */}
      {isModalOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6" 
          onClick={() => setIsModalOpen(false)}
        >
          <button 
            className="fixed top-6 right-6 md:top-8 md:right-8 z-[10000] text-white/70 hover:text-white transition-all bg-white/10 hover:bg-orange-500 p-2.5 md:p-3 rounded-full backdrop-blur-md border border-white/20" 
            onClick={() => setIsModalOpen(false)}
            aria-label="Tutup foto"
          >
            <CloseIcon />
          </button>

          <div className="relative flex flex-col items-center justify-center w-full max-w-7xl animate-[fadeIn_0.2s_ease-out]">
            <img 
              src="/img-team/foto-taxlab.webp" 
              alt="Suasana Praktikum tax laboratory di Laboratorium Akuntansi Lanjut B (Tax Lab Gundar)" 
              loading="lazy"
              decoding="async"
              className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain rounded-xl md:rounded-2xl shadow-2xl border border-white/10 cursor-default transform-gpu" 
              onClick={(e) => e.stopPropagation()} 
            />
            <p className="text-white/90 mt-6 font-bold tracking-widest uppercase text-xs md:text-sm bg-black/50 px-6 py-2.5 rounded-full border border-white/10">
              Staff dan Asisten Laboratorium Akuntansi Lanjut B
            </p>
          </div>
        </div>,
        document.body
      )}

    </main>
    </PageTransition>
  );
}