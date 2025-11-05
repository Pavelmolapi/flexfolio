# FlexFolio

A full-stack application with React frontend and Spring Boot backend.

## Project Structure

```
flexfolio/
├── backend/          # Spring Boot backend
└── frontend/         # React frontend
```

## Backend (Spring Boot)

### Prerequisites
- Java 17 or higher
- Maven 3.6+

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:8080`

### API Endpoints

- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/{id}` - Update a user
- `DELETE /api/users/{id}` - Delete a user

### H2 Console

Access the H2 database console at: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:flexfoliodb`
- Username: `sa`
- Password: (leave blank)

## Frontend (React)

### Prerequisites
- Node.js 16+ and npm

### Running the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will start on `http://localhost:3000`

## Features

- **User Management**: Create, read, update, and delete users
- **RESTful API**: Clean REST API architecture
- **Responsive UI**: Modern React interface with routing
- **CORS Enabled**: Frontend and backend communication configured
- **H2 Database**: In-memory database for development

## Technology Stack

### Backend
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database
- Lombok
- Maven

### Frontend
- React 18
- React Router DOM
- Axios
- CSS3

## Getting Started

1. Start the backend server (port 8080)
2. Start the frontend development server (port 3000)
3. Open `http://localhost:3000` in your browser
4. Navigate through the application to manage users

## Development

- Backend API runs on port 8080
- Frontend dev server runs on port 3000
- CORS is configured to allow requests from localhost:3000
