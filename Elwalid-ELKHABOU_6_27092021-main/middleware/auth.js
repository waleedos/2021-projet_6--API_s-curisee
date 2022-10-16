// créer le middleware qui protégera les routes sélectionnées et vérifier que l'utilisateur est 
// authentifié avant d'autoriser l'envoi de ses requêtes, donc :
//Importation de jsonwebtoken pour faire vérifier le token envoyé
const jwt = require('jsonwebtoken');

//importation du fichier de config
const config =  require('../config.js');

// le middleware pour vérifier et faire authentifier le token envoyé :
// étant donné que de nombreux problèmes peuvent se produire, nous insérons tout à l'intérieur d'un bloc try...catch ;
module.exports = (req, res, next) => {
  try {
    // nous extrayons le token du header Authorization de la requête entrante. N'oubliez pas qu'il contiendra également 
    // le mot-clé Bearer . Nous utilisons donc la fonction split pour récupérer tout après l'espace dans le header. 
    // Les erreurs générées ici s'afficheront dans le bloc catch ;
    // En d'autres termes, On récupère le token du header de la requete du POST et on le split pour récupérer tout 
    // l'espace après header [1] <= la position du token dans le header (positionner en 2 mais commence par 0 donc 1)
    const token = req.headers.authorization.split(' ')[1];

    // nous utilisons ensuite la fonction verify pour décoder notre token. Si celui-ci n'est pas valide, 
    // une erreur sera générée ;
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

    // nous extrayons l'ID utilisateur de notre token ;
    const userId = decodedToken.userId;

    // si la demande contient un ID utilisateur, nous le comparons à celui extrait du token. S'ils sont différents, 
    // nous générons une erreur ;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Utilisateur invalide';
    } 
      // dans le cas contraire, tout fonctionne et notre utilisateur est authentifié. Nous passons l'exécution à 
      // l'aide de la fonction next() .    
      else {
      next();
    }
  } catch {
    //gérer les exceptions
    res.status(401).json({
      error: new Error('Requête invalide!')
    });
  }
};