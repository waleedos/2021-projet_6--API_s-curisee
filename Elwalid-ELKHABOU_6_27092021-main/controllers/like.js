//Importer le fichier model d'un produit /models/thing
const Sauce = require('../models/sauce');


//Like ou Dislike une sauce
exports.handleLikeOption = (req, res, next) => {
    const like = req.body.like;
    const userId = req.body.userId;
  
    Sauce.findOne({ _id : req.params.id})
    .then (sauce => {
      //Si like est = 1, le user aime
    if (like === 1) {
        // on vérifie si l'utilisateur a déjà liker la sauce
        let likeUser = checkUser(sauce.usersLiked, userId);
        // Premier like de l'utilisateur
        if(!likeUser) {
            //let likes = sauce.likes ? sauce.likes : 0;
            sauce.likes += 1;
            sauce.usersLiked.push(userId); 
        } else {
            // l'utilisateur a déjà liké
            // On veut éviter like multiple
            throw new Error("On ne peut liker une sauce qu'une seule fois");
        }
    }else if (like === -1) {
        // on vérifie si l'utilisateur a déjà disliker la sauce
        let dislikeUser = checkUser(sauce.usersDisliked, userId);
        // Premier dislike de l'utilisateur
        if(!dislikeUser) {
            //let dislikes = sauce.dislikes ? sauce.dislikes : 0;
            sauce.dislikes += 1;
            sauce.usersDisliked.push(userId); 
        } else {
            // l'utilisateur a déjà likeé
            // On veut éviter like multiple
            throw new Error("On ne peut disliker une sauce qu'une seule fois");
        }
    }else if (like === 0) {
        //on vérifie le userId dans le tableau usersLiked
        let userLiked = sauce.usersLiked.find (id => id === userId);
            if(userLiked){
                //retire son like
                sauce.likes -= 1;
                //on retire le userid du tableau usersLiked
                sauce.usersLiked = createNewUserIdArray(sauce.usersLiked, userId);
            }
        else {
        //on cherche dans le tableau des usersDisliked
        let userDisliked = sauce.usersDisliked.find (id => id === userId);
            if(userDisliked){
                //retire son dislike
                sauce.dislikes -= 1;
                //on retire le userid du tableau usersLiked
                sauce.usersDisliked = createNewUserIdArray(sauce.usersDisliked, userId);
            }     
        }     
    }
    //Sauvegarde la sauce modifié dans la base de données mongoDB
    sauce.save()
      //retour promise status OK
      .then(() => res.status(201).json({ message: "choix appliqué" }))
      //retour erreur requète
      .catch(error => res.status(400).json({ error }));
  
    })
    //retour erreur communication avec le serveur
    .catch(error => res.status(403).json({ error: error.message}));
};  

//Fonction pour créer un nouvel array d'un nouvel utilisateurId
function createNewUserIdArray (userIdArray, userId) {
    return userIdArray.filter(id => id !== userId);
}
//Fonction pour vérifier l'utilisateur existe déjà
function checkUser(userIdArray, userId) {
    return userIdArray.find(id => id ===userId);
} 