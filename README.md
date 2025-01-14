# Farm Management System - Frontend

This repository contains the frontend code for the Farm Management System, a web-based platform for farmers and admins to manage agricultural fields, transactions, and user details. Built using React, TailwindCSS, and Context API.

---

## Features
- Role-based access for Farmers and Admins.
- Farmers can manage their fields and make transactions.
- Admins can manage users, fields, and transactions.
- Responsive design for seamless usage across devices.

---

## Prerequisites
Before running this project locally, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/rakesh-kumar-18/sensegrass-client.git
cd sensegrass-client
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Create `.env` File
Create a `.env.local` file in the root directory with the following keys:
```env
VITE_API_URL=http://localhost:3000
```

### 4. Start the Development Server
```bash
npm start
# or
yarn start
```

The application will run at [http://localhost:5173](http://localhost:5173).

---

## Folder Structure
- `src`
  - `components`: Reusable React components.
  - `pages`: Screens like Login, Signup, Dashboard, etc.
  - `context`: Context API for state management.
  - `api`: API utility for backend requests.

---

## Scripts
- `npm start`: Start the development server.
- `npm build`: Build the project for production.

---

## Issues
If you encounter any issues, please open an issue in this repository.
