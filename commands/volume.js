const queue = require("../shared/queue");
const config = require('../config/app');

function volume(message) {
    const serverQueue = queue.get(message.guild.id);
    const args = message.content.split(" ");

    if (!message.member.voice.channel)
        return message.channel.send(
            "You're not in a voice channel - already 0% volume for you!"
        );

    if (!serverQueue)
        return message.channel.send(
            "Can't crank the volume when nothing is playing.."
        );

    if (!args[2]) {
        message.delete();

        return message.channel.send(
            `🔊 Current volume is: **${serverQueue.volume}%**`
        );
    }

    if (args[2] != parseInt(args[2]) || args[2] < 0 || args[2] > 100)
        return message.channel.send(
            "Volume must be a number between 0 and 100."
        );

    message.delete();

    serverQueue.volume = args[2];

    serverQueue.connection.dispatcher.setVolumeLogarithmic(
        serverQueue.volume / config.volume.max
    );

    return message.channel.send(`🔊 Volume is now: **${serverQueue.volume}%**`);
}

module.exports = volume;
