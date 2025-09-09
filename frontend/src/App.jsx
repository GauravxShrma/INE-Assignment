import React, { useEffect, useState } from 'react';

export default function App() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'board:create') {
        setBoards((prev) => [...prev, data.board]);
      }
    };

    fetch('http://localhost:3000/boards')
      .then((res) => res.json())
      .then(setBoards)
      .catch(console.error);

    return () => socket.close();
  }, []);

  const createBoard = async () => {
    const id = crypto.randomUUID();
    await fetch('http://localhost:3000/boards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title: `Board ${boards.length + 1}` }),
    });
  };

  return (
    <div>
      <h1>Boards</h1>
      <button onClick={createBoard}>Create Board</button>
      <ul>
        {boards.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
}
