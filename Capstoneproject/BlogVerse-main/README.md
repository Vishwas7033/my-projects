
# MERN Blog Platform (BLOGVERSE)

This project is a complete implementation of a dynamic and interactive multi-user blogging platform. It is built with React, TypeScript, and Tailwind CSS, and it fully simulates a backend API to provide a comprehensive user experience.

## Important Note

This repository contains the **frontend-only** portion of the MERN stack application. The backend (Node.js, Express, MongoDB) is not included. Instead, a **mock API** has been created in `src/services/mockApi.ts` to simulate all backend functionalities, including user authentication, CRUD operations for posts, and comments. This allows the frontend to be fully interactive and demonstrate all the required features without needing a live database or server.

## Features

-   **User Authentication**: Simulated user registration, login, and logout.
-   **JWT-based Session Management**: Mock JWTs are stored in local storage to maintain user sessions across browser reloads.
-   **Protected Routes**: Certain actions and pages (like creating a post) are only accessible to authenticated users.
-   **Blog Post Management (CRUD)**:
    -   **Create**: Authenticated users can create new blog posts.
    -   **Read**: All users can view a list of all posts and read individual posts.
    -   **Update**: Authors can edit their own posts.
    -   **Delete**: Authors can delete their own posts.
-   **Comment System**: Authenticated users can add comments to any blog post.
-   **User Profiles**: View a user's profile page, which includes their bio and a list of all posts they have created.
-   **Responsive Design**: The UI is fully responsive and works beautifully on devices of all sizes, from mobile phones to desktops.

## Tech Stack

-   **Framework/Library**: React 18
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Routing**: React Router (`HashRouter`)
-   **State Management**: React Context API & Hooks

## Running the Project Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v16 or later)
-   npm or yarn

### Installation & Startup

1.  **Clone the repo**
    ```sh
    git clone <your-repo-url>
    cd <repo-folder>
    ```

2.  **Install NPM packages**
    ```sh
    npm install
    ```

3.  **Start the development server**
    ```sh
    npm start
    ```

The application will open automatically in your default browser at `http://localhost:3000` (or another port if 3000 is occupied).

## Project Structure

The project follows a standard, scalable React application structure:

```
/
├── public/               # Public assets
├── src/
│   ├── components/       # Reusable UI components (Navbar, PostCard, etc.)
│   ├── context/          # React context for global state (AuthContext)
│   ├── hooks/            # Custom hooks (useAuth)
│   ├── pages/            # Page-level components (HomePage, PostPage, etc.)
│   ├── services/         # Mock API service to simulate backend
│   ├── App.tsx           # Main app component with routing
│   ├── index.tsx         # Application entry point
│   └── types.ts          # TypeScript type definitions
├── .gitignore
├── package.json
└── README.md
```
