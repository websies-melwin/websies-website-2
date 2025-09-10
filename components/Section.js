export default function Section({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'medium',
  ...props 
}) {
  const variants = {
    default: '',
    modern: 'section-modern',
    elevated: 'section-elevated'
  };

  const paddingSizes = {
    none: '',
    small: 'py-8 md:py-12',
    medium: 'py-12 md:py-16',
    large: 'py-16 md:py-20'
  };

  return (
    <section 
      className={`${variants[variant]} ${paddingSizes[padding]} ${className}`}
      {...props}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}