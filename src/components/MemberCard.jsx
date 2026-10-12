import { useRef, useEffect, useState, memo } from 'react';


// KOMPONEN SPOTLIGHT CARD (EXTREME PERFORMANCE)

export function SpotlightCard({ children, className = "", inView = false }) {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    // Matikan logic mouse di layar HP (<1024px)
    if (!divRef.current || window.innerWidth < 1024) return;
    
    requestAnimationFrame(() => {
      const rect = divRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      divRef.current.style.setProperty('--mouse-x', `${x}px`);
      divRef.current.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full h-full overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] transition-transform duration-300 group/card transform-gpu
          bg-gradient-to-br from-purple-950 via-purple-800 to-orange-400 
          border border-white/20 border-b-black/40 border-r-black/40
          
          /* SHADOW STATIS LEBIH SIMPLE BIAR RINGAN */
          shadow-lg
          
          /* 💻 EFEK HOVER PC */
          lg:hover:shadow-2xl lg:hover:-translate-y-2 lg:z-10
          
          /* 📱 EFEK SCROLL HP */
          ${inView ? 'max-lg:shadow-2xl max-lg:-translate-y-2 max-lg:z-10' : 'max-lg:translate-y-0 max-lg:z-0'}
          
          ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0 group-hover/card:opacity-100 hidden lg:block transform-gpu"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}

// IKON SOSMED STATIS
const InIcon = ({ className="w-5 h-5" }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;
const IgIcon = ({ className="w-5 h-5" }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;


// KOMPONEN MEMBER CARD

const MemberCard = memo(function MemberCard({ member }) {
  const [inView, setInView] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
          setIsTapped(false);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 } 
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <div ref={cardRef} className="h-full w-full relative">
      <SpotlightCard 
        inView={inView}
        className="p-3 sm:p-5 flex flex-col items-center text-center justify-between !bg-none relative"
      >
        
        {/* Background Terluar */}
        <div 
          className="absolute -inset-5 z-[-1] rounded-[1.5rem] sm:rounded-[2.5rem] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/img-template/template.webp')` }}
        >
          <div className="absolute inset-0 bg-black/20 rounded-[1.5rem] sm:rounded-[2.5rem]"></div>
        </div>

        {/* Container Foto */}
        <div 
          className="relative w-full aspect-square rounded-[1rem] sm:rounded-[2rem] overflow-hidden mb-3 sm:mb-5 group/img cursor-pointer flex items-end justify-center border border-white bg-repeat"
          style={{ backgroundImage: "url('/img-template/background.webp')", backgroundSize: '100%' }}
          onClick={() => setIsTapped(!isTapped)}
        >
          
          {/* Gambar Orang Utama */}
          <img 
            src={member.img} 
            alt={member.name} 
            loading="lazy"
            decoding="async"
            onError={(e) => { 
              e.target.src = "https://api.dicebear.com/8.x/initials/svg?seed=TL&backgroundColor=f3f4f6";
            }}
            className={`w-full h-full object-contain object-bottom transition-transform duration-300 relative z-10 transform-gpu
              /* EFEK FOTO PC HOVER */
              lg:scale-100 lg:group-hover/img:scale-105
              
              /* EFEK FOTO HP SCROLL */
              ${inView ? 'max-lg:scale-105' : 'max-lg:scale-100'}
            `}
          />
          
          {/* LOGIC GADGET: SOSMED (BACKDROP-BLUR DIHAPUS) */}
          <div className={`absolute inset-x-0 bottom-2 sm:bottom-4 flex justify-center transition-all duration-300 z-20 transform-gpu
              ${isTapped ? 'max-lg:translate-y-0 max-lg:opacity-100' : 'max-lg:translate-y-12 max-lg:opacity-0'}
              lg:translate-y-12 lg:opacity-0 
              lg:group-hover/img:translate-y-0 lg:group-hover/img:opacity-100
          `}>
            <div className="bg-white px-3 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl flex gap-3 sm:gap-5 shadow-lg border border-gray-100">
              <a href={member.in} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-purple-900 hover:text-[#0A66C2] transition-colors">
                <InIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href={member.ig} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-purple-900 hover:text-[#E4405F] transition-colors">
                <IgIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Detail Nama & Jabatan */}
        <div className="flex flex-col items-center w-full flex-grow justify-end">
          <h3 className="text-[0.85rem] sm:text-xl font-black text-white transition-colors lg:group-hover/card:text-orange-300 mb-2 sm:mb-3 line-clamp-2 min-h-[2.5rem] sm:min-h-[3.5rem] flex items-center justify-center leading-tight sm:leading-normal">
            {member.name}
          </h3>
          <p className="text-white/95 font-bold text-[9px] sm:text-xs uppercase tracking-widest bg-black/30 px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border-t border-white/20 w-full whitespace-nowrap overflow-hidden text-ellipsis">
            {member.role}
          </p>
        </div>
      </SpotlightCard>
    </div>
  );
}); 

export default MemberCard;