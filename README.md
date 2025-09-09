# INE-Assignment

This repository contains a minimal skeleton for a real-time Kanban board.

## Development

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The backend exposes REST endpoints for boards and a WebSocket server for
broadcasting board events. The frontend connects to these services and
shows a simple list of boards.

> **Note:** Supabase, Redis, authentication, notifications and other
production features described in the specification are left as TODOs.
