const queue = require('../shared/queue');

function stop(message) {
    const serverQueue = queue.get(message.guild.id);

    if (!message.member.voice.channel)
        return message.channel.send(
            "You're not in a voice channel - join one so I know where to stop playing!"
        );

    if (!serverQueue)
        return message.channel.send(
            "How can I stop the moosik if there is nothing playing?!"
        );

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();

    message.delete();

    return message.channel.send(
        `❌ **${message.author.username}** stopped the fun :(`
    );
}

module.exports = stop;