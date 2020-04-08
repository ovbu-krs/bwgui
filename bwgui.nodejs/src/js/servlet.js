//для начала установим зависимости.
const url = require('url');
const fs = require('fs');
const pth = require('path');
const baseConnector = require(__dirname+'/BaseConnector.js');
const servlet = function(req, res, postData)
{
	try {
		//получаем адрес из запроса и получаем путь: localhost:3000/test ---> '/test'
		const urlParsed = url.parse(req.url, true);
		let path = urlParsed.pathname.replace('/js', '').replace('/bwgui.ws2', '');
		//сохраняем каталоги
		prePath = __dirname;
		homePath = pth.resolve(__dirname, '..');
		// обрвбвтываем запрос
		if(/\./.test(path))
		{
			let loadPath =  prePath+path;
			//иконка
			if(path == '/favicon.ico')
			{
				loadPath= homePath+'/page'+path;
			}
			//mp3
			else if(/\.mp3$/gi.test(path))
			{
				res.writeHead(200, {'Content-Type': 'audio/mpeg'});
			}
			//css
			else if(/\.css$/gi.test(path))
			{
				res.writeHead(200, {'Content-Type': 'text/css'});
			}
			//js
			else if(/\.js$/gi.test(path))
			{
				res.writeHead(200, {'Content-Type': 'application/javascript'});
			}
//			console.log('обращение к '+prePath+path);
			//let readStream = fs.createReadStream(loadPath);
			//readStream.pipe(res);
			fs.readFile(loadPath, (err , cont) => {
				if(!err)
					res.end(cont);
				else
					throw  ('не найден файл: '+path);
			});
			return;
		}
		let par = decodeURI(urlParsed.search.replace('?parameter=', '').trim());
//		console.log('обращение к BaseConnector '+par);
		baseConnector.do_query(par).then(
			result => {
				let json_res ='';
				if (result !== undefined )
				{
					if('rows' in result)
					{
						rows=result.rows;
						rows.forEach(function(item, i, rows){
							json_res = json_res+item.do_event;
						});
//						console.log('обабатываю результат: '+json_res)
						res.writeHead(200, {'Content-Type': 'text/html'});
						res.end(json_res);
					}
					else
					{
						res.writeHead(200, {'Content-Type': 'text/html'});
						res.end(result);
					}
				}
				return;
			}
			,error => {
				console.log('обабатываю ошибку: '+error)
				let endMessage = {};
				endMessage.error = 1;
				endMessage.errorName = error;
				res.end(JSON.stringify(endMessage));
				return;
			}
		  );
	}
	catch (err)
	{
		// Находим наш путь к статическому файлу и пытаемся его прочитать.
		console.log('ошибка: '+err);
		let filePath = homePath+'/page/index.html';
		fs.readFile(filePath, 'utf-8', (err, html) => {
			// Если не находим файл, пытаемся загрузить нашу страницу 404 и отдать её.
		        if(err)
			{
				let nopath = homePath+'/page/err.html';
				fs.readFile(nopath, (err , html) => {
					if(!err)
					{
						res.writeHead(404, {'Content-Type': 'text/html'});
						res.end(html);
					}
					//если оба файла удалены
					else
					{
						res.writeHead(404, {'Content-Type': 'text/html; charset=UTF-8'});
						res.end('Что пошло не так - свяжитесь с администратором');
					}
				});
		        }
		        else
			{
		          //нашли файл, отдали - страница загружается.
		          res.writeHead(200, {'Content-Type': 'text/html'});
		          res.end(html);
		        }
		});
		return;
	}
};
exports.servlet = servlet;
