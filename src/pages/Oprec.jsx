import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PageTransition from '../components/PageTransition';
import { Helmet } from 'react-helmet-async';

// IMPORT KOMPONEN & DATA EXTERNAL
import { TIMELINE_DATA } from '../data/oprecData';
import { CheckIcon, CloseIcon, ScrollRevealCard, TimelineRevealItem } from '../components/OprecComponents';

export default function Oprec() {
  const [isLoading, setIsLoading] = useState(true);
  const [isImageOpen, setIsImageOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isImageOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isImageOpen]);

  return (
    <PageTransition>
    <>
      <Helmet>
        <title>Open Recruitment Asisten - Lab Akuntansi Lanjut B Gunadarma</title>
        <meta name="description" content="Informasi pendaftaran, persyaratan, dan jadwal seleksi Open Recruitment Asisten dan IT Support Laboratorium Pajak (TaxLaboratory) Universitas Gunadarma." />
        <link rel="canonical" href="https://www.taxlaboratory.my.id/oprec" />
      </Helmet>
      <main className="bg-[#fafafa] font-sans text-slate-800 scroll-smooth relative z-0 min-h-screen overflow-x-hidden">
          
          {/* HERO SECTION (SEO H1) */}
          <section className="relative pt-40 pb-32 bg-purple-900 border-b-[8px] border-orange-500 overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-gradient-to-bl from-purple-800 to-transparent rounded-full opacity-60 translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                
                <header className="lg:w-1/2 text-center lg:text-left">
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.15]">
                    Ambil Peranmu di <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Lab Akuntansi Lanjut B</span>
                  </h1>
                  
                  <p className="text-purple-100 text-lg md:text-xl font-medium leading-relaxed mb-10">
                    Lebih dari sekadar asisten, bergabung dengan <strong>TaxLaboratorium</strong> (Laboratorium Pajak) adalah ruang inkubasi untuk mengasah kepemimpinan, membangun relasi profesional, dan membentuk mentalitas karir.
                  </p>

                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-4 rounded-2xl text-lg transition-colors shadow-lg hover:-translate-y-1 transform">
                    Lihat Persyaratan
                  </button>
                </header>

                <figure className="lg:w-1/2 w-full flex justify-center items-center mt-12 lg:mt-0">
                  <div className="bg-slate-900 border-[16px] border-slate-950 rounded-[3rem] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] w-full max-w-2xl flex flex-col hover:scale-[1.02] transition-transform duration-500 relative group">
                    <div className="absolute -inset-6 -z-10 bg-purple-500/20 rounded-[3.5rem] blur-md"></div>
                    <div className="absolute -inset-10 -z-20 bg-orange-500/10 rounded-[4rem] blur-xl"></div>
                    
                    <div 
                      className="w-full aspect-video bg-slate-800 rounded-[1.5rem] overflow-hidden relative flex items-center justify-center cursor-pointer"
                      onClick={() => setIsImageOpen(true)}
                    >
                      {/* LCP OPTIMIZED */}
                      <img 
                        src="/img-team/foto-angkatan.webp" 
                        alt="Angkatan Asisten Laboratorium Akuntansi Lanjut B" 
                        fetchPriority="high"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { e.target.src = "https://placehold.co/800x450/1e293b/ffffff?text=FOTO+BELUM+ADA" }} 
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    
                    <figcaption className="p-6 md:p-8 pt-5 md:pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-auto relative z-10">
                      <div className="text-left">
                        <h4 className="text-base md:text-lg font-bold text-slate-300 leading-tight">Asisten Laboratorium Lanjut B</h4>
                        <h4 className="text-base md:text-lg font-black text-orange-400">2025/2026</h4>
                      </div>
                      <button 
                        onClick={() => setIsImageOpen(true)}
                        className="flex w-full sm:w-auto items-center justify-center gap-2 py-3 px-6 bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold rounded-xl transition-colors shadow-md"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v8m0 0v8m0-8h8m-8 0H4" /></svg>
                        <span>Perbesar</span>
                      </button>
                    </figcaption>
                  </div>
                </figure>

              </div>
            </div>
          </section>

          {/* PERSYARATAN UMUM */}
        <section aria-label="Persyaratan Umum Asisten Lab" className="py-24 bg-white relative z-20 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] border-b border-slate-100 -mt-8">
          <div className="max-w-7xl mx-auto px-6">
            <header className="text-center mb-16">
              <h2 className="text-sm font-black text-orange-500 uppercase tracking-widest mb-2">Kualifikasi Dasar</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900">Persyaratan Umum</h3>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              
              <ScrollRevealCard className="lg:col-span-2 bg-white border border-slate-100 rounded-[2rem] p-8 shadow-lg shadow-slate-200/50 md:hover:border-orange-300 md:hover:shadow-xl md:hover:-translate-y-2 relative overflow-hidden group">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-6 md:group-hover:scale-110 md:group-hover:bg-orange-500 md:group-hover:text-white transition-all duration-300 relative z-10">
                  <svg className="w-8 h-8 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422M12 14v7.5M12 21.5a2 2 0 01-1.414-.586l-6-6A2 2 0 014 13.5V6" /></svg>
                </div>
                <h4 className="text-slate-900 text-2xl font-black mb-3 relative z-10">Mahasiswa Aktif</h4>
                <p className="text-slate-500 font-medium leading-relaxed relative z-10">Terdaftar sebagai mahasiswa aktif di program studi yang relevan di Gunadarma.</p>
                <span className="absolute -bottom-6 -right-2 text-[8rem] font-black text-slate-50 md:group-hover:text-orange-50 transition-colors pointer-events-none select-none z-0">1</span>
              </ScrollRevealCard>

              <ScrollRevealCard className="lg:col-span-2 bg-white border border-slate-100 rounded-[2rem] p-8 shadow-lg shadow-slate-200/50 md:hover:border-orange-300 md:hover:shadow-xl md:hover:-translate-y-2 relative overflow-hidden group">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-6 md:group-hover:scale-110 md:group-hover:bg-orange-500 md:group-hover:text-white transition-all duration-300 relative z-10">
                  <svg className="w-8 h-8 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6M13 17a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <h4 className="text-slate-900 text-2xl font-black mb-3 relative z-10">IPK Minimal 3.00</h4>
                <p className="text-slate-500 font-medium leading-relaxed relative z-10">Menunjukkan prestasi akademik yang baik dengan nilai IPK di atas rata-rata.</p>
                <span className="absolute -bottom-6 -right-2 text-[8rem] font-black text-slate-50 md:group-hover:text-orange-50 transition-colors pointer-events-none select-none z-0">2</span>
              </ScrollRevealCard>

              <ScrollRevealCard className="lg:col-span-2 bg-white border border-slate-100 rounded-[2rem] p-8 shadow-lg shadow-slate-200/50 md:hover:border-orange-300 md:hover:shadow-xl md:hover:-translate-y-2 relative overflow-hidden group">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-6 md:group-hover:scale-110 md:group-hover:bg-orange-500 md:group-hover:text-white transition-all duration-300 relative z-10">
                  <svg className="w-8 h-8 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <h4 className="text-slate-900 text-2xl font-black mb-3 relative z-10">Mampu Bekerja Sama</h4>
                <p className="text-slate-500 font-medium leading-relaxed relative z-10">Mampu berkomunikasi dengan baik, adaptif, dan siap kerja secara tim.</p>
                <span className="absolute -bottom-6 -right-2 text-[8rem] font-black text-slate-50 md:group-hover:text-orange-50 transition-colors pointer-events-none select-none z-0">3</span>
              </ScrollRevealCard>

              <ScrollRevealCard className="lg:col-start-2 lg:col-span-2 bg-white border border-slate-100 rounded-[2rem] p-8 shadow-lg shadow-slate-200/50 md:hover:border-orange-300 md:hover:shadow-xl md:hover:-translate-y-2 relative overflow-hidden group">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-6 md:group-hover:scale-110 md:group-hover:bg-orange-500 md:group-hover:text-white transition-all duration-300 relative z-10">
                  <svg className="w-8 h-8 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h4 className="text-slate-900 text-2xl font-black mb-3 relative z-10">Berperilaku Baik</h4>
                <p className="text-slate-500 font-medium leading-relaxed relative z-10">Menjunjung tinggi etika, kedisiplinan, sopan santun, dan integritas.</p>
                <span className="absolute -bottom-6 -right-2 text-[8rem] font-black text-slate-50 md:group-hover:text-orange-50 transition-colors pointer-events-none select-none z-0">4</span>
              </ScrollRevealCard>

              <ScrollRevealCard className="lg:col-start-4 lg:col-span-2 bg-white border border-slate-100 rounded-[2rem] p-8 shadow-lg shadow-slate-200/50 md:hover:border-orange-300 md:hover:shadow-xl md:hover:-translate-y-2 relative overflow-hidden group">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-6 md:group-hover:scale-110 md:group-hover:bg-orange-500 md:group-hover:text-white transition-all duration-300 relative z-10">
                  <svg className="w-8 h-8 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                </div>
                <h4 className="text-slate-900 text-2xl font-black mb-3 relative z-10">Tidak di Lab Lain</h4>
                <p className="text-slate-500 font-medium leading-relaxed relative z-10">Tidak sedang terikat kontrak atau menjabat di laboratorium lain.</p>
                <span className="absolute -bottom-6 -right-2 text-[8rem] font-black text-slate-50 md:group-hover:text-orange-50 transition-colors pointer-events-none select-none z-0">5</span>
              </ScrollRevealCard>

            </div>
          </div>
        </section>

          {/* PERSYARATAN KHUSUS */}
          <section aria-label="Pilih Divisi Laboratorium Pajak" className="py-24 bg-[#fafafa]">
            <div className="max-w-7xl mx-auto px-6">
              <header className="text-center mb-16">
                <h2 className="text-sm font-black text-purple-800 uppercase tracking-widest mb-2">Pilih Posisi Anda</h2>
                <h3 className="text-4xl font-black text-slate-900">Persyaratan Khusus Akademik</h3>
              </header>

              <div className="grid lg:grid-cols-2 gap-10">
                {/* CARD ASISTEN */}
                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl flex flex-col hover:border-purple-300 transition-colors">
                  <figure className="w-full h-48 rounded-[2rem] overflow-hidden mb-8 border-4 border-white shadow-md relative group">
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold z-10">
                      <span className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-xl">Asisten 2025/2026</span>
                    </div>
                    <img src="/img-team/Asisten.webp" alt="Seragam Asisten Lab Akuntansi Pajak" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </figure>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-purple-900 text-white rounded-xl flex items-center justify-center shadow-md">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-slate-900">Asisten Praktikum</h4>
                      <p className="text-purple-700 font-bold text-sm uppercase tracking-widest mt-1">Divisi Pengajaran</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-5 flex-grow">
                    <li className="flex items-start gap-4">
                      <CheckIcon />
                      <span className="font-semibold text-slate-700 pt-0.5">S1 Akuntansi, S1 Ekonomi Syariah, atau D3 Akuntansi.</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckIcon />
                      <span className="font-semibold text-slate-700 pt-0.5">Sedang atau sudah mengikuti mata kuliah perpajakan.</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckIcon />
                      <span className="font-semibold text-slate-700 pt-0.5">Minimal berada di Semester 5.</span>
                    </li>
                  </ul>
                </div>

                {/* CARD IT SUPPORT */}
                <div className="bg-slate-900 rounded-[2.5rem] p-10 border border-slate-800 shadow-xl flex flex-col hover:border-amber-400 transition-colors">
                  <figure className="w-full h-48 rounded-[2rem] overflow-hidden mb-8 border-4 border-slate-700 shadow-md relative group">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold z-10">
                      <span className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-xl">IT Support 2025/2026</span>
                    </div>
                    <img src="/img-team/IT Support.webp" alt="Seragam IT Support TaxLaboratorium" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </figure>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-orange-500 text-white rounded-xl flex items-center justify-center shadow-md">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-white">IT Support</h4>
                      <p className="text-orange-400 font-bold text-sm uppercase tracking-widest mt-1">Divisi Teknis</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-5 flex-grow">
                    <li className="flex items-start gap-4">
                      <CheckIcon />
                      <span className="font-semibold text-slate-300 pt-0.5">Mahasiswa S1 Informatika atau S1 Sistem Informasi.</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckIcon />
                      <span className="font-semibold text-slate-300 pt-0.5">Minimal berada di Semester 3.</span>
                    </li>
                    
                    <li className="mt-8 pt-6 border-t border-slate-800">
                      <span className="text-amber-400 font-black text-sm uppercase tracking-widest block mb-4">Skill yang Dibutuhkan:</span>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-slate-300 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div> Memiliki keahlian tentang Web Browser.
                        </li>
                        <li className="flex items-center gap-3 text-slate-300 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div> Memiliki keahlian tentang Networking.
                        </li>
                        <li className="flex items-center gap-3 text-slate-300 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div> Memiliki pengetahuan Hardware & Software Maintainer.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* TIMELINE OPREC (LOOPING MENGGUNAKAN DATA LUAR) */}
        <section aria-label="Jadwal Seleksi TaxLaboratorium" className="py-24 bg-[#fafafa] border-y border-slate-100 relative">
          <div className="max-w-6xl mx-auto px-6">
            <header className="text-center mb-24">
              <h2 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-3">Jadwal Seleksi</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900">Timeline Oprec 2026</h3>
            </header>

            <div className="relative max-w-5xl mx-auto">
              <div className="absolute left-[35px] md:left-1/2 top-2 bottom-2 w-[4px] bg-slate-200 md:-translate-x-1/2 rounded-full z-0"></div>

              <div className="flex flex-col gap-6 md:gap-0">
                {/* LOOPING DARI FILE EXTERNAL */}
                {TIMELINE_DATA.map((alur, idx) => (
                  <TimelineRevealItem key={`timeline-${idx}`} isLeft={idx % 2 === 0} alur={alur} />
                ))}
              </div>
            </div>

          </div>
        </section>

          {/* PENDAFTARAN */}
          <section className="py-24 bg-[#fafafa]">
            <div className="max-w-4xl mx-auto px-6">
              <div className="bg-white rounded-[3rem] p-12 md:p-20 text-center border border-slate-200 shadow-xl">
                <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-2xl mx-auto mb-10 flex items-center justify-center text-4xl shadow-md">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Pendaftaran Belum Dibuka</h3>
                
                <button 
                  disabled 
                  className="bg-slate-200 text-slate-400 font-black px-12 py-5 rounded-2xl text-lg w-full md:w-auto mb-8 cursor-not-allowed border border-slate-300"
                >
                  Formulir Coming Soon
                </button>

                <div className="max-w-lg mx-auto bg-slate-50 border border-slate-200 rounded-xl p-5 text-slate-500 text-sm leading-relaxed font-medium">
                  <p className="mb-3">Informasi tautan formulir pendaftaran akan diumumkan sesuai jadwal timeline di atas.</p>
                  <p>Pastikan Anda mengakses formulir menggunakan email <span className="font-bold text-slate-700">@student.gunadarma.ac.id</span></p>
                </div>
              </div>
            </div>
          </section>

      </main>

      {/* MODAL IMAGE (PORTAL, IMPORTED ICONS, GPU) */}
      
      {isImageOpen && createPortal(
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center p-4 sm:p-10">
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
            onClick={() => setIsImageOpen(false)}
          ></div>
          <button 
            onClick={() => setIsImageOpen(false)}
            aria-label="Tutup Foto"
            className="absolute top-6 right-6 md:top-8 md:right-8 z-50 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-orange-500 text-white hover:text-white rounded-full flex items-center justify-center transition-all border border-white/20"
          >
            <CloseIcon />
          </button>
          <div className="relative z-10 w-full max-w-5xl flex flex-col items-center animate-in zoom-in-95 duration-300 transform-gpu">
            <img 
              src="/img-team/foto-angkatan.webp" 
              alt="Angkatan Sebelumnya Laboratorium Pajak" 
              loading="lazy"
              decoding="async"
              className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl transform-gpu"
              onError={(e) => { e.target.src = "https://placehold.co/1200x800/1e293b/ffffff?text=FOTO+BELUM+ADA" }} 
            />
            <div className="mt-6 md:mt-8 px-6 py-2.5 bg-black/50 border border-white/10 rounded-full shadow-lg backdrop-blur-md">
              <p className="text-white/90 text-xs sm:text-sm font-black tracking-[0.15em] uppercase text-center">
                Asisten 2025/2026 Laboratorium Lanjut B
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
    </PageTransition>
  );
}