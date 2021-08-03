const queue = require('../shared/queue');
const config = require('../config/app');

let isFading;

function fade(message) {
    const serverQueue = queue.get(message.guild.id);
    const args = message.content.split(" ");

    if (isFading)
        return message.channel.send(
            "I'm already fading! Try again afterwards.."
        );

    if (!message.member.voice.channel)
        return message.channel.send(
            "You're not in a voice channel - fading hopes!"
        );

    if (!serverQueue) return message.channel.send("How can I fade silence?!");

    if (!args[2])
        return message.channel.send(`You need to tell me what to fade to..`);

        if (args[2] != parseInt(args[2]) || args[2] < 0 || args[2] > 100)
        return message.channel.send(
            "Volume must be a number between 0 and 100."
        );

        message.delete();

    // Calcuate difference between current and desired volume
    var diff = args[2] - serverQueue.volume;
    if (diff == 0) return message.channel.send(`Already at that volume!`);
    // Calculate time out between each step
    const interval = (config.volume.fadeTime * 1000) / Math.abs(diff);

    isFading = true;

    fading(message, diff, serverQueue, interval);
}

function fading(message, diff, serverQueue, interval) {
    setTimeout(function () {
        // Sanity check
        if (!serverQueue.connection.dispatcher) return (isFading = false);

        if (diff < 0) {
            diff++;
            serverQueue.volume--;
            serverQueue.connection.dispatcher.setVolumeLogarithmic(
                serverQueue.volume / config.volume.max
            );
        } else {
            diff--;
            serverQueue.volume++;
            serverQueue.connection.dispatcher.setVolumeLogarithmic(
                serverQueue.volume / config.volume.max
            );
        }

        if (diff != 0) {
            fading(message, diff, serverQueue, interval);
        } else {
            message.channel.send(
                `🔊 Volume is now: **${serverQueue.volume}%**`
            );
            return (isFading = false);
        }
    }, interval);
}

module.exports = fade;