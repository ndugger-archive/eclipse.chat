class ChatClient
{
	static main()
	{
		let form = document.getElementById('chatform'),
			input = document.getElementById('chatinput'),
			messages = document.getElementById('messages');

		form.addEventListener('submit', e => 
		{
			e.preventDefault();
			socket.emit('chatsubmit', JSON.stringify({
				username: 'Chief',
				text: input.value
			}));
			input.value = '';
		});

		socket.on('chatsubmit', message =>
		{
			message = JSON.parse(message);
			let li = document.createElement('li');
			li.innerHTML = `<b>${message.username}:</b> ${message.text}`;
			messages.appendChild(li);
		});
	}
}

window.onload = () => ChatClient.main();