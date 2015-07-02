import Http from 'http';
import Express from 'express';
import EjsMate from 'ejs-mate';
import SocketIO from 'socket.io';
import Events from './events';
import Routes from './routes';

let app = Express(),
	server = Http.Server(app),
	io = SocketIO(server);

app.use(Express.static('../client'));
app.set('views', '../client/views/');
app.set('view engine', 'ejs');
app.engine('ejs', EjsMate);

class EclipseChat
{
	static main()
	{
		for (let route in Routes)
		{
			app.get(route, (request, response) => 
			{
				let controller = require(`./controllers/${Routes[route].controller}`);
				controller[Routes[route].action](request, response);
			});
		}
		io.on('connection', socket => Events.main(io, socket));
	}
}

server.listen(1337, EclipseChat.main);