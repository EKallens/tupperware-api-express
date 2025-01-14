# 🍲 Tupperware App - Backend

**Tupperware App Backend** is a REST API built with **Node.js**, **Express.js**, and **MongoDB** for managing cooking recipes. It handles user authentication, recipe management, and API security, serving the frontend.

---

## **🚀 Features**

-   **User Authentication**: Secure login and registration using **JWT**.
-   **CRUD Operations**: Create, read, update, and delete recipes.
-   **Favorites System**: Mark and unmark recipes as favorites.
-   **Tags for Categorization**: Add tags to categorize recipes.
-   **Secure API Endpoints**: Authentication and validation on protected routes.
-   **Image Upload**: Option to upload recipe photos.

---

## **🛠️ Tech Stack**

-   **Node.js**: Server-side JavaScript runtime.
-   **Express.js**: Framework for building APIs.
-   **MongoDB**: NoSQL database for data storage.
-   **Mongoose**: ODM for MongoDB.
-   **Zod**: Input validation.
-   **Railway**: Cloud platform for deployment.

---

## **📋 Environment Variables**

Create a `.env` file in the root directory of the backend and include the following variables:

```plaintext
PORT=5000
MONGO_URL=
MONGO_DB_NAME=
JWT_SEED=
ALLOWED_ORIGINS=
NODE_ENV=development
MAILTRAP_TOKEN=
CLIENT_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## **🚀 API Endpoints**

### **Authentication**

-   `POST /api/auth/register`: Register a new user.
-   `POST /api/auth/login`: User login.
-   `POST /api/auth/verify-email`: Verify a new user.
-   `POST /api/auth/forgot-password`: Password recovery.
-   `POST /api/auth/reset-password/`: Password reset.
-   `GET  /api/auth/check-auth`: Check Authentication
-   `POST /api/auth/logout`: User logout

### **Recipes**

-   `GET /api/recipes`: Get all recipes.
-   `POST /api/recipes`: Create a new recipe.
-   `PATCH /api/recipes/:id`: Update a recipe by ID.
-   `DELETE /api/recipes/:id`: Delete a recipe by ID.

---

## **🔧 Installation and Setup**

### **Prerequisites**

-   **Node.js** (v18 or higher)
-   **MongoDB**

### **Installation Steps**

1. Clone the repository:

    ```bash
    $ git clone https://github.com/EKallens/recipes-api-express.git
    $ cd recipes-api-express
    ```

2. Install dependencies:

    ```bash
    $ npm install
    ```

3. Start the server in development mode:

    ```bash
    $ npm run dev
    ```

4. The backend will be running at:
    ```plaintext
    http://localhost:5000
    ```

---

## **🚀 Deployment**

The backend is deployed on **Railway**.

[![Deployment](https://img.shields.io/badge/deployed%20on-Railway-purple?logo=railway)](https://railway.app/)

---

## **🤝 Contributions**

Contributions are welcome! Feel free to open a pull request or report issues in the `issues` section of the repository.

---
