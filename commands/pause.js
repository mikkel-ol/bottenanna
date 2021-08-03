const queue = require('../shared/queue');

function pause(message) {
    const serverQueue = queue.get(message.guild.id);

    if (!message.member.voice.channel)
        return message.channel.send(
            "You're not in a voice channel - no trolling!"
        );

    if (serverQueue && serverQueue.playing) {
        message.delete();

        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        
        return message.channel.send("⏸ The music is paused..");
    }

    return message.channel.send("There is nothing playing.");
}

module.exports = pause;