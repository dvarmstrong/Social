import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Image as ImageIcon, Calendar, X } from 'lucide-react';
import { SOCIAL_PLATFORMS, PLATFORM_ICONS } from '../constants/platforms';
import type { Post } from '../types';

interface ComposePostProps {
  onCreatePost: (post: Omit<Post, 'id' | 'createdAt'>) => void;
}

export default function ComposePost({ onCreatePost }: ComposePostProps) {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || selectedPlatforms.length === 0) return;

    setIsSubmitting(true);
    
    try {
      const post: Omit<Post, 'id' | 'createdAt'> = {
        content: content.trim(),
        platforms: selectedPlatforms,
        status: isScheduled ? 'scheduled' : 'published',
        images: images.length > 0 ? images : undefined,
        scheduledAt: isScheduled && scheduledDate ? new Date(scheduledDate) : undefined,
        publishedAt: !isScheduled ? new Date() : undefined,
      };

      onCreatePost(post);
      
      // Reset form
      setContent('');
      setSelectedPlatforms([]);
      setImages([]);
      setIsScheduled(false);
      setScheduledDate('');
      
      // Navigate back to dashboard
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you'd upload these to a server
      // For now, we'll just create mock URLs
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const characterCount = content.length;
  const maxLength = 280; // Twitter's character limit

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Create New Post</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              What's on your mind?
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
              rows={6}
              maxLength={maxLength}
            />
            <div className="mt-2 flex justify-between items-center text-sm">
              <span className="text-gray-500">
                {characterCount}/{maxLength} characters
              </span>
              {characterCount > maxLength * 0.8 && (
                <span className={`font-medium ${
                  characterCount > maxLength ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {characterCount > maxLength ? 'Over limit' : 'Approaching limit'}
                </span>
              )}
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <div className="space-y-3">
              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <label className="flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="text-center">
                  <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-600">Click to upload images</span>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Platforms
            </label>
            <div className="grid grid-cols-2 gap-3">
              {SOCIAL_PLATFORMS.map((platform) => {
                const Icon = PLATFORM_ICONS[platform.icon as keyof typeof PLATFORM_ICONS];
                const isSelected = selectedPlatforms.includes(platform.id);
                
                return (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => handlePlatformToggle(platform.id)}
                    className={`flex items-center p-3 border rounded-lg transition-colors ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" style={{ color: platform.color }} />
                    <span className="font-medium">{platform.name}</span>
                    {!platform.connected && (
                      <span className="ml-auto text-xs text-gray-500">Not connected</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scheduling */}
          <div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="schedule"
                checked={isScheduled}
                onChange={(e) => setIsScheduled(e.target.checked)}
                className="w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
              />
              <label htmlFor="schedule" className="text-sm font-medium text-gray-700">
                Schedule for later
              </label>
            </div>
            
            {isScheduled && (
              <div className="mt-3">
                <input
                  type="datetime-local"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={!content.trim() || selectedPlatforms.length === 0 || isSubmitting || characterCount > maxLength}
              className="flex items-center px-6 py-2 bg-brand-600 text-white text-sm font-medium rounded-md hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isScheduled ? 'Scheduling...' : 'Publishing...'}
                </>
              ) : (
                <>
                  {isScheduled ? <Calendar className="w-4 h-4 mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                  {isScheduled ? 'Schedule Post' : 'Publish Now'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
