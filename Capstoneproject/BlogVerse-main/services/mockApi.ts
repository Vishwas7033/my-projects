// FIX: Import all necessary types from the centralized types.ts file.
import { User, Post, Comment, LoginCredentials, RegisterUserData } from '../types';

// --- MOCK DATABASE ---
let db = {
  users: [] as User[],
  posts: [] as Post[],
  comments: [] as Comment[],
  categories: [] as string[],
};

const DB_KEY = 'blogverse_db';

// --- UTILITY FUNCTIONS ---
const saveDb = () => {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (error) {
    console.error('Failed to save to localStorage', error);
  }
};

const loadDb = () => {
  try {
    const storedDb = localStorage.getItem(DB_KEY);
    if (storedDb) {
      db = JSON.parse(storedDb);
      // Ensure categories list exists for backward compatibility
      if (!db.categories) {
        db.categories = ['Technology', 'Programming', 'Web Development', 'Lifestyle', 'Travel', 'Productivity', 'Food'];
      }
    } else {
      initializeDb();
      saveDb();
    }
  } catch (error) {
    console.error('Failed to load from localStorage, initializing DB.', error);
    initializeDb();
  }
};

const generateId = () => Math.random().toString(36).substring(2, 15);

const initializeDb = () => {
  const user1: User = { _id: 'user1', username: 'Alice', email: 'alice@example.com', bio: 'A passionate writer and tech enthusiast.' };
  const user2: User = { _id: 'user2', username: 'Bob', email: 'bob@example.com', bio: 'Loves to explore new ideas and share them with the world.' };

  const post1: Post = {
    _id: 'post1',
    title: 'Getting Started with React Hooks',
    content: 'React Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class. This post will explore the basics of useState and useEffect.',
    author: user1,
    // FIX: Added category property.
    category: 'Technology',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  };
  const post2: Post = {
    _id: 'post2',
    title: 'A Deep Dive into TypeScript',
    content: 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. In this article, we will cover the core concepts of TypeScript including types, interfaces, and generics. Understanding these will help you write more robust and maintainable code.',
    author: user2,
    // FIX: Added category property.
    category: 'Programming',
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 6).toISOString(),
  };
   const post3: Post = {
    _id: 'post3',
    title: 'Styling in modern web apps',
    content: 'CSS-in-JS is a styling technique that has gained popularity. Libraries like Styled Components and Emotion allow you to write actual CSS code in your JavaScript files. This brings many advantages like scoped styles, dynamic styling based on props, and easier management of styles alongside components.',
    author: user1,
    // FIX: Added category property.
    category: 'Web Development',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  };
  const post4: Post = {
    _id: 'post4',
    title: 'My Journey to Japan',
    content: 'Exploring the vibrant streets of Tokyo, the serene temples of Kyoto, and the delicious food in Osaka. This post covers my two-week itinerary, travel tips, and cultural experiences. Japan is a country of amazing contrasts, and I can\'t wait to share my adventure with you all.',
    author: user2,
    category: 'Travel',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  };
  const post5: Post = {
    _id: 'post5',
    title: 'The Pomodoro Technique: A Guide to Ultimate Productivity',
    content: 'The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. This post explains how to implement it and how it can drastically improve your focus.',
    author: user1,
    category: 'Productivity',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  };
  const post6: Post = {
    _id: 'post6',
    title: 'The Perfect Sourdough Bread',
    content: 'Baking sourdough bread can seem intimidating, but with the right guidance, it\'s a rewarding experience. This guide provides a step-by-step recipe, from maintaining your starter to achieving the perfect crust and crumb. Get ready to fill your home with the incredible aroma of freshly baked bread.',
    author: user2,
    category: 'Food',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  };
  const post7: Post = {
    _id: 'post7',
    title: 'Minimalist Living: How to Declutter Your Life',
    content: 'Minimalism is about more than just having a tidy home; it\'s a mindset. By intentionally living with only the things you really need, you can free up your time, money, and mental space for what truly matters. This article explores the philosophy of minimalism and offers practical tips for starting your journey.',
    author: user1,
    category: 'Lifestyle',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  };

  const comment1: Comment = {
    _id: 'comment1',
    text: 'Great introduction to Hooks! Very clear and concise.',
    author: user2,
    post: 'post1',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }

  db = {
    users: [user1, user2],
    posts: [post1, post2, post3, post4, post5, post6, post7],
    comments: [comment1],
    // FIX: Added categories to the database.
    categories: ['Technology', 'Programming', 'Web Development', 'Lifestyle', 'Travel', 'Productivity', 'Food'],
  };
};

// Load DB on startup
loadDb();


// --- API FUNCTIONS ---
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Auth
export const login = async (credentials: LoginCredentials): Promise<{ token: string; user: User }> => {
  await delay(500);
  const user = db.users.find(u => u.email === credentials.email);
  if (user) {
    return { token: `mock-token-${user._id}`, user };
  }
  throw new Error('Invalid credentials');
};

export const register = async (userData: RegisterUserData): Promise<{ token: string; user: User }> => {
  await delay(500);
  if (db.users.some(u => u.email === userData.email)) {
    throw new Error('Email already exists');
  }
  if (db.users.some(u => u.username === userData.username)) {
    throw new Error('Username already exists');
  }
  const newUser: User = {
    _id: generateId(),
    username: userData.username,
    email: userData.email,
  };
  db.users.push(newUser);
  saveDb();
  return { token: `mock-token-${newUser._id}`, user: newUser };
};

// Posts
export const getPosts = async (): Promise<Post[]> => {
  await delay(500);
  return [...db.posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getPost = async (id: string): Promise<Post> => {
  await delay(300);
  const post = db.posts.find(p => p._id === id);
  if (!post) throw new Error('Post not found');
  return post;
};

// FIX: Updated createPost to accept and handle 'category'.
export const createPost = async (postData: { title: string; content: string; category: string }): Promise<Post> => {
  await delay(500);
  const userJson = localStorage.getItem('user');
  if (!userJson) throw new Error('User not authenticated');
  const author = JSON.parse(userJson);

  // Add new category to the list if it doesn't exist
  if (!db.categories.includes(postData.category)) {
    db.categories.push(postData.category);
  }

  const newPost: Post = {
    _id: generateId(),
    ...postData,
    author,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.posts.push(newPost);
  saveDb();
  return newPost;
};

// FIX: Updated updatePost to accept and handle 'category'.
export const updatePost = async (id: string, postData: { title: string; content: string; category: string }): Promise<Post> => {
    await delay(500);
    const postIndex = db.posts.findIndex(p => p._id === id);
    if (postIndex === -1) throw new Error('Post not found');
    
    // Add new category to the list if it doesn't exist
    if (!db.categories.includes(postData.category)) {
      db.categories.push(postData.category);
    }

    db.posts[postIndex] = {
        ...db.posts[postIndex],
        ...postData,
        updatedAt: new Date().toISOString()
    };
    saveDb();
    return db.posts[postIndex];
};

export const deletePost = async (id: string): Promise<void> => {
    await delay(500);
    db.posts = db.posts.filter(p => p._id !== id);
    db.comments = db.comments.filter(c => c.post !== id);
    saveDb();
};

// Comments
export const getCommentsForPost = async (postId: string): Promise<Comment[]> => {
  await delay(300);
  return db.comments.filter(c => c.post === postId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};

export const addComment = async (postId: string, text: string): Promise<Comment> => {
  await delay(400);
  const userJson = localStorage.getItem('user');
  if (!userJson) throw new Error('User not authenticated');
  const author = JSON.parse(userJson);

  const newComment: Comment = {
    _id: generateId(),
    text,
    author,
    post: postId,
    createdAt: new Date().toISOString(),
  };
  db.comments.push(newComment);
  saveDb();
  return newComment;
};

// Users
export const getUser = async (id: string): Promise<User> => {
    await delay(300);
    const user = db.users.find(u => u._id === id);
    if (!user) throw new Error('User not found');
    return user;
};

export const getPostsByUser = async (userId: string): Promise<Post[]> => {
    await delay(300);
    return db.posts.filter(p => p.author._id === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const updateUserBio = async (userId: string, bio: string): Promise<User> => {
  await delay(400);
  const userIndex = db.users.findIndex(u => u._id === userId);
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  db.users[userIndex].bio = bio;
  
  // Also update the user in localStorage if they are the current user
  const currentUserJson = localStorage.getItem('user');
  if (currentUserJson) {
      const currentUser = JSON.parse(currentUserJson);
      if (currentUser._id === userId) {
          localStorage.setItem('user', JSON.stringify(db.users[userIndex]));
      }
  }

  saveDb();
  return db.users[userIndex];
};

// Search
export const searchPosts = async (query: string): Promise<Post[]> => {
  await delay(400);
  const lowercasedQuery = query.toLowerCase();
  return db.posts.filter(post => 
    post.title.toLowerCase().includes(lowercasedQuery) || 
    post.content.toLowerCase().includes(lowercasedQuery)
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// FIX: Added getCategories function.
// Categories
export const getCategories = async (): Promise<string[]> => {
  await delay(100);
  return [...db.categories];
};