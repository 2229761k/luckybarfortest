const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
//const path = require('path');
const serveStatic = require('serve-static');

let app = express();
app.use(serveStatic(__dirname + "/dist", {
  maxAge: '1y',
  setHeaders: setCustomCacheControl
}));

app.use(compression());
app.use(helmet());

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});

function setCustomCacheControl (res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'public, max-age=0');
  }
}