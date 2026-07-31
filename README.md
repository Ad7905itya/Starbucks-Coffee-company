# ☕ Starbucks Full-Stack Clone

A full-featured, responsive, and secure **Starbucks Web Application Clone** built with modern web technologies. This project replicates the core user experience of Starbucks including authentication, profile management, dynamic menu curations, and responsive design for all screen sizes.

---

## 🔗 Live Demo & Deployment

| Service | Hosting Platform | Status | Live Link |
| :--- | :--- | :--- | :--- |
| **Frontend** | Netlify | ![Netlify Status](https://img.shields.io/badge/Frontend-Netlify-00C7B7?style=flat&logo=netlify) | [Live Frontend App](https://starbuckclone1.netlify.app) |
| **Backend API** | Vercel | ![Vercel Status](https://img.shields.io/badge/Backend-Vercel-000000?style=flat&logo=vercel) | [Live API Server](https://starbucks-coffee-company-psi.vercel.app) |

---

## ✨ Key Features

* 🔐 **Secure Authentication:** Cookie-based JWT Authentication with cross-site `SameSite=None` secure cookie management.
* 👤 **User Profile Management:** Dynamic user dashboard featuring account details, user avatars, loyalty tiers, and customizable profiles.
* 📦 **Dynamic Product & Category Fetching:** Real-time data retrieval for Handcraft Curations, Banners, Barista Specials, Rewards, and Search Filters.
* 🔑 **OTP Verification System:** Dedicated backend routes for handling OTP authentication flows.
* 📁 **Cloud Storage Integration:** AWS S3 integration for seamless file and image uploads.
* 📱 **Fully Responsive UI:** Pixel-perfect layout tailored for desktop, tablet, and mobile browsers.

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
* **Framework:** React.js (Vite)
* **Styling:** CSS3 / Modern Utility Styles
* **HTTP Client:** Axios (configured with `withCredentials: true` for cross-origin cookie handling)
* **Deployment:** Netlify

### **Backend**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB Atlas (Mongoose ORM)
* **Security:** JSON Web Tokens (JWT), `cookie-parser`, `cors` configuration for strict cross-origin security.
* **Storage:** AWS S3 SDK (`@aws-sdk/client-s3`)
* **Deployment:** Vercel Serverless Functions (`@vercel/node`)

---

## 📁 Project Structure

```text
starbucks-clone/
├── backend/
│   ├── connectDB/        # MongoDB connection setup
│   ├── controllers/      # Route logic (Auth, User, OTP, Data)
│   ├── middleware/       # JWT Authentication & authorization middleware
│   ├── Routes/           # Express API endpoints
│   ├── index.js          # Main Express server entry point
│   ├── vercel.json       # Vercel serverless deployment config
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI components
    │   ├── pages/        # Page routes (Home, Profile, Rewards, Store, etc.)
    │   ├── main.jsx      # React App Entry
    │   └── App.jsx
    ├── index.html
    └── package.json
