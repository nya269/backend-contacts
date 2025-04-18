const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const contactsRoutes = require("./routes/contacts");
app.use("/contacts", contactsRoutes);

// Route test
app.get("/", (req, res) => {
  res.send("Bienvenue dans l'API de gestion de contacts !");
});

// Lancement
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});