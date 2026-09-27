# Loop — Full-Stack Task Management Website

## Overview

**Loop** is a full-stack task management website built from scratch as my first full-stack project.

The project started as a simple todo-list application and evolved into a complete application with a React frontend, Node.js/Express backend, REST APIs, and MongoDB persistence.

The main goal was not only to build task-management features, but also to understand how a frontend communicates with a backend and how data flows from the UI to the database and back.

---

## Features

- Create new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed or incomplete
- Deadline and time management
- Automatic overdue status indication
- Task notes
- Persistent task storage using MongoDB
- REST API communication between frontend and backend
- Responsive interface for different screen sizes
- Add and update task forms through modal UI
- Dynamic task cards with completion, edit, and delete controls
- Task summary showing remaining and completed tasks

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- React Icons
- Fetch API

### Backend

- Node.js
- Express.js
- REST APIs
- Mongoose

### Database

- MongoDB / MongoDB Atlas

---

## Project Architecture

The application follows a basic full-stack architecture:

```text
React Frontend
      ↓
HTTP Request / REST API
      ↓
Express Router
      ↓
Controller
      ↓
Mongoose
      ↓
MongoDB
      ↓
Response
      ↓
React UI
```

The frontend is responsible for the user interface and client-side state, while the backend handles API requests, business logic, and database operations.

---

## CRUD Operations

Loop implements the basic CRUD workflow:

| Operation | Purpose |
|---|---|
| Create | Add a new task |
| Read | Fetch all tasks |
| Update | Edit task details or completion status |
| Delete | Remove a task |

Example API structure:

```text
POST   /task/add
GET    /task
POST   /task/update/:id
POST   /task/delete/:id
```

---

## Task Data

A task contains information such as:

```text
_id
title
deadline
note
Completed
```

The frontend collects the date and time separately, while the backend combines them into a single JavaScript/MongoDB `Date` value.

When an existing task is edited, the stored deadline is converted back into separate date and time values for the form.

---

## Frontend

The frontend was built with React and uses component-based architecture.

Some of the major UI components include:

- `MainPage`
- `NavBarComponent`
- `WeekSummary`
- `WeekCardContainer`
- `WeekCard`
- `FoldableWeekCard`
- `DisplayForm`
- `NewTaskForm`

React state is used to manage:

- Task list
- Add-task modal
- Update-task modal
- Form values
- Task completion state

The interface was designed with a clean, modern visual style using colored task cards, responsive layouts, status indicators, and interactive controls.

---

## Backend

The backend uses Express.js to expose REST endpoints.

The application uses:

- Express routers for API routing
- Controllers for request handling
- Mongoose models for database interaction
- JSON request/response handling
- MongoDB for persistent storage

Middleware such as:

```js
app.use(express.json());
```

allows the server to parse JSON data sent from the React frontend.

CORS is also required when the frontend and backend run on different development ports.

---

## Important Problems I Faced

One of the most valuable parts of building Loop was debugging the problems that appeared while connecting all the pieces.

### `req.body` was undefined

The frontend was sending JSON, but the Express server wasn't initially parsing it.

The issue was solved by using:

```js
app.use(express.json());
```

This helped me understand how request bodies are parsed before reaching a controller.

### Frontend and backend communication

The React frontend and Express backend run as separate applications during development, so API requests had to be correctly configured between them.

This also introduced CORS-related issues.

### MongoDB and Mongoose updates

I learned how Mongoose methods such as:

```js
find()
findOne()
findById()
findByIdAndUpdate()
```

behave differently and return different types of results.

I also learned how MongoDB's `_id` is used to identify individual documents.

### Date and time conversion

The form collects:

```text
Date
Time
```

separately, while MongoDB stores the deadline as one `Date`.

The application therefore has to convert:

```text
Date + Time
      ↓
MongoDB Date
```

and later:

```text
MongoDB Date
      ↓
Date + Time
```

when editing a task.

### Preserving task state

When editing a task, the existing `Completed` state needs to be preserved rather than accidentally reset.

This taught me to think carefully about which values belong to the form and which values belong to the existing database record.

### React re-rendering

I also encountered React's **"Too many re-renders"** error.

The issue came from changing state directly during rendering instead of performing the state update at the appropriate time.

This helped me understand why React state updates need to be handled carefully.

### Add vs Update modal state

The same form is used for both creating and updating tasks.

Managing:

```text
Add mode
Update mode
Cancel
Submit
```

required careful state handling so that closing an update form didn't accidentally open the add form or leave stale data behind.

### API response handling

After creating, updating, deleting, or completing a task, the frontend needs to reflect the latest database state.

This required fetching the updated task list after successful API operations.

---

## What I Learned

This project helped me understand full-stack development beyond individual technologies.

### Frontend

- React component architecture
- State management
- Controlled forms
- Conditional rendering
- Effects and component lifecycle
- Responsive UI design
- API integration

### Backend

- Express routing
- Controllers
- Middleware
- HTTP requests and responses
- REST API design
- JSON request handling
- CORS

### Database

- MongoDB documents
- Mongoose schemas and models
- CRUD operations
- MongoDB document IDs
- Updating existing documents
- Persisting application state

### Full-Stack Thinking

The biggest takeaway was understanding the complete data flow:

```text
User Action
    ↓
React State
    ↓
Fetch API Request
    ↓
Express Route
    ↓
Controller
    ↓
Mongoose
    ↓
MongoDB
    ↓
JSON Response
    ↓
React State Update
    ↓
Updated UI
```

---

## Challenges That Made the Project Valuable

The project was not just about getting the final UI to work.

Several small problems forced me to understand what was happening underneath the code.

For example:

- A missing route `/` caused an endpoint not to match.
- Using the wrong HTTP method caused a request not to reach the expected route.
- Incorrect form/state handling caused unexpected UI behavior.
- Date handling required understanding JavaScript `Date` objects and local time.
- Database updates required understanding how Mongoose identifies documents.
- React state issues showed why rendering and state updates must be separated.

Each problem became part of the learning process.

---

## Current Project Status

**Status: Completed**

Loop is my first full-stack project and gave me practical experience building and connecting:

```text
Frontend
   +
Backend
   +
REST API
   +
Database
```

The project also gave me a foundation for moving toward larger full-stack applications with more advanced features such as authentication, authorization, validation, deployment, and more complex data relationships.

---

## Key Takeaway

> **Built → Broke → Debugged → Learned → Improved**

Loop taught me that full-stack development is not just about writing code for the frontend or backend separately.

It's about understanding how every layer communicates, finding where something breaks, and knowing how to trace the problem through the entire application.

---

## Technologies

```text
React
Vite
JavaScript
Tailwind CSS
Node.js
Express.js
MongoDB
Mongoose
REST API
Git / GitHub
```
