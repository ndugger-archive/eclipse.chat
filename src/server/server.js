import Http from 'http';
import Express from 'express';
import EjsMate from 'ejs-mate';
import Passport from 'passport';
import SocketIO from 'socket.io';
import Config from './config';
import Database from './database';
import Events from './events';
import Routes from './routes';

let app = Express(),
	server = Http.Server(app),
	io = SocketIO(server),
	db = new Database(Config.database);

class EclipseChat
{
	static main()
	{
		app.use(Passport.initialize());
 		app.use(Passport.session());
		app.use(Express.static('../client'));
		app.set('views', '../client/views/');
		app.set('view engine', 'ejs');
		app.engine('ejs', EjsMate);
		
		for (let route in Routes)
		{
			app.get(route, (request, response) => 
			{
				let controller = require(`./controllers/${Routes[route].controller}`);
				controller[Routes[route].action](request, response, db);
			});
		}
		
		io.on('connection', socket => Events.main(io, socket, db));
	}
}

server.listen(1337, EclipseChat.main);