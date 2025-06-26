import { useState } from 'react';
import { Search, Filter, Calendar, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { PLATFORM_ICONS } from '../constants/platforms';
import type { Post } from '../types';

interface PostHistoryProps {
  posts: Post[];
}

export default function PostHistory({ posts }: PostHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Filter and sort posts
  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    });

  const getStatusColor = (status: Post['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Post History</h1>
              <p className="text-gray-600 mt-1">
                View and manage all your social media posts
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {posts.length} total posts
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
            
            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
                <option value="draft">Draft</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
        
        {/* Posts List */}
        <div className="divide-y divide-gray-200">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    {/* Post Content */}
                    <div className="mb-3">
                      <p className="text-gray-900 text-sm leading-relaxed">
                        {post.content}
                      </p>
                      {post.images && post.images.length > 0 && (
                        <div className="mt-3 flex items-center text-sm text-gray-500">
                          <ImageIcon className="w-4 h-4 mr-1" />
                          {post.images.length} image{post.images.length > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                    
                    {/* Platforms */}
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm text-gray-500">Posted to:</span>
                      <div className="flex items-center space-x-2">
                        {post.platforms.map((platformId) => {
                          const platform = platformId.charAt(0).toUpperCase() + platformId.slice(1);
                          const IconComponent = PLATFORM_ICONS[platform as keyof typeof PLATFORM_ICONS];
                          
                          return IconComponent ? (
                            <div key={platformId} className="flex items-center">
                              <IconComponent className="w-4 h-4" />
                            </div>
                          ) : (
                            <span key={platformId} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              {platform}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Metadata */}
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Created: {post.createdAt.toLocaleDateString()} {post.createdAt.toLocaleTimeString()}
                      </div>
                      {post.scheduledAt && (
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Scheduled: {post.scheduledAt.toLocaleDateString()} {post.scheduledAt.toLocaleTimeString()}
                        </div>
                      )}
                      {post.publishedAt && (
                        <div className="flex items-center">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Published: {post.publishedAt.toLocaleDateString()} {post.publishedAt.toLocaleTimeString()}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="flex-shrink-0 ml-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}
                    >
                      {post.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Calendar className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || statusFilter !== 'all' ? 'No posts found' : 'No posts yet'}
              </h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start creating posts to see them here'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
