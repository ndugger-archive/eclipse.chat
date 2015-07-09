export default class Channel
{
	static main()
	{
		let form = document.querySelector('#chatForm'),
			input = form.querySelector('textarea'),
			messages = document.getElementById('messages');

		form.addEventListener('submit', e => 
		{
			e.preventDefault();
			socket.emit('chatsubmit', JSON.stringify({
				channel: 1,
				userid: 1,
				username: 'NickDugger',
				userslug: 'nickdugger',
				text: input.value
			}));
			input.value = '';
		});

		input.addEventListener('keydown', e =>
		{
			if (e.keyCode === 13)
			{
				e.preventDefault();
				form.dispatchEvent(new Event('submit'));
			}
		})

		socket.on('chatsubmit', message =>
		{
			message = JSON.parse(message);
			messages.innerHTML += `
				<li class="message" data-message-id="${message.id}">
					<b data-user-id="${message.userid}">${message.username}:</b> 
					${message.text}
				</li>
			`;
		});
	}
}