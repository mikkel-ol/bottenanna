const 
	Client = require('discord.js').Client,
	config = require('./config/app'),
	helper = require('./helper'),
	token = require('./token');

const bot = new Client();

bot.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.toLowerCase().startsWith(config.prefix)) return;

	const command = message.content.toLowerCase().split(' ')[1];

	switch (command) {
		case "play":
			helper.play(message);
			break;

		case "stop":
			helper.stop(message);
			break;

		case "playing":
			helper.playing(message);
			break;

		case "skip":
			helper.skip(message);
			break;

		case "pause":
			helper.pause(message);
			break;

		case "resume":
			helper.resume(message);
			break;

		case "volume":
			helper.volume(message);
			break;

		case "q":
			helper.q(message);
			break;

		case "fade":
			helper.fade(message);
			break;

		case "shuffle":
			helper.shuffle(message);
			break;

		default:
			return;
	}
});


bot.on('error', console.error);
bot.on('ready', () => console.log(config.messages.ready));

bot.login(token);
