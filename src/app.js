const express = require("express");

const userRoutes = require("./routes/users/userRoutes");
const clubRoutes = require("./routes/clubs/clubRoutes");
const app = express();
app.use(express.json());

app.use(userRoutes);
app.use(clubRoutes);

module.exports = app;
