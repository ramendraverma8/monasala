const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const schedule = require('node-schedule');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }});
const reminders = ["hhhhh", "hhiv", "ddss"];


// Set up a scheduled job that sends reminders to clients every 5 minutes
const job = schedule.scheduleJob('*/5 * * * *', () => {
  reminders.forEach(reminder => {
    const now = new Date();
    const diff = reminder.date - now;
    // If the difference between the reminder date and the current date is less than 5 minutes, send a reminder to the client
    // if (diff < 5000) {
    //   io.to(reminder.clientId).emit('reminder', reminder);
    // }
    setInterval(io.to(reminder.clientId).emit('reminder', reminder),5000)
  });
});

io.on('connection', socket => {
  console.log('New user connected');
  socket.join(1234)
  socket.broadcast.to(1234).emit("xyz",{x:"uduud"})


  // Add a new reminder to the list
//   socket.on('addReminder', reminder => {
//     reminders.push({ ...reminder, clientId: socket.id });
//   });

  // Remove a reminder from the list
//   socket.on('removeReminder', reminderId => {
//     reminders.splice(reminders.findIndex(reminder => reminder.id === reminderId), 1);
//   });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    // Remove all reminders associated with the disconnected client
    reminders.filter(reminder => reminder.clientId !== socket.id);
  });
});

server.listen(8000, () => {
  console.log('Server running on port 8000');
});
