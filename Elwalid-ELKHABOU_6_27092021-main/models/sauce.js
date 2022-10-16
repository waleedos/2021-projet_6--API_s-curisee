//Importion de mongoose pour pouvoir communiquer avec mongoDB
const mongoose = require('mongoose');

//Création du mondèle d'un produit
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer : { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0, required: false },
  dislikes: { type: Number, default: 0, required: false },
  usersLiked: { type: [String], required: false },
  usersDisliked: { type: [String], required: false },
});

//Exportation du model de mongoose avec comme mot-clé "Sauce" et en paramètre le model d'une sauce
module.exports = mongoose.model('Sauce', sauceSchema);