<!-- @format -->

# Event Management Dashboard

Frontend Live URL: https://fatmonk-event.vercel.app/

A modern full-stack Event Management Dashboard that allows users to create, view, update, and delete events with authentication support. Built using React for the frontend, Redux Toolkit for state management, and Node.js for the backend API.

## Features

- 🔐 Authentication (JWT-based, with token-protected routes)
- 📅 Event CRUD Operations (Create, Read, Update, Delete)
- 📦 Async Redux with createAsyncThunk
- 🧾 Form-data support for uploading media (e.g., event images)
- 🧭 Navigation using React Router
- 💅 Responsive UI with Tailwind CSS
- 🔁 Persistent state management with Redux
- 🌐 Hosted backend: fatmonk-event.onrender.com

## 🚀 Tech Stack

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: Simplifies Redux state management.
- **React Router DOM**: Enables dynamic routing.
- **Tailwind CSS**: A utility-first CSS framework.
- **Axios**: Promise-based HTTP client for the browser and Node.js.

### Backend

- **Node.js / Express**: Server-side JavaScript environment and web application framework.
- **MongoDB**: NoSQL database for storing data.
- **JWT for Auth**: JSON Web Tokens for secure authentication.
- **Render for Deployment**: Platform for hosting web applications.

🛠️ Folder Structure (Frontend)

```bash
src/
│
├── components/ # Reusable UI components (Header, Footer, EventComponent)
├── features/
│   └── events/ # Redux slice, async thunks for Events
├── pages/
│   └── Dashboard.jsx # Main dashboard displaying all events
├── App.jsx # Main routing setup
├── store.js # Redux store configuration
```

- **Components**: Reusable UI elements (Header, Footer, EventComponent)
- **Features**: Redux slice, async thunks for Events
- **Pages**: Dashboard.jsx (main dashboard displaying all events)
- **App.jsx**: Main routing setup
- **store.js**: Redux store configuration
- **index.js**: Entry point

Frontend Key Files

1. **Dashboard.jsx**
   Displays all events.

   Fetches data using useEffect + Redux.

   Allows navigation to event details page.

   Includes “Add Event” link.

2. **eventSlice.js**
   Manages:

   - fetchEvents, fetchEventById

   - createEvent, updateEvent, deleteEvent

   - Async state (loading, error)

   - Event owner fetching (getUser)

3. **EventComponent.jsx**
   A reusable card that displays individual event information.

Backend API Endpoints (Sample)

- **GET /api/events**: Get all events
- **GET /api/events/:id**: Get event by ID
- **POST /api/events**: Create new event (form-data)
- **PUT /api/events/:id**: Update event
- **DELETE /api/events/:id**: Delete event
- **POST /api/auth/getuser/:id**: Get event creator

How to Run Locally

1. Clone & install dependencies:
```bash
git clone https://github.com/tamimhasan19702/Fatmonk-event.git
cd Fatmonk-event/Client
npm install
```

2. Configure environment (`.env.local`):
```bash
VITE_API_URL=https://fatmonk-event.onrender.com/api
```

3. Start development server:
```bash
npm run dev
```

🧪 Future Improvements
Add search/filter events

Add pagination

Add comments or RSVPs

Role-based access (admin, user)

Better error boundaries

## 📘 Case Study

**Overview**
Fatmonk Event is a full-stack event management platform letting users register, log in, and perform CRUD on events with media uploads. Purpose: replace a manual/static event listing with a dynamic, authenticated dashboard that any organiser can use in real time.

**Challenges**
Bridging a React SPA to a MongoDB-backed Express API required careful async state handling and secure token-based auth. File uploads (form-data) had to work alongside JSON payloads, and the client needed to stay robust when the deployed backend was briefly unavailable.

**Architecture**
React + Redux Toolkit frontend talking to a Node.js/Express REST API over axios. Mongoose models persist events/auth to MongoDB Atlas. JWT guards protected routes; the client consumes `/api/events` and `/api/auth` endpoints and is deployed on Vercel, backend on Render.

**Future Improvements**
Add search, filters, and pagination so the dashboard scales. Introduce RSVP/comments, role-based access (admin vs user), and stronger error boundaries. Move to a dedicated API client layer and consider rate-limiting and caching for better reliability.

**Features**
JWT authentication, event CRUD with image upload, protected routes, responsive Tailwind UI, async Redux state, and a hosted production backend with a configurable API URL via environment variables.

**Tech Stack**
- Frontend: React, Redux Toolkit, React Router, Tailwind CSS, Axios, Vite
- Backend: Node.js, Express, Mongoose, MongoDB Atlas, JWT
- Deployment: Vercel (frontend), Render (backend)

🙌 Author
Tareq Monower
Professional MERN Stack & WordPress Developer
