//Importation de express dans une constante
const express = require('express');

//Appliquer les routes à express dans une constante
const router = express.Router();

//Importer le fichier /controllers/user.js
const userCtrl = require('../controllers/user');


//Routes pour avec la création et l'authentification de user
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//Exporter les routes
module.exports = router;