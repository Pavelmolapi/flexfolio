# Flexfolio API - Complete Testing Guide

## Base URL
```
http://localhost:8080
```

---

## 📋 USER ENDPOINTS

### 1. Create User
**Endpoint:** `POST /api/users`

**Description:** Create a new user in the system

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** 201 CREATED
```json
{
  "id": 1,
  "email": "user@example.com",
  "password": "password123",
  "createdAt": "2025-11-06T10:30:00",
  "portfolios": []
}
```

---

### 2. Get All Users
**Endpoint:** `GET /api/users`

**Description:** Retrieve all users from the system

**Response:** 200 OK
```json
[
  {
    "id": 1,
    "email": "user1@example.com",
    "password": "hashedpassword",
    "createdAt": "2025-11-06T10:30:00",
    "portfolios": []
  },
  {
    "id": 2,
    "email": "user2@example.com",
    "password": "hashedpassword",
    "createdAt": "2025-11-06T10:35:00",
    "portfolios": []
  }
]
```

---

### 3. Get User by ID
**Endpoint:** `GET /api/users/{id}`

**Description:** Retrieve a specific user by their ID

**Path Parameters:**
- `id` (Long): User ID (e.g., 1)

**Response:** 200 OK
```json
{
  "id": 1,
  "email": "user@example.com",
  "password": "hashedpassword",
  "createdAt": "2025-11-06T10:30:00",
  "portfolios": []
}
```

**Error Response:** 404 NOT FOUND

---

### 4. Update User
**Endpoint:** `PUT /api/users/{id}`

**Description:** Update an existing user's information

**Path Parameters:**
- `id` (Long): User ID (e.g., 1)

**Request Body:**
```json
{
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```

**Response:** 200 OK
```json
{
  "id": 1,
  "email": "newemail@example.com",
  "password": "newpassword123",
  "createdAt": "2025-11-06T10:30:00",
  "portfolios": []
}
```

---

### 5. Delete User
**Endpoint:** `DELETE /api/users/{id}`

**Description:** Delete a user from the system

**Path Parameters:**
- `id` (Long): User ID (e.g., 1)

**Response:** 204 NO CONTENT

---

## 📁 PORTFOLIO ENDPOINTS

### 1. Create Portfolio for User
**Endpoint:** `POST /api/portfolios/{userId}`

**Description:** Create a new portfolio for a specific user

**Path Parameters:**
- `userId` (Long): User ID (e.g., 1)

**Request Body:**
```json
{
  "experiences": [],
  "educations": []
}
```

**Response:** 201 CREATED
```json
{
  "idPortfolio": 1,
  "user": {
    "id": 1,
    "email": "user@example.com"
  },
  "experiences": [],
  "educations": []
}
```

---

### 2. Get All Portfolios
**Endpoint:** `GET /api/portfolios`

**Description:** Retrieve all portfolios from the system

**Response:** 200 OK
```json
[
  {
    "idPortfolio": 1,
    "user": {
      "id": 1,
      "email": "user1@example.com"
    },
    "experiences": [],
    "educations": []
  },
  {
    "idPortfolio": 2,
    "user": {
      "id": 2,
      "email": "user2@example.com"
    },
    "experiences": [],
    "educations": []
  }
]
```

---

### 3. Get Portfolio by ID
**Endpoint:** `GET /api/portfolios/{id}`

**Description:** Retrieve a specific portfolio by its ID

**Path Parameters:**
- `id` (Long): Portfolio ID (e.g., 1)

**Response:** 200 OK
```json
{
  "idPortfolio": 1,
  "user": {
    "id": 1,
    "email": "user@example.com"
  },
  "experiences": [],
  "educations": []
}
```

---

### 4. Get Portfolios by User ID
**Endpoint:** `GET /api/portfolios/user/{userId}`

**Description:** Retrieve all portfolios for a specific user

**Path Parameters:**
- `userId` (Long): User ID (e.g., 1)

**Response:** 200 OK
```json
[
  {
    "idPortfolio": 1,
    "user": {
      "id": 1,
      "email": "user@example.com"
    },
    "experiences": [],
    "educations": []
  }
]
```

---

### 5. Update Portfolio
**Endpoint:** `PUT /api/portfolios/{id}`

**Description:** Update an existing portfolio

**Path Parameters:**
- `id` (Long): Portfolio ID (e.g., 1)

**Request Body:**
```json
{
  "user": {
    "id": 1
  }
}
```

**Response:** 200 OK
```json
{
  "idPortfolio": 1,
  "user": {
    "id": 1
  },
  "experiences": [],
  "educations": []
}
```

---

### 6. Delete Portfolio
**Endpoint:** `DELETE /api/portfolios/{id}`

**Description:** Delete a portfolio from the system

**Path Parameters:**
- `id` (Long): Portfolio ID (e.g., 1)

**Response:** 204 NO CONTENT

---

## 💼 EXPERIENCE ENDPOINTS

### 1. Create Experience
**Endpoint:** `POST /api/experiences/{portfolioId}`

**Description:** Create a new experience entry for a portfolio

**Path Parameters:**
- `portfolioId` (Long): Portfolio ID (e.g., 1)

**Request Body:**
```json
{
  "position": "Senior Developer",
  "employer": "Tech Company",
  "city": "New York",
  "country": "USA",
  "startDate": "2020-01-15",
  "endDate": "2023-12-31",
  "responsibilities": "Developed and maintained web applications using Spring Boot and React",
  "ongoing": false
}
```

**Response:** 201 CREATED
```json
{
  "idExp": 1,
  "position": "Senior Developer",
  "employer": "Tech Company",
  "city": "New York",
  "country": "USA",
  "startDate": "2020-01-15",
  "endDate": "2023-12-31",
  "responsibilities": "Developed and maintained web applications using Spring Boot and React",
  "ongoing": false,
  "portfolio": {
    "idPortfolio": 1
  }
}
```

---

### 2. Create Experience (Ongoing)
**Endpoint:** `POST /api/experiences/{portfolioId}`

**Description:** Create an ongoing experience entry (endDate will be automatically set to null)

**Path Parameters:**
- `portfolioId` (Long): Portfolio ID (e.g., 1)

**Request Body:**
```json
{
  "position": "Lead Developer",
  "employer": "StartUp Inc",
  "city": "San Francisco",
  "country": "USA",
  "startDate": "2023-01-01",
  "endDate": null,
  "responsibilities": "Leading a team of developers",
  "ongoing": true
}
```

**Response:** 201 CREATED
```json
{
  "idExp": 2,
  "position": "Lead Developer",
  "employer": "StartUp Inc",
  "city": "San Francisco",
  "country": "USA",
  "startDate": "2023-01-01",
  "endDate": null,
  "responsibilities": "Leading a team of developers",
  "ongoing": true,
  "portfolio": {
    "idPortfolio": 1
  }
}
```

---

### 3. Get All Experiences
**Endpoint:** `GET /api/experiences`

**Description:** Retrieve all experience entries from the system

**Response:** 200 OK
```json
[
  {
    "idExp": 1,
    "position": "Senior Developer",
    "employer": "Tech Company",
    "city": "New York",
    "country": "USA",
    "startDate": "2020-01-15",
    "endDate": "2023-12-31",
    "responsibilities": "Developed and maintained web applications",
    "ongoing": false,
    "portfolio": {
      "idPortfolio": 1
    }
  }
]
```

---

### 4. Get Experience by ID
**Endpoint:** `GET /api/experiences/{id}`

**Description:** Retrieve a specific experience entry by its ID

**Path Parameters:**
- `id` (Long): Experience ID (e.g., 1)

**Response:** 200 OK
```json
{
  "idExp": 1,
  "position": "Senior Developer",
  "employer": "Tech Company",
  "city": "New York",
  "country": "USA",
  "startDate": "2020-01-15",
  "endDate": "2023-12-31",
  "responsibilities": "Developed and maintained web applications",
  "ongoing": false,
  "portfolio": {
    "idPortfolio": 1
  }
}
```

---

### 5. Get Experiences by Portfolio ID
**Endpoint:** `GET /api/experiences/portfolio/{portfolioId}`

**Description:** Retrieve all experiences for a specific portfolio

**Path Parameters:**
- `portfolioId` (Long): Portfolio ID (e.g., 1)

**Response:** 200 OK
```json
[
  {
    "idExp": 1,
    "position": "Senior Developer",
    "employer": "Tech Company",
    "city": "New York",
    "country": "USA",
    "startDate": "2020-01-15",
    "endDate": "2023-12-31",
    "responsibilities": "Developed and maintained web applications",
    "ongoing": false,
    "portfolio": {
      "idPortfolio": 1
    }
  }
]
```

---

### 6. Update Experience
**Endpoint:** `PUT /api/experiences/{id}`

**Description:** Update an existing experience entry

**Path Parameters:**
- `id` (Long): Experience ID (e.g., 1)

**Request Body:**
```json
{
  "position": "Senior Software Engineer",
  "employer": "Updated Company",
  "city": "Boston",
  "country": "USA",
  "startDate": "2020-01-15",
  "endDate": "2024-06-30",
  "responsibilities": "Updated responsibilities",
  "ongoing": false
}
```

**Response:** 200 OK
```json
{
  "idExp": 1,
  "position": "Senior Software Engineer",
  "employer": "Updated Company",
  "city": "Boston",
  "country": "USA",
  "startDate": "2020-01-15",
  "endDate": "2024-06-30",
  "responsibilities": "Updated responsibilities",
  "ongoing": false,
  "portfolio": {
    "idPortfolio": 1
  }
}
```

---

### 7. Delete Experience
**Endpoint:** `DELETE /api/experiences/{id}`

**Description:** Delete an experience entry from the system

**Path Parameters:**
- `id` (Long): Experience ID (e.g., 1)

**Response:** 204 NO CONTENT

---

## 🎓 EDUCATION ENDPOINTS

### 1. Create Education
**Endpoint:** `POST /api/educations/{portfolioId}`

**Description:** Create a new education entry for a portfolio

**Path Parameters:**
- `portfolioId` (Long): Portfolio ID (e.g., 1)

**Request Body:**
```json
{
  "titleOfQualification": "Bachelor of Science",
  "training": "Computer Science",
  "city": "Boston",
  "country": "USA",
  "startDate": "2016-09-01",
  "endDate": "2020-05-31",
  "ongoing": false
}
```

**Response:** 201 CREATED
```json
{
  "idEdu": 1,
  "titleOfQualification": "Bachelor of Science",
  "training": "Computer Science",
  "city": "Boston",
  "country": "USA",
  "startDate": "2016-09-01",
  "endDate": "2020-05-31",
  "ongoing": false,
  "portfolio": {
    "idPortfolio": 1
  }
}
```

---

### 2. Create Education (Ongoing)
**Endpoint:** `POST /api/educations/{portfolioId}`

**Description:** Create an ongoing education entry (endDate will be automatically set to null)

**Path Parameters:**
- `portfolioId` (Long): Portfolio ID (e.g., 1)

**Request Body:**
```json
{
  "titleOfQualification": "Master of Science",
  "training": "Artificial Intelligence",
  "city": "San Francisco",
  "country": "USA",
  "startDate": "2023-08-15",
  "endDate": null,
  "ongoing": true
}
```

**Response:** 201 CREATED
```json
{
  "idEdu": 2,
  "titleOfQualification": "Master of Science",
  "training": "Artificial Intelligence",
  "city": "San Francisco",
  "country": "USA",
  "startDate": "2023-08-15",
  "endDate": null,
  "ongoing": true,
  "portfolio": {
    "idPortfolio": 1
  }
}
```

---

### 3. Get All Educations
**Endpoint:** `GET /api/educations`

**Description:** Retrieve all education entries from the system

**Response:** 200 OK
```json
[
  {
    "idEdu": 1,
    "titleOfQualification": "Bachelor of Science",
    "training": "Computer Science",
    "city": "Boston",
    "country": "USA",
    "startDate": "2016-09-01",
    "endDate": "2020-05-31",
    "ongoing": false,
    "portfolio": {
      "idPortfolio": 1
    }
  }
]
```

---

### 4. Get Education by ID
**Endpoint:** `GET /api/educations/{id}`

**Description:** Retrieve a specific education entry by its ID

**Path Parameters:**
- `id` (Long): Education ID (e.g., 1)

**Response:** 200 OK
```json
{
  "idEdu": 1,
  "titleOfQualification": "Bachelor of Science",
  "training": "Computer Science",
  "city": "Boston",
  "country": "USA",
  "startDate": "2016-09-01",
  "endDate": "2020-05-31",
  "ongoing": false,
  "portfolio": {
    "idPortfolio": 1
  }
}
```

---

### 5. Get Educations by Portfolio ID
**Endpoint:** `GET /api/educations/portfolio/{portfolioId}`

**Description:** Retrieve all educations for a specific portfolio

**Path Parameters:**
- `portfolioId` (Long): Portfolio ID (e.g., 1)

**Response:** 200 OK
```json
[
  {
    "idEdu": 1,
    "titleOfQualification": "Bachelor of Science",
    "training": "Computer Science",
    "city": "Boston",
    "country": "USA",
    "startDate": "2016-09-01",
    "endDate": "2020-05-31",
    "ongoing": false,
    "portfolio": {
      "idPortfolio": 1
    }
  }
]
```

---

### 6. Update Education
**Endpoint:** `PUT /api/educations/{id}`

**Description:** Update an existing education entry

**Path Parameters:**
- `id` (Long): Education ID (e.g., 1)

**Request Body:**
```json
{
  "titleOfQualification": "Bachelor of Science (Honors)",
  "training": "Computer Science",
  "city": "New York",
  "country": "USA",
  "startDate": "2016-09-01",
  "endDate": "2020-05-31",
  "ongoing": false
}
```

**Response:** 200 OK
```json
{
  "idEdu": 1,
  "titleOfQualification": "Bachelor of Science (Honors)",
  "training": "Computer Science",
  "city": "New York",
  "country": "USA",
  "startDate": "2016-09-01",
  "endDate": "2020-05-31",
  "ongoing": false,
  "portfolio": {
    "idPortfolio": 1
  }
}
```

---

### 7. Delete Education
**Endpoint:** `DELETE /api/educations/{id}`

**Description:** Delete an education entry from the system

**Path Parameters:**
- `id` (Long): Education ID (e.g., 1)

**Response:** 204 NO CONTENT

---

## 📊 Testing Order

To properly test the API, follow this order:

1. **Create a User** - POST /api/users
2. **Create a Portfolio** - POST /api/portfolios/{userId} (use the ID from step 1)
3. **Create Experience(s)** - POST /api/experiences/{portfolioId} (use the ID from step 2)
4. **Create Education(s)** - POST /api/educations/{portfolioId} (use the ID from step 2)
5. **Get Portfolio with nested data** - GET /api/portfolios/{portfolioId}
6. **Update entries** - PUT endpoints for any entity
7. **Get filtered data** - GET by portfolio/user ID
8. **Delete entries** - DELETE endpoints (optional)

---

## ⚠️ Important Notes

- Replace all `{id}`, `{userId}`, `{portfolioId}` with actual numeric IDs from previous requests
- All dates should be in format: `YYYY-MM-DD`
- When `ongoing = true`, the system automatically sets `endDate = null`
- CORS is enabled for `http://localhost:3000` (React frontend)
- Ensure the backend is running on `http://localhost:8080`


