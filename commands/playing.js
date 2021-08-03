const queue = require('../shared/queue');

function playing(message) {
    const serverQueue = queue.get(message.guild.id);

    if (!serverQueue) return message.channel.send("Nothing is playing");

    message.delete();

    return message.channel.send(
        `Now playing: **${serverQueue.songs[0].title}**`
    );
}

module.exports = playing;