export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  className = '', 
  ...props 
}) {
  const baseClasses = 'font-semibold rounded-full transition-all duration-300 inline-flex items-center justify-center';
  
  const variants = {
    primary: 'gradient-primary text-white hover:scale-105 hover:-translate-y-1',
    secondary: 'bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-dark',
    ghost: 'bg-white/5 text-white hover:bg-white/10'
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}