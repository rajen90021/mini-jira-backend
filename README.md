# Mini Jira Backend

This is the backend API for the Mini Jira project, handling data persistence, authentication, and business logic.

## Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT (JsonWebToken)
- **Email Service**: Nodemailer

## Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (Local or Atlas)

## Configuration

Ensure you have a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

## Getting Started

1.  **Install Dependencies**

    ```bash
    npm install
    ```

2.  **Run Development Server**

    Starts the server with `nodemon` for hot-reloading.

    ```bash
    npm run dev
    ```

3.  **Start Production Server**

    ```bash
    npm start
    ```

## API Features

- **User Authentication**: Register, Login (JWT-based)
- **Project Management**: Create, read, update projects
- **Ticket Management**: Create, update, assign tickets
- **User Roles**: Developer, Manager, Admin
