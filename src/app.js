const express = require('express');
const app = express();
const cors = require('cors');
const sessions = require('client-sessions');

const userRoutes = require("./routes/userRoutes");
const houseRoutes = require("./routes/houseRoutes");

app.use(cors({
    origin: true,
    credentials: true
  }));

app.use(sessions({
  cookieName: 'session',
  secret: 'secret'
}));

app.use(express.json());
app.use("/users", userRoutes);
app.use("/houses", houseRoutes);

module.exports = app; // Exporta la app sin iniciar el servidor

