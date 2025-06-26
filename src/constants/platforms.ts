import type { SocialPlatform } from '../types';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: 'Twitter',
    color: '#1DA1F2',
    connected: false,
    requiresAuth: true,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'Facebook',
    color: '#1877F2',
    connected: false,
    requiresAuth: true,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'Instagram',
    color: '#E4405F',
    connected: false,
    requiresAuth: true,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'Linkedin',
    color: '#0A66C2',
    connected: false,
    requiresAuth: true,
  },
];

export const PLATFORM_ICONS = {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
};
