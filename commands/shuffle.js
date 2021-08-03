const queue = require('../shared/queue');

function shuffle(message) {
    const serverQueue = queue.get(message.guild.id);

    if (!serverQueue)
        return message.channel.send(
            "Can't shuffle an empty queue - nothing is playing!"
        );

    if (serverQueue.songs.length == 1)
        return message.channel.send(
            `Nothing in queue, now playing: **${serverQueue.songs[0].title}**`
        );

    // Queue shuffling
    let j, x, i;
    for (i = serverQueue.songs.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = serverQueue.songs[i];
        serverQueue.songs[i] = serverQueue.songs[j];
        serverQueue.songs[j] = x;
    }

    // Make queue for sending to channel (else message can be too long)
    let realQueue = serverQueue.songs.slice();

    realQueue.shift(1);

    if (realQueue.length > 20) {
        let qLength = realQueue.length - 20;
        realQueue = realQueue.slice(0, 20);
        realQueue.push({ title: `** ... and ${qLength} more**` });
    }

    message.delete();

    return message.channel.send(`
✅ Queue shuffled

__**New song queue:**__

${realQueue
    .map((song, i, arr) => {
        if (realQueue.length > 20 && arr.length - 1 === i)
            return `${song.title}`;
        else return `• ${song.title}`;
    })
    .join("\n")}
	`);
}

module.exports = shuffle;