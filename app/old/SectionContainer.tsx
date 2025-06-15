import React, { ReactNode } from 'react';

interface SectionContainerProps {
  title: string;
  children: ReactNode;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ title, children }) => {
  return (
    <div className="bg-gray-50 p-3 rounded border border-gray-300">
      <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-blue-900 border-b border-gray-300 pb-1">
        {title}
      </h3>
      <div className="text-sm">
        {children}
      </div>
    </div>
  );
};

export default SectionContainer;