export default class Util
{
	static isHome()
	{
		return location.pathname === '/';
	}

	static isChannel()
	{
		return Boolean(location.pathname.match(/channel/));
	}
}