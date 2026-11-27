# Urban Spoon – Contemporary Fine Dining Restaurant Web Application

> **Full-Stack MERN Application • 28 George Street, Edinburgh, Scotland**

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v24.x-blue.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.19-lightgrey.svg)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-v18.3-cyan.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen.svg)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT_Bearer-orange.svg)](https://jwt.io/)

---

## 1. Project Overview

**Urban Spoon** is a production-quality, responsive full-stack MERN application crafted for an upscale restaurant and lounge. It enables prospective diners to explore categorized menus with dynamic pricing and culinary tags, learn about the restaurant's culinary philosophy and decade-long heritage, review detailed contact coordinates and operating hours, and submit structured **Table Booking Inquiries** with instant summary confirmation.

Additionally, Urban Spoon features a protected **Administrator Management Dashboard** powered by JSON Web Token (JWT) authentication, allowing restaurant personnel to monitor booking statistics in real-time, filter inquiries by status or booking date, search customer records, update inquiry statuses, and delete expired inquiries.

---

## 2. Key Features & Implementation Overview

### Level 1 – Basic Website Layout & Branding
- **Homepage:** High-end aesthetic with text and SVG branding, warm color palette (warm orange `#ea580c`, cream `#fdfaf4`, dark brown `#24140c`, and crisp white), welcoming introduction, and statistical proof points.
- **Navigation Bar:** Fixed, responsive navbar with blur backdrop filter, active link indicators, smooth navigation, and a slide-in mobile navigation drawer.
- **Hero Section:** Full-bleed background imagery, bold typography, tagline *"Artisanal Flavors, Unforgettable Dining Moments"*, and dual call-to-action buttons (*Explore Menu* and *Reserve Table*).
- **Footer:** Brand identity, Edinburgh address, operating hours breakdown, direct phone/email channels, social media links (Instagram, Facebook, Twitter, TripAdvisor), and copyright notice.

### Level 2 – Menu & Restaurant Information
- **Categorized Menu Display:** Starters, Main Course, Desserts, and Beverages.
- **Detailed Food Cards:** High-resolution food photography, dish title, price, culinary description, dietary badge (Vegetarian, Gluten-Free, Seafood, Chef Signature), and caloric info.
- **About Page:** Ten-year culinary timeline (2014–2024), kitchen philosophy quote from Executive Chef Alexandre Laurent, core culinary specialties (Wood-Fired Prime Cuts, Artisanal Pasta, Haute Pastry, Botanical Mixology), and farm-to-table partner highlights.

### Level 3 – Contact & Operating Timings
- **Contact Channels:** Clearly identified sample placeholders for restaurant address, multiple telephone departments (Reservations and Banquets), and email addresses.
- **Service Timings:** Weekday lunch/dinner, Friday/Saturday late kitchen, and Sunday grand brunch.
- **Location Showcase:** Interactive simulated GPS map frame (`40.730610, -73.935242`) with landmark proximity, public subway access guide, and complimentary valet parking details.

### Level 4 – Full-Stack Table Inquiry System
- **Table Inquiry Form:** Validated inputs for Customer Name, Phone Number, Booking Date/Time, and Number of Guests (1–50) with optional Special Requests.
- **Robust Validation:** Prevents past dates, invalid phone formats, negative or excessive guest counts, and empty submissions with inline feedback.
- **Confirmation Screen:** Dedicated post-submission summary displaying reference ID, party size, requested date, guest notes, initial **Pending** status, and clear communication that the restaurant will contact the customer to confirm seating.
- **Express & MongoDB Backend:** Mongoose schema, validation middlewares, centralized error handling, and robust REST APIs.

### Level 5 – Advanced Filtering & Admin Management Dashboard
- **Menu Filtering & Search:** Category switcher pills, live keyword search by dish name/ingredients, and price sorting (Low to High, High to Low).
- **Admin JWT Authentication:** Secure login endpoint using bcrypt password hashing and signed JWT bearer tokens.
- **KPI Metrics Cards:** Real-time counters for Total Inquiries, Pending Review, Confirmed Tables, and Cancelled Requests.
- **Inquiry Management Table:** Sortable and searchable table with status pills, customer phone links, special requests preview, and quick status actions.
- **Detail Modal & Deletion:** View comprehensive customer details, update status to *Confirmed*, *Pending*, or *Cancelled*, or delete records with confirmation safeguards.
- **Pagination & Filters:** Filter inquiries by status, date picker, customer name/phone search, and responsive pagination.

### Additional Features
- **Toast Notification Engine:** Animated toast alerts for all user and admin actions.
- **Custom 404 Page:** Polished 404 error page with quick recovery links.
- **Automated Integration Test Suite:** 18 passing backend integration tests.
- **Zero-Config Database Support:** Seamlessly connects to MongoDB Atlas or local MongoDB; includes automatic fallback to memory server if no external daemon is running.

---

## 3. Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, React Router DOM v6, Axios, React Icons, Custom Modular CSS, Vite |
| **Backend** | Node.js, Express.js, Mongoose ODM, JSON Web Tokens (jsonwebtoken), bcryptjs, Morgan, CORS, express-validator |
| **Database** | MongoDB (Atlas Cloud or Local MongoDB `mongodb://localhost:27017/urban_spoon`) |
| **Testing & Tools** | Postman, VS Code, Git, Native Node Test Runner |

---

## 4. Project Architecture

```
urban-spoon/
├── client/                               # Frontend React Application
│   ├── public/
│   │   └── favicon.svg                   # Urban Spoon cutlery brand favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   └── InquiryDetailModal.jsx# Full customer inquiry details modal
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx            # Responsive header with mobile drawer
│   │   │   │   └── Footer.jsx            # Comprehensive footer with timings & links
│   │   │   ├── inquiry/
│   │   │   │   ├── TableInquiryForm.jsx  # Validated inquiry submission form
│   │   │   │   └── ConfirmationSummary.jsx# Post-submission confirmation card
│   │   │   └── menu/
│   │   │       └── MenuCard.jsx          # Reusable food card component
│   │   ├── context/
│   │   │   ├── AuthContext.jsx           # Admin JWT state & auth methods
│   │   │   └── ToastContext.jsx          # Toast notification provider
│   │   ├── data/
│   │   │   ├── menuData.js               # 16 curated menu items across 4 categories
│   │   │   └── testimonialsData.js       # Customer reviews and gallery dataset
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx            # Public shell (Navbar + Content + Footer)
│   │   │   └── AdminLayout.jsx           # Admin shell with header & session bar
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminLogin.jsx        # Admin credential login screen
│   │   │   │   └── AdminDashboard.jsx    # Table inquiries metrics & management
│   │   │   ├── Home.jsx                  # Level 1 homepage with hero & highlights
│   │   │   ├── Menu.jsx                  # Level 2 & 5 menu with filter/search/sort
│   │   │   ├── About.jsx                 # Level 2 story, timeline, & specialties
│   │   │   ├── Contact.jsx               # Level 3 contact details, hours & map
│   │   │   ├── ReserveTable.jsx          # Level 4 table inquiry & confirmation
│   │   │   └── NotFound.jsx              # Custom 404 page
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx             # React router configuration
│   │   │   └── ProtectedRoute.jsx        # Admin route guard
│   │   ├── services/
│   │   │   ├── api.js                    # Axios instance with interceptors
│   │   │   ├── authService.js            # Auth API calls
│   │   │   └── inquiryService.js         # Inquiries API calls
│   │   ├── styles/
│   │   │   ├── variables.css             # Theme colors, fonts, shadows, radii
│   │   │   ├── global.css                # Base typography & layout classes
│   │   │   ├── navbar.css                # Header & mobile drawer styles
│   │   │   ├── footer.css                # Footer styles
│   │   │   ├── home.css                  # Hero & homepage section styles
│   │   │   ├── menu.css                  # Menu cards & filter styling
│   │   │   ├── about.css                 # Story & timeline styling
│   │   │   ├── contact.css               # Contact cards & map layout
│   │   │   ├── inquiry.css               # Form & confirmation styling
│   │   │   ├── admin.css                 # Admin table, cards, modal styling
│   │   │   └── responsive.css            # Media query adjustments
│   │   ├── utils/
│   │   │   ├── formatDate.js             # DateTime formatting utilities
│   │   │   └── validation.js             # Form validation helpers
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/                               # Backend Express API Server
│   ├── config/
│   │   └── db.js                         # Mongoose connection & fallback handler
│   ├── controllers/
│   │   ├── authController.js             # Admin authentication logic
│   │   └── inquiryController.js          # Table inquiries CRUD logic
│   ├── middleware/
│   │   ├── authMiddleware.js             # JWT verification middleware
│   │   ├── errorMiddleware.js            # 404 & centralized error handler
│   │   └── validateMiddleware.js         # Express-validator error handler
│   ├── models/
│   │   ├── Admin.js                      # Admin model with bcrypt hashing
│   │   └── TableInquiry.js               # Table inquiry schema with indexing
│   ├── routes/
│   │   ├── authRoutes.js                 # /api/auth routes
│   │   └── inquiryRoutes.js              # /api/inquiries routes
│   ├── tests/
│   │   └── api.test.js                   # Automated 18-step integration test suite
│   ├── utils/
│   │   └── seed.js                       # Database seeder (admin & sample inquiries)
│   ├── .env.example
│   ├── package.json
│   └── server.js                         # Express application entrypoint
│
├── urban_spoon_postman_collection.json   # Ready-to-import Postman test collection
├── .gitignore
└── README.md
```

---

## 5. Installation & Local Execution Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or newer; tested on Node v24)
- [npm](https://www.npmjs.com/) (v9.x or newer)
- MongoDB instance (MongoDB Atlas cluster or Local MongoDB running on `localhost:27017`)

---

### Step 1: Clone or Navigate to Project
```bash
cd "e:\INTERNSHIP PROJECT\urban-spoon"
```

---

### Step 2: Configure Environment Variables

**Backend (`server/.env`):**
Create `server/.env` (or copy from `server/.env.example`):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/urban_spoon
JWT_SECRET=urbanspoon_super_secret_jwt_key_2026_prod
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

> **Note on MongoDB:** If you use MongoDB Atlas, replace `MONGO_URI` with your connection string:  
> `mongodb+srv://<username>:<password>@cluster0.mongodb.net/urban_spoon?retryWrites=true&w=majority`  
> If no external daemon is running, the server seamlessly connects locally or falls back to an in-memory instance for testing!

**Frontend (`client/.env`):**
Create `client/.env` (or copy from `client/.env.example`):
```env
VITE_API_URL=http://localhost:5000/api
```

---

### Step 3: Install Dependencies

**Install Backend Dependencies:**
```bash
cd server
npm install
```

**Install Frontend Dependencies:**
```bash
cd ../client
npm install
```

---

### Step 4: Seed the Database
Populate the database with the default administrator account and realistic sample customer inquiries:
```bash
cd ../server
npm run seed
```
*Output:*
```
[Seed] Connected successfully to host: localhost
[Seed] Created default admin: admin@urbanspoon.com (Password: admin123)
[Seed] Successfully inserted 6 sample table inquiries!
```

---

### Step 5: Start Backend and Frontend Servers

**Terminal 1 (Backend API):**
```bash
cd server
npm run dev
# Or: npm start
```
*The server will run on: `http://localhost:5000`*

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
```
*The React application will run on: `http://localhost:5173`*

---

## 6. Default Administrative Credentials

For testing and evaluation of the Admin Portal:

| Field | Value |
|---|---|
| **Portal URL** | [http://localhost:5173/admin/login](http://localhost:5173/admin/login) |
| **Email** | `admin@urbanspoon.com` |
| **Password** | `admin123` |
| **One-Click Quick Login** | Click **"Fill Credentials"** button on login screen |

---

## 7. REST API Reference

All endpoints are prefixed with `/api`.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/health` | Public | Server uptime and health verification |
| `POST` | `/inquiries` | Public | Submit new customer table inquiry |
| `POST` | `/auth/login` | Public | Admin login, returns JWT token |
| `GET` | `/auth/profile` | Protected (Admin) | Retrieve authenticated admin profile |
| `GET` | `/inquiries` | Protected (Admin) | List inquiries (supports status, search, date, pagination) |
| `GET` | `/inquiries/stats/summary`| Protected (Admin) | Aggregate inquiry counts (total, pending, confirmed, cancelled) |
| `GET` | `/inquiries/:id` | Protected (Admin) | Retrieve single inquiry by ObjectId |
| `PATCH`| `/inquiries/:id/status` | Protected (Admin) | Update status (`Pending`, `Confirmed`, `Cancelled`) |
| `DELETE`| `/inquiries/:id` | Protected (Admin) | Remove inquiry from database |

### Sample Payload: Submit Table Inquiry
`POST /api/inquiries`
```json
{
  "customerName": "Eleanor Vance",
  "phoneNumber": "+1 (555) 234-5678",
  "bookingDate": "2026-11-28T19:30:00.000Z",
  "numberOfGuests": 4,
  "specialRequests": "Window booth requested for anniversary celebration."
}
```

---

## 8. Automated Integration Testing

An automated 18-step integration test suite is included in `server/tests/api.test.js`.

To run the full test suite:
```bash
cd server
npm test
```

**Results:**
```
====================================================
  URBAN SPOON FULL-STACK INTEGRATION TEST SUITE
====================================================

Test Suite 1: Health & Public Endpoints
  [PASS] GET /api/health returns 200 and healthy status

Test Suite 2: Public Table Inquiry (Level 4)
  [PASS] POST /api/inquiries returns 201 Created
  [PASS] POST /api/inquiries response has success: true
  [PASS] Inquiry defaults to status "Pending"

Test Suite 3: Validation and Error Handling
  [PASS] POST /api/inquiries with invalid payload returns 400 Bad Request
  [PASS] Returns structured validation errors

Test Suite 4: Admin Authentication & Security
  [PASS] POST /api/auth/login with wrong password returns 401 Unauthorized
  [PASS] POST /api/auth/login with valid credentials returns 200 OK
  [PASS] Returns signed JWT token

Test Suite 5: Protected Routes Access Control
  [PASS] GET /api/inquiries without token returns 401 Unauthorized
  [PASS] GET /api/inquiries with Bearer token returns 200 OK
  [PASS] Returns inquiries list
  [PASS] Returns summary statistics object

Test Suite 6: Inquiry Status Management
  [PASS] PATCH /api/inquiries/:id/status returns 200 OK
  [PASS] Status successfully changed to Confirmed

Test Suite 7: ObjectId Validation
  [PASS] GET /api/inquiries/:id with invalid ObjectId returns 400

Test Suite 8: Delete Operations
  [PASS] DELETE /api/inquiries/:id returns 200 OK
  [PASS] Deleted inquiry returns 404 Not Found

====================================================
  TEST RESULTS: 18 Passed, 0 Failed
====================================================
```

---

## 9. Postman Collection

Import `urban_spoon_postman_collection.json` directly into Postman:
1. Open Postman -> Click **Import**.
2. Select `urban_spoon_postman_collection.json`.
3. Collection variable `baseUrl` is preset to `http://localhost:5000/api`.
4. Run the **Admin Login** request; test scripts will automatically save the JWT token into `{{adminToken}}` for subsequent protected requests.

---

## 10. MongoDB Atlas Setup & Production Deployment

### Step A: Configure MongoDB Atlas (Cloud Database)
1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free **M0 Cluster**.
2. Go to **Database Access** -> **Add New Database User** (Password authentication), and note the username and password. *(If your password has special characters like `@`, `#`, `:`, URL-encode them.)*
3. Go to **Network Access** -> **Add IP Address** -> select **Allow Access from Anywhere (`0.0.0.0/0`)** so cloud hosting servers (Render/Railway) can connect.
4. Go to **Database** -> **Connect** -> **Drivers** and copy your SRV connection string, adding `/urban_spoon` before the `?`:
   ```env
   mongodb+srv://<username>:<password>@<cluster-url>/urban_spoon?retryWrites=true&w=majority&appName=UrbanSpoon
   ```
5. To test Atlas locally or seed initial admin/sample inquiries directly into Atlas, paste your Atlas URI into `server/.env` as `MONGO_URI=...` and run:
   ```bash
   cd server
   npm run seed
   ```
   *(Note: `server/server.js` also auto-creates the default admin `admin@urbanspoon.com` / `admin123` on first startup if the `admins` collection is empty.)*

### Step B: Deploy Backend (Render / Railway)
1. Push your repository to GitHub (the included `render.yaml` and `server/Procfile` are pre-configured).
2. On [Render](https://render.com/) (or Railway), create a **New Web Service** connected to your `URBAN-SPOON` GitHub repository:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/health`
3. Add the following **Environment Variables**:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/urban_spoon?retryWrites=true&w=majority&appName=UrbanSpoon`
   - `JWT_SECRET=<your_long_random_secret_key>`
   - `JWT_EXPIRE=7d`
   - `CLIENT_URL=https://your-frontend-domain.vercel.app`
4. Verify deployment by visiting `https://your-backend.onrender.com/api/health` — it should return `"status": "healthy"` and `"database": { "state": "connected" }`.

### Step C: Deploy Frontend (Vercel / Netlify)
1. On [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/), import the `URBAN-SPOON` GitHub repository:
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - *(SPA routing rewrites are already handled by `client/vercel.json` and `client/public/_redirects`.)*
2. Add the environment variable:
   - `VITE_API_URL=https://your-backend.onrender.com/api`
3. Copy your deployed frontend URL (e.g., `https://urban-spoon.vercel.app`) back into the backend's `CLIENT_URL` environment variable so CORS allows live requests.

---

## 11. Feature Verification Checklist

- [x] **Level 1:** Homepage with text/SVG branding, sticky navbar, mobile drawer, hero section, and comprehensive footer.
- [x] **Level 2:** Menu page with Starters, Main Course, Desserts, Beverages; About page with history, cuisine, specialties, and why choose us.
- [x] **Level 3:** Contact page with Edinburgh address, UK phone numbers, email details, opening hours, and stylized location map.
- [x] **Level 4:** Node.js + Express backend, Mongoose `TableInquiry` model, REST APIs, client-side & server-side validation, and instant confirmation screen.
- [x] **Level 5:** Functional category filtering, food name search, price sorting, admin JWT authentication, KPI stat cards, inquiry management table, status updater, customer details modal, and pagination.
- [x] **Additional:** Customer testimonials, ambiance gallery, 404 error page, animated toast system, seed script, Postman collection, and 18 passing integration tests.

---

*Urban Spoon Contemporary Dining • Edinburgh, Scotland, UK.*
