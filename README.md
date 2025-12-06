# Project Task Manager API

A comprehensive backend API for managing projects and tickets, featuring user authentication, role-based access control, and filtering capabilities.

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas)

### Installation
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/project-task-manager
    JWT_SECRET=your_jwt_secret
    ```

### Running the Server
- **Development Mode** (with nodemon):
    ```bash
    npm run dev
    ```
- **Production Mode**:
    ```bash
    npm start
    ```

### Bootstrapping Admin User
To create an initial Admin user (Manager role):
```bash
node bootstrap_admin.js
```
Credentials: `admin@example.com` / `password123`

---

## API Endpoints

All endpoints start with `/api`.
**Authentication**: Most endpoints require a Bearer Token in the header: `Authorization: Bearer <token>`.

### Authentication (`/users`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/users/login` | Login user & get token | No |
| `POST` | `/users/create` | Register new user | Yes (Manager) |
| `GET` | `/users/all` | Get all users | Yes |

### Projects (`/projects`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/projects/all` | Get all projects | Yes |
| `GET` | `/projects/get?projectId=` | Get project by ID | Yes |
| `POST` | `/projects/create` | Create new project | Yes (Manager) |
| `PUT` | `/projects/update?projectId=` | Update project | Yes (Manager) |
| `DELETE` | `/projects/delete?projectId=` | Delete project | Yes (Manager) |

### Tickets (`/tickets`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/tickets/all` | Get all tickets (supports filters) | Yes |
| `GET` | `/tickets/get?ticketId=` | Get ticket by ID | Yes |
| `POST` | `/tickets/create` | Create new ticket | Yes |
| `PUT` | `/tickets/update?ticketId=` | Update ticket | Yes |
| `DELETE` | `/tickets/delete?ticketId=` | Delete ticket | Yes |

**Ticket Filters**:
- `?status=Open`
- `?priority=High`
- `?assign=DeveloperName`

## Data Models

### User
- `name`: String
- `email`: String (Unique)
- `password`: String (Hashed)
- `role`: Enum ['Manager', 'Developer']

### Project
- `name`: String (Unique)
- `managerId`: ObjectId (Ref: User)
- `description`: String
- `status`: String
- `startDate`: Date
- `endDate`: Date

### Ticket
- `projectId`: ObjectId (Ref: Project)
- `title`: String
- `description`: String
- `assign`: String (Display Name)
- `developerId`: ObjectId (Ref: User)
- `status`: String
- `priority`: String
- `spendTime`: String
- `duration`: String
- `remark`: String

## Verification
Run the provided shell scripts to verify functionality:
- `./verify_auth_real.sh`: Test Authentication
- `./verify_permissions.sh`: Test RBAC
- `./verify_filter.sh`: Test Filtering
