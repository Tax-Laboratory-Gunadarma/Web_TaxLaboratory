import { useState, useRef, useEffect } from "react";

// IKON STATIS

export const CheckIcon = () => (
  <svg
    className="w-6 h-6 text-green-500 shrink-0 mt-0.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export const CloseIcon = () => (
  <svg
    className="w-6 h-6 md:w-8 md:h-8"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// KARTU PERSYARATAN (ON-PAGE EFFECT BERULANG)

export const ScrollRevealCard = ({ children, className = "" }) => {
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsActive(true);
        else setIsActive(false);
      },
      { rootMargin: "-20% 0px -20% 0px", threshold: 0 },
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${className} transform-gpu will-change-transform transition-all duration-500 
      ${
        isActive
          ? "max-lg:border-orange-300 max-lg:shadow-xl max-lg:-translate-y-2 max-lg:[&_div>svg]:scale-110 max-lg:[&_div>svg]:bg-orange-500 max-lg:[&_div>svg]:text-white max-lg:[&>div:first-child]:bg-orange-500 max-lg:[&>span]:text-orange-50"
          : ""
      }
      `}
    >
      {children}
    </div>
  );
};

// ITEM TIMELINE

export const TimelineRevealItem = ({ alur, isLeft }) => {
  const [inView, setInView] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
        else setInView(false);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      className={`relative flex items-start md:items-center justify-between w-full mb-10 md:mb-20 group/item
        ${isLeft ? "md:flex-row-reverse" : "md:flex-row"}
      `}
    >
      {/* KONTEN KARTU */}
      <div
        className={`w-full md:w-[45%] pl-16 md:pl-0 flex ${isLeft ? "md:justify-end md:text-right" : "md:justify-start md:text-left"}`}
      >
        <div
          className={`w-full bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border transition-all duration-500 transform-gpu
          ${inView ? "border-orange-500 shadow-xl md:shadow-2xl md:shadow-orange-500/10 -translate-y-1" : "border-slate-100 shadow-sm"}
          lg:group-hover/item:border-orange-300 lg:group-hover/item:-translate-y-1
        `}
        >
          <div
            className={`flex flex-wrap items-center gap-2 mb-3 ${isLeft ? "md:flex-row-reverse" : ""}`}
          >
            <span
              className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1.5 rounded-lg transition-colors
              ${inView ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-400"}
              lg:group-hover/item:bg-orange-500 lg:group-hover/item:text-white
            `}
            >
              TAHAPAN {alur.step}
            </span>
            <span className="text-slate-400 text-[10px] md:text-xs font-bold">
              {alur.date}
            </span>
          </div>

          <h4
            className={`text-lg md:text-2xl font-black mb-1.5 transition-colors leading-tight
            ${inView ? "text-orange-600" : "text-slate-900"}
            lg:group-hover/item:text-orange-600
          `}
          >
            {alur.title}
          </h4>
          <p className="text-slate-500 text-xs md:text-base font-medium leading-relaxed">
            {alur.desc}
          </p>
        </div>
      </div>

      {/* LINGKARAN TENGAH (FIXED POSISI DI HP) */}
      <div
        className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-10 transition-all duration-500 transform-gpu
        ${inView ? "scale-110 md:scale-125" : "scale-100"}
      `}
      >
        <div
          className={`w-10 h-10 md:w-16 md:h-16 rounded-full border-4 border-[#fafafa] flex items-center justify-center transition-all duration-500 shadow-lg
          ${inView ? "bg-orange-500 text-white shadow-orange-500/30" : "bg-white text-slate-300"}
          lg:group-hover/item:bg-orange-500 lg:group-hover/item:text-white
        `}
        >
          {alur.icon ? (
            <div
              className={`transition-colors duration-500 w-5 h-5 md:w-7 md:h-7 flex items-center justify-center ${inView ? "[&>svg]:text-white" : ""} lg:group-hover/item:[&>svg]:text-white`}
            >
              {alur.icon}
            </div>
          ) : (
            <span className="text-base md:text-xl font-black">{alur.step}</span>
          )}
        </div>
      </div>

      {/* BALANCER (Desktop Only) */}
      <div className="hidden md:block w-[45%]"></div>
    </div>
  );
};
