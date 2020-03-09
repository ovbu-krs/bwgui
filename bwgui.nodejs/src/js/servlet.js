// /routing/index.js
// Для начала установим зависимости.
const url = require('url');
const fs = require('fs');
const baseConnector = require(__dirname+'/BaseConnector.js');
const {Pool} = require('pg');
const pool = new Pool({connectionString: 'postgresql://pi:pi@localhost:5432/pi',});


const servlet = function(req, res, postData) {
    // Теперь получаем наш адрес. Если мы переходим на localhost:3000/test, то path будет '/test'
    const urlParsed = url.parse(req.url, true);
    let path = urlParsed.pathname.replace('/js', '').replace('/bwgui.ws2', '');

    // Теперь записываем полный путь к server.js. Мне это особенно нужно, так как сервер будет
    // висеть в systemd, и путь, о котором он будет думать, будет /etc/systemd/system/...
    prePath = __dirname;

    // До этого мы уже получили path и prePath. Теперь осталось понять, какие запросы
    // мы получаем. Отсеиваем все запросы по точке, так чтобы туда попали только запросы к
    // файлам, например: style.css, test.js, song.mp3
    if(/\./.test(path)) {
	if(path == 'favicon.ico') {
	  // Если нужна фавиконка - возвращаем её, путь для неё всегда будет 'favicon.ico'
	  // Получается, если добавить в начале prePath, будет: '/var/www/html/nodejs/routing/favicon.ico'.
	  // Не забываем про return, чтобы сервер даже не пытался искать файлы дальше.
	  let readStream = fs.createReadStream(prePath+path);
	  readStream.pipe(res);
	  return;
	}
	else{
	  // А вот если у нас не иконка, то нам нужно понять, что это за файл, и сделать нужную
	  // запись в res.head, чтобы браузер понял, что он получил именно то, что и ожидал.
	  // На данный момент мне нужны css, js и mp3 от сервера, так что я заполнил только
	  // эти случаи, но, на самом деле, стоит написать отдельный модуль для этого.
	 if(/\.mp3$/gi.test(path)) {
	    res.writeHead(200, {
	      'Content-Type': 'audio/mpeg'
	    });
	  }
	  else if(/\.css$/gi.test(path)) {
	    res.writeHead(200, {
	      'Content-Type': 'text/css'
	    });
	  }
	  else if(/\.js$/gi.test(path)) {
	    res.writeHead(200, {
	      'Content-Type': 'application/javascript'
	    });
	  }
	  // Опять же-таки, отдаём потом серверу и пишем return, чтобы он не шёл дальше.
	  console.log('обращение к '+prePath+path);
	  let readStream = fs.createReadStream(prePath+path);
	  readStream.pipe(res);
	  return;
	}
    }


    try {
	  //let dynPath = prePath + path;
	  //let routeDestination = require(dynPath);
	  //routeDestination.promise(res,postData,req).then(
	  let par = decodeURI(urlParsed.search.replace('?parameter=', '').trim());
	  console.log('обращение к BaseConnector '+par);
	  baseConnector.do_query(par).then(
	    result => {

	      let json_res ='';
		if (result === undefined )
		{
		}
		else if('rows' in result)
		{
			arr=result.rows;
			arr.forEach(function(item, i, arr){
				json_res = json_res+item.do_event;
			});
			//json_res = result.rows[0].do_event;


		      console.log('обабатываю результат: '+json_res)
		      res.writeHead(200, {
		      'Content-Type': 'text/html'
		      });
		      res.end(json_res);
		 }
		 return;
	    },
	    error => {
	      console.log('обабатываю ошибку: '+error)
	      let endMessage = {};
	      endMessage.error = 1;
	      endMessage.errorName = error;
	      res.end(JSON.stringify(endMessage));
	      return;
	    }
	  );
    }
    // /routing/index.js: блок catch
     catch (err) {
      // Находим наш путь к статическому файлу и пытаемся его прочитать.
      // Если вы не знаете, что это за '=>', тогда прочитайте про стрелочные функции в es6,
      // очень крутая штука.
     let filePath = prePath+'/static'+path+'/index.html';
      fs.readFile(filePath, 'utf-8', (err, html) => {
        // Если не находим файл, пытаемся загрузить нашу страницу 404 и отдать её.
        // Если находим — отдаём, народ ликует и устраивает пир во имя царя-батюшки.
        if(err) {
          let nopath = '/var/www/html/nodejs/routing/nopage/index.html';
          fs.readFile(nopath, (err , html) => {
            if(!err) {
              res.writeHead(404, {'Content-Type': 'text/html'});
              res.end(html);
            }
            // На всякий случай напишем что-то в этом духе, мало ли, иногда можно случайно
            // удалить что-нибудь и не заметить, но пользователи обязательно заметят.
            else{
              let text = "Something went wrong. Please contact webmaster@forgetable.ru";
              res.writeHead(404, {'Content-Type': 'text/plain'});
              res.end(text);
            }
          });
        }
        else{
          // Нашли файл, отдали, страница загружается.
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(html);
        }
      });
    }
   
};
exports.servlet = servlet;
