# Frontend-Backend Authentication Integration Guide

## 🔐 Overview
This guide explains how the FlexFolio frontend integrates with the Spring Boot backend JWT authentication system.

## ✅ What Was Implemented

### 1. **Axios Interceptors**
Added request and response interceptors to handle JWT tokens automatically.

#### Request Interceptor
- Automatically attaches JWT token to every API request
- Reads token from `localStorage`
- Adds `Authorization: Bearer <token>` header

#### Response Interceptor
- Handles 401 Unauthorized errors
- Automatically logs out user when token expires
- Redirects to login page on authentication failure

### 2. **Backend API Integration**
Connected frontend auth service with Spring Boot endpoints:
- **Login**: `POST /api/auth/login`
- **Register**: `POST /api/auth/register`
- **Validate Token**: `POST /api/auth/validate`

### 3. **Token Management**
- JWT token stored in `localStorage` after successful login
- User info (email, userId, expiresIn) stored alongside token
- Token automatically included in all protected API requests
- Token removed on logout or when expired

### 4. **Updated Authentication Flow**
- User enters credentials → Login request to backend
- Backend validates and returns JWT token
- Frontend stores token in localStorage
- User redirected to Portfolio page
- All subsequent requests include JWT token
- Backend validates token on each request

## 📁 Files Modified

### 1. **services/api.js**
```javascript
// Added Axios Interceptors
api.interceptors.request.use(...)   // Adds JWT to requests
api.interceptors.response.use(...)  // Handles 401 errors

// Updated auth endpoints to match backend
realAuthService = {
  login: POST /auth/login
  signup: POST /auth/register
  validateToken: POST /auth/validate
}
```

### 2. **context/AuthContext.js**
```javascript
// Updated to handle backend JWT response format
login() {
  // Extracts: accessToken, email, userId, expiresIn
  // Stores in localStorage
}

signup() {
  // Better error handling for backend responses
}
```

### 3. **components/Login.js**
```javascript
// Redirects to /portfolio after successful login
navigate('/portfolio');
```

### 4. **Configuration Files**
- **`.env`**: Backend API URL configuration
- **`.env.example`**: Template for environment variables

## 🔧 Configuration

### Environment Variables (.env)
```env
# Backend API URL
REACT_APP_API_BASE_URL=http://localhost:8080/api

# Mock mode (false = use real backend)
REACT_APP_USE_MOCK=false
```

### How to Switch Between Mock and Real Backend
1. **Use Real Backend** (default):
   ```env
   REACT_APP_USE_MOCK=false
   ```

2. **Use Mock Authentication** (for testing without backend):
   ```env
   REACT_APP_USE_MOCK=true
   ```

## 🚀 Usage Flow

### 1. User Registration
```
Frontend                          Backend
   │                                 │
   │  POST /api/auth/register        │
   │  { email, password }            │
   ├────────────────────────────────>│
   │                                 │
   │  { message, userId, email }    │
   │<────────────────────────────────┤
   │                                 │
   └─ Navigate to /login
```

### 2. User Login
```
Frontend                          Backend
   │                                 │
   │  POST /api/auth/login           │
   │  { email, password }            │
   ├────────────────────────────────>│
   │                                 │
   │  { accessToken, userId,        │
   │    email, tokenType,            │
   │    expiresIn }                  │
   │<────────────────────────────────┤
   │                                 │
   ├─ Store token in localStorage
   ├─ Set isAuthenticated = true
   └─ Navigate to /portfolio
```

### 3. Protected API Requests
```
Frontend                          Backend
   │                                 │
   │  GET /api/portfolios            │
   │  Headers:                       │
   │    Authorization: Bearer <JWT>  │
   ├────────────────────────────────>│
   │                                 │
   │  [Interceptor adds JWT]         │
   │                                 ├─ Validate JWT
   │                                 ├─ Extract user info
   │                                 ├─ Process request
   │                                 │
   │  { portfolios data }            │
   │<────────────────────────────────┤
```

### 4. Token Expiration/Invalid Token
```
Frontend                          Backend
   │                                 │
   │  GET /api/portfolios            │
   │  Headers:                       │
   │    Authorization: Bearer <JWT>  │
   ├────────────────────────────────>│
   │                                 │
   │                                 ├─ JWT expired/invalid
   │                                 │
   │  401 UNAUTHORIZED               │
   │<────────────────────────────────┤
   │                                 │
   ├─ [Interceptor catches 401]
   ├─ Clear localStorage
   ├─ Set isAuthenticated = false
   └─ Redirect to /login
```

## 🧪 Testing Instructions

### Prerequisites
1. **Backend Running**: Start Spring Boot application
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Database Running**: Ensure PostgreSQL is running
   ```bash
   docker-compose up -d
   ```

3. **Frontend Environment**: Configure `.env` file
   ```bash
   cd frontend
   cp .env.example .env
   # Set REACT_APP_USE_MOCK=false
   ```

### Test Steps

#### 1. Test Registration
1. Navigate to `http://localhost:3000`
2. You'll be redirected to `/login`
3. Click "Pas encore de compte ? S'inscrire"
4. Enter email and password
5. Click "Créer le compte"
6. Should redirect to login page with success message

#### 2. Test Login
1. On login page, enter your credentials
2. Click "Se connecter"
3. Should redirect to `/portfolio` page
4. Check browser DevTools → Application → Local Storage
   - Should see `token` and `user` entries

#### 3. Test Protected Routes
1. While logged in, navigate to different pages:
   - `/about` - Should work
   - `/portfolio` - Should work
   - `/contact` - Should work
   - `/admin` - Should work

#### 4. Test Logout
1. Click "Déconnexion" in sidebar
2. Should redirect to `/login`
3. Check Local Storage - token and user should be cleared
4. Try accessing `/portfolio` - should redirect to `/login`

#### 5. Test Token in Requests
1. Open Browser DevTools → Network tab
2. Make any navigation (e.g., go to Portfolio)
3. Check the request headers
4. Should see: `Authorization: Bearer <your-jwt-token>`

#### 6. Test Token Expiration
1. Login successfully
2. In DevTools Console, run:
   ```javascript
   localStorage.setItem('token', 'invalid-token');
   ```
3. Try navigating to any page
4. Should redirect to login (401 error caught by interceptor)

## 🔍 Debugging

### Check Token in Browser
```javascript
// Open DevTools Console
localStorage.getItem('token');
localStorage.getItem('user');
```

### Decode JWT Token
1. Copy your token from localStorage
2. Go to https://jwt.io/
3. Paste token in "Encoded" section
4. See decoded payload with email, exp, iat

### Common Issues

#### Issue 1: CORS Error
**Symptom**: `Access-Control-Allow-Origin` error in console

**Solution**: Check backend CORS configuration in `SecurityConfig.java`
```java
.cors(cors -> cors.configurationSource(request -> {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
    // ...
}))
```

#### Issue 2: 401 on Every Request
**Symptom**: Always redirected to login

**Possible Causes**:
1. Token not saved in localStorage
2. Backend JWT secret mismatch
3. Token expired (24h default)

**Check**:
```javascript
// In DevTools Console
console.log(localStorage.getItem('token'));
```

#### Issue 3: Backend Not Receiving Token
**Symptom**: Backend returns 401, token not in request

**Check**: Interceptor is adding the header
```javascript
// In api.js, add console.log
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log('Token being sent:', token);
    // ...
});
```

## 📊 Backend JWT Response Format

### Login Response
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
  "tokenType": "Bearer",
  "userId": 1,
  "email": "user@example.com",
  "expiresIn": 86400000
}
```

### Registration Response
```json
{
  "message": "User registered successfully",
  "userId": 1,
  "email": "user@example.com"
}
```

### Error Response
```json
{
  "message": "Invalid credentials",
  "status": 401
}
```

## 🔐 Security Best Practices

### ✅ Already Implemented
- JWT stored in localStorage (XSS protection via CSP recommended)
- Token automatically included in requests
- Automatic logout on token expiration
- HTTPS recommended for production

### 🚀 Recommended Enhancements
1. **Refresh Token**: Implement refresh token mechanism
2. **Token Expiration Warning**: Warn user before token expires
3. **Secure Storage**: Consider httpOnly cookies for production
4. **CSRF Protection**: Add CSRF tokens for state-changing operations
5. **Rate Limiting**: Implement on login endpoint

## 📝 API Endpoints Reference

### Public Endpoints (No Token Required)
```
POST /api/auth/register    - Register new user
POST /api/auth/login       - Login and get JWT token
```

### Protected Endpoints (Token Required)
```
All other endpoints require Authorization header:
Authorization: Bearer <your-jwt-token>

Examples:
GET  /api/portfolios
POST /api/portfolios/{userId}
GET  /api/users
etc.
```

## 🎯 Next Steps

1. **Start Backend**: `mvn spring-boot:run`
2. **Start Frontend**: `npm start`
3. **Test Registration**: Create a new account
4. **Test Login**: Login with your credentials
5. **Verify Token**: Check localStorage and Network requests

---

**Status**: ✅ Frontend-Backend JWT Authentication Integration Complete!

**Last Updated**: November 12, 2025
