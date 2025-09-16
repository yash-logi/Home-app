import React from 'react';

const Alert = ({ variant = 'default', className = '', children, ...props }) => {
  const baseClasses = 'relative w-full rounded-lg border p-4';
  
  const variants = {
    default: 'bg-white text-gray-900 border-gray-200',
    destructive: 'bg-red-100 text-red-900 border-red-200',
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const AlertDescription = ({ className = '', children, ...props }) => {
  return (
    <div className={`text-sm ${className}`} {...props}>
      {children}
    </div>
  );
};

export { Alert, AlertDescription };
