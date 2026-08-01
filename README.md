
# F.A.S.T.-Library-App

## Description

F.A.S.T. Library (Formulas, Algorithms, Syntax, Tools) is a full-stack app for developers to save and organize quick-reference lookups — syntax snippets, algorithms, formulas, and tool commands — grouped into projects and tagged for easy searching. Users log in, create projects, and either manually generate or use AI (OpenAI) to generate a lookup by asking a question, which auto-fills the title, category, content, and explanations. Lookups can be tagged, edited, and deleted, and are scoped so users only ever see their own data.

## Technologies Used

- **Backend:** Flask, Flask-RESTful, Flask-SQLAlchemy, Flask-Migrate, Flask-Bcrypt, Flask-CORS
- **Database:** SQLite (SQLAlchemy ORM)
- **Frontend:** React, React Router, Context API
- **AI:** OpenAI API (gpt-4o-mini) for AI-assisted lookup generation
- **Other:** SQLAlchemy-Serializer for JSON serialization, bcrypt for password hashing, python-dotenv for environment variables

## Setup / Run Instructions

### Backend

```bash
cd Backend
pipenv install
pipenv shell
```

Create a `.env` file inside `Backend/` with the following:

```
SECRET_KEY=your_secret_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

Then run:

```bash
flask db upgrade
python seed.py
python app.py
```

Backend runs on `http://localhost:5555`

### Frontend

In a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

You'll need both running at the same time.

## Core Functionality

- Sign up / log in / log out (session-based auth with bcrypt password hashing)

- Users can only see, edit, and delete their own projects and lookups

- Create, view, edit, and delete projects (title, description, language)

- Create lookups via AI generation — ask a question, review the AI-generated draft (title, category, content, beginner/advanced explanations), attach tags as chips, and save to a chosen project

- Edit and delete existing lookups

- Add and remove tags on lookups; tags are shared/global and reused across lookups

- Empty states for dashboards/pages with no data yet

- Full ownership protection on the backend — a user cannot view, edit, or delete another user's projects or lookups, and cannot connect a lookup to a project they don't own

## Models / Relationships

```
User -> Project -> Lookup -> Tag
```

- `User` has many `Project`s and `Lookup`s

- `Project` and `Lookup` are connected many-to-many through `LookupProject` (a lookup can belong to multiple projects)

- `Lookup` and `Tag` are connected many-to-many through `LookupTag` (tags are shared across all users)

## Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | /signup | Create a new user |
| POST | /login | Log in |
| DELETE | /logout | Log out |
| GET | /check_session | Check if logged in |
| GET | /projects | Get logged-in user's projects (paginated) |
| POST | /projects | Create a new project |
| PATCH | /projects/:id | Update a project |
| DELETE | /projects/:id | Delete a project |
| GET | /lookups | Get logged-in user's lookups (paginated) |
| POST | /lookups | Create a new lookup (optionally connected to a project, with tags) |
| PATCH | /lookups/:id | Update a lookup |
| DELETE | /lookups/:id | Delete a lookup |
| POST | /lookups/:lookup_id/tags | Connect a tag to a lookup (creates the tag if it doesn't exist) |
| DELETE | /lookups/:lookup_id/tags/:tag_id | Disconnect a tag from a lookup |
| GET | /tags | Get all tags |
| POST | /tags | Create a standalone tag |
| DELETE | /tags/:id | Delete a tag entirely |
| POST | /lookups/generate | Generate a lookup draft using AI, based on a question |

## Test Account

- **Username:** user_1

- **Password:** password123

## Screenshots

### Login
![Login screen](images/login.png)

### Dashboard
![Dashboard](images/dashboard.png)

### Create a Project
![Create](images/create.png)

### Generate a Lookup
![Generate](images/generate.png)

### Look Up your Questions Through Projects
![Lookup](images/lookups.png)


## Created By
Christopher Perez
