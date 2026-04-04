# FinSight — Personal Finance Analytics Dashboard

A modern **React + Vite finance dashboard** built as a recruiter-focused frontend assignment project.
The application demonstrates **data-driven UI architecture, role-based controls, dynamic KPI analytics, responsive design, and polished dashboard UX**.

## ✨ Project Overview

FinSight is a single-page financial analytics dashboard designed to help users:

* Track income and expenses
* Monitor balance growth trends
* Analyze spending behavior
* Search and manage transactions
* Switch between **Admin** and **Viewer** roles
* Use **dark/light mode preferences**

The dashboard is intentionally built with a **product-oriented frontend mindset**, where all KPI cards, charts, and insights derive from the **transaction data source**.

---

## 🚀 Key Features

### 📊 Dynamic KPI Dashboard

* Total Balance
* Monthly Income
* Monthly Expenses
* Savings Rate
* Dynamic growth percentages based on **recent vs previous transaction segments**

### 📈 Live Balance Trend Analytics

* Recharts-powered line chart
* Automatically updates when transactions are **added or edited**
* Uses cumulative transaction flow for balance trend visualization

### 💳 Transaction Management

* Search transactions in real time
* Add new transactions
* Edit existing transactions
* Role-based admin controls
* Clean table UX with badges and transaction types

### 🔐 Role-Based Access

* **Admin** → Add + Edit transactions
* **Viewer** → Read-only dashboard access

### 🎨 UI / UX Polish

* Fully responsive layout
* Dark / Light mode toggle
* Smooth visual hierarchy
* Shadcn/ui component system
* Mobile-friendly responsive dashboard sections

---

## 🛠️ Tech Stack

* **React.js**
* **Vite**
* **Tailwind CSS v4**
* **shadcn/ui**
* **Recharts**
* **Lucide React**

---

## 🧠 Architecture Highlights

This project uses a **single source of truth pattern**:

```jsx
transactions state
```

All dashboard layers are derived from transaction state:

* KPI cards
* Growth percentages
* Balance trend chart
* Insights
* Search results
* Role-based table actions

This ensures:

* predictable state flow
* easier scaling
* reduced UI inconsistencies
* better recruiter-grade frontend architecture

---

## 📂 Folder Structure

```bash
src/
 ├── components/
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

The assignment was intentionally kept **single-page and focused**, prioritizing **clean state management and UI consistency over unnecessary routing complexity**.

---

## ⚙️ Setup Instructions

```bash
git clone <repo-url>
cd finsight-dashboard
npm install
npm run dev
```

---

## 🎯 Product Thinking Decisions

A few deliberate product-level decisions were made during development:

* Removed sidebar to maximize dashboard visibility
* Converted hardcoded metrics into dynamic KPI logic
* Made chart and cards update from transaction edits
* Simplified navigation for single-screen assignment UX
* Added responsive behavior for recruiter demo readiness

These choices were made to keep the dashboard:

> **clean, scalable, and interview-ready**

---

## 📌 Assignment Coverage

This project fulfills the frontend assignment through:

* dashboard UI implementation ✅
* interactive React state handling ✅
* dynamic charts and cards ✅
* role-based access control ✅
* responsive design ✅
* polished recruiter-ready UX ✅

---

## 👨‍💻 Developer Notes

This project was built with strong emphasis on:

* frontend engineering fundamentals
* scalable component composition
* product-level UI decisions
* recruiter-friendly code readability
* practical dashboard data modeling

The goal was not just to complete the assignment, but to present a **production-minded frontend implementation**.

---

## 🌐 Deployment

Recommended deployment: **Vercel**

```bash
npm run build
```

Deploy the generated Vite app for a live recruiter demo.

---

## 📬 Final Note

This assignment evolved from a static UI into a **fully dynamic analytics dashboard** with responsive behavior and transaction-driven state architecture.

It reflects both:

* strong React fundamentals
* thoughtful product design decisions

making it suitable as a **frontend portfolio-quality recruiter submission**.
