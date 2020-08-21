
// Configuraciones para usar express y el servidor de mongo
const path = require('path');

const express = require('express');

const app = express();

// login-jwt
app.use(express.static(__dirname + '/login-jwt') );

app.get( '/*', function( req, res ) {

  res.sendFile(path.join(__dirname, 'login-jwt', 'index.html') );

} );

// Asigna el puerto del ambiente o usar el 8080 por defecto (local)
app.listen({
  port: process.env.PORT || 8080
},
  () => console.log('Servidor iniciado http://localhost:8080')
);
