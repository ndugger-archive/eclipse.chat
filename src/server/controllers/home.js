export default class Home
{
	static main(request, response, db)
	{
		db.find('channels').then(results =>
		{
			response.render('home/index',
			{
				channels: results
			});
		});
	}
}