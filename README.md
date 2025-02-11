# CremaBlog

Cremablog is a markdown-based blog website project that is created using the MERN stack. The project aims to help users learn and practice the MERN stack effectively. The project is divided into three parts: backend, frontend, and design. The backend is created using Node.js, TypeScript, Express, and MongoDB. The frontend is created using React and TypeScript. The design is created using HTML, CSS, and JavaScript. The project is open-source and contributions are welcome.

## Features

- Create, read, update, and delete blog posts
- Login and signup
- User authentication/authorization
- User roles
- User profile
- Search blog posts
- Dark mode
- Responsive design

## Technologies

- Node.js
- TypeScript
- Express
- MongoDB
- React
- HTML
- CSS
- JavaScript

## Installation

1. Clone the repository
2. Install the dependencies
3. Create a `.env` file in the backend folder and add the following environment variables:

```
NODE_ENV=development # or production
PORT=5000
EXPRESS_RATE_LIMIT_WINDOW_MINUTES=15
EXPRESS_RATE_LIMIT_MAX=100
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=30
```

4. Run the backend server
5. Create a `.env` file in the frontend folder and add the following environment variables:

```bash
VITE_API_URL=your-backend-url
VITE_PORT=your-frontend-port # Generally 3000
```

6. Run the frontend server

## Usage

1. Create a new blog post (you need to login first and have the `author` or `admin` role)
2. Read a blog post
3. Update a blog post (you can only update your own blog posts)
4. Delete a blog post (you can only delete your own blog posts unless you have the `admin` role)
5. Login
6. Signup
7. Search blog posts
8. Switch to dark mode

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Fix for CSS Warn Message

> (for /template and /frontend)

Because of Tailwind, you may see a warning message. To fix this, you may create a .vscode folder in the `/template` and `/frontend` directories and create a settings.json file in the .vscode folder. Add the following code to the settings.json file.
