import Passport from 'passport';
import Util from '../util';

export default class Channel
{
	static main(request, response, db)
	{
		db.find('channels', 1, `id = ${request.params.id}`).then(channel =>
		db.find('messages', 50, `channel = ${channel.id}`).then(messages =>
		{
			for (let message of messages)
			{
				message.text = Util.parseURLS(message.text);
			}
			response.render('channel/index',
			{
				channel: channel,
				messages: messages
			});
		}));
	}
}