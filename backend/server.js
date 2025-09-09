import express from 'express';
import { WebSocketServer } from 'ws';
import { Sequelize } from 'sequelize';
import Redis from 'ioredis';

// Initialize services
const app = express();
app.use(express.json());

// Placeholder connections. Configure DATABASE_URL and REDIS_URL for real use.
export const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
  dialect: 'postgres',
  logging: false,
});
export const redis = new Redis(process.env.REDIS_URL || '');

// Simple in-memory store to keep example lightweight.
const boards = new Map();

// HTTP routes
app.get('/boards', (_req, res) => {
  res.json(Array.from(boards.values()));
});

app.post('/boards', (req, res) => {
  const { id, title } = req.body;
  const board = { id, title, columns: [] };
  boards.set(id, board);
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({ type: 'board:create', board }));
  });
  res.status(201).json(board);
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on port 3000');
});

// WebSocket setup for real-time updates
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Broadcast incoming message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message.toString());
      }
    });
  });
});

export default app;
