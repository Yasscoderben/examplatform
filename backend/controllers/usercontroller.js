const db = require('../config/db');
const bcrypt = require('bcrypt');

// Inscription
exports.signup = async (req, res) => {
  const {
    nom,
    prenom,
    email,
    password,
    naissance, 
    sexe,
    etablissement,
    filiere,
    type 
  } = req.body;

  const motDePasse = await bcrypt.hash(password, 10);
  const dateNaissance = naissance;
  const typeUser = type;

  const sql = `INSERT INTO users (nom, prenom, email, motDePasse, dateNaissance, sexe, etablissement, filiere, typeUser)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [nom, prenom, email, motDePasse, dateNaissance, sexe, etablissement, filiere, typeUser];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur inscription SQL:", err.sqlMessage);
      return res.status(500).json({ error: "Erreur lors de l'inscription: " + err.sqlMessage });
    }
    res.status(201).json({ message: "Utilisateur inscrit avec succès !" });
  });
};

// Connexion
exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Erreur login:", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Email incorrect" });
    }

    const user = results[0];
    const isValidPassword = await bcrypt.compare(password, user.motDePasse);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    res.json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        nom: user.nom,
        typeUser: user.typeUser
      }
    });
  });
};
