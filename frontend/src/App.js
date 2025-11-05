import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>FlexFolio</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/users">Users</Link>
            <Link to="/add-user">Add User</Link>
          </nav>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/add-user" element={<UserForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home">
      <h2>Welcome to FlexFolio</h2>
      <p>A React + Spring Boot application</p>
    </div>
  );
}

export default App;
