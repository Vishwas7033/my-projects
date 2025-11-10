import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getUser, getPostsByUser, updateUserBio } from '../services/mockApi';
import { User, Post } from '../types';
import { useAuth } from '../hooks/useAuth';
import Spinner from '../components/Spinner';
import PostCard from '../components/PostCard';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: authUser, updateAuthUser } = useAuth();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState('');

  const isOwnProfile = authUser?._id === id;

  const fetchProfileData = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const [userData, postsData] = await Promise.all([
        getUser(id),
        getPostsByUser(id)
      ]);
      setProfileUser(userData);
      setPosts(postsData);
      setBioText(userData.bio || '');
      document.title = `BlogVerse - ${userData.username}'s Profile`;
    } catch (err) {
      setError('Failed to load profile.');
      document.title = 'BlogVerse - User Not Found';
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleBioSave = async () => {
    if (!id) return;
    try {
      const updatedUser = await updateUserBio(id, bioText);
      setProfileUser(updatedUser);
      if(isOwnProfile) {
        updateAuthUser(updatedUser);
      }
      setIsEditingBio(false);
    } catch (error) {
      console.error('Failed to update bio', error);
      alert('Could not update bio.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Spinner /></div>;
  }

  if (error || !profileUser) {
    return <div className="text-center text-red-500">{error || 'User not found.'}</div>;
  }
  
  const bannerImageUrl = `https://picsum.photos/seed/${profileUser._id}/1000/300`;

  return (
    <div className="max-w-4xl mx-auto">
      <div 
        className="bg-cover bg-center p-8 rounded-lg shadow-md mb-8 relative"
        style={{backgroundImage: `url(${bannerImageUrl})`}}
      >
        <div className="absolute inset-0 bg-secondary bg-opacity-70 backdrop-blur-md rounded-lg"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center">
          <img 
            src={profileUser.profilePicture || `https://picsum.photos/seed/${profileUser._id}/128/128`} 
            alt={profileUser.username}
            className="w-32 h-32 rounded-full mr-0 md:mr-8 mb-4 md:mb-0 border-4 border-highlight"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-textlight">{profileUser.username}</h1>
            <p className="text-highlight">{profileUser.email}</p>
            <div className="mt-4 text-textlight">
              {isEditingBio ? (
                <div>
                  <textarea
                    value={bioText}
                    onChange={(e) => setBioText(e.target.value)}
                    className="w-full p-2 bg-primary bg-opacity-70 rounded"
                    rows={3}
                  />
                  <div className="mt-2">
                    <button onClick={handleBioSave} className="bg-highlight text-white px-3 py-1 rounded mr-2">Save</button>
                    <button onClick={() => setIsEditingBio(false)} className="bg-accent px-3 py-1 rounded">Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>{profileUser.bio || 'This user has not set a bio yet.'}</p>
                  {isOwnProfile && (
                    <button onClick={() => setIsEditingBio(true)} className="text-sm text-highlight hover:underline mt-2">Edit Bio</button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-textlight mb-6">{profileUser.username}'s Posts</h2>
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map(post => <PostCard key={post._id} post={post} />)
        ) : (
          <p className="text-textdark bg-secondary p-4 rounded-lg">This user has not posted anything yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;