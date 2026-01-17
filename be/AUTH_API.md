# Authentication API Documentation

## Overview

Complete authentication system with Login, Signup, and Forgot Password flows.

## API Endpoints

### 1. Signup

**POST** `/api/auth/signup`

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**

```json
{
  "message": "Account created successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "staff"
  }
}
```

---

### 2. Login

**POST** `/api/auth/login`

**Request:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "staff"
  }
}
```

---

### 3. Forgot Password

**POST** `/api/auth/forgot-password`

**Request:**

```json
{
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "message": "If email exists, reset link has been sent",
  "resetToken": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6" // Only in development
}
```

---

### 4. Reset Password

**POST** `/api/auth/reset-password`

**Request:**

```json
{
  "email": "john@example.com",
  "token": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**Response:**

```json
{
  "message": "Password reset successfully. Please login."
}
```

---

### 5. Verify Token

**GET** `/api/auth/verify-token`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response:**

```json
{
  "valid": true,
  "user": {
    "userId": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "role": "staff",
    "iat": 1705420800,
    "exp": 1706025600
  }
}
```

---

## Frontend Integration

### Store Token After Login

```javascript
localStorage.setItem("authToken", response.token);
localStorage.setItem("user", JSON.stringify(response.user));
```

### Send Token in Requests

```javascript
const token = localStorage.getItem("authToken");
fetch("/api/endpoint", {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
```

### Logout

```javascript
localStorage.removeItem("authToken");
localStorage.removeItem("user");
window.location.href = "/login";
```

---

## User Roles

- **admin** - Full access to all features
- **manager** - Manager-level access
- **staff** - Basic staff access (default)

---

## Security Features

✅ Passwords hashed with bcryptjs
✅ JWT tokens with 7-day expiration
✅ Password reset tokens (1-hour expiration)
✅ Account activation status check
✅ Email validation

---

## Environment Variables Required

```env
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
NODE_ENV=development
```

---

## Testing

### Test Signup

1. Go to http://localhost:3000/login
2. Click "Sign up"
3. Enter details and submit

### Test Login

1. Use credentials from signup
2. Token stored in localStorage
3. Redirects to `/customers`

### Test Forgot Password

1. Click "Forgot Password?" on login page
2. Enter email
3. In development, token appears (copy it)
4. Click "Reset password" link or manually navigate
5. Enter new password
6. Login with new password

---

## Notes

- Email service (nodemailer) is optional - works without it
- In development, reset tokens are returned in response for testing
- Production: Remove reset token from response and only send via email
- All passwords are hashed, never stored in plain text
