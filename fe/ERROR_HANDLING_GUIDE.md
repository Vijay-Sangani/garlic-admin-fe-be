# Error Handling Guide

## ✅ Error Handling Components Added

### 1. **Error Boundary** (`components/error-boundary.tsx`)

- Catches JavaScript errors anywhere in the component tree
- Displays user-friendly error page
- Shows error message and debug info
- Provides "Reload" and "Go Home" buttons
- Wrapped in `app/layout.tsx`

### 2. **API Error Display** (`components/api-error-display.tsx`)

- Shows connection errors with helpful troubleshooting
- Lists common issues to check:
  - Backend server running
  - API URL correct
  - Internet connection
  - CORS enabled
- Includes retry button

### 3. **Enhanced API Error Handling** (`lib/api.ts`)

- Custom `ApiError` class for API failures
- Returns error status and body
- Graceful fallback for malformed responses

### 4. **Dashboard Error Handling** (`app/page.tsx`)

- Uses `APIErrorDisplay` component
- Shows retry button
- Logs errors to console
- Graceful degradation

## 🔍 How Errors Are Handled

### Frontend Errors

```
Error Boundary (top level)
    ↓
Component catches error
    ↓
Shows "Something went wrong" page
    ↓
User can reload or go home
```

### Backend Connection Errors

```
API Call fails
    ↓
ApiError thrown
    ↓
Component catches in try-catch
    ↓
Shows APIErrorDisplay component
    ↓
User can retry
```

## 📋 Checklist for Backend Deployment

When backend fails, check these:

1. ✅ Backend server is running (`npm start` in `be/` folder)
2. ✅ MongoDB connection is working
3. ✅ API URL in `.env` is correct
   - Dev: `http://localhost:5000`
   - Production: Your deployed URL
4. ✅ CORS is configured (it is in `be/server.js`)
5. ✅ Environment variables are set (`.env` file)

## 🚀 Backend Deployment Checklist

Before deploying backend, update:

```env
# be/.env

# 1. Change this to production MongoDB URL
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# 2. Generate a new secure secret (don't use default)
JWT_SECRET=your-new-production-secret-key-here

# 3. Update frontend URL for password reset emails
FRONTEND_URL=https://your-production-domain.com

# 4. Update email credentials if using email service
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# 5. Set to production mode
NODE_ENV=production

# 6. Port (most hosting provides this via environment)
PORT=5000
```

Update `be/server.js`:

```javascript
// Use PORT from environment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

## 📝 Frontend Changes for Production

In `fe/.env.local` or deployment settings:

```
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com
```

The code already handles this:

```typescript
// lib/api.ts
const DEFAULT_API_BASE_URL = "http://localhost:5000";

function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL;
}
```

## 🔧 Testing Error Scenarios

To test error boundary:

1. Stop backend server (`Ctrl+C`)
2. Try loading dashboard
3. Should show "Connection Error" with troubleshooting steps
4. Click "Retry" button
5. It will retry connection

To test error boundary (JavaScript error):

1. Add `throw new Error("Test error")` in any component
2. Should show "Something went wrong" page
3. Click "Reload Page" to recover

## 📊 Error Types Handled

| Error Type           | Handler          | Result                 |
| -------------------- | ---------------- | ---------------------- |
| API Connection       | APIErrorDisplay  | Shows error + retry    |
| API Response Error   | APIErrorDisplay  | Shows status + message |
| JavaScript Error     | ErrorBoundary    | Shows fallback UI      |
| 404 Not Found        | Next.js built-in | Shows 404 page         |
| Authentication Error | Try-catch        | Redirects to login     |

## ✨ What to Tell Users When Backend Down

Show in UI:

```
"Connection Error
Unable to connect to the server. Please check:
• Backend server is running
• API URL is correct (check .env)
• Internet connection is active
• CORS is enabled on backend

[Error Message Here]

[Retry Button]
```

All of this is now implemented in your code! ✅
