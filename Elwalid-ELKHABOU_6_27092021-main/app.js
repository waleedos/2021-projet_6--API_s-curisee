// Import du package dotenv responsable des variables d'environnement
require('dotenv').config()

//Importation du fichier de config
const config =  require('./config.js');

//Importation de express
const express = require('express');

//Express dans une variable
const app = express();

//Importation des routes

// Importation et enregistrement du nouveau router "sauces.js"dans ce fichier app.js
const saucesRoutes = require('./routes/sauces');

// Importation et enregistrement du nouveau router "user.js"dans ce fichier app.js
const userRoutes = require('./routes/user')

// Importation et enregistrement du nouveau router "like.js"dans ce fichier app.js
const likeRoute = require('./routes/like')

// Une fois l'installation de mongoose terminée avec la commande "npm install --save mongoose", Nous devons importez 
// mongoose dans notre fichier app.js en ajoutant la constante suivante :
const mongoose = require('mongoose');

//Importation de path permettant d'accéder au path du serveur
const path = require('path');


mongoose.connect(`mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@cluster0.o0qol.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => {  
    console.log('Connexion à MongoDB échouée !')}
    );  

// CORS (Cross-Origin Resource Sharing): Suite aux problemes CORS détéctés par le Browser qui refuse 
// (securité par defaut) d'executer nos requete car le front et le back sont differents : port 3000 et port 4200, 
// nous devons inserer ces headers qui permettent de : 
// 1- d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
// 2- d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
// 3- d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Il faut maintenant ajouter ici le framework  (express) comme middleware global pour notre application, 
app.use(express.json());


//Application des Routes avec les liens url
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/sauces', likeRoute);

//Indique le chemin du repertoire de stockage des images.
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;