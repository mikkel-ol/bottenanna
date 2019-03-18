const { Client } = require('discord.js');
const { TOKEN, PREFIX, BOT_READY } = require('./config');
const helper = require('./helper');

const bot = new Client();

bot.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.toLowerCase().startsWith(PREFIX)) return;

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
bot.on('ready', () => console.log(BOT_READY));

bot.login(TOKEN);
