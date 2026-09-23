import { useEffect, useState, useRef } from 'react';
import PageTransition from '../components/PageTransition';
import { Helmet } from 'react-helmet-async';

// Mengimpor data statis dari luar
import { VISI_DATA, MISI_DATA } from '../data/misiData';


// 1. SCROLL REVEAL

const ScrollReveal = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          if (ref.current) obs.unobserve(ref.current); 
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );
    
    if (ref.current) observer.observe(ref.current);
    
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [delay]);

  return (
    <div 
      ref={ref} 
      className={`${className} transition-all duration-700 transform-gpu will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {children}
    </div>
  );
};


// 2. KOMPONEN ITEM MISI 

const MisiItem = ({ misi, index }) => {
  const [inView, setInView] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
        else setInView(false);
      },
      // Trigger HANYA di tengah layar
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 } 
    );
    if (itemRef.current) observer.observe(itemRef.current);
    return () => { if (itemRef.current) observer.unobserve(itemRef.current); };
  }, []);

  return (
    <div ref={itemRef} className="flex items-start gap-4 sm:gap-6 group">
      <div className={`text-4xl md:text-5xl font-black transition-colors duration-300 leading-none shrink-0 mt-1
          /* 📱 EFEK HP: Oranye otomatis pas di tengah layar */
          ${inView ? 'max-lg:text-orange-500' : 'max-lg:text-gray-200'}
          
          /* 💻 EFEK PC: Cuma oranye kalau DI-HOVER (Abaikan efek scroll) */
          lg:text-gray-200 lg:group-hover:text-orange-500
      `}>
        {String(index + 1).padStart(2, '0')}
      </div>
      <p className={`text-base md:text-lg font-medium leading-relaxed transition-colors duration-300
          /* 📱 EFEK HP */
          ${inView ? 'max-lg:text-gray-900' : 'max-lg:text-gray-700'}
          
          /* 💻 EFEK PC */
          lg:text-gray-700 lg:group-hover:text-gray-900
      `}>
        {misi}
      </p>
    </div>
  );
};

export default function TentangKami() {
  

  // STATE & OBSERVER UNTUK KARTU

  const [heroInView, setHeroInView] = useState(false);
  const [visiInView, setVisiInView] = useState(false);
  const [misiInView, setMisiInView] = useState(false);

  const heroRef = useRef(null);
  const visiRef = useRef(null);
  const misiRef = useRef(null);

  useEffect(() => {
    const createObserver = (ref, setState) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setState(true); 
        } else {
          setState(false);
        }
      }, 
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 });

      if (ref.current) observer.observe(ref.current);
      return observer;
    };

    const heroObs = createObserver(heroRef, setHeroInView);
    const visiObs = createObserver(visiRef, setVisiInView);
    const misiObs = createObserver(misiRef, setMisiInView);

    return () => {
      heroObs.disconnect();
      visiObs.disconnect();
      misiObs.disconnect();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>Tentang Kami - Profil TaxLaboratory Gunadarma</title>
        <meta name="description" content="Sejarah, visi, misi, dan profil lengkap Laboratorium Akuntansi Lanjut B (TaxLaboratory) sebagai pusat pembelajaran perpajakan di Universitas Gunadarma." />
        <link rel="canonical" href="https://www.taxlaboratory.my.id/tentang-kami" />
      </Helmet>
    <main className="bg-[#fafafa] min-h-screen font-sans text-gray-800 scroll-smooth overflow-hidden pb-32">
      
      <div className="fixed inset-0 -z-10 h-full w-full bg-[#fafafa] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>

      <section className="pt-36 md:pt-48 pb-16 relative px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <header className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[3px] bg-orange-500"></div>
              <span className="text-orange-500 font-black uppercase tracking-[0.25em] text-sm">Profil Identitas</span>
            </div>
            
            <h1 className="text-5xl md:text-[5.5rem] font-black text-gray-900 leading-[1.05] tracking-tighter mb-8">
              Tentang <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-purple-600">Kami</span>
            </h1>
            
            <div className="space-y-6 text-gray-600 text-lg md:text-xl leading-relaxed text-justify mb-10">
              <p>
                <strong className="text-purple-900 font-black">Laboratorium Akuntansi Lanjut B</strong> adalah pusat <strong>Laboratorium Pajak</strong> unggulan di Fakultas Ekonomi Universitas Gunadarma. Kami hadir untuk mengubah teori kelas menjadi pengalaman dunia nyata melalui simulasi perpajakan yang interaktif dan aplikatif.
              </p>
              <p>
                Melalui modul praktikum terstruktur dan penggunaan perangkat lunak berstandar industri, <strong>Lab Akuntansi Pajak</strong> ini membekali mahasiswa dengan keterampilan teknis mutakhir. Tujuan kami satu: mencetak profesional muda yang kompeten dan siap menghadapi tantangan ekosistem perpajakan digital.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="bg-white border border-purple-100 text-purple-800 text-sm font-bold px-4 py-2 rounded-full shadow-sm">💻 E-Faktur</span>
              <span className="bg-white border border-purple-100 text-purple-800 text-sm font-bold px-4 py-2 rounded-full shadow-sm">📄 E-Form</span>
              <span className="bg-white border border-purple-100 text-purple-800 text-sm font-bold px-4 py-2 rounded-full shadow-sm">📕 Adobe Acrobat</span>
            </div>
          </header>

          <figure ref={heroRef} className="lg:col-span-5 relative h-[400px] md:h-[550px] w-full mt-10 lg:mt-0 group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange-300/30 rounded-full blur-[80px] z-0"></div>
            
            <div className={`absolute top-0 right-0 w-[90%] h-[85%] rounded-[2rem] overflow-hidden shadow-2xl z-10 border-4 border-white transform transition-all duration-700
                /* 📱 EFEK HP */
                ${heroInView ? 'max-lg:rotate-0 max-lg:-translate-y-2' : 'max-lg:rotate-2 max-lg:translate-y-0'}
                /* EFEK PC */
                lg:rotate-2 lg:group-hover:rotate-0 lg:group-hover:-translate-y-2
            `}>
              <div className={`absolute inset-0 mix-blend-multiply z-10 transition-colors duration-500
                  /* EFEK HP */
                  ${heroInView ? 'max-lg:bg-transparent' : 'max-lg:bg-purple-900/10'}
                  /* EFEK PC */
                  lg:bg-purple-900/10 lg:group-hover:bg-transparent
              `}></div>
              <img 
                src="/img-team/foto-tentang-kami.webp" 
                alt="Fasilitas Modern di Laboratorium Pajak Universitas Gunadarma" 
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            <div className={`absolute bottom-4 -left-4 w-[65%] h-[50%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] z-20 border-4 border-white transform hidden sm:block transition-all duration-700
                /* EFEK HP/Tablet */
                ${heroInView ? 'max-lg:rotate-0 max-lg:-translate-y-2' : 'max-lg:-rotate-3 max-lg:translate-y-0'}
                /* EFEK PC */
                lg:-rotate-3 lg:group-hover:rotate-0 lg:group-hover:-translate-y-2
            `}>
              <img 
                src="/img-team/Kalkulator.webp" 
                alt="Praktikum Simulasi Coretax di Lab Akuntansi Pajak" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </figure>

        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 relative">
        <article className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          <div 
            ref={visiRef}
            className={`lg:col-span-5 bg-purple-900 rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden flex flex-col justify-center group border border-purple-800 transition-all duration-700 transform-gpu
              /* EFEK HP */
              ${visiInView ? 'max-lg:-translate-y-2 max-lg:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]' : 'max-lg:translate-y-0 max-lg:shadow-xl'}
              /* EFEK PC */
              lg:shadow-xl lg:hover:-translate-y-2 lg:hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]
            `}
          >
            <div className={`absolute -top-6 -right-2 text-[12rem] font-serif leading-none text-purple-800/60 opacity-50 pointer-events-none transition-transform duration-700
                /* EFEK HP */
                ${visiInView ? 'max-lg:scale-110' : 'max-lg:scale-100'}
                /* EFEK PC */
                lg:scale-100 lg:group-hover:scale-110
            `}>"</div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-yellow-400"></div>

            <h2 className="relative z-10 text-xl font-black text-orange-400 mb-8 uppercase tracking-[0.25em] flex items-center gap-3">
              <span className="w-8 h-[2px] bg-orange-400"></span> Visi
            </h2>
            
            <p className="relative z-10 text-2xl md:text-3xl font-bold leading-snug tracking-tight text-purple-50 italic">
              "{VISI_DATA}"
            </p>
          </div>

          <div 
            ref={misiRef}
            className={`lg:col-span-7 bg-white rounded-[2.5rem] p-10 md:p-12 border border-gray-100 flex flex-col justify-center transition-all duration-700 transform-gpu
              /* EFEK HP */
              ${misiInView ? 'max-lg:-translate-y-2 max-lg:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)]' : 'max-lg:translate-y-0 max-lg:shadow-md'}
              /* EFEK PC */
              lg:shadow-md lg:hover:-translate-y-2 lg:hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)]
            `}
          >
            <h2 className="text-xl font-black text-purple-900 mb-8 uppercase tracking-[0.25em] flex items-center gap-3">
              <span className="w-8 h-[2px] bg-purple-900"></span> Misi
            </h2>

            <div className="space-y-6">
              {/* EFEK FADE MUNCUL HANYA 1 KALI */}
              {MISI_DATA.map((misi, index) => (
                <ScrollReveal key={index} delay={index * 150}>
                  <div>
                    {/* EFEK ANGKA (HP = SCROLL, PC = HOVER) */}
                    <MisiItem misi={misi} index={index} />
                    {index !== MISI_DATA.length - 1 && (
                      <div className="w-full h-px bg-gray-100 mt-6"></div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

        </article>
      </section>

    </main>
    </PageTransition>
  );
}