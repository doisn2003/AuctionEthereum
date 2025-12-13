import React from 'react';

// Tôi tách style gốc từ file HTML ra đây
const baseStyle = "flex items-center justify-center rounded-lg h-10 px-4 text-sm font-bold transition-colors";

const variants = {
  primary: "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20",
  secondary: "bg-[#e7ebf3] dark:bg-[#2a3241] text-[#0d121b] dark:text-white hover:bg-opacity-80",
  outline: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20" // Nút "View Catalog" ở banner
};

function Button({ children, variant = 'primary', onClick, className = '' }) {
  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;