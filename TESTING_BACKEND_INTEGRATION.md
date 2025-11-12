# Testing Backend Integration

## Prerequisites

### 1. Start Backend
```bash
cd backend
mvn spring-boot:run
```

Wait until you see:
```
Started BackendApplication in X.XXX seconds
```

### 2. Configure Frontend
Create/update `.env` file in `frontend/` directory:
```env
REACT_APP_USE_MOCK=false
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

### 3. Start Frontend
```bash
cd frontend
npm start
```

---

## Test Scenarios

### Test 1: User Registration & Login

#### Steps:
1. Navigate to `http://localhost:3000/signup`
2. Enter email and password
3. Click "S'inscrire"
4. Login with same credentials

#### Expected Result:
✅ User created in database  
✅ JWT token stored in localStorage  
✅ Redirected to main page

#### Verify in Database:
```sql
SELECT * FROM user_entity;
-- Should show new user with email
```

---

### Test 2: Create Portfolio

#### Steps:
1. Login to the app
2. Navigate to "Admin Dashboard"
3. Click "Mes Portfolios" tab
4. Click "Créer un nouveau portfolio"
5. Enter name: "Mon Portfolio Test"
6. Click "Créer"

#### Console Logs to Watch:
```
Portfolio created in backend: {
  id: 1,
  backendId: 1,
  name: "Mon Portfolio Test",
  experiences: [],
  educations: []
}
```

#### Expected Result:
✅ Portfolio appears in the grid  
✅ "Actif" badge shown on new portfolio  
✅ Alert NOT shown (means backend succeeded)

#### Verify in Database:
```sql
SELECT * FROM portfolio_entity;
-- Should show portfolio with:
-- id_port: 1
-- name: "Mon Portfolio Test"
-- user_id: (your user ID)
```

#### If Alert Shows:
❌ "Erreur lors de la création du portfolio. Vérifiez que le backend est démarré."
- Check backend is running on port 8080
- Check browser console for error details
- Check backend console for Java exceptions

---

### Test 3: Add Experience

#### Steps:
1. In Admin Dashboard, go to "Contenu du Portfolio" tab
2. Go to "Expériences" sub-tab
3. Click "Ajouter une expérience"
4. Fill form:
   - Poste: "Développeur Full Stack"
   - Entreprise: "Tech Company"
   - Localisation: "Paris, France"
   - Date de début: 2020-01-01
   - Date de fin: 2023-12-31
   - Description: "Developed web applications"
   - Ongoing: false
5. Click submit

#### Console Logs to Watch:
```
Adding experience to portfolio: 1 {poste: "Développeur Full Stack", ...}
Experience created in backend: {
  idExp: 1,
  poste: "Développeur Full Stack",
  companyName: "Tech Company",
  ...
}
```

#### Expected Result:
✅ Experience appears in the list  
✅ All fields displayed correctly  
✅ No alert shown

#### Verify in Database:
```sql
SELECT * FROM experience_entity;
-- Should show experience with:
-- id_exp: 1
-- poste: "Développeur Full Stack"
-- company_name: "Tech Company"
-- portfolio_id: 1
```

#### If Alert Shows:
❌ "Erreur lors de l'ajout de l'expérience. Vérifiez que le backend est démarré."
- Check if portfolio has `backendId`
- Look for 404 error (portfolio not found in backend)
- Check backend logs for validation errors

---

### Test 4: Update Experience

#### Steps:
1. Click edit icon on the experience you just created
2. Change "Poste" to "Senior Full Stack Developer"
3. Click submit

#### Console Logs to Watch:
```
Updating experience: 1 {poste: "Senior Full Stack Developer", ...}
Experience updated in backend: {...}
```

#### Expected Result:
✅ Experience updated in list  
✅ New title shows "Senior Full Stack Developer"

#### Verify in Database:
```sql
SELECT * FROM experience_entity WHERE id_exp = 1;
-- poste should be updated to "Senior Full Stack Developer"
```

---

### Test 5: Delete Experience

#### Steps:
1. Click delete icon on experience
2. Confirm deletion

#### Console Logs to Watch:
```
Deleting experience: 1
Experience deleted from backend
```

#### Expected Result:
✅ Experience removed from list

#### Verify in Database:
```sql
SELECT * FROM experience_entity WHERE id_exp = 1;
-- Should return no rows
```

---

### Test 6: Add Education

#### Steps:
1. Go to "Formations" sub-tab
2. Click "Ajouter une formation"
3. Fill form:
   - Diplôme: "Master en Informatique"
   - École: "Université Paris"
   - Localisation: "Paris"
   - Date de début: 2018-09-01
   - Date de fin: 2020-06-30
   - Description: "Computer Science"
   - En cours: false
4. Click submit

#### Console Logs to Watch:
```
Adding education to portfolio: 1 {...}
Education created in backend: {idEdu: 1, ...}
```

#### Expected Result:
✅ Education appears in list

#### Verify in Database:
```sql
SELECT * FROM education_entity;
-- Should show education with portfolio_id = 1
```

---

### Test 7: Load Portfolios on Refresh

#### Steps:
1. Create portfolio, add experiences/educations
2. Press F5 to refresh page
3. Login again if needed

#### Console Logs to Watch:
```
Loaded portfolios from backend: 1
```

#### Expected Result:
✅ All portfolios loaded from database  
✅ Experiences and educations visible  
✅ Active portfolio remembered

---

### Test 8: Delete Portfolio

#### Steps:
1. Go to "Mes Portfolios" tab
2. Create a second portfolio (so you have 2 total)
3. Click delete icon on one portfolio
4. Confirm deletion

#### Console Logs to Watch:
```
Deleting portfolio...
(Check for success or error)
```

#### Expected Result:
✅ Portfolio removed from grid  
✅ If was active, switches to another portfolio

#### Verify in Database:
```sql
SELECT * FROM portfolio_entity;
-- Deleted portfolio should be gone

SELECT * FROM experience_entity;
-- Associated experiences should be cascade deleted
```

---

## Common Issues & Solutions

### Issue 1: "Erreur lors de la création du portfolio"

**Possible Causes:**
1. Backend not running
2. Wrong API URL in .env
3. User not logged in (no userId)

**Solution:**
```bash
# Check backend is running
curl http://localhost:8080/api/portfolios

# Check frontend .env
cat frontend/.env
# Should have: REACT_APP_USE_MOCK=false

# Check localStorage has user
# In browser console:
localStorage.getItem('user')
// Should return: {"userId":1,"email":"..."}
```

---

### Issue 2: Portfolio Created but No Data

**Cause:** Portfolio created without name

**Check Console:**
```
POST /api/portfolios/1
Request Body: {"name": "Portfolio Name"}
```

**Solution:** Already fixed in code - name is now sent in request body

---

### Issue 3: 401 Unauthorized

**Cause:** JWT token expired or missing

**Solution:**
1. Logout
2. Login again
3. Token refreshed

**Check:**
```javascript
// Browser console
localStorage.getItem('token')
// Should return: "Bearer eyJhbGci..."
```

---

### Issue 4: Experience/Education Not Saving

**Possible Causes:**
1. Portfolio has no `backendId`
2. Field name mismatch (frontend vs backend)

**Debug:**
```javascript
// In browser console
const profile = JSON.parse(localStorage.getItem('portfolios'));
console.log(profile[0].backendId);
// Should be a number like 1, 2, 3...
// If undefined, portfolio wasn't created in backend
```

**Solution:**
- Delete localStorage portfolios
- Create new portfolio via UI
- Should now have backendId

---

### Issue 5: Data Not Loading After Refresh

**Cause:** Backend not returning portfolios for user

**Check Backend Logs:**
```
GET /api/portfolios/user/1
```

**Verify Database:**
```sql
SELECT p.*, e.*, ed.*
FROM portfolio_entity p
LEFT JOIN experience_entity e ON e.portfolio_id = p.id_port
LEFT JOIN education_entity ed ON ed.portfolio_id = p.id_port
WHERE p.user_id = 1;
```

---

## Database Verification Queries

### Check All User Data
```sql
-- Users
SELECT * FROM user_entity;

-- Portfolios
SELECT * FROM portfolio_entity;

-- Experiences
SELECT 
  e.id_exp,
  e.poste,
  e.company_name,
  p.name as portfolio_name,
  u.email as user_email
FROM experience_entity e
JOIN portfolio_entity p ON e.portfolio_id = p.id_port
JOIN user_entity u ON p.user_id = u.id;

-- Educations
SELECT 
  ed.id_edu,
  ed.degree,
  ed.school,
  p.name as portfolio_name,
  u.email as user_email
FROM education_entity ed
JOIN portfolio_entity p ON ed.portfolio_id = p.id_port
JOIN user_entity u ON p.user_id = u.id;
```

### Clean Database (Reset)
```sql
-- WARNING: Deletes all data!
DELETE FROM experience_entity;
DELETE FROM education_entity;
DELETE FROM portfolio_entity;
DELETE FROM user_entity;
```

---

## Success Checklist

After completing all tests, you should have:

- [ ] User registered and logged in
- [ ] Portfolio created in database
- [ ] Experience added to portfolio
- [ ] Experience updated successfully
- [ ] Experience deleted successfully
- [ ] Education added to portfolio
- [ ] Education updated successfully
- [ ] Education deleted successfully
- [ ] Data persists after page refresh
- [ ] Portfolio deleted (cascade deletes experiences/educations)
- [ ] No error alerts shown during operations
- [ ] All console logs show "created in backend", "updated in backend", etc.

---

## Network Tab Verification

Open browser DevTools → Network tab

### Creating Portfolio
```
Request URL: http://localhost:8080/api/portfolios/1
Request Method: POST
Request Headers: {
  Authorization: Bearer eyJhbGci...
  Content-Type: application/json
}
Request Body: {
  "name": "Mon Portfolio Test"
}
Response: {
  "idPort": 1,
  "name": "Mon Portfolio Test",
  "userId": 1,
  "experiences": [],
  "educations": []
}
Status: 200 OK
```

### Creating Experience
```
Request URL: http://localhost:8080/api/experiences/1
Request Method: POST
Request Body: {
  "poste": "Developer",
  "companyName": "Tech Corp",
  "location": "Paris",
  "startDate": "2020-01-01",
  "endDate": "2023-12-31",
  "description": "...",
  "ongoing": false
}
Response: {
  "idExp": 1,
  ...fields
}
Status: 200 OK
```

---

## Troubleshooting Checklist

If something doesn't work:

1. **Backend Running?**
   - Check `http://localhost:8080` returns something
   
2. **Frontend Config Correct?**
   - Check `.env` has `REACT_APP_USE_MOCK=false`
   
3. **User Logged In?**
   - Check `localStorage.getItem('token')` exists
   - Check `localStorage.getItem('user')` has userId
   
4. **CORS Enabled?**
   - Backend should allow `http://localhost:3000`
   
5. **Database Connected?**
   - Check backend logs: "Connected to database"
   
6. **JWT Valid?**
   - Token expires after 24 hours
   - Re-login if expired

---

## Final Verification

Run this in browser console after completing all tests:

```javascript
// Should show user data
console.log('User:', JSON.parse(localStorage.getItem('user')));

// Should show JWT token
console.log('Token exists:', !!localStorage.getItem('token'));

// Should show portfolios with backendId
const portfolios = JSON.parse(localStorage.getItem('portfolios'));
console.log('Portfolios:', portfolios);
console.log('First portfolio has backendId:', !!portfolios[0]?.backendId);

// Should show experiences
console.log('Experiences:', portfolios[0]?.experiences);

// Should show educations
console.log('Educations:', portfolios[0]?.educations);
```

**Expected Output:**
```javascript
User: {userId: 1, email: "test@example.com"}
Token exists: true
Portfolios: [{id: 1, backendId: 1, name: "Mon Portfolio Test", ...}]
First portfolio has backendId: true
Experiences: [{idExp: 1, poste: "Developer", ...}]
Educations: [{idEdu: 1, degree: "Master", ...}]
```

✅ **If all checks pass, your backend integration is working perfectly!** 🎉
