# To‑Do App (Local Data Store)

This project is a simple To‑Do List application built using an Express backend and a Vite/React/Tailwind CSS frontend. Unlike a typical MERN stack application that uses MongoDB for data storage, this project stores all to‑do data locally in a JSON file. The application supports the following features:

- **Create a To‑Do:** Add a new to‑do item.
- **Read To‑Dos:** Retrieve and display all to‑do items.
- **Edit a To‑Do:** Update the title of an existing to‑do item.
- **Mark as Complete/Incomplete:** Toggle a to‑do item's completion status.
- **Delete a To‑Do:** Remove a to‑do item from the list.

## Table of Contents

- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Functionality](#functionality)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Important Considerations](#important-considerations)
- [License](#license)

## Project Structure

```bash
local-todo-backend/
├── node_modules/
├── todos.json         // Local data store (initially contains "[]")
├── localData.js       // Module with helper functions to read/write JSON data
├── routes/
│   └── todoRoute.js   // Express API endpoints for CRUD operations
├── server.js          // Main Express server
├── package.json
└── README.md          // This file
frontend/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx      // Main React component
│   ├── index.css    // Tailwind CSS directives
│   └── main.jsx     // Entry point for React
├── package.json
└── README.md
```

## Setup Instructions

### Backend Setup

1. **Clone or Download the Repository:**

   Navigate to your chosen directory and clone the repository (or extract the ZIP file).

2. **Navigate to the Backend Folder:**

   ```bash
   cd local-todo-backend
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Review the Data Store:**

   Make sure there is a `todos.json` file in the project root. This file acts as the local database. It should be initialized with an empty array (`[]`).

5. **Start the Backend Server:**

   For development, start the server using nodemon:

   ```bash
   npm start
   ```

   The server will run on port `5000` by default. You should see a message like:

   ```bash
   Server is running on port 5000
   ```

### Frontend Setup

1. **Navigate to the Frontend Folder:**

   In a separate terminal window (or tab), navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Tailwind CSS:**

   This project uses Tailwind CSS for styling. Tailwind was set up via Vite using the following commands (already done for you):

   - Installed Tailwind, PostCSS, and Autoprefixer.
   - Configured `tailwind.config.js` to include the appropriate content paths.
   - Added Tailwind directives to `src/index.css`.

4. **Start the Frontend Development Server:**

   ```bash
   npm run dev
   ```

   Vite will serve your app (typically on [http://localhost:5173](http://localhost:5173)).

## Functionality

The application allows users to manage their to-do items through a simple, responsive UI. Here’s what you can do:

- **Add To‑Do:** Enter a new task in the input field and click the "Add" button.
- **Edit To‑Do:** Click the "Edit" button next to an item to update its title. After editing, click "Save" or "Cancel" to confirm or discard the changes.
- **Toggle Completion:** Click on the to‑do text to mark it as complete (or incomplete). Completed items are displayed with a line-through style.
- **Delete To‑Do:** Click the "Delete" button to remove an item from the list.

## API Endpoints

The backend provides the following endpoints:

- **GET** `/api/todos`  
  Retrieves all to‑do items from the local JSON file.

- **POST** `/api/todo/new`  
  Creates a new to‑do item.  
  **Request Body:**  

  ```json
  {
    "title": "Task title"
  }
  ```

- **PUT** `/api/todo/edit/:id`  
  Edits a to‑do item’s title.  
  **Request Body:**  

  ```json
  {
    "title": "Updated task title"
  }
  ```

- **GET** `/api/todo/toggleStatus/:id`  
  Toggles the completion status of a to‑do item.

- **DELETE** `/api/todo/delete/:id`  
  Deletes a to‑do item by its unique ID.

## Usage

1. **Start the Backend Server:**  
   Ensure the backend server is running on port 5000.

2. **Start the Frontend:**  
   Run the frontend server (Vite) on its default port (usually 5173).

3. **Interact with the App:**  
   Open your browser and navigate to the frontend URL (e.g., [http://localhost:5173](http://localhost:5173)). You can then add, edit, toggle, and delete to‑do items. All changes are persisted in the `todos.json` file on the backend.

## Important Considerations

- **Local Data Storage:**  
  This project uses a JSON file (`todos.json`) as a simple data store. It is suitable for learning or small personal projects. For production environments, consider using a robust database system.

- **Concurrency:**  
  Since the entire file is read and written on each operation, this approach may face issues with concurrent access in multi-user scenarios.

- **Error Handling:**  
  Basic error handling is included in the backend. Further improvements can be made for a production-level application.

- **Separation of Concerns:**  
  The backend and frontend are separated into distinct folders. Each has its own dependencies and can be deployed independently if required.

## License

This project is provided for educational purposes. You are free to use and modify the code as needed.

---
