### [Lien Git Du Projet] : (https://github.com/Waleedos/Elwalid-ELKHABOU_6_27092021)

## Soutenance & Évaluation
>Évaluation et Soutenance planifiées pour le Mardi 19 Octobre 2021 à 14H00.

>Cette Évaluation sera assurée par [Monsieur Ibrahima CISS](https://iciss.dev/), Ingénieur logiciel développant pour iOS, macOS et le Web.

## Table des Matières
1.  [Scénario](#Scénario)
2.  [Objectifs](#Objectifs)
3.  [Outils & Technologies utilisés](#Outils-&-Technologies-utilisées)
4.  [Structure du site](#Structure-du-site)
5.  [Comment utiliser l'API](#Comment-utiliser-l'API)
6.  [Le Back-end](#Le-Back-end)
7.  [Le Front-end](#Le-Front-end)
8.  [Mesures de sécurité mises en place](#Mesures-de-sécurité-mises-en-place)
9.  [Compétences évaluées](#Compétences)
10. [Contact](#Contact)
11. [Rapport Général du P#6](https://github.com/Waleedos/rapport-p6/blob/main/rapport-du-p6.pdf)
12. [Toutes les définitions](https://github.com/Waleedos/rapport-p6/blob/main/Toutes-les-definitions.pdf)

### Scénario
>Vous êtes développeur backend freelance et vous travaillez depuis quelques années sur des projets web pour des startups ou des grandes entreprises. La semaine dernière, vous avez reçu un message sur votre plateforme de freelance vous demandant de l'aide
pour un nouveau projet

>La marque de condiments à base de piment
Piiquante, veut développer une application web de critique des sauces piquantes appelée « Hot Takes »

![Image text](https://raw.githubusercontent.com/Waleedos/P6-Last/main/autres/piquante.png)
>L’entreprise souhaite désormais développer une application d’évaluation de ses sauces piquantes, appelée “Piquante”. 

### Objectifs
>
    • Construire le back-end et une API REST sécurisée pour une application d'avis gastronomiques ‘‘PIQUANTE’’, une nouvelle application de So Pekocko qui permet aux utilisateurs de consulter, ajouter, modifier, supprimer et de donner son avis ‘aimer ou pas aimer’ les sauces piquantes proposées par les autres utilisateurs.
    • Utilisez un serveur Node.js, le framework Express, la base de données MongoDB, le plugin Mongoose, avec un hebergement sur MongoDB Atlas.
    • L'API doit être sécurisé et respecter les normes OWASP et le GDPR.
    • Le serveur frontal est déjà construit.
    • Hébergement sur MongoDB Atlas
    • Opérations relatives à la BDD réalisées avec mongoose

## Outils & Technologies utilisés
>
    • JavaScript	    : Version 8.4.371.23
    • Node.js 	    : Version 14.18.0
    • Node-sass 	    : Version 4.14.  
    • Angular CLI 	    : Version 12.2.8
    • Express	    : Version 4.17.1
    • MongoDb Atlas	    : Version 3.6.8
    • Mongoose	    : Version 6.0.8
    • Body-parser	    : Version 1.19.0
    • Bcrypt	    : Version 5.0.1
    • Dotenv	    : Version 10.0.0
    • Jsonwebtoken	    : Version 8.5.1
    • Mg-unique-validator : Version 2.0.4
    • Multer	    : Version 1.4.3

## Structure du site
>
    • Page d'inscription / connexion. 
    • Page d'accueil affichant toutes les sauces.
    • Page affichant les informations d'une sauce spécifique, avec des options pour aimer / ne pas aimer la sauce. 
    • Page pour ajouter une nouvelle sauce. 

## Comment utiliser l'API
>Clonez ce dépôt. 

## Le Back-end
>
    • Dans le dossier « backend », et afin de vous connecter à la base de données en tant qu’ « Admin » ou « Éditeur », copiez le fichier ‘.env’ correspondant (envoyé séparément) dans le dossier « backend ». 
    • Installez nodemon. Exécutez npm install, Toujours dans le répertoire « backend » 
    • Exécutez nodemon server. 
    • Le serveur doit fonctionner sur http://localhost:3000.   

## Le Front-end
>
    • Ce dossier est déjà construit, codé et fourni, il ne faut pas le toucher.
    • Dans le dossier « frontend », exécutez npm start. Cela devrait à la fois exécuter le serveur local et lancer votre navigateur.
    • Si votre navigateur ne démarre pas ou affiche une erreur 404, essayez l’adresse : http://localhost:8080  ou bien  http://localhost:8081  ou bien  http://localhost:5500.
    • L'application devrait se recharger automatiquement lorsque vous modifiez un fichier.
    • Utilisez Ctrl+C dans le terminal pour arrêter le serveur local  

## Mesures de sécurité mises en place
>
    • Hashage du mot de passe utilisateur avec bcrypt.
    • Manupulation sécurisée de la base de donnée avec mongoose.
    • Vérification que l'email utilisateur soit unique dans la base de données avec mongoose-unique-validator.
    • Utilisation de variables d'environnement pour les données sensibles avec dotenv.
    • Authentification de l'utilisateur par token avec jsonwebtoken.
    • Protection des headers avec helmet. 

## Compétences évaluées
>
    • Mettre en place un modèle de données logique conforme à la réglementation.
    • Stocker les données en toute sécurité.
    • Mettre en œuvre en toute sécurité les opérations CRUD.
    • (CRUD = Create, Read, Update and Delete). 
    • Tokens d'authentification.
    • Middleware d'authentification.
    • Nodemon. 

## Contact
* [Email](mailto:alkhabou@gmail.com)