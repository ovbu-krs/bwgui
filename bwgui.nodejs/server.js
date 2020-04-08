// server.js
// Для начала установим зависимости.
const http = require('http');
const js = require(__dirname+'/src/js/servlet.js');


let server = new http.Server(function(req, res) {
  // API сервера будет принимать только POST-запросы и только JSON, так что записываем
  // всю нашу полученную информацию в переменную jsonString
  var jsonString = '';
  res.setHeader('Content-Type', 'application/json');
  req.on('data', (data) => {
	// Пришла информация - записали.
 	jsonString += data;
  });

  req.on('end', () => {
 	// Информации больше нет - передаём её дальше.
 	js.servlet(req, res, jsonString); // Функцию define мы ещё не создали.
  });
});
server.listen(8000, 'localhost');
