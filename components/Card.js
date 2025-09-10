export default function Card({ 
  children, 
  className = '', 
  hover = true,
  padding = 'medium',
  ...props 
}) {
  const baseClasses = 'modern-card';
  
  const hoverClasses = hover ? 'hover:scale-[1.02] transition-all duration-300' : '';
  
  const paddingSizes = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };

  return (
    <div 
      className={`${baseClasses} ${paddingSizes[padding]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}