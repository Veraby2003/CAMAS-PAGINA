const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
const port = 3000;

app.use(cors());
app.use(express.json());

let habitaciones = [
  { id: 1, camas: [1, 2, 3, 4] },
  { id: 2, camas: [1, 2, 3, 4] }
];

app.post('/call-room', (req, res) => {
  console.log('Solicitud recibida en /call-room:', req.body);
  const { habitacion, cama, mensaje } = req.body; // Agregamos mensaje como un campo opcional en el body
  
  if (habitacion && cama) {
    const message = mensaje || `Habitación ${habitacion}, Cama ${cama} activada`; // Mensaje personalizado o predeterminado
    
    console.log(`Emitiendo evento roomCalled para Habitación ${habitacion}, Cama ${cama}`);
    
    // Enviar la señal repetidamente durante 5 segundos
    for (let i = 0; i < 1; i++) {
      setTimeout(() => {
        io.emit('roomCalled', { habitacion, cama, message });
      }, i * 1000); // Enviar cada segundo (1000 milisegundos)
    }
    
    res.json({ habitacion, cama, message });
  } else {
    res.status(400).json({ error: 'Datos inválidos' });
  }
});



io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});

