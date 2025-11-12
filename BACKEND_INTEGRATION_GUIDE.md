# Backend Integration Guide

## Overview
The frontend now integrates with your Spring Boot backend to persist portfolios, experiences, and educations to the PostgreSQL database.

## Architecture

### Data Flow
```
User Action → ProfileContext → API Service → Backend Controller → Database
              ↓ (on success)
          Local State Update → UI Update
```

### Fallback Strategy
Every API call has a fallback to localStorage if the backend is unavailable, ensuring the app continues to work offline.

## API Integration Points

### 1. Portfolio Management

#### Create Portfolio
**Frontend:**
```javascript
const createPortfolio = async (name) => {
  const response = await portfolioService.createPortfolio(userId);
  // Returns: { idPort, userId, experiences[], educations[] }
}
```

**Backend Endpoint:**
```
POST /api/portfolios/{userId}
Response: PortfolioEntity
```

**Flow:**
1. User clicks "Créer un nouveau portfolio" in AdminDashboard
2. Dialog opens for name input
3. `createPortfolio(name)` called
4. POST request to `/api/portfolios/{userId}`
5. Backend creates portfolio in database
6. Frontend receives portfolio with `idPort`
7. If name was provided, PUT request to update name
8. Local state updated with new portfolio
9. Portfolio automatically activated

#### Update Portfolio (Rename)
**Frontend:**
```javascript
const updatePortfolio = async (id, updates) => {
  await portfolioService.updatePortfolio(backendId, updates);
  // Updates name or other portfolio properties
}
```

**Backend Endpoint:**
```
PUT /api/portfolios/{id}
Body: { name: "New Name" }
Response: PortfolioEntity
```

#### Delete Portfolio
**Frontend:**
```javascript
const deletePortfolio = async (id) => {
  await portfolioService.deletePortfolio(backendId);
}
```

**Backend Endpoint:**
```
DELETE /api/portfolios/{id}
Response: 204 No Content
```

#### Load User Portfolios
**Frontend:**
```javascript
useEffect(() => {
  const response = await portfolioService.getUserPortfolios(userId);
  // Returns array of portfolios with experiences and educations
}, []);
```

**Backend Endpoint:**
```
GET /api/portfolios/user/{userId}
Response: List<PortfolioEntity>
```

**When It Runs:**
- On app mount (when user is logged in)
- Fetches all portfolios for the current user
- Transforms backend data to local format
- Merges with localStorage for skills/languages (not in backend yet)

---

### 2. Experience Management

#### Create Experience
**Frontend:**
```javascript
const addExperience = async (experience) => {
  const response = await portfolioService.createExperience(portfolioId, experience);
  // Returns: ExperienceEntity with idExp
}
```

**Backend Endpoint:**
```
POST /api/experiences/{portfolioId}
Body: {
  "poste": "Developer",
  "companyName": "Tech Corp",
  "location": "Paris",
  "startDate": "2020-01-01",
  "endDate": "2023-12-31",
  "description": "Built web apps",
  "ongoing": false
}
Response: ExperienceEntity
```

**Field Mapping (Frontend → Backend):**
```javascript
{
  poste: string,          // Job title
  companyName: string,    // Company name
  location: string,       // Location
  startDate: string,      // ISO date string
  endDate: string,        // ISO date string or null
  description: string,    // Job description
  ongoing: boolean        // Currently working here
}
// Backend returns: { idExp, ...fields, portfolio }
```

#### Update Experience
**Backend Endpoint:**
```
PUT /api/experiences/{id}
Body: ExperienceDto (same as create)
Response: ExperienceEntity
```

#### Delete Experience
**Backend Endpoint:**
```
DELETE /api/experiences/{id}
Response: 204 No Content
```

---

### 3. Education Management

#### Create Education
**Frontend:**
```javascript
const addEducation = async (education) => {
  const response = await portfolioService.createEducation(portfolioId, education);
  // Returns: EducationEntity with idEdu
}
```

**Backend Endpoint:**
```
POST /api/educations/{portfolioId}
Body: {
  "degree": "Master",
  "school": "University",
  "location": "Paris",
  "startDate": "2015-09-01",
  "endDate": "2017-06-30",
  "description": "Computer Science",
  "ongoing": false
}
Response: EducationEntity
```

**Field Mapping (Frontend → Backend):**
```javascript
{
  degree: string,         // Degree name
  school: string,         // School/University name
  location: string,       // Location
  startDate: string,      // ISO date string
  endDate: string,        // ISO date string or null
  description: string,    // Description
  ongoing: boolean        // Currently studying
}
// Backend returns: { idEdu, ...fields, portfolio }
```

#### Update Education
**Backend Endpoint:**
```
PUT /api/educations/{id}
Body: EducationDto (same as create)
Response: EducationEntity
```

#### Delete Education
**Backend Endpoint:**
```
DELETE /api/educations/{id}
Response: 204 No Content
```

---

## Configuration

### Environment Variables
Create a `.env` file in `frontend/` directory:

```env
# Use real backend API
REACT_APP_USE_MOCK=false
REACT_APP_API_BASE_URL=http://localhost:8080/api

# Or use mock (localStorage only)
# REACT_APP_USE_MOCK=true
```

### API Service Configuration
File: `frontend/src/services/api.js`

```javascript
const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

// Axios interceptor adds JWT token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## Error Handling

### Graceful Degradation
Every API call has a try-catch block with fallback:

```javascript
const addExperience = async (experience) => {
  try {
    // Try backend API
    const response = await portfolioService.createExperience(portfolioId, experience);
    return response.data;
  } catch (error) {
    console.error('Error adding experience:', error);
    // Fallback to localStorage only
    const newExperience = { ...experience, idExp: Date.now() };
    setExperiences(prev => [...prev, newExperience]);
    return newExperience;
  }
};
```

### Error Types
1. **Network Error** - Backend not running
   → Falls back to localStorage
   
2. **401 Unauthorized** - Token expired
   → Interceptor redirects to /login
   
3. **404 Not Found** - Resource doesn't exist
   → Falls back to local state
   
4. **500 Server Error** - Backend error
   → Falls back to localStorage

---

## Data Synchronization

### On Login
1. User logs in → Receives JWT token
2. Token stored in localStorage
3. User info stored (userId, email)
4. ProfileContext fetches portfolios from backend
5. Backend data merged with local data

### On CRUD Operations
1. **Create**: POST to backend → Store in DB → Update local state with backend response
2. **Update**: PUT to backend → Update in DB → Sync local state
3. **Delete**: DELETE from backend → Remove from DB → Remove from local state
4. **Read**: GET from backend on mount → Load into local state

### LocalStorage vs Database
| Data | Storage |
|------|---------|
| Profile info (name, email, image) | localStorage only |
| Portfolios | Database + localStorage cache |
| Experiences | Database + localStorage cache |
| Educations | Database + localStorage cache |
| Skills | localStorage only (not in backend yet) |
| Languages | localStorage only (not in backend yet) |

---

## Backend ID Management

### Dual ID System
Each portfolio/experience/education has two IDs:

```javascript
{
  id: 1234567890,        // Local ID (timestamp or incremental)
  backendId: 42,         // Backend database ID (idPort/idExp/idEdu)
  ...
}
```

**Why?**
- Local ID used for React keys and local operations
- Backend ID used for API calls (PUT, DELETE)
- Allows seamless transition between mock and real backend

### ID Mapping
```javascript
const portfolioId = activePortfolio?.backendId || activePortfolio?.id;
```

---

## Testing

### Test with Mock Backend
```bash
cd frontend
echo "REACT_APP_USE_MOCK=true" > .env
npm start
```
✅ All data stored in localStorage  
✅ No backend required  
✅ Good for frontend development

### Test with Real Backend
```bash
# Terminal 1 - Start backend
cd backend
mvn spring-boot:run

# Terminal 2 - Start frontend
cd frontend
echo "REACT_APP_USE_MOCK=false" > .env
echo "REACT_APP_API_BASE_URL=http://localhost:8080/api" >> .env
npm start
```

✅ Data persisted to PostgreSQL  
✅ JWT authentication required  
✅ Multi-user support

---

## User Flow Examples

### Example 1: Add Experience
1. User navigates to AdminDashboard → "Contenu du Portfolio" tab
2. Clicks "Ajouter une expérience"
3. Fills out form (poste, companyName, location, dates, description)
4. Clicks submit
5. **Frontend**: `addExperience(data)` called
6. **API**: POST `/api/experiences/42` with experience data
7. **Backend**: Creates ExperienceEntity linked to Portfolio #42
8. **Database**: INSERT INTO experience_entity
9. **Response**: Returns ExperienceEntity with `idExp: 123`
10. **Frontend**: Updates local state with backend response
11. **UI**: Experience appears in list immediately

### Example 2: Switch Portfolios
1. User clicks portfolio selector dropdown
2. Selects "Portfolio 2"
3. **Frontend**: `switchPortfolio(2)` called
4. **State**: `activePortfolioId` updated to 2
5. **UI**: All displays (About, Portfolio pages) update instantly
6. **Data**: Shows experiences/educations from Portfolio 2

### Example 3: Delete Portfolio
1. User goes to "Mes Portfolios" tab
2. Clicks delete icon on Portfolio card
3. Confirmation dialog appears
4. User confirms deletion
5. **Frontend**: `deletePortfolio(id)` called
6. **API**: DELETE `/api/portfolios/42`
7. **Backend**: Cascades delete to experiences & educations
8. **Database**: DELETE FROM portfolio_entity WHERE id_port = 42
9. **Frontend**: Removes from local state
10. **UI**: Card disappears, switches to another portfolio

---

## Future Enhancements

### Skills & Languages Backend Integration
Currently stored in localStorage only. To add backend support:

1. **Create Backend Entities:**
```java
@Entity
public class SkillEntity {
    @Id @GeneratedValue
    private Long idSkill;
    private String name;
    private String level;
    @ManyToOne
    private PortfolioEntity portfolio;
}

@Entity
public class LanguageEntity {
    @Id @GeneratedValue
    private Long idLang;
    private String name;
    private String proficiency;
    @ManyToOne
    private PortfolioEntity portfolio;
}
```

2. **Create Controllers:**
- SkillController with CRUD endpoints
- LanguageController with CRUD endpoints

3. **Update Frontend API:**
```javascript
// In api.js
createSkill: (portfolioId, skill) => api.post(`/skills/${portfolioId}`, skill),
updateSkill: (id, skill) => api.put(`/skills/${id}`, skill),
deleteSkill: (id) => api.delete(`/skills/${id}`),

createLanguage: (portfolioId, lang) => api.post(`/languages/${portfolioId}`, lang),
updateLanguage: (id, lang) => api.put(`/languages/${id}`, lang),
deleteLanguage: (id) => api.delete(`/languages/${id}`),
```

4. **Update ProfileContext:**
- Mirror the pattern used for experiences/educations
- Add try-catch blocks with localStorage fallback

### Real-time Sync
Use WebSockets to sync changes across multiple devices/sessions.

### Optimistic Updates
Update UI immediately before backend response for snappier UX.

### Offline Queue
Queue mutations while offline, sync when back online.

---

## Troubleshooting

### Issue: "Cannot read properties of undefined"
**Cause:** Backend returns different field names  
**Solution:** Check PORTFOLIO_API_FIELD_MAPPING.md for correct field names

### Issue: 401 Unauthorized
**Cause:** JWT token expired or missing  
**Solution:** User needs to log in again

### Issue: CORS Error
**Cause:** Backend doesn't allow frontend origin  
**Solution:** Add CORS configuration in Spring Boot:
```java
@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

### Issue: Data not persisting after refresh
**Cause:** Using mock mode (localStorage)  
**Solution:** Set `REACT_APP_USE_MOCK=false` and start backend

---

## API Summary Table

| Operation | Method | Endpoint | Request Body | Response |
|-----------|--------|----------|--------------|----------|
| **Portfolios** |
| Create | POST | `/portfolios/{userId}` | - | PortfolioEntity |
| Get by ID | GET | `/portfolios/{id}` | - | PortfolioEntity |
| Get by User | GET | `/portfolios/user/{userId}` | - | List\<PortfolioEntity\> |
| Update | PUT | `/portfolios/{id}` | { name } | PortfolioEntity |
| Delete | DELETE | `/portfolios/{id}` | - | 204 No Content |
| **Experiences** |
| Create | POST | `/experiences/{portfolioId}` | ExperienceDto | ExperienceEntity |
| Get by ID | GET | `/experiences/{id}` | - | ExperienceEntity |
| Get by Portfolio | GET | `/experiences/portfolio/{portfolioId}` | - | List\<ExperienceEntity\> |
| Update | PUT | `/experiences/{id}` | ExperienceDto | ExperienceEntity |
| Delete | DELETE | `/experiences/{id}` | - | 204 No Content |
| **Educations** |
| Create | POST | `/educations/{portfolioId}` | EducationDto | EducationEntity |
| Get by ID | GET | `/educations/{id}` | - | EducationEntity |
| Get by Portfolio | GET | `/educations/portfolio/{portfolioId}` | - | List\<EducationEntity\> |
| Update | PUT | `/educations/{id}` | EducationDto | EducationEntity |
| Delete | DELETE | `/educations/{id}` | - | 204 No Content |

---

## Testing Checklist

- [ ] Create portfolio → Check database for new portfolio_entity
- [ ] Rename portfolio → Verify name updated in database
- [ ] Delete portfolio → Confirm cascade delete of experiences/educations
- [ ] Add experience → Verify experience_entity inserted with portfolio_id
- [ ] Update experience → Check fields updated in database
- [ ] Delete experience → Confirm removal from database
- [ ] Add education → Verify education_entity inserted with portfolio_id
- [ ] Update education → Check fields updated in database
- [ ] Delete education → Confirm removal from database
- [ ] Switch portfolios → Verify correct data displayed
- [ ] Refresh page → Portfolios loaded from backend
- [ ] Logout/Login → User's portfolios loaded correctly
- [ ] Network error → Fallback to localStorage works
- [ ] Multiple users → Data isolated correctly

---

## Conclusion

Your frontend is now fully integrated with the Spring Boot backend! 🎉

**Key Features:**
✅ Portfolios, Experiences, and Educations synced with PostgreSQL  
✅ JWT authentication on all API calls  
✅ Graceful fallback to localStorage if backend unavailable  
✅ Multi-portfolio support with backend persistence  
✅ Optimistic UI updates for better UX  
✅ Error handling with user feedback  

**Next Steps:**
1. Start backend: `mvn spring-boot:run`
2. Set frontend to use real API: `REACT_APP_USE_MOCK=false`
3. Login to create a user session
4. Create portfolios and add experiences/educations
5. Check PostgreSQL database to confirm data persistence!
