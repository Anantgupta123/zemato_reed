# Frontend Error Fixes & Improvements TODO

Current Working Directory: frontend/

## Steps (Sequential)

### 1. Create AuthContext for global state (loading, errors, auth)
- New file: src/context/AuthContext.jsx
- Provide to App.jsx

### 2. Fix Profile.jsx errors (unused use hook, add loading/error handling)
- Remove `use` import
- Add useContext for loading
- Fix video keys/alt

### 3. Refactor App.jsx & AppRoutes.jsx (move Router up, add Suspense/layout)
- App.jsx: Add BrowserRouter, Context Provider, Suspense
- AppRoutes.jsx: Simplify Routes, add layout routes with BottomNav

### 4. Fix auth pages (remove console.error, add loading/feedback)
- UserLogin.jsx, FoodPartnerLogin.jsx, UserRegister.jsx, FoodPartnerRegister.jsx, ChooseRegister.jsx

### 5. Enhance CreateFood.jsx (validation, error display, loading)
- Use Context for feedback
- Improve file upload validation

### 6. Improve Home.jsx & Saved.jsx (error handling, loading)
- Use Context
- Better empty states

### 7. Enhance ReelFeed.jsx (accessibility, optimistic updates)

### 8. Global improvements
- index.html: Update title
- App.css: Minor responsive fixes
- Run `npm run lint -- --fix`

### 9. Test & Completion
- cd frontend && npm install && npm run dev
- Manual tests

**Progress: 0/9 complete**
