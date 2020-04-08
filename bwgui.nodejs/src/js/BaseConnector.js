const {Pool} = require('pg');
//const pool = new Pool({connectionString: 'postgresql://pi:pi@localhost:5432/pi',});
pool = new Pool({
	user: 'pi',
	host: 'localhost',
	database: 'pi',
	password: 'pi',
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
