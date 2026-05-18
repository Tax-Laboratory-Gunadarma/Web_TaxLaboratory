import { useEffect, useState, useRef } from 'react';
import { PdfIcon, ViewIcon } from './ModulIcons';

// Ikon tambahan untuk tombol download
const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export default function ModulCard({ modul }) {
  const [fileSize, setFileSize] = useState("Loading...");
  const [fileExt, setFileExt] = useState("FILE");
  
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    let delay;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          delay = setTimeout(() => setIsActive(true), 150);
        } else {
          clearTimeout(delay);
          setIsActive(false);
        }
      },
      { rootMargin: "-25% 0px -25% 0px", threshold: 0 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (delay) clearTimeout(delay);
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  // Fetch Ukuran File
  useEffect(() => {
    let isMounted = true;
    const extension = modul.link.split('.').pop().toUpperCase();
    setFileExt(extension);

    const fetchFileSize = async () => {
      try {
        const response = await fetch(modul.link, { method: 'HEAD' });
        if (response.ok && isMounted) {
          const bytes = response.headers.get('content-length');
          if (bytes) {
            const mbSize = (bytes / (1024 * 1024)).toFixed(2);
            setFileSize(`${mbSize} MB`);
          } else {
            setFileSize("Unknown Size");
          }
        } else if (isMounted) {
          setFileSize("File Not Found");
        }
      } catch (error) {
        if (isMounted) setFileSize("Failed to load");
      }
    };

    fetchFileSize();
    return () => { isMounted = false; } 
  }, [modul.link]);

  // Fungsi untuk memicu download paksa
  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(modul.link);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${modul.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
      window.open(modul.link, '_blank');
    }
  };

  // Bikin URL khusus pakai Google Viewer untuk tombol BACA
  const absoluteUrl = `https://taxlaboratory.my.id${modul.link}`;
  const bacaUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteUrl)}`;

  return (
    <article 
      ref={cardRef}
      className={`group bg-white rounded-[2rem] p-8 border transition-all duration-300 flex flex-col justify-between transform-gpu will-change-transform
        md:border-slate-200 md:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] md:hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] md:hover:-translate-y-1
        ${isActive ? 'max-md:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] max-md:-translate-y-1 max-md:border-purple-200' : 'max-md:border-slate-200 max-md:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] max-md:translate-y-0'}
      `}
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className={`p-4 rounded-2xl border transition-colors duration-300 text-rose-500 transform-gpu
            md:bg-rose-50 md:border-rose-100 md:group-hover:bg-rose-100
            ${isActive ? 'max-md:bg-rose-100 max-md:border-rose-200' : 'max-md:bg-rose-50 max-md:border-rose-100'}
          `}>
            <PdfIcon />
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <span className="bg-slate-100 text-slate-500 font-bold px-3 py-1 rounded-full text-[11px] tracking-wider border border-slate-200">
              {fileExt} DOCUMENT
            </span>
          </div>
        </div>

        <h2 className={`text-2xl font-bold mb-3 transition-colors duration-300
          md:text-slate-900 md:group-hover:text-purple-900
          ${isActive ? 'max-md:text-purple-900' : 'max-md:text-slate-900'}
        `}>
          {modul.title}
        </h2>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 line-clamp-3">
          {modul.description}
        </p>
      </div>

      <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex flex-wrap gap-3">
          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Size:</span>
            <span className="text-slate-700 text-sm font-bold">{fileSize}</span>
          </div>
          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Pages:</span>
            <span className="text-slate-700 text-sm font-bold">{modul.pages}</span>
          </div>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          {/* TOMBOL BACA (MENGGUNAKAN GOOGLE VIEWER) */}
          <a 
            href={bacaUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`Baca Modul: ${modul.title}`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-6 rounded-xl transition-colors duration-300 border border-slate-200"
          >
            <ViewIcon />
            <span>Baca</span>
          </a>

          {/* TOMBOL DOWNLOAD (TETAP PAKAI BLOB/FETCH) */}
          <button 
            onClick={handleDownload}
            aria-label={`Download Modul: ${modul.title}`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300 shadow-sm"
          >
            <DownloadIcon />
            <span>Download</span>
          </button>
        </div>
      </div>
    </article>
  );
}