# task Manager

A CRUD application for task management that includes user authentication and offers a visually
appealing user interface. Each task have attributes like title, description, and status (e.g., pending, completed).

# Stack

- Frontend: React.js, React Context API
- Backend: Express.js, mongoose.js
- Database: MongDB

# Running the app locally
## Thes best way to run the app is via Docker & Docker compose

In the root directory, run the this command:

```bash
docker compose up
```

# Running Tests:

- For backend:
```bash
cd backend && npm test
```

- For fontend:
```bash
cd frontend && npm run cypress:open
```