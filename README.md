FlexFolio 🚀
A full-stack application featuring a modern React frontend and a robust Spring Boot backend. Manage users seamlessly with CRUD operations, a clean REST API, and an intuitive UI – now enhanced with smooth animations for a more engaging experience!
React Spring Boot License: MIT
📹 Live Demo
Experience FlexFolio in action with this animated demo showcasing user creation, listing, editing, and deletion:
FlexFolio Demo Animation
(Note: This is a representative animation of a CRUD dashboard. Replace with your custom-recorded GIF for the exact app flow.)
📋 Table of Contents

Project Structure
Backend (Spring Boot)
Prerequisites
Running the Backend
API Endpoints
H2 Console

Frontend (React)
Prerequisites
Running the Frontend

✨ Features
🛠️ Technology Stack
🚀 Getting Started
💻 Development Notes
🎭 Animations
🤝 Contributing
📄 License

Project Structure
textflexfolio/
├── backend/          # Spring Boot backend
│   ├── src/
│   ├── pom.xml
│   └── ...
└── frontend/         # React frontend
    ├── public/
    ├── src/
    ├── package.json
    └── ...
Backend (Spring Boot) ⚙️
Prerequisites

Java 17 or higher
Maven 3.6+

Running the Backend

Navigate to the backend directory:bashcd backend
Run the application:bashmvn spring-boot:run

The backend will start on http://localhost:8080 🎯.
API Endpoints



































MethodEndpointDescriptionGET/api/usersGet all usersGET/api/users/{id}Get user by IDPOST/api/usersCreate a new userPUT/api/users/{id}Update a userDELETE/api/users/{id}Delete a user
H2 Console
Access the in-memory H2 database console at: http://localhost:8080/h2-console 🔍

JDBC URL: jdbc:h2:mem:flexfoliodb
Username: sa
Password: (leave blank)

Frontend (React) 🎨
Prerequisites

Node.js 16+ and npm

Running the Frontend

Navigate to the frontend directory:bashcd frontend
Install dependencies:bashnpm install
Start the development server:bashnpm start

The frontend will start on http://localhost:3000 🌐.
✨ Features

User Management: Full CRUD operations for users (Create, Read, Update, Delete) with smooth fade-in/out transitions
RESTful API: Clean, scalable architecture with Spring Boot
Responsive UI: Modern React interface with client-side routing via React Router and animated page transitions
CORS Enabled: Seamless communication between frontend and backend
H2 Database: Lightweight in-memory database for quick development and testing
Animated Interactions: Button hovers, list item entrances, and modal pop-ups with Framer Motion for delightful UX

🛠️ Technology Stack
Backend



































TechnologyVersionPurposeSpring Boot3.2.0Core web frameworkSpring Data JPA-Database ORMH2 Database-In-memory development DBLombok-Boilerplate reductionMaven3.6+Build tool
Frontend



































TechnologyVersionPurposeReact18UI libraryReact Router DOM-Client-side routingAxios-HTTP clientCSS3-StylingFramer Motion-Smooth animations & gestures
🚀 Getting Started

Start the Backend: Run mvn spring-boot:run in the backend/ directory (port 8080).
Start the Frontend: Run npm start in the frontend/ directory (port 3000).
Open http://localhost:3000 in your browser.
Explore the app: Add, view, edit, or delete users via the intuitive, animated interface!

💻 Development

Backend API: Runs on port 8080.
Frontend Dev Server: Runs on port 3000.
CORS Configuration: Allows requests from localhost:3000 to ensure smooth integration.
Hot Reload: Frontend changes auto-reload; backend requires restart for most changes.
Animation Tweaks: Customize animations in src/components/ using Framer Motion variants for entrance/exit effects.

🎭 Animations
To bring FlexFolio to life, we've integrated Framer Motion for fluid animations:

Page Transitions: Slide-in effects when navigating between user list and edit forms.
List Animations: Staggered fade-ins for user cards on load.
Interactive Elements: Scale and color shifts on button hovers; modal entrances with spring physics.
Loading States: Skeleton loaders with pulse animations during API calls.

Example snippet in React components:
jsximport { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* User Card Content */}
</motion.div>
🤝 Contributing
Contributions are welcome! Fork the repo, create a feature branch, and submit a pull request. For major changes, please open an issue first. Feel free to suggest new animations!
