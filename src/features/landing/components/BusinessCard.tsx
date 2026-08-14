import React from 'react';

interface BusinessCardProps {
  title: string;
  items: string[];
  imageUrl: string;
  imageAlt: string;
  demoUrl: string;
  onNavigate: (view: string) => void;
  accentColor: 'primary' | 'accent';
  objectFit?: 'object-cover' | 'object-contain';
  mockupType?: 'browser' | 'phone' | 'none';
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  title,
  items,
  imageUrl,
  imageAlt,
  demoUrl,
  onNavigate,
  accentColor,
  objectFit = 'object-cover',
  mockupType = 'browser'
}) => {
  const isPrimary = accentColor === 'primary';
  const bulletBg = isPrimary ? 'bg-primary' : 'bg-accent';
  const borderColor = 'border-accent';
  const btnHover = isPrimary 
    ? 'hover:bg-primary hover:text-slate-950' 
    : 'hover:bg-accent hover:text-white';

  return (
    <div className="bg-white rounded-3xl border border-slate-150 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Mockup Header */}
        <div className={`h-48 overflow-hidden bg-slate-50 flex items-center justify-center ${mockupType !== 'none' ? 'p-3' : ''}`}>
          {mockupType === 'phone' ? (
            /* Sleek Smartphone Mockup */
            <div className="relative mx-auto border-gray-800 bg-gray-800 border-[6px] rounded-[24px] h-[170px] w-[88px] shadow-md overflow-hidden flex flex-col">
              {/* Speaker / Notch */}
              <div className="absolute top-0 inset-x-0 h-3 bg-gray-800 rounded-b-md flex items-center justify-center z-20">
                <span className="w-6 h-1 bg-gray-700 rounded-full block -mt-1" />
              </div>
              {/* Screen Viewport */}
              <div className="w-full h-full bg-white overflow-hidden rounded-[18px] relative flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className={`w-full h-full ${objectFit} group-hover:scale-105 transition-transform duration-500`}
                />
              </div>
            </div>
          ) : mockupType === 'none' ? (
            /* No mockup - styled image card with colored border */
            <div className="w-full h-full p-1.5 flex items-center justify-center">
              <div className={`w-full h-full rounded-2xl border-2 ${borderColor} bg-white overflow-hidden flex items-center justify-center`}>
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className={`w-full h-full ${objectFit} group-hover:scale-105 transition-transform duration-500`}
                />
              </div>
            </div>
          ) : (
            /* Browser Mockup */
            <div className="w-full h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <div className="h-3.5 bg-white rounded flex-1 mx-3 border border-slate-200 flex items-center justify-center">
                  <span className="text-[8px] text-slate-400 font-mono select-none">{demoUrl}</span>
                </div>
              </div>
              {/* Viewport */}
              <div className="flex-1 overflow-hidden bg-white flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className={`w-full h-full ${objectFit} group-hover:scale-105 transition-transform duration-500`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 px-6 pt-6 mb-4">
          {title}
        </h3>

        {/* Items List */}
        <ul className="space-y-2.5 px-6 pb-6 text-slate-500 text-sm">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${bulletBg} flex-shrink-0`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <div className="px-6 pb-6">
        <button
          onClick={() => onNavigate('contacto')}
          className={`w-full py-3 bg-slate-900 ${btnHover} text-white font-bold rounded-xl text-center text-xs md:text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 border-0`}
        >
          <span>Conoce más</span>
          <span>↗</span>
        </button>
      </div>
    </div>
  );
};
