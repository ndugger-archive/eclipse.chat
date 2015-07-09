import Channel from './channel';
import Util from './util';

class ChatClient
{
	static main()
	{
		if (Util.isHome())
		{

		}

		if (Util.isChannel())
		{
			Channel.main();
		}
	}
}

window.onload = () => ChatClient.main();