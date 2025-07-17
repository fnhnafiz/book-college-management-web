# AdmitWise - College Booking Web Application

Live Site [https://admitewise.vercel.app/](https://admitewise.vercel.app/)

---

## Project Overview

**AdmitWise** is a full-featured college booking platform built with the MERN stack and **Next.js**. It provides a smooth, responsive, and eye-catching user experience where students can explore colleges, book admission, submit reviews, and access research and gallery resources — all in one place.

---

## Features

**Fully Responsive Design**  
 **College Search with Live Filtering**  
 **College Cards with Ratings, Events, Research & Sports Info**  
 **Detailed College Page with Photos, Events, and Admission Process**  
 **Admission Form with Real-time Submission**  
 **"My College" Page for Student Admission & Review**  
 **Review System with Ratings (Displays on Home Page)**  
 **Image Gallery with Graduate Group Photos**  
 **Research Paper Section with External Links**  
 **Protected Routes (e.g. Admission, My College, Review)**  
 **Authentication**

- Email/Password Login
- Google Login
- Password Reset  
  **User Profile with Editable Info (Name, Email, University, Address)**  
  **404 Page with Creative Design**

---

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS, React Hook Form, React Toastify
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase Auth (Email/Password, Google)
- **Database:** MongoDB Atlas
- **Deployment:** Vercel (Frontend), Render (or any backend deployment)

---

## 📁 Pages & Routes

| Route            | Description                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| `/`              | Home page with search, featured colleges, gallery, research, and reviews |
| `/all-colleges`  | Lists all colleges with search, filter, and detail views                 |
| `/admission`     | Shows colleges; clicking one allows form submission for booking          |
| `/my-college`    | Displays submitted admission and lets user write a review                |
| `/colleges/[id]` | Dynamic route to show individual college details                         |
| `/login`         | Login page (Email/Password or Google)                                    |
| `/register`      | Registration page                                                        |
| `/my-profile`    | Authenticated user profile with edit functionality                       |
| `*`              | Custom 404 error page                                                    |

---

## Authentication Rules

- Only logged-in users can:
  - Access college detail pages
  - Submit reviews
  - View "My College" and profile pages
- User's name shows on the navbar after login
- Firebase Authentication used for:
  - Email/password login
  - Google login
  - Password reset

---

## Extra Touches

- Toast notifications for login, review, and form feedback
- Hover effects, animations, and shadows for better UI
- Favicon and Google Fonts (Roboto) integrated
- Mobile-first responsive layout

---

## Installation

```bash
# Clone the repository
git clone https://github.com/.....
cd admitwise

# Install dependencies
npm install

# Setup environment variables
touch .env.local
# Add Firebase credentials and MongoDB URI

# Run the app
npm run dev
```
