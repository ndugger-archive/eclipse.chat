import Util from './util';

export default class Events
{
	static main(io, socket, db)
	{
		this.chatsubmit(io, socket, db);
	}

	static chatsubmit(io, socket, db)
	{
		socket.on('chatsubmit', message =>
		{
			db.create('messages', JSON.parse(message)).then(message =>
			{
				message.text = Util.parseURLS(message.text);
				io.emit('chatsubmit', JSON.stringify(message));
			});
		});
	}
}