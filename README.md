# Booken 📚

Full-stack MERN bookstore with authentication, dark mode, and book management.

## ⚡ Quick Start

```bash
# Backend
cd Backend
npm install
npm run seed
npm start

# Frontend
cd Frontend
npm install
npm run dev
```

Visit `http://localhost:5173` → Signup → Login → Browse books

---

## 🛠 Tech Stack

**Backend:** Node.js, Express, MongoDB, JWT, bcrypt  
**Frontend:** React, Vite, Tailwind CSS, DaisyUI, Axios

---

## 📋 Environment Variables

### Backend/.env

```properties
PORT=4001
MONGODB_URI=your_mongodb_uri
NODE_ENV=development
JWT_SECRET=your_32_char_secret
CORS_ORIGIN=http://localhost:5173
```

### Frontend/.env

```properties
VITE_API_BASE_URL=http://localhost:4001
```

---

## 🌐 Deploy

### MongoDB Atlas
1. Create cluster at [mongodb.com/atlas](https://mongodb.com/cloud/atlas)
2. Get connection string

### Backend → Render
- Root: `Backend`
- Start: `npm start`
- Env: `MONGODB_URI`, `JWT_SECRET`, `CORS_ORIGIN`, `NODE_ENV=production`

### Frontend → Vercel
- Root: `Frontend`
- Build: `npm run build`
- Env: `VITE_API_BASE_URL=your-backend-url`

---


## 📁 Structure

```
Booken/
├── Backend/
│   ├── controller/
│   ├── model/
│   ├── route/
│   ├── index.js
│   └── seed.js
└── Frontend/
    └── src/
        ├── components/
        ├── pages/
        ├── context/
        └── App.jsx
```

---

## ✨ Features

✅ JWT authentication  
✅ Book CRUD  
✅ Dark mode  
✅ Responsive  
✅ Protected routes  
✅ Newsletter

---

## 📜 License

MIT

---
