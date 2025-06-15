import React from 'react';
import { ShieldAlert, Share2, Lock, Download, Settings, Circle } from 'lucide-react';

interface ReportHeaderProps {
  caseNumber: string;
  classification: string;
  subject: string;
  dateCompiled: string;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({
  caseNumber,
  classification,
  subject,
  dateCompiled
}) => {
  const collaborators = [
    { id: 1, image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg", online: true },
    { id: 2, image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg", online: true },
    { id: 3, image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg", online: false }
  ];

  return (
    <div className="mb-6 border-b border-gray-200 pb-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <ShieldAlert size={20} className="text-gray-400" />
          <div>
            <h1 className="text-sm font-medium text-gray-900">INTELLIGENCE BRIEFING</h1>
            <p className="text-xs text-gray-500">Case: {caseNumber}</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {/* Collaborators */}
          <div className="flex -space-x-2">
            {collaborators.map((collaborator) => (
              <div key={collaborator.id} className="relative">
                <img
                  src={collaborator.image}
                  alt="Collaborator"
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
                {collaborator.online && (
                  <Circle
                    size={8}
                    className="absolute bottom-0 right-0 text-green-500 fill-green-500"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 size={16} className="text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <Lock size={16} className="text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <Download size={16} className="text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings size={16} className="text-gray-600" />
            </button>
          </div>

          <div className="text-right">
            <div className="inline-block bg-red-50 text-red-700 px-2 py-0.5 text-xs font-medium rounded">
              {classification}
            </div>
            <p className="text-xs text-gray-500 mt-1">{dateCompiled}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;