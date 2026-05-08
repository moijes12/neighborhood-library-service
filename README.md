# Neighborhood Library Service 📚
An App for a small neighborhood library to manage its members, books, and lending operations. Built with a decoupled architecture using **Django REST Framework** and **React (Vite + TypeScript + MUI)**.

## 🚀 Overview

This application allows neighbors to browse a shared collection of books, manage personal borrowings, and track active checkouts through a dynamic dashboard. It includes built-in logic for overdue penalties to encourage community engagement and timely returns.

## ✨ Key Features

### Backend (Django)
- **Book Management**: Full CRUD for library inventory with availability tracking.
- **Borrowing Logic**: Atomic "Borrow" and "Return" actions.
- **Dynamic Fines**: Real-time calculation of $1/day fines for overdue active checkouts.
- **Member Profiles**: Dedicated endpoints for user dashboard summaries.
- **Automated Quality**: **Ruff** for lightning-fast linting and formatting.

### Frontend (React)
- **MUI Integration**: Modern, consistent UI using Material UI components.
- **Toolpad Core**: Streamlined authentication flow and Sign-In pages.
- **My Books Dashboard**: A private user view to manage current holdings and monitor fines.
- **Responsive Gallery**: Book browsing with tooltips and status indicators.
- **Code Standards**: **ESLint** and **Prettier** integration for consistent TSX styling.

### Developer Experience
- **Dockerized Workflow**: One-command setup for the entire stack.
- **Automated Superuser**: Instant admin access on startup via environment variable injection.


## 🛠 Tech Stack


| Layer | Technology |
| :--- | :--- |
| **Backend** | Python 3.14, Django 6.x, DRF |
| **Frontend** | React 19, Vite, TypeScript, MUI, Node 25 |
| **Auth** | JWT (SimpleJWT) / Toolpad Core |
| **Quality** | Ruff (Backend), Prettier/ESLint (Frontend), Pre-commit hooks |

## 🏁 Getting Started


### Prerequisites
- Docker Desktop installed and running

### 🚀 Quick Start with Docker
1. Clone the repository
2 . Run `docker-compose up --build`
3. Log in to the admin panel at `http://localhost:8000/admin/` with:
   - Username: `admin`
   - Password: `password`
4. Add a new user for the library
3. Access the frontend at `http://localhost:5173` and sign in with the new user credentials.

The system will automatically:
- Start the PostgreSQL database.
- Apply Django migrations.
- Create your Superuser account.
- Fetch classic books from the Gutendex API.
- Start the React dev server at http://localhost:5173.

### Dev Setup (Without Docker)
### Backend Setup
Presuming you have Python 3.14 installed, follow these steps:
1. `cd backend`
2. `pip install -r requirements.txt`
3. `pre-commit install`
4. `python manage.py migrate`
5. `python manage.py runserver`

### Frontend Setup
Presuming you have Node 25 installed, follow these steps:
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## 🧹 Maintenance Commands

- **Format Backend**: `pre-commit run --all-files` (runs Ruff and basic hooks)
- **Format Frontend**: `npm run format` (runs Prettier on all `.ts` and `.tsx` files)
- **Lint Frontend**: `npm run lint`

## 📝 Design Document Summary

- **App Structure**:
  - `books`: Handles book metadata and inventory status.
  - `borrowings`: Manages the lifecycle of a loan and overdue logic.
  - `member`: Manages user identity and profile-specific data aggregations.
- **State Flow**:
  - Unauthenticated users can browse the collection.
  - Borrowing triggers a redirect to the Sign-In page.
  - Successful login stores JWTs in `localStorage`, which are automatically injected into requests via an Axios interceptor.
