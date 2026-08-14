import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
  color?: 'primary' | 'accent';
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, onClick, color = 'primary' }) => {
  const isPrimary = color === 'primary';
  return (
    <div 
      onClick={onClick}
      className={`bg-white p-8 rounded-3xl border border-slate-150 transition-all duration-300 flex flex-col justify-between items-center relative group min-h-[300px] cursor-pointer ${
        isPrimary 
          ? 'hover:border-primary hover:shadow-xl hover:shadow-primary/10' 
          : 'hover:border-accent hover:shadow-xl hover:shadow-accent/10'
      }`}
    >
      <span className={`absolute top-6 right-6 font-black text-lg select-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${
        isPrimary ? 'text-primary-dark' : 'text-accent'
      }`}>
        ↗
      </span>
      <div className="space-y-6 flex flex-col items-center">
        <div className="w-16 h-16 flex items-center justify-center transition-colors duration-300 text-primary">
          {icon}
        </div>
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-bold text-accent">{title}</h3>
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-[240px] mx-auto">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
