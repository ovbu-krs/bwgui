const {Pool} = require('pg');
var usr = require('os').userInfo().username;
//const pool = new Pool({connectionString: 'postgresql://pi:pi@localhost:5432/pi',});

//если пароль не совпадает с пользователем меняем тут usr на то что надо
pool = new Pool({
	user: usr,
	host: 'localhost',
	database: usr,
	password: usr,
	port: 5432,
	max: 10,
	min: 5,
	dleTimeoutMillis: 1000,
	connectionTimeoutMillis: 3000
});
const do_query = function(args)
{
	return new Promise(function(resolve, reject) {
		try
		{
//			console.log('соединение с БД');
			pool.connect((err,client,done)=>{
				try
				{
					if(err)
					{
						done();
						reject('ошибка при соединенеия с БД: '+err);
					}
//					console.log('соединение с БД - открыто');
//					console.log('запрос к БД - SELECT bwgui_processor.do_event(\''+args+'\')');
					client.query('SELECT bwgui_processor.do_event(\''+args+'\')', (err,res)=>{
						done();
						if(err)
						{
//							console.error('Ошибка выплненеия запроса:'+err);
							reject('ошибка выплненеия запроса SELECT bwgui_processor.do_event(\''+args+'\'): '+err);
						}
						else
						{
//							console.log('получил результат',res)
							resolve(res);
						}
//						console.log('передедал результат')
					});
				}
				catch (e)
				{
					reject('ошибка при соединение с БД: '+e);
				}
			});
		}
		catch (e)
		{
			reject('ошибка при обращении к клиенту БД:'+e);
		}
	});
};
exports.do_query = do_query;
