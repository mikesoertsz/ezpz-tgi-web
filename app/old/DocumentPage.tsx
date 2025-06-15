import React, { ReactNode } from 'react';

interface DocumentPageProps {
  children: ReactNode;
}

const DocumentPage: React.FC<DocumentPageProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none z-0">
        <div className="transform rotate-45 text-black text-9xl font-bold">
          CLASSIFIED
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* Classification marks */}
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
    </div>
  );
};

export default DocumentPage;