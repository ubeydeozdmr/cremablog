# cremablog-frontend

This is the frontend for the Cremablog project. It is a simple and markdown-based blog application that allows users to create, read, update, and delete blog posts. The frontend is built with React and TypeScript.

## About CremaBlog Project

Cremablog is a markdown-based blog website project that is created using the MERN stack. The project aims to help users learn and practice the MERN stack effectively. The project is divided into three parts: backend, frontend, and design. The backend is created using Node.js, TypeScript, Express, and MongoDB. The frontend is created using React and TypeScript. The design is created using HTML, CSS, and JavaScript. The project is open-source and contributions are welcome.

## Check also the other Cremablog repositories

[cremablog](https://github.com/ubeydeozdmr/cremablog) - The main repository for the Cremablog project.

[cremablog-backend](https://github.com/ubeydeozdmr/cremablog-backend) - The backend for the Cremablog project.

[cremablog-template](https://github.com/ubeydeozdmr/cremablog-template) - A template repository for starting new blog projects.

## Getting Started

To get started with the project, you need to clone the repository and install the dependencies. You can do this by running the following commands:

```bash
git clone https://github.com/ubeydeozdmr/cremablog-frontend.git
cd cremablog-frontend
npm install
```

After installing the dependencies, you can start the development server by running the following command:

```bash
npm start
```

**Important:** You should also start the backend server to make the frontend work properly. You can find the backend repository [here](https://github.com/ubeydeozdmr/cremablog-backend).
**.env file** You should create a .env file in the root directory of the project and add the following environment variables:

```bash
VITE_API_URL=your-backend-url
VITE_PORT=your-frontend-port # Generally 3000
```

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

## Fix for CSS Warn Message

Because of Tailwind, you may see a warning message. To fix this, you may create a .vscode folder in the root directory and create a settings.json file in the .vscode folder. Add the following code to the settings.json file.

```json
{
  "css.lint.unknownAtRules": "ignore"
}
```
