const Client = require("discord.js").Client,
    db = require("./data/db"),
    Logger = require("./services/logger"),
    config = require("./config/app"),
    token = process.env.DISCORD_TOKEN,
    commands = require('./commands');

const bot = new Client();

// Initialize logger with timestamps
Logger.init();

bot.on("message", async message => {
    if (message.author.bot) return;

    if (!message.content.toLowerCase().startsWith(config.prefix)) return;

    const command = message.content.toLowerCase().split(" ")[1];

    switch (command) {
        case "play":
            commands.play(message);
            break;

        case "stop":
            commands.stop(message);
            break;

        case "playing":
            commands.playing(message);
            break;

        case "skip":
            commands.skip(message);
            break;

        case "pause":
            commands.pause(message);
            break;

        case "resume":
            commands.resume(message);
            break;

        case "volume":
            commands.volume(message);
            break;

        case "q":
            commands.queue(message);
            break;

        case "shuffle":
            commands.shuffle(message);
            break;

        case "fade":
            commands.fade(message);
            break;

        default:
            return;
    }
});

bot.on("error", console.error);
bot.on("ready", () => console.log(config.messages.ready));

// Connect to MongoDB before using bot
db.init((err, db) => {
    if (err) return console.log(err);

    // Log the bot in
    bot.login(token);
});
