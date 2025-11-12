<div align="center">
  <h1>🌟 FlexFolio 🌟</h1>
  <p>
    <strong>A full-stack application with React frontend and Spring Boot backend</strong>
  </p>

  ![GitHub repo size](https://img.shields.io/github/repo-size/yourusername/FlexFolio)
  ![GitHub stars](https://img.shields.io/github/stars/yourusername/FlexFolio?style=social)
  ![GitHub forks](https://img.shields.io/github/forks/yourusername/FlexFolio?style=social)
  ![GitHub issues](https://img.shields.io/github/issues/yourusername/FlexFolio)
  ![GitHub license](https://img.shields.io/github/license/yourusername/FlexFolio)
</div>

---

## 📂 Project Structure

```bash
flexfolio/
├── backend/          # 🚀 Spring Boot backend
└── frontend/         # ✨ React frontend

🛠 Backend (Spring Boot)
📋 Prerequisites

Java 17 or higher
Maven 3.6+

🚀 Running the Backend

Navigate to the backend directory:
bash Copiercd backend

Run the application:
bash Copiermvn spring-boot\:run
The backend will start on http://localhost:8080

📡 API Endpoints
MethodEndpointDescriptionGET/api/usersGet all usersGET/api/users/{id}Get user by IDPOST/api/usersCreate a new userPUT/api/users/{id}Update a userDELETE/api/users/{id}Delete a user
🗄 H2 Console
Access the H2 database console at http://localhost:8080/h2-console

JDBC URL: jdbc:h2:mem:flexfoliodb
Username: sa
Password: (leave blank)


🎨 Frontend (React)
📋 Prerequisites

Node.js 16+ and npm

🚀 Running the Frontend

Navigate to the frontend directory:
bash Copiercd frontend

Install dependencies:
bash Copiernpm install

Start the development server:
bash Copiernpm start
The frontend will start on http://localhost:3000


✨ Features

User Management: Create, read, update, and delete users
RESTful API: Clean REST API architecture
Responsive UI: Modern React interface with routing
CORS Enabled: Frontend and backend communication configured
H2 Database: In-memory database for development


🛠 Technology Stack
Backend

Spring Boot 3.2.0
Spring Data JPA
H2 Database
Lombok
Maven

Frontend

React 18
React Router DOM
Axios
CSS3


🚀 Getting Started

Start the backend server (port 8080)
Start the frontend development server (port 3000)
Open http://localhost:3000 in your browser
Navigate through the application to manage users


🔧 Development

Backend API runs on port 8080
Frontend dev server runs on port 3000
CORS is configured to allow requests from localhost:3000


🤝 Contributing
Contributions are welcome! Please fork this repository and submit a pull request.

📜 License
This project is licensed under the MIT License.

<div align="center">
  <img src="https://media.giphy.com/media/l0HlNaQ6gWfllcjDO/giphy.gif" width="200" />
  <p>Made with ❤️ by <a href="https://github.com/yourusername">@yourusername</a></p>
</div>
```
