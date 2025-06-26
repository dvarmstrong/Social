import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ComposePost from './components/ComposePost';
import PlatformConnections from './components/PlatformConnections';
import PostHistory from './components/PostHistory';
import type { User, Post } from './types';

function App() {
  // Mock user state - in a real app, this would come from authentication
  const [user] = useState<User | null>({
    id: '1',
    email: 'user@example.com',
    name: 'Demo User',
    connectedPlatforms: [],
  });

  const [posts, setPosts] = useState<Post[]>([]);

  const handleCreatePost = (post: Omit<Post, 'id' | 'createdAt'>) => {
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setPosts([newPost, ...posts]);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Social Media Manager
          </h1>
          <p className="text-gray-600">Please sign in to continue</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header user={user} />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard posts={posts} />} />
            <Route 
              path="/compose" 
              element={<ComposePost onCreatePost={handleCreatePost} />} 
            />
            <Route path="/connections" element={<PlatformConnections />} />
            <Route path="/history" element={<PostHistory posts={posts} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
