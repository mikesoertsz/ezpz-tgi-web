import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin, Youtube, MessageCircle, ExternalLink } from 'lucide-react';

interface SocialMediaPlatform {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  handle: string;
  url: string;
  followers: string;
  lastActive: string;
  verified: boolean;
}

const SocialMediaSection: React.FC = () => {
  const platforms: SocialMediaPlatform[] = [
    {
      name: 'Twitter/X',
      icon: Twitter,
      handle: '@alexmercer_nyc',
      url: 'https://twitter.com/alexmercer_nyc',
      followers: '12.4K',
      lastActive: '2 hours ago',
      verified: true
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      handle: 'alexander-mercer-consulting',
      url: 'https://linkedin.com/in/alexander-mercer-consulting',
      followers: '8.9K',
      lastActive: '1 day ago',
      verified: true
    },
    {
      name: 'Facebook',
      icon: Facebook,
      handle: 'Alexander.J.Mercer',
      url: 'https://facebook.com/Alexander.J.Mercer',
      followers: '3.2K',
      lastActive: '5 days ago',
      verified: false
    },
    {
      name: 'Instagram',
      icon: Instagram,
      handle: '@amercer_global',
      url: 'https://instagram.com/amercer_global',
      followers: '5.7K',
      lastActive: '3 hours ago',
      verified: false
    },
    {
      name: 'YouTube',
      icon: Youtube,
      handle: 'MercerGlobalInsights',
      url: 'https://youtube.com/@MercerGlobalInsights',
      followers: '892',
      lastActive: '2 weeks ago',
      verified: false
    },
    {
      name: 'Reddit',
      icon: MessageCircle,
      handle: 'u/GlobalConsultant_AM',
      url: 'https://reddit.com/user/GlobalConsultant_AM',
      followers: '1.1K',
      lastActive: '6 hours ago',
      verified: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {platforms.map((platform, index) => {
        const Icon = platform.icon;
        return (
          <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon size={20} className="text-gray-700" />
                <span className="font-medium text-gray-900">{platform.name}</span>
              </div>
              {platform.verified && (
                <div className="w-2 h-2 bg-blue-500 rounded-full" title="Verified Account" />
              )}
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Handle:</span>
                <a 
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-1 transition-colors"
                >
                  <span>{platform.handle}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Followers:</span>
                <span className="font-medium text-gray-900">{platform.followers}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Active:</span>
                <span className="text-gray-700">{platform.lastActive}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SocialMediaSection;