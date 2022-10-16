// Import du fichier model du produit : /models/sauce
const Sauce = require('../models/sauce');


// Pour donne accès aux différentes opérations lié au système de fichier
const fs = require('fs');

//Création d'un produit
// créez une instance de notre modèle "Sauce" en lui passant un objet JavaScript contenant toutes les informations 
// requises du corps de requête analysé (en ayant supprimé en amont le faux_id envoyé par le front-end).
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    //configuration de l'url de l'image 
    //.protocol http ou https, on ajoute :
    //.get('host') nom de l'hote, on ajoute le dossier images
    //.file.filename = .lefichier.lenomdufichier    
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    //retour promise status OK et ressource bien créée
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    //retour erreur requète
    .catch(error => res.status(400).json({ error }));
};

//Récupère un produit par l'id
// nous utilisons la méthode get() pour récupérer une (sauce); Nous utilisons 
// deux-points : en face du segment dynamique de la route pour la rendre accessible en tant que paramètre ; 
// nous utilisons ensuite la méthode findOne() dans notre modèle "Sauce" pour trouver la "Sauce" unique ayant le 
// même _id que le paramètre de la requête ; cette "Sauce" est ensuite retournée dans une Promise et envoyée au 
// front-end ; si aucune "Sauce" n'est trouvée ou si une erreur se produit, nous envoyons une erreur 404 au 
// front-end, avec l'erreur générée.
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      //retour promise status OK
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      //retour promise erreur serveur
      res.status(404).json({
        error: error
      });
    }
  );
};


// Modification d'un produit :
// Ci-dessus, nous exploitons la méthode updateOne() dans notre modèle "Sauce" . Cela nous permet de mettre à jour la
// "Sauce" qui correspond à l'objet que nous passons comme premier argument. Nous utilisons aussi le paramètre id 
// passé dans la demande et le remplaçons par la "Sauce" passée comme second argument.
exports.modifySauce = (req, res, next) => {
  //créer un objet et cherche si req.file existe déjà
  const sauceObject = req.file ?
    {
      //Si modification de l'image de l'objet, on récupère le body du produit en parse
      ...JSON.parse(req.body.sauce),
      //et on modifie l'imageUrl
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      //Si  modification de chaine de caractère on modifie le body
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    //retour promise status OK
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    //retour erreur requète
    .catch(error => res.status(400).json({ error }));
};


// Suppression d'un produit
// La méthode deleteOne() de notre modèle fonctionne comme findOne() et updateOne() dans le sens où nous lui passons 
// un objet correspondant au document à supprimer. Nous envoyons ensuite une réponse de réussite ou d'échec au front-end.
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      //Récupère le nom du fichier 
      //.split => récupère avant .../images/ et après /images/...
      //avant .../images positionnement 0  //après /images/... positionnement 1 
      //donc on choisi 1 car permettant de récupérer l'url de l'image qui est après le dossier images
      const filename = sauce.imageUrl.split('/images/')[1];
      // fs.unlink supprime le nom du fichier dans le dossier images
      fs.unlink(`images/${filename}`, () => {
        //callback retour on supprime également le produit par son id  
        Sauce.deleteOne({ _id: req.params.id })
          //retour promise status OK 
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          //retour erreur requète
          .catch(error => res.status(400).json({ error }));
      });
    })
    //retour erreur communication avec le serveur
    .catch(error => res.status(500).json({ error }));
};

// Dans l'exemple ci-dessus, nous utilisons la méthode find() dans notre modèle Mongoose afin de renvoyer un tableau 
// contenant tous les "Sauces" dans notre base de données. À présent, si nous ajoutons une "Sauces" , elle doit 
// s'afficher immédiatement sur notre page d'articles en vente.
exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      //retour promise status OK  
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      //retour erreur requète
      res.status(400).json({
        error: error
      });
    }
  );
};