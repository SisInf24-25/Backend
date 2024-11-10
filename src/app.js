const express = require('express');
const app = express();

const userRoutes = require("./routes/userRoutes");
//const houseRoutes = require("./routes/houseRoutes");

app.use(express.json());
app.use("/users", userRoutes);

module.exports = app; // Exporta la app sin iniciar el servidor

