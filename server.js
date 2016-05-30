var express = require('express');
var app = express();

app.use(express.static('www'));

app.get('*', function (req, res, next) {
  if (req.accepts('html')) res.sendFile(__dirname + '/www/index.html')
  else next()
})

app.listen(6969, function () {
  console.log('Listening on port 6969 ayyy');
});
