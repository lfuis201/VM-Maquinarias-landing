import React from 'react';

export const FloatingSocials: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-center">
      {/* YouTube Floating Button */}
      <div className="relative group">
        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-950 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-xl border border-slate-800 translate-x-2 group-hover:translate-x-0">
          Síguenos en YouTube
        </span>
        <a
          href="https://www.youtube.com/@SISTEMATIZATE"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-accent rounded-full text-white shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(16,9,77,0.6)] cursor-pointer"
        >
          {/* Outer Glow */}
          <span className="absolute inset-0 rounded-full border border-accent/20 opacity-0 group-hover:opacity-100 animate-ping duration-1000" />
          <svg className="w-7 h-7 z-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.025 0 12 0 12s0 3.975.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.475 20.455 12 20.455 12 20.455s7.524 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.975 24 12 24 12s0-3.975-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
      </div>

      {/* Facebook Floating Button */}
      <div className="relative group">
        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-950 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-xl border border-slate-800 translate-x-2 group-hover:translate-x-0">
          Síguenos en Facebook
        </span>
        <a
          href="https://web.facebook.com/sistematizateperu/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-accent rounded-full text-white shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(16,9,77,0.6)] cursor-pointer"
        >
          {/* Outer Glow */}
          <span className="absolute inset-0 rounded-full border border-accent/20 opacity-0 group-hover:opacity-100 animate-ping duration-1000" />
          <svg className="w-6 h-6 z-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
      </div>

      {/* TikTok Floating Button */}
      <div className="relative group">
        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-950 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-xl border border-slate-800 translate-x-2 group-hover:translate-x-0">
          Síguenos en TikTok
        </span>
        <a
          href="https://www.tiktok.com/@sistematiza.per"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-primary rounded-full text-slate-950 shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(7,253,2,0.6)] cursor-pointer"
        >
          {/* Cyberpunk TikTok Glow Rings */}
          <span className="absolute inset-0 rounded-full border border-primary/20 opacity-0 group-hover:opacity-100 animate-ping duration-1000" />
          <svg className="w-8 h-8 z-10" viewBox="0 0 24 24" fill="none">
            <defs>
              <mask id="IconifyId19e841328dffb4e501">
                <path fill="#fff" d="M16.6 5.82c-0.68 -0.78 -1.06 -1.78 -1.06 -2.82h-3.09v12.4c-0.02 0.67 -0.31 1.31 -0.79 1.77c-0.48 0.47 -1.13 0.73 -1.8 0.73c-1.42 0 -2.6 -1.16 -2.6 -2.6c0 -1.72 1.66 -3.01 3.37 -2.48v-3.16c-3.45 -0.46 -6.47 2.22 -6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69 -2.55 5.69 -5.7v-6.29c1.25 0.9 2.76 1.38 4.3 1.38v-3.09c0 0 -1.88 0.09 -3.24 -1.48Z"/>
                <g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}>
                  <path strokeDasharray="36" d="M11 11h-1c-2.21 0 -4.5 1.79 -4.5 4c0 2.21 1.5 4.5 4.5 4.5c2.21 0 4 -2.29 4 -4.5v-12.5">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="72;36"/>
                  </path>
                  <path strokeDasharray="10" strokeDashoffset={20} d="M18 2.5v8">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.1s" to="10"/>
                  </path>
                </g>
              </mask>
            </defs>
            <path fill="currentColor" d="M0 0h24v24H0z" mask="url(#IconifyId19e841328dffb4e501)"/>
          </svg>
        </a>
      </div>

      {/* WhatsApp Floating Button */}
      <div className="relative group">
        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-950 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-xl border border-slate-800 translate-x-2 group-hover:translate-x-0">
          Chatea con nosotros
        </span>
        <a
          href="https://wa.me/51913129204?text=Hola,%20quisiera%20recibir%20informacion%20de%20Sistematizate"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-primary rounded-full text-slate-950 shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(7,253,2,0.6)] cursor-pointer"
        >
          {/* Pulsing Outer Glow */}
          <span className="absolute inset-0 rounded-full border border-primary/20 opacity-0 group-hover:opacity-100 animate-ping duration-1000" />
          <svg className="w-8 h-8 z-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23c-1.48 0-2.93-.39-4.19-1.15l-.3-.17l-3.12.82l.83-3.04l-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56c.14.17 1.76 2.67 4.25 3.73c.59.27 1.05.42 1.41.53c.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18s.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82c-.23-.08-.37-.12-.56.12c-.16.25-.64.81-.78.97c-.15.17-.29.19-.53.07c-.26-.13-1.06-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.12-.24-.01-.39.11-.5c.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41c.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84c-.2-.48-.4-.42-.56-.43c-.14 0-.3-.01-.47-.01"/>
          </svg>
        </a>
      </div>
    </div>
  );
};
