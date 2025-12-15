// Fichier à créer dans : src/components/ui/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ 
    children, 
    onClick, 
    variant = 'primary', 
    size = 'medium',
    icon: Icon,
    iconPosition = 'left',
    className = '',
    fullWidth = false,
    ...props 
}) => {
    const baseClasses = "font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 inline-flex items-center justify-center";
    
    const variants = {
        primary: "bg-primary hover:bg-primary/90 text-white focus:ring-primary",
        secondary: "bg-secondary hover:bg-secondary/90 text-white focus:ring-secondary",
        outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary",
        ghost: "bg-transparent text-primary hover:bg-primary/10 focus:ring-primary"
    };

    const sizes = {
        small: "py-2 px-4 text-sm",
        medium: "py-3 px-6 text-base",
        large: "py-4 px-8 text-lg"
    };

    const mobileClasses = "w-full sm:w-auto";
    const widthClass = fullWidth ? "w-full" : mobileClasses;
    
    return (
        <button
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className} btn-fill`}
            onClick={onClick}
            {...props}
        >
            {Icon && iconPosition === 'left' && (
                <Icon className="mr-2" size={size === 'small' ? 14 : size === 'medium' ? 16 : 18} />
            )}
            {children}
            {Icon && iconPosition === 'right' && (
                <Icon className="ml-2" size={size === 'small' ? 14 : size === 'medium' ? 16 : 18} />
            )}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    icon: PropTypes.elementType,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    className: PropTypes.string,
    fullWidth: PropTypes.bool
};

export default Button;