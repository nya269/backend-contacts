const express = require("express");
const router = express.Router();
const db = require("../db");

// Récupérer tous les contacts
router.get("/", (req, res) => {
  db.query("SELECT * FROM contacts", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Ajouter un contact
router.post("/", (req, res) => {
  const { nom, prenom, email, telephone } = req.body;

  if (!/^\d{10}$/.test(telephone)) {
    return res.status(400).json({ error: "Le téléphone doit contenir exactement 10 chiffres." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Adresse email invalide." });
  }

  const sql = "INSERT INTO contacts (nom, prenom, email, telephone) VALUES (?, ?, ?, ?)";
  const values = [nom, prenom, email, telephone];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: "Contact ajouté", id: result.insertId });
  });
});

// Modifier un contact
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { nom, prenom, email, telephone } = req.body;

  if (!/^\d{10}$/.test(telephone)) {
    return res.status(400).json({ error: "Le téléphone doit contenir exactement 10 chiffres." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Adresse email invalide." });
  }

  const sql = "UPDATE contacts SET nom = ?, prenom = ?, email = ?, telephone = ? WHERE id = ?";
  const values = [nom, prenom, email, telephone, id];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Contact mis à jour avec succès" });
  });
});

// Supprimer un contact par ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM contacts WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression :", err);
      return res.status(500).send(err);
    }
    res.json({ message: "Contact supprimé", id });
  });
});

module.exports = router;