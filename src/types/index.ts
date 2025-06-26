// Types for social media platforms
export interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
  connected: boolean;
  requiresAuth: boolean;
}

// Types for posts
export interface Post {
  id: string;
  content: string;
  images?: string[];
  platforms: string[];
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  createdAt: Date;
  scheduledAt?: Date;
  publishedAt?: Date;
}

// User authentication types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  connectedPlatforms: string[];
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Platform connection types
export interface PlatformConnection {
  platformId: string;
  connected: boolean;
  username?: string;
  avatar?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
}
