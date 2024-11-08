const express = require("express");

const userRoutes = require("./routes/users/userRoutes");
const clubRoutes = require("./routes/clubs/clubRoutes");
const readingListRoutes = require("./routes/readingLists/readingListRoutes");

const app = express();
app.use(express.json());

app.use(userRoutes);
app.use(clubRoutes);
app.use(readingListRoutes);

module.exports = app;
