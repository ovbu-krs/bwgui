const {Pool} = require('pg');
const pool = new Pool({connectionString: 'postgresql://pi:pi@localhost:5432/pi',});


const do_query = function(args)
{
	 
	return new Promise(function(resolve, reject) {
			try
			{
				console.log('connecting to base');
				pool.connect((err,client,done)=>{
					if(err)
					{
						done();
						console.log('error connection to base:' +err);
					}
					else
					{
						console.log('connection to base opened');

						//client.query('SELECT NOW()', (err,res)=>{
						//console.log('SELECT bwgui_processor.do_event(\''+args+'\')');
						client.query('SELECT bwgui_processor.do_event(\''+args+'\')', (err,res)=>{
						//client.query('SELECT bwgui_processor.do_event(\'{"idApp":0,"idObj":0,"idEvnt":0, "args":{}}\')', (err,res)=>{
						console.log('получил');
						console.log(err,res)
						resolve(res);
						console.log('query to base done')
						client.end()
						console.log('closed connection to base')
						});
						done();
					}
				});
			}
			catch (e)
			{
				console.log(e.message);
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
					console.log(e.message);
				}
			}
	});

};
exports.do_query = do_query;
