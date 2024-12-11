# HB Realty

**A dynamic platform designed to streamline property transactions and deliver an enhanced user experience. The application integrates modern technologies and intuitive features, ensuring a seamless journey for users seeking to buy, sell, or rent properties.**

## Features

### 1. 🔐 User Authentication & Profile Management
- Secure signup/signin process.
- Profile updates and avatar uploads for personalization.

### 2. 🏠 Property Listings
- Create, browse, and manage property listings.
- Supports over 1,000 active listings at any given time.

### 3. 🔍 Advanced Search Filters
- Customize your search using these 6 filters:
  1. Location
  2. Property Type
  3. Buy or Rent preference
  4. Minimum Price
  5. Maximum Price
  6. Number of Bedrooms

### 4. 💬 Interactive Messaging
- Messaging feature for seamless communication about property queries.

### 5. 🗺️ Map Integration
- Interactive map to visualize property locations.

### 6. 🛡️ Secure Authentication
- Cookies with JWT for secure and reliable user sessions.

---

## Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express, Prisma, Socket.io
- **Database:** MongoDB

---

## Installation

Follow these steps to run the project locally:

### Prerequisites
- Node.js (v16 or later)
- MongoDB (local or hosted)
- npm or yarn package manager

### Steps

### 1. 🖥️ Clone the repository:
   ```bash
   git clone https://github.com/HarshitBakrania/HB-Realty
   cd hb-realty
   ```

### 2. 📦 Install dependencies for each service:
   - **Backend:**
     ```bash
     cd api
     npm install
     ```
   - **Frontend:**
     ```bash
     cd ../client
     npm install
     ```
   - **WebSocket:**
     ```bash
     cd ../websocket
     npm install
     ```

### 3. 🛠️ Set up environment variables:
   - Copy the content from `.env.example` present in the `api`, `client`, and `websocket` folders to create a `.env` file in each respective folder.
   - Replace the values as needed. For example, in the `api` folder:
     ```env
     DATABASE_URL="yourdatabaseurl"
     JWT_SECRET=yourjwtsecret
     CLIENT_URL="http://localhost:5173"
     NODE_ENV=development
     ```

### 4. 🚀 Run the development servers:
   - **Backend** server:
     ```bash
     cd api
     npm start
     ```
   - **Frontend** server:
     ```bash
     cd ../client
     npm run dev
     ```
   - **WebSocket** server:
     ```bash
     cd ../websocket
     npm start
     ```

### 5. 🌐 Access the application in your browser:
   ```
   http://localhost:5173
   ```