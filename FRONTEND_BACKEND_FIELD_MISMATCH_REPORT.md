# Frontend-Backend Field Mismatch Report

## Executive Summary
The frontend currently uses a **flat portfolio structure with categories**, while the backend uses a **hierarchical structure with separate Experience and Education entities**. This is a fundamental architecture mismatch that requires significant refactoring.

---

## Backend Structure (Actual)

### UserEntity
```java
- id: Long
- email: String
- password: String (hashed)
- createdAt: LocalDateTime
```
**NOTE:** No "name" or "fullName" field exists in backend!

### PortfolioEntity
```java
- id: Long
- user: UserEntity (relationship)
- experiences: List<ExperienceEntity>
- educations: List<EducationEntity>
```

### ExperienceEntity
```java
- idExp: Long
- position: String (required, max 50 chars) - Job title
- employer: String (max 50 chars) - Company name
- city: String (max 50 chars)
- country: String (max 50 chars)
- startDate: LocalDate (ISO format YYYY-MM-DD)
- endDate: LocalDate (ISO format YYYY-MM-DD, nullable)
- responsibilities: String (max 350 chars) - Description
- ongoing: Boolean - Currently working here
- portfolio: PortfolioEntity (relationship)
```

### EducationEntity
```java
- idEdu: Long
- titleOfQualification: String (required, max 50 chars) - Degree title
- training: String (max 100 chars) - Institution/School name
- city: String (max 50 chars)
- country: String (max 50 chars)
- startDate: LocalDate (ISO format YYYY-MM-DD)
- endDate: LocalDate (ISO format YYYY-MM-DD, nullable)
- ongoing: Boolean - Currently studying
- portfolio: PortfolioEntity (relationship)
```

---

## Frontend Structure (Current - INCORRECT)

### ProfileContext
```javascript
profile: {
  fullName: String,  // ❌ DOES NOT EXIST IN BACKEND
  jobTitle: String,  // ❌ NOT IN USER ENTITY
  email: String,     // ✅ Exists
  phone: String,     // ❌ NOT IN USER ENTITY
  location: String,  // ❌ NOT IN USER ENTITY
  about: String,     // ❌ NOT IN USER ENTITY
  profileImage: String, // ❌ NOT IN USER ENTITY
  socialLinks: {     // ❌ NOT IN USER ENTITY
    github: String,
    linkedin: String,
    twitter: String
  },
  portfolios: []     // ❌ WRONG STRUCTURE
}

portfolios: [{
  id: Number,
  title: String,         // Maps to position OR titleOfQualification
  description: String,   // Maps to responsibilities (experience only)
  category: String,      // ❌ DOES NOT EXIST IN BACKEND (experience/education/competence/langue/projet)
  company: String,       // Maps to employer (experience only)
  period: String,        // Should be startDate + endDate + ongoing
  location: String,      // Should be city + country
  institution: String,   // Maps to training (education only)
  technologies: String,  // ❌ DOES NOT EXIST IN BACKEND
  level: String,         // ❌ DOES NOT EXIST IN BACKEND
  imageUrl: String,      // ❌ DOES NOT EXIST IN BACKEND
  projectUrl: String,    // ❌ DOES NOT EXIST IN BACKEND
  githubUrl: String      // ❌ DOES NOT EXIST IN BACKEND
}]
```

---

## Component-by-Component Analysis

### ✅ UserForm.js - MOSTLY CORRECT
**Fields used:** `email`, `password`
**Status:** ✅ Matches backend
**Issues:** None

### ❌ UserList.js - CRITICAL ERROR
**Fields displayed:** `id`, `name`, `email`
**Status:** ❌ Field `name` does not exist in backend
**Fix needed:** Remove display of `u.name`, only show `id`, `email`, `createdAt`

### ❌ About.js - STRUCTURAL MISMATCH
**Current structure:**
```javascript
profile.portfolios.filter(p => p.category === 'experience')
  .map(exp => ({
    title: exp.title,
    company: exp.company,
    period: exp.period,
    location: exp.location,
    description: exp.description
  }))
```

**Should be:**
```javascript
experiences.map(exp => ({
  title: exp.position,
  company: exp.employer,
  period: formatPeriod(exp.startDate, exp.endDate, exp.ongoing),
  location: `${exp.city}, ${exp.country}`,
  description: exp.responsibilities
}))
```

**Fields used:**
- Experience: title, company, period, location, description
- Education: title, institution, period, description
- Competence: title, technologies, level
- Langue: title, level

**Backend missing:** competence, langue categories don't exist
**Fix needed:** Separate experiences and educations, remove competence/langue or create separate backend entities

### ❌ Portfolio.js - STRUCTURAL MISMATCH
**Current:** Filters portfolios by category (experience, education, competence, langue, projet)
**Backend:** Only has experiences[] and educations[]
**Fix needed:** Restructure tabs to show "Experiences" and "Formations" only, or create separate backend endpoints for skills/languages

### ❌ AdminDashboard.js - MULTIPLE ISSUES
**Profile fields used:**
```javascript
fullName      // ❌ NOT IN BACKEND
jobTitle      // ❌ NOT IN BACKEND
location      // ❌ NOT IN BACKEND
about         // ❌ NOT IN BACKEND
profileImage  // ❌ NOT IN BACKEND
phone         // ❌ NOT IN BACKEND
socialLinks   // ❌ NOT IN BACKEND
```

**Portfolio structure:** Uses flat array with category field
**Fix needed:** 
1. Either create additional backend fields for profile information
2. Or remove these fields from frontend
3. Restructure portfolio management to use separate Experience/Education entities

### ❌ PortfolioForm.js - STRUCTURAL MISMATCH
**Current tabs:** Expérience, Formation, Compétence, Langue, Projet
**Backend tabs should be:** Expérience, Formation only

**Field mappings needed:**

**Experience Form:**
```javascript
// Frontend → Backend
title → position (max 50 chars)
company → employer (max 50 chars)
period → startDate + endDate + ongoing (convert to ISO dates)
location → city + country (split)
description → responsibilities (max 350 chars)
```

**Education Form:**
```javascript
// Frontend → Backend
title → titleOfQualification (max 50 chars)
institution → training (max 100 chars)
period → startDate + endDate + ongoing (convert to ISO dates)
location → city + country (split)
description → NOT IN BACKEND (remove field)
```

---

## Priority Fix List

### 🔴 CRITICAL (Breaks functionality)
1. **UserList.js** - Remove `u.name` field display
2. **API calls in About.js** - Currently fetching wrong structure
3. **API calls in Portfolio.js** - Currently fetching wrong structure

### 🟡 HIGH PRIORITY (Architecture changes)
4. **ProfileContext** - Refactor to separate experiences[] and educations[] arrays
5. **PortfolioForm.js** - Update form fields to match backend
6. **AdminDashboard.js** - Update portfolio management logic

### 🟢 MEDIUM PRIORITY (Feature decisions needed)
7. **Profile fields** - Decide if fullName, jobTitle, phone, location, about, profileImage, socialLinks should be added to backend or removed from frontend
8. **Skills/Languages** - Decide if competence/langue categories should be separate backend entities or removed
9. **Projects** - Decide if projet category should be separate backend entity or removed

---

## Recommended Approach

### Option A: Minimal Changes (Recommended)
**Remove unsupported features from frontend:**
- Remove competence, langue, projet categories
- Remove profile fields not in backend (fullName, jobTitle, location, etc.)
- Focus only on Experience and Education management
- Store additional profile info in localStorage only (not persisted to backend)

### Option B: Backend Extension
**Add missing entities to backend:**
- Create SkillEntity for competence
- Create LanguageEntity for langue
- Create ProjectEntity for projet
- Add profile fields to UserEntity (fullName, phone, bio, etc.)
- Implement corresponding REST endpoints

---

## Date Format Conversion Required

**Frontend currently uses:** String like "2020 - Présent" or "2020 - 2022"
**Backend expects:** 
- `startDate`: LocalDate (ISO: "2020-01-01")
- `endDate`: LocalDate or null (ISO: "2022-12-31")
- `ongoing`: Boolean (true/false)

**Conversion functions needed:**
```javascript
// Frontend to Backend
function convertPeriodToBackend(period) {
  // "2020 - Présent" → { startDate: "2020-01-01", endDate: null, ongoing: true }
  // "2020 - 2022" → { startDate: "2020-01-01", endDate: "2022-12-31", ongoing: false }
}

// Backend to Frontend
function formatPeriod(startDate, endDate, ongoing) {
  // { startDate: "2020-01-01", endDate: null, ongoing: true } → "2020 - Présent"
  // { startDate: "2020-01-01", endDate: "2022-12-31", ongoing: false } → "2020 - 2022"
}
```

---

## Next Steps

1. **Immediate:** Fix UserList.js to remove name field
2. **Phase 1:** Refactor ProfileContext for experiences/educations structure
3. **Phase 2:** Update About.js and Portfolio.js to use new structure
4. **Phase 3:** Update AdminDashboard and PortfolioForm
5. **Phase 4:** Add date conversion utilities
6. **Phase 5:** Test with real backend API

