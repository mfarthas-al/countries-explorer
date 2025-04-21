[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)

# 🌍 Countries Explorer

A responsive and animated React-based web app to explore country details using the [REST Countries API](https://restcountries.com/). Includes search, filtering, authentication, and a favorites system.

---

## 🚀 Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, Framer Motion
- **Routing**: React Router DOM
- **Authentication**: LocalStorage + Context API
- **Testing**: Jest, React Testing Library
- **Animation**: Framer Motion
- **Responsive Design**: Tailwind CSS breakpoints

---

## 📦 Features

| Feature                    | Description                                                              |
|----------------------------|--------------------------------------------------------------------------|
| 🌐 Country Explorer        | View country details: name, capital, region, population, languages, flag |
| 🔍 Dynamic Search          | Search countries in real-time without reloading                          |
| 🗺️ Region & Language Filter| Sidebar with multiple checkbox filters for region and language           |
| ❤️ Favorite Countries      | Users can mark/unmark countries as favorites (stored in localStorage)    |
| 👤 Login/Logout UI         | Simulated login system using username only                               |
| 📱 Responsive UI           | Mobile-first responsive layout using Tailwind                            |
| 🎞 Smooth Animations        | Entry and transition animations using Framer Motion                      |
| 🧪 Unit & Integration Tests| Includes Jest + React Testing Library test coverage                      |

---

## ⚙ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-mfarthas-al.git
cd countries-explorer

npm install

npm run dev

The app should now be running at: http://localhost:5173

## 🧪 Testing Guide

### 1️⃣ Running Unit & Integration Tests

Run all tests using:

```bash
npm test

deployment link: https://countries-explorer-x2w6.vercel.app/