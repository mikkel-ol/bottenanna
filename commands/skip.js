const queue = require('../shared/queue');

function skip(message) {
    const serverQueue = queue.get(message.guild.id);

    if (!message.member.voice.channel)
        return message.channel.send(
            "You're not in a voice channel - why do you want to skip then, you troll?!"
        );

    if (!serverQueue)
        return message.channel.send(
            "How can I skip a song if there is nothing playing?!"
        );

    const song = serverQueue.songs[0];
    serverQueue.connection.dispatcher.end();

    message.delete();

    return message.channel.send(
        `⏩ **${message.author.username}** skipped song: **${song.title}**`
    );
}

module.exports = skip;