import { useState } from 'react';
import { ExternalLink, Check, AlertCircle, Settings } from 'lucide-react';
import { SOCIAL_PLATFORMS, PLATFORM_ICONS } from '../constants/platforms';
import type { SocialPlatform } from '../types';

export default function PlatformConnections() {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>(SOCIAL_PLATFORMS);
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = async (platformId: string) => {
    setConnecting(platformId);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPlatforms(prev =>
        prev.map(platform =>
          platform.id === platformId
            ? { ...platform, connected: true }
            : platform
        )
      );
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setConnecting(null);
    }
  };

  const handleDisconnect = async (platformId: string) => {
    setPlatforms(prev =>
      prev.map(platform =>
        platform.id === platformId
          ? { ...platform, connected: false }
          : platform
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Platform Connections</h1>
          <p className="text-gray-600 mt-1">
            Connect your social media accounts to start cross-posting
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid gap-6">
            {platforms.map((platform) => {
              const Icon = PLATFORM_ICONS[platform.icon as keyof typeof PLATFORM_ICONS];
              const isConnecting = connecting === platform.id;
              
              return (
                <div
                  key={platform.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Icon 
                        className="w-8 h-8" 
                        style={{ color: platform.color }} 
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {platform.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        {platform.connected ? (
                          <>
                            <Check className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-sm text-green-600">Connected</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-500">Not connected</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {platform.connected && (
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Settings className="w-5 h-5" />
                      </button>
                    )}
                    
                    {platform.connected ? (
                      <button
                        onClick={() => handleDisconnect(platform.id)}
                        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                      >
                        Disconnect
                      </button>
                    ) : (
                      <button
                        onClick={() => handleConnect(platform.id)}
                        disabled={isConnecting}
                        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
                      >
                        {isConnecting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Connecting...
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Connect
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">
                  About Platform Connections
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  Connecting your accounts allows you to post content directly to multiple platforms 
                  simultaneously. Your login credentials are securely stored and encrypted. You can 
                  disconnect any platform at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
