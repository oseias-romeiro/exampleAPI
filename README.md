# Web App CRUD with Express, SQLite, and Sequelize

This is a simple web app that demonstrates CRUD (Create, Read, Update, Delete) operations using Express, SQLite with Sequelize for the database, flash messages for feedback, and authentication with admin user privileges.

## Features

- User registration and login
- CRUD operations for users (for admins)
- Flash messages for user feedback
- Authentication with admin user privileges

## Prerequisites
Make sure you have Node.js and npm installed on your machine.

## Usage
All configurations environments is set in [config/config.js](./config/config.js) and loads from .env file in project path

```bash
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm start
```

> Access the app in browser [localhost:3000](http://localhost:3000)

## Routes

- /: Index page
- /account/login: Login page
- /account/signup: Signup page
- /home: Home page
- /users: User listing page (for admins)
- /users/create: User creation page (for admins)
- /users/:id/edit: User edit page (for admins)
