import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer';
  
  const variants = {
    primary: 'bg-primary text-slate-950 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30 focus:ring-primary font-bold',
    secondary: 'bg-accent text-white hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/30 focus:ring-accent font-bold',
    accent: 'bg-secondary text-white hover:bg-secondary-dark hover:shadow-lg hover:shadow-secondary/30 focus:ring-secondary font-bold',
    outline: 'border-2 border-neutral-border-light dark:border-neutral-border-dark text-neutral-text-light dark:text-neutral-text-dark hover:bg-slate-50 dark:hover:bg-slate-800/50 focus:ring-slate-500',
    ghost: 'text-neutral-text-light dark:text-neutral-text-dark hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-slate-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
