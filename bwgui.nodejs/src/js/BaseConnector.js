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
				console.log('connecting to base');
				pool.connect((err,client,done)=>{
					if(err)
					{
						return console.log('error connection to base:' +err);
					}
					console.log('connection to base opened');
					console.log('запрос к БД');
					console.log('SELECT bwgui_processor.do_event(\''+args+'\')');
					client.query('SELECT bwgui_processor.do_event(\''+args+'\')', (err,res)=>{
						done();
						console.log('получил');
						console.log(err,res)
						resolve(res);
						console.log('передедал результат')
						//client.end()
						//console.log('closed connection to base')
						});
				});
			}
			catch (e)
			{
				console.log('Ошибка при работе с клиентом БД: '+e.message);
				reject(e.message);
			}
			finally
			{
				try
				{
					if (client != null)
					{
						client.end();
					}
				}
				catch (e)
				{
					console.log('Что то не так с соединением БД '+e.message);
				}
			}
	});

};
exports.do_query = do_query;
