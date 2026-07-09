Task Manager API

A REST API for managing tasks, built with Node.js and Express. This project
started as a buggy client handoff exercise and was debugged, fixed, and
restructured into a clean, production-style backend.

Tech Stack


Node.js
Express
JWT (jsonwebtoken)
express-validator


Features


CRUD operations for tasks (Create, Read, Update, Delete)
JWT-based authentication for protected routes
Input validation on task creation
Proper async error handling with try/catch
Clean project structure following standard Express conventions


Project Structure

task-api/
├── controllers/     # Route handler logic
├── models/          # Data models
├── routes/          # Route definitions
├── middleware/       # Auth and other middleware
└── server.js         # App entry point

Setup

bashgit clone <your-repo-url>
cd task-api
npm install
npm start

Server runs on http://localhost:3000 by default.

API Routes

MethodRouteAuth RequiredDescriptionGET/tasksNoGet all tasksGET/tasks/:idNoGet a single taskPOST/tasksYesCreate a new taskPUT/tasks/:idYesUpdate a taskDELETE/tasks/:idYesDelete a taskPOST/loginNoGet a JWT token

Example: Login

bashPOST /login
{
  "username": "admin",
  "password": "1234"
}

Returns a JWT token to use in the Authorization header for protected routes.

Example: Create Task

bashPOST /tasks
Authorization: <your-token>
{
  "title": "Finish client project"
}

What I Fixed

This project started as a buggy handoff from another developer. I diagnosed
and fixed the following real-world issues:


Body parsing bug — express.json() middleware was registered after
the routes, so req.body was always undefined on POST requests. Fixed
by moving it before route registration.
Unhandled async crash — an async DB call could reject, but the route
handler had no try/catch, causing an unhandled promise rejection and
server crash. Fixed with proper error handling.
Type mismatch bug — req.params.id is always a string, but task IDs
were stored as numbers, so strict equality comparisons silently failed.
Fixed by converting params to numbers before comparison.
Missing return after response — a 404 response was sent for a missing
task, but the code below it kept executing anyway, causing a crash. Fixed
by adding return after sending the response.
Broken auth middleware ordering — the protected route was registered
after a public route sharing the same URL prefix, so requests never
reached the auth check. Fixed by applying authMiddleware at the
individual route level instead of a shared prefix.
Missing input validation — POST /tasks accepted empty titles,
creating invalid data. Added express-validator to reject empty titles
with a 400 response.
Project restructuring — split logic into controllers/, models/,
and routes/ folders following standard Express project conventions.


Author

Built by Dhinesh Kumar as a backend development practice project.
