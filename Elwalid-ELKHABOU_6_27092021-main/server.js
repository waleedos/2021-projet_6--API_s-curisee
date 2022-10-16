// Nous importons le package HTTP natif de Node et l'utilisez pour créer un serveur, en passant une
// fonction qui sera exécutée à chaque appel effectué vers ce serveur
const http = require('http');
const app = require('./app');

//importation du fichier de config
const config =  require('./config.js');

console.log(`NODE_ENV=${config.NODE_ENV}`);

// la fonction normalizePort renvoie un port valide, qu'il soit fourni sous 
// la forme d'un numéro ou d'une chaîne ;
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false; 
};


const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// la fonction errorHandler est déclenchée quand une erreur se produit.
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  // recupération du type d'erreur
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      // construction du message a afficher
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};


// Un écouteur d'évènements est également enregistré, consignant le port ou le canal nommé sur 
// lequel le serveur s'exécute dans la console.
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
