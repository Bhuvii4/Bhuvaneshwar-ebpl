# Student Task Management System

A full-stack MERN application for managing student tasks with CRUD operations, search, filtering, and sorting.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)

## Project Structure

```
/project-root
    /client     (Frontend React App)
    /server     (Backend API)
```

## Prerequisites

- Node.js (v14+)
- MongoDB (Running locally or MongoDB Atlas URI)

## Setup Instructions

### 1. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory (or rename `.env.example`):

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/student-task-manager
# Or use your MongoDB Atlas Connection String
```

Start the backend server:

```bash
npm run dev
# Server runs on http://localhost:5000
```

### 2. Frontend Setup

Open a new terminal, navigate to the client directory, and install dependencies:

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
# App runs on http://localhost:5173
```

## Deployment

### Backend (Render/Railway)
- Root directory: `server`
- Build Command: `npm install`
- Start Command: `node server.js`
- Environment Variables: `MONGO_URI`, `PORT`

### Frontend (Vercel/Netlify)
- Root directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## Features

- **Dashboard**: View all tasks with priority color codes.
- **Add Task**: Create new tasks with Title, Description, Deadline, Priority.
- **Edit/Delete**: Update or remove tasks.
- **Search**: Filter tasks by title.
- **Filter**: Filter by Status (Pending/Completed) or Priority.
- **Sort**: Sort by Date Created or Deadline.

## Troubleshooting

### "running scripts is disabled on this system" Error

If you are using PowerShell and see an `UnauthorizedAccess` error when running `npm` commands, you need to change your execution policy.

**Option 1: Run this command in PowerShell first:**
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

**Option 2: Use Command Prompt (cmd)**
Simply open `cmd.exe` instead of PowerShell and run the commands there.

### "connect ECONNREFUSED 127.0.0.1:27017" Error

This means your backend cannot connect to MongoDB.

**Cause:** You do not have a local MongoDB server running.

**Solution 1: Start Local MongoDB**
If you have MongoDB installed, make sure the service is running.
- **Windows:** Search for "Services", find `MongoDB Server` and click "Start".
- **Mac/Linux:** Run `brew services start mongodb-community`.

**Solution 2: Use MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Cluster and get your **Connection String**.
3. It will look like: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase`
4. Update your `server/.env` file:
   ```env
   MONGO_URI=your_copied_connection_string
   ```
5. Restart the server.


