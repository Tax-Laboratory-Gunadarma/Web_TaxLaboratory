import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import teamData from '../data/teamData.json';
import PageTransition from '../components/PageTransition';
import { Helmet } from 'react-helmet-async';

// IMPORT KOMPONEN KARTU
import MemberCard from '../components/MemberCard';

export default function Team() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 1. SOLUSI: Ambil daftar angkatan secara dinamis dari file JSON.
  // Jika 'angkatan2022' dihapus, availableYears otomatis hanya berisi ['2023']
  const availableYears = Object.keys(teamData)
    .filter(key => key.startsWith('angkatan')) // Memastikan hanya membaca key yang berawalan 'angkatan'
    .map(key => key.replace('angkatan', '')) // Menghapus kata 'angkatan' agar sisa angkanya saja (misal: '2023')
    .sort((a, b) => b.localeCompare(a)); // Mengurutkan dari tahun terbaru ke terlama

  const searchParams = new URLSearchParams(location.search);
  const queryAngkatan = searchParams.get('angkatan');
  
  // 2. SOLUSI: Validasi tahun. Jika parameter URL tidak ada di data JSON, gunakan tahun terbaru.
  const validDefaultYear = availableYears.includes(queryAngkatan)
    ? queryAngkatan
    : availableYears.length > 0 ? availableYears[0] : null;

  const [activeYear, setActiveYear] = useState(validDefaultYear);

  useEffect(() => {
    const currentQuery = new URLSearchParams(location.search).get('angkatan');
    
    // 3. SOLUSI: Redirect otomatis jika URL mengarah ke data yang sudah dihapus
    if (validDefaultYear && currentQuery !== validDefaultYear) {
      navigate(`/team?angkatan=${validDefaultYear}`, { replace: true });
      setActiveYear(validDefaultYear);
    } else if (validDefaultYear) {
      setActiveYear(validDefaultYear);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.search, navigate, validDefaultYear]);

  const handleTabChange = (year) => {
    setActiveYear(year);
    navigate(`/team?angkatan=${year}`, { replace: true });
  };

  // 4. SOLUSI: Cegah White Screen jika JSON kosong total
  if (!validDefaultYear || availableYears.length === 0) {
    return (
      <PageTransition>
        <main className="bg-[#fafafa] min-h-screen flex items-center justify-center font-sans text-gray-800">
          <p className="text-gray-500 text-xl font-medium">Data tim belum tersedia saat ini.</p>
        </main>
      </PageTransition>
    );
  }

  // 5. SOLUSI: Ambil data secara defensif (mencegah error .map undefined)
  const currentData = teamData[`angkatan${activeYear}`] || {};
  const asistenData = currentData.asisten || [];
  const itSupportData = currentData.itSupport || [];

  return (
    <PageTransition>
      <Helmet>
        <title>Tim Asisten & IT Support - TaxLaboratory Gunadarma</title>
        <meta name="description" content="Kenali profil anggota Asisten Praktikum dan tim IT Support yang berdedikasi di Laboratorium Akuntansi Lanjut B (TaxLaboratory) Universitas Gunadarma." />
        <link rel="canonical" href="https://www.taxlaboratory.my.id/team" />
      </Helmet>
      
      <main className="bg-[#fafafa] min-h-screen font-sans text-gray-800 scroll-smooth pb-32">
        <div className="fixed inset-0 -z-10 h-full w-full bg-[#fafafa] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none"></div>

        <section className="pt-36 md:pt-48 pb-12 relative px-4 sm:px-6 max-w-7xl mx-auto text-center mb-6 sm:mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-purple-900 leading-[1.05] tracking-tighter mb-4 sm:mb-6">
            Meet The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Team.</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Dibalik operasional <strong>TaxLaboratorium</strong> yang unggul, terdapat tim profesional <strong>Lab Akuntansi Pajak</strong> yang berdedikasi tinggi untuk memberikan pelayanan akademik terbaik.
          </p>
        </section>

        <article className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="flex justify-center mb-12 sm:mb-16">
            <div className="bg-white p-1.5 sm:p-2 rounded-full border border-gray-200 shadow-sm flex gap-1 sm:gap-2">
              {/* 6. SOLUSI: Tombol tab dibuat dinamis berdasarkan data yang tersisa di JSON */}
              {availableYears.map((year) => (
                <button 
                  key={year}
                  onClick={() => handleTabChange(year)}
                  className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm md:text-base transition-all duration-300 ${
                    activeYear === year 
                    ? 'bg-purple-900 text-white shadow-md scale-100' 
                    : 'text-gray-500 hover:bg-purple-50 hover:text-purple-900'
                  }`}
                >
                  Angkatan {year}
                </button>
              ))}
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700" key={activeYear}>
            
            <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">Angkatan {activeYear}</h2>
              <div className="flex-1 h-[2px] bg-gradient-to-r from-purple-200 to-transparent"></div>
            </div>

            {/* ASISTEN SECTION */}
            {asistenData.length > 0 && (
              <div className="mb-12 sm:mb-16">
                <h3 className="text-xl sm:text-2xl font-bold text-purple-900 mb-6 sm:mb-8 border-l-[4px] sm:border-l-[6px] border-orange-500 pl-3 sm:pl-4"> 
                  Asisten <span className="text-xs sm:text-sm text-gray-500 ml-1 sm:ml-2">({asistenData.length} Anggota)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                  {asistenData.map((member, index) => (
                    <MemberCard key={`${activeYear}-asisten-${index}`} member={member} />
                  ))}
                </div>
              </div>
            )}

            {/* IT SUPPORT SECTION */}
            {itSupportData.length > 0 && (
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-purple-900 mb-6 sm:mb-8 border-l-[4px] sm:border-l-[6px] border-orange-500 pl-3 sm:pl-4"> 
                  IT Support <span className="text-xs sm:text-sm text-gray-500 ml-1 sm:ml-2">({itSupportData.length} Anggota)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                  {itSupportData.map((member, index) => (
                    <MemberCard key={`${activeYear}-it-${index}`} member={member} />
                  ))}
                </div>
              </div>
            )}

            {/* Jika tidak ada data Asisten dan IT Support */}
            {asistenData.length === 0 && itSupportData.length === 0 && (
               <div className="text-center py-10 text-gray-500">
                  <p>Belum ada data anggota untuk angkatan ini.</p>
               </div>
            )}

          </div>
        </article>
      </main>
    </PageTransition>
  );
}