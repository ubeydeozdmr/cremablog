# cremablog-backend

This is the backend for the Cremablog project. It is a RESTful API built with MongoDB, Express, Node.js, TypeScript, and JWT authentication.

## About CremaBlog Project

Cremablog is a markdown-based blog website project that is created using the MERN stack. The project aims to help users learn and practice the MERN stack effectively. The project is divided into three parts: backend, frontend, and design. The backend is created using Node.js, TypeScript, Express, and MongoDB. The frontend is created using React and TypeScript. The design is created using HTML, CSS, and JavaScript. The project is open-source and contributions are welcome.

## Check also the other Cremablog repositories

[cremablog](https://github.com/ubeydeozdmr/cremablog) - The main repository for the Cremablog project.

[cremablog-frontend](https://github.com/ubeydeozdmr/cremablog-frontend) - The frontend repository for the Cremablog project.

[cremablog-template](https://github.com/ubeydeozdmr/cremablog-template) - A template repository for creating new blog projects.

## Installation

1. Clone the repository

```bash
git clone https://github.com/ubeydeozdmr/cremablog-backend.git
```

2. Install the dependencies

```bash
npm install
```

3. Create `.env`, `.env.development`, `.env.production` files in the root directory and add the following environment variables

```env
NODE_ENV=development # or production
PORT=5000
EXPRESS_RATE_LIMIT_WINDOW_MINUTES=15
EXPRESS_RATE_LIMIT_MAX=100
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=30
```

4. Run the development server

```bash
npm run dev
```

5. Start the server in production mode

```bash
npm start
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
