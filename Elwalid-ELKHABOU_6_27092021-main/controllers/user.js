// Import du package installé "bcrypt"
const bcrypt = require('bcrypt');

// Import du créateur et vérificateur des TOKEN que nous venons d'installer avec la commande "npm install --save jsonwebtoken"
const jwt = require('jsonwebtoken');

// Import de notre modèle "user"
const User = require('../models/user')

//Importation du fichier de config
const config =  require('../config.js');

//Création d'un nouveau compte utilisateur
// nous appelons la fonction de hachage de bcrypt dans notre mot de passe et lui demandons de « saler » le mot de passe 10 fois
// Cette fonction est asynchrone qui renvoie une Promise dans laquelle nous recevons le hash généré ;
exports.signup = (req, res, next) => {
    //création et sale du mot de passe en 10 tours
    bcrypt.hash(req.body.password, 10)
      // nous créons un utilisateur et l'enregistrons dans la base de données, en renvoyant une réponse de réussite 
      // en cas de succès.
      .then(hash => {
        const user = new User({
          //email saisie et récupérer
          email: req.body.email,
          //password saisi et récupérer
          password: hash
        });
        //sauvegarder le user dans mongoDB
        user.save()
          //renvoi promise pour front end
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          //renvoie erreur authentification
          .catch(error => res.status(400).json({ error }));
      })
      // En cas d'échec, Nous renvoyons le code d'erreur;
      .catch(error => res.status(500).json({ error }));
};

//Connexion d'un utilisateur
// nous utilisons notre modèle Mongoose pour vérifier que l'e-mail entré par l'utilisateur correspond à un utilisateur
// existant de la base de données :
exports.login = (req, res, next) => {
  // Si l'e-mail entré par l'utilisateur ne correspond à aucun utilisateur existant de la base de données
  // nous renvoyons une erreur 401 Unauthorized, si l'e-mail correspond à un utilisateur existant, nous continuons    
  //Chercher si l'email saisie correspond à un email existant
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        //Si email non trouvé retour erreur status
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      // nous utilisons la fonction compare debcrypt pour comparer le mot de passe entré par l'utilisateur avec 
      // le hash enregistré dans la base de données      
      //Si email trouvé bcrypt va comparer les 2 hash password, le hash saisie et le hash enregistrer dans mongoDB
      bcrypt.compare(req.body.password, user.password)
        // s'ils ne correspondent pas, nous renvoyons une erreur 401 Unauthorized et un message « Mot de passe incorrect ! » ;
        // s'ils correspondent, les informations d'identification de notre utilisateur sont valides. 
        // Dans ce cas, nous renvoyons une réponse 200 contenant l'ID utilisateur et un token. Ce token est une chaîne 
        //générique pour l'instant, mais nous allons le modifier et le crypter dans le prochain chapitre.
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          //Si les 2 hash correspondent retour status correct
          //nous utilisons une chaîne secrète de développement temporaire RANDOM_SECRET_KEY pour encoder notre token 
          //(à remplacer par une chaîne aléatoire beaucoup plus longue pour la production) ;
          res.status(200).json({
            //userId est défini
            userId: user._id,
            //token est défini par jwt
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              // nous définissons la durée de validité du token à 24 heures. L'utilisateur devra donc se reconnecter 
              //au bout de 24 heures ;
              { expiresIn: '24h' }
            )
          });
        })
        //retour erreur serveur
        .catch(error => res.status(500).json({ error }));
    })
    //retour erreur serveur
    .catch(error => res.status(500).json({ error }));
};