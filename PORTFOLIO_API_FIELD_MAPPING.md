# Portfolio API Field Mapping Documentation

## 📊 Backend Structure Overview

The backend uses **separate entities** for Portfolio, Experience, and Education:

```
Portfolio (Main Entity)
├── id: Long
├── userId: Long
├── experiences: List<Experience>
└── educations: List<Education>

Experience Entity
├── id: Long
├── position: String (50)
├── employer: String (50)
├── city: String (50)
├── country: String (50)
├── startDate: LocalDate
├── endDate: LocalDate
├── responsibilities: String (350)
├── ongoing: Boolean
└── portfolioId: Long

Education Entity
├── id: Long
├── titleOfQualification: String (50)
├── training: String (100)
├── city: String (50)
├── country: String (50)
├── startDate: LocalDate
├── endDate: LocalDate
├── ongoing: Boolean
└── portfolioId: Long
```

## 🔄 Frontend-Backend Field Mappings

### 1. Portfolio Entity

#### Backend (PortfolioDto)
```java
{
  "id": Long,
  "userId": Long,
  "experiences": [ExperienceDto],
  "educations": [EducationDto]
}
```

#### Frontend Service (portfolioService)
```javascript
{
  id: number,
  userId: number,
  experiences: Experience[],
  educations: Education[]
}
```

✅ **Matched!**

---

### 2. Experience Entity

#### Backend (ExperienceDto)
```java
{
  "id": Long,
  "position": String,        // Required, max 50 chars
  "employer": String,         // max 50 chars
  "city": String,            // max 50 chars
  "country": String,         // max 50 chars
  "startDate": "YYYY-MM-DD", // LocalDate
  "endDate": "YYYY-MM-DD",   // LocalDate (null if ongoing)
  "responsibilities": String, // max 350 chars
  "ongoing": Boolean,        // true = current position
  "portfolioId": Long
}
```

#### Frontend Expected Format
```javascript
{
  id: number,
  position: string,          // Job title/position
  employer: string,          // Company name
  city: string,
  country: string,
  startDate: string,         // ISO date format "YYYY-MM-DD"
  endDate: string | null,    // null if ongoing
  responsibilities: string,  // Job description
  ongoing: boolean,
  portfolioId: number
}
```

✅ **Matched!**

**Important Notes:**
- If `ongoing: true`, backend automatically sets `endDate = null`
- `position` is required (backend validation)
- Date format: ISO 8601 (`"YYYY-MM-DD"`)

---

### 3. Education Entity

#### Backend (EducationDto)
```java
{
  "id": Long,
  "titleOfQualification": String, // Required, max 50 chars
  "training": String,             // Institution name, max 100 chars
  "city": String,                 // max 50 chars
  "country": String,              // max 50 chars
  "startDate": "YYYY-MM-DD",     // LocalDate
  "endDate": "YYYY-MM-DD",       // LocalDate (null if ongoing)
  "ongoing": Boolean,            // true = currently studying
  "portfolioId": Long
}
```

#### Frontend Expected Format
```javascript
{
  id: number,
  titleOfQualification: string, // Degree/certification name
  training: string,             // School/university name
  city: string,
  country: string,
  startDate: string,            // ISO date format "YYYY-MM-DD"
  endDate: string | null,       // null if ongoing
  ongoing: boolean,
  portfolioId: number
}
```

✅ **Matched!**

**Important Notes:**
- If `ongoing: true`, backend automatically sets `endDate = null`
- `titleOfQualification` is required (backend validation)
- Date format: ISO 8601 (`"YYYY-MM-DD"`)

---

## 🔌 API Endpoints & Usage

### Portfolio Endpoints

#### Get All Portfolios
```javascript
GET /api/portfolios
Response: [PortfolioDto]

// Frontend
const portfolios = await portfolioService.getAllPortfolios();
```

#### Get Portfolio by ID
```javascript
GET /api/portfolios/{id}
Response: PortfolioDto

// Frontend
const portfolio = await portfolioService.getPortfolioById(1);
```

#### Create Portfolio
```javascript
POST /api/portfolios/{userId}
Response: PortfolioDto

// Frontend
const newPortfolio = await portfolioService.createPortfolio(userId);
```

#### Update Portfolio
```javascript
PUT /api/portfolios/{id}
Body: PortfolioDto
Response: PortfolioDto

// Frontend
await portfolioService.updatePortfolio(id, portfolioData);
```

#### Delete Portfolio
```javascript
DELETE /api/portfolios/{id}
Response: void

// Frontend
await portfolioService.deletePortfolio(id);
```

---

### Experience Endpoints

#### Create Experience
```javascript
POST /api/experiences/{portfolioId}
Body: {
  "position": "Full Stack Developer",
  "employer": "Tech Company",
  "city": "Paris",
  "country": "France",
  "startDate": "2022-01-15",
  "endDate": null,
  "responsibilities": "Developed web applications...",
  "ongoing": true
}
Response: ExperienceDto

// Frontend
const experience = await portfolioService.createExperience(portfolioId, {
  position: "Full Stack Developer",
  employer: "Tech Company",
  city: "Paris",
  country: "France",
  startDate: "2022-01-15",
  endDate: null,
  responsibilities: "Developed web applications...",
  ongoing: true
});
```

#### Update Experience
```javascript
PUT /api/experiences/{id}
Body: ExperienceDto
Response: ExperienceDto

// Frontend
await portfolioService.updateExperience(id, experienceData);
```

#### Delete Experience
```javascript
DELETE /api/experiences/{id}

// Frontend
await portfolioService.deleteExperience(id);
```

---

### Education Endpoints

#### Create Education
```javascript
POST /api/educations/{portfolioId}
Body: {
  "titleOfQualification": "Master in Computer Science",
  "training": "University of Paris",
  "city": "Paris",
  "country": "France",
  "startDate": "2020-09-01",
  "endDate": "2022-06-30",
  "ongoing": false
}
Response: EducationDto

// Frontend
const education = await portfolioService.createEducation(portfolioId, {
  titleOfQualification: "Master in Computer Science",
  training: "University of Paris",
  city: "Paris",
  country: "France",
  startDate: "2020-09-01",
  endDate: "2022-06-30",
  ongoing: false
});
```

#### Update Education
```javascript
PUT /api/educations/{id}
Body: EducationDto
Response: EducationDto

// Frontend
await portfolioService.updateEducation(id, educationData);
```

#### Delete Education
```javascript
DELETE /api/educations/{id}

// Frontend
await portfolioService.deleteEducation(id);
```

---

## 📝 Field Validation & Constraints

### Experience Entity
| Field | Type | Required | Max Length | Notes |
|-------|------|----------|------------|-------|
| position | String | ✅ Yes | 50 | Job title |
| employer | String | ❌ No | 50 | Company name |
| city | String | ❌ No | 50 | Location |
| country | String | ❌ No | 50 | Location |
| startDate | LocalDate | ❌ No | - | ISO format |
| endDate | LocalDate | ❌ No | - | Null if ongoing |
| responsibilities | String | ❌ No | 350 | Job description |
| ongoing | Boolean | ❌ No | - | Auto-nulls endDate |

### Education Entity
| Field | Type | Required | Max Length | Notes |
|-------|------|----------|------------|-------|
| titleOfQualification | String | ✅ Yes | 50 | Degree name |
| training | String | ❌ No | 100 | Institution |
| city | String | ❌ No | 50 | Location |
| country | String | ❌ No | 50 | Location |
| startDate | LocalDate | ❌ No | - | ISO format |
| endDate | LocalDate | ❌ No | - | Null if ongoing |
| ongoing | Boolean | ❌ No | - | Auto-nulls endDate |

---

## 🎯 Usage Examples

### Complete Workflow: Create Portfolio with Experience and Education

```javascript
import { portfolioService } from './services/api';

// 1. Get user ID from auth context
const { user } = useAuth();
const userId = user.userId;

// 2. Create a portfolio for the user
const portfolio = await portfolioService.createPortfolio(userId);
const portfolioId = portfolio.data.id;

// 3. Add work experience
const experience = await portfolioService.createExperience(portfolioId, {
  position: "Senior Full Stack Developer",
  employer: "TechCorp Inc",
  city: "Paris",
  country: "France",
  startDate: "2021-03-15",
  endDate: null,
  responsibilities: "Lead development of web applications using React and Spring Boot. Managed a team of 5 developers.",
  ongoing: true
});

// 4. Add education
const education = await portfolioService.createEducation(portfolioId, {
  titleOfQualification: "Master's Degree in Computer Science",
  training: "Sorbonne University",
  city: "Paris",
  country: "France",
  startDate: "2018-09-01",
  endDate: "2020-06-30",
  ongoing: false
});

// 5. Get complete portfolio with all experiences and educations
const completePortfolio = await portfolioService.getPortfolioById(portfolioId);
console.log(completePortfolio.data);
// {
//   id: 1,
//   userId: 1,
//   experiences: [{...}],
//   educations: [{...}]
// }
```

### Update Experience (Mark as No Longer Ongoing)

```javascript
await portfolioService.updateExperience(experienceId, {
  ongoing: false,
  endDate: "2023-12-31"
});
```

### Date Format Conversion Helper

```javascript
// Convert Date object to backend format
const formatDateForBackend = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return d.toISOString().split('T')[0]; // Returns "YYYY-MM-DD"
};

// Usage
const experience = {
  position: "Developer",
  startDate: formatDateForBackend(new Date()),
  ongoing: true,
  endDate: null
};
```

---

## ⚠️ Important Notes

### Date Handling
- Backend uses Java `LocalDate` (format: `YYYY-MM-DD`)
- Frontend should send dates in ISO format: `"2023-11-12"`
- Do NOT include time or timezone information

### Ongoing Field Logic
- When `ongoing: true`, backend automatically sets `endDate: null`
- You cannot have both `ongoing: true` AND a valid `endDate`
- Backend validates this with `@PostLoad`, `@PrePersist`, `@PreUpdate` hooks

### Character Limits
- Respect max lengths to avoid backend validation errors
- Frontend should implement client-side validation

### Authentication
- All portfolio endpoints require JWT token (except public viewing if implemented)
- Token automatically added by Axios interceptor

---

## ✅ Summary

**Backend Structure:**
```
User (1) ──┐
            ├──> Portfolio (1) ──┐
                                 ├──> Experience (Many)
                                 └──> Education (Many)
```

**All fields are now matched between frontend and backend!** 🎉

You can now:
1. Use `portfolioService` to interact with backend API
2. Create/update experiences with correct field names
3. Create/update educations with correct field names
4. Handle dates properly in ISO format
5. Manage ongoing status for current positions/studies
