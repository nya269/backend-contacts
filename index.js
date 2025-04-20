const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const contactsRoutes = require("./routes/contacts");
app.use("/contacts", contactsRoutes);

// ✅ Route par défaut pour Railway
app.get("/", (req, res) => {
  res.send("✅ Backend déployé avec succès sur Railway !");
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});