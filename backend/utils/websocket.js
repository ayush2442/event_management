class WebSocketManager {
  constructor(io) {
    this.io = io;
    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('joinEvent', (eventId) => {
        socket.join(`event_${eventId}`);
      });

      socket.on('leaveEvent', (eventId) => {
        socket.leave(`event_${eventId}`);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  }

  emitEventUpdate(eventId, data) {
    this.io.to(`event_${eventId}`).emit('eventUpdate', data);
  }

  emitAttendeeUpdate(eventId, attendees) {
    this.io.to(`event_${eventId}`).emit('attendeesUpdate', { attendees });
  }
}

module.exports = WebSocketManager;