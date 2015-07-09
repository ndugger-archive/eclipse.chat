export default class Util
{
	static parseURLS(text)
	{
		return text.replace(/([a-zA-Z]+:\/\/([^#?\s]+(?=\.)[^\s]+)(?=$|\s))/g, '<a href="$1">$2</a>');
	}
}