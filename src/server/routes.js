export default
{
	"/": {
		controller: "home",
		action: "main"
	},
	"/login": {
		controller: "home",
		action: "login"
	},
	"/channel/:id/:slug": {
		controller: "channel",
		action: "main"
	}
}