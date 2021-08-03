const queue = require('../shared/queue');

function resume(message) {
    const serverQueue = queue.get(message.guild.id);

    if (!message.member.voice.channel)
        return message.channel.send(
            "You're not in a voice channel, so you don't even know if anything is paused!"
        );

    if (serverQueue && !serverQueue.playing) {
        message.delete();

        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();

        return message.channel.send("🔊 Resumed music!");
    } else if (serverQueue && serverQueue.playing) {
        return message.channel.send("Already playing music, you deaf?!");
    }
    
    return message.channel.send("There is nothing playing.");
}

module.exports = resume;