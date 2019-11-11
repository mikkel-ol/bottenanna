const Client = require("discord.js").Client,
    db = require("./data/db"),
    Logger = require("./services/logger"),
    config = require("./config/app"),
    helper = require("./helper"),
    token = process.env.DISCORD_TOKEN;

const bot = new Client();

// Initialize logger with timestamps
Logger.init();

//
bot.on("message", async message => {
    if (message.author.bot) return;
    
    // const guildId = message.guild.id;
    // const guilds = db.get().collection("guilds");

    // const guild = await guilds.findOne({ _id: guildId });

    // console.log(guild);

    // let prefix = config.prefix;

    // if (guild) prefix = guild.prefix;

    if (!message.content.toLowerCase().startsWith(config.prefix)) return;

    const command = message.content.toLowerCase().split(" ")[1];

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

bot.on("error", console.error);
bot.on("ready", () => console.log(config.messages.ready));

// Connect to MongoDB before using bot
db.init((err, db) => {
    if (err) return console.log(err);

    // Log the bot in
    bot.login(token);
});
