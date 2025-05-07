const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';


exports.registerUser = async (req, res) => {
  const { nom, prenom, email, motDePasse, sexe, dateNaissance, typeuser,filiere } = req.body;

  if (!nom || !prenom || !email || !motDePasse || !sexe || !dateNaissance || !typeuser || filiere) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'Email déjà utilisé' });

    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    const newUser = new User({
      nom,
      prenom,
      email,
      motDePasse: hashedPassword,
      sexe,
      dateNaissance,
      filiere,
      typeuser
    });

    await newUser.save();

   
    const token = jwt.sign(
      {
        id: newUser._id,
        typeuser: newUser.typeuser,
        nom: newUser.nom
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'Inscription réussie',
      token,
      user: {
        id: newUser._id,
        nom: newUser.nom,
        prenom: newUser.prenom,
        email: newUser.email,
        typeuser: newUser.typeuser,
        sexe: newUser.sexe
      }
    });
  } catch (error) {
    console.error('Erreur d’inscription :', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};


exports.loginUser = async (req, res) => {
  const { email, motDePasse } = req.body;

  if (!email || !motDePasse) {
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const validPassword = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!validPassword) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign(
      {
        id: user._id,
        typeuser: user.typeuser,
        nom: user.nom
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        typeuser: user.typeuser,
        sexe: user.sexe
      }
    });
  } catch (error) {
    console.error('Erreur de connexion :', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};
