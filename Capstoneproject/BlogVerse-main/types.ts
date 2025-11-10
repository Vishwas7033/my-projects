
export interface User {
  _id: string;
  username: string;
  email: string;
  bio?: string;
  profilePicture?: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: User;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  text: string;
  author: User;
  post: string;
  createdAt: string;
}

// --- TYPE DEFINITIONS ---
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterUserData {
  username: string;
  email: string;
  password: string;
}
