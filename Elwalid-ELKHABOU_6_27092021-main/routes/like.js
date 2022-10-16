//Importation de express
const express = require('express');

//Mettre express et le lier avec la fonction router dans une constante
const router = express.Router();

const likeCtrl = require('../controllers/like')

//Importer /middleware/auth.j dans une constante
const auth = require('../middleware/auth');

//Route pour l'option like dislike
router.post('/:id/like', auth, likeCtrl.handleLikeOption)

//Exporter les routes
module.exports = router;