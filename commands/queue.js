const sQueue = require('../shared/queue');

function queue(message) {
    const serverQueue = sQueue.get(message.guild.id);

    if (!serverQueue)
        return message.channel.send("Nothing is playing; no queue");

    message.delete();

    if (serverQueue.songs.length == 1)
        return message.channel.send(
            `Nothing in queue, now playing: **${serverQueue.songs[0].title}**`
        );

    // Make queue for sending to channel (else message can be too long and also original queue includes current song playing)
    let realQueue = serverQueue.songs.slice();
    realQueue.shift(1);

    if (realQueue.length > 20) {
        let qLength = realQueue.length - 20;
        realQueue = realQueue.slice(0, 20);
        realQueue.push({ title: `** ... and ${qLength} more**` });
    }

    return message.channel.send(`
__**Song queue:**__

${realQueue
    .map((song, i, arr) => {
        if (realQueue.length > 20 && arr.length - 1 === i)
            return `${song.title}`;
        else return `• ${song.title}`;
    })
    .join("\n")}
	`);
}

module.exports = queue;