import Express from 'express';
import Http from 'http';
import SocketIO from 'socket.io';
import Events from './events';
import Routes from './routes.json';

let app = Express(),
	server = Http.Server(app),
	io = SocketIO(server);

class ChatServer
{
	static main()
	{
		app.use(Express.static('../../client'));
		app.set('view engine', 'ejs');
		app.set('views', '../../client/views/');
		for (let route in Routes)
		{
			app.get(route, (request, response) => 
			{
				let controller = require(`./controllers/${Routes[route].controller}`);
				controller[Routes[route].action](io, { request: request, response: response });
			});
		}
		io.on('connection', socket => Events.main(io, socket));
	}
}

server.listen(1337, ChatServer.main);