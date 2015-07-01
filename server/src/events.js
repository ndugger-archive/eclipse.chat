export default class Events
{
	static main(io, socket)
	{
		this.chatsubmit(io, socket);
	}

	static chatsubmit(io, socket)
	{
		socket.on('chatsubmit', message =>
		{
			io.emit('chatsubmit', message);
		});
	}
}