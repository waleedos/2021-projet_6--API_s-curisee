//Importation de express
const express = require('express');

//Mettre express et le lier avec la fonction router dans une constante
const router = express.Router();

//Importer /controlers/sauces.js dans une constante
const saucesCtrl = require('../controllers/sauces');

//Importer /middleware/auth.j dans une constante
const auth = require('../middleware/auth');

//Importation /middleware/multer-config.js dans une constante
const multer = require ('../middleware/multer-config')

//Routes contenant les fonctions/middleware de express. Récupération de toutes les sauces et l'implentation du CRUD
//auth = application du middleware de l'authentification du token sur toutes les routes de l'application
//multer = importer et sauvegarder des fichiers externes /!\ Bien le mettre après auth car il faut auth la requète avant

// ATTENTION : L'ordre des middlewares est important ! Si nous devons placer multer avant le middleware 
// d'authentification, même les images des requêtes non authentifiées seront enregistrées dans le serveur. 
// Nous devons absolument donc placer "multer" après "auth !""
router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.post('/login', auth, saucesCtrl.createSauce);
router.post('/signup', auth, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, multer, saucesCtrl.deleteSauce);

//Exporter les routes
module.exports = router;
