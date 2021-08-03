const queue = new Map(),
    config = require("../config/app"),
    ytdl = require("ytdl-core"),
    Util = require("discord.js").Util;

// Get song and push to queue (and create one if not present) - calls recursive play function
async function handle(
    video,
    msg,
    voiceChannel,
    playlist,
    videoTimeStart,
    repeat
) {
    const serverQueue = queue.get(msg.guild.id);

    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`,
        start: 0,
        repeat: repeat,
    };

    // Set time to start if any is given
    if (videoTimeStart) song.start = videoTimeStart;

    // Construct server queue
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: config.volume.default,
            playing: true,
        };

        // Put constructed queue in map with guild ID as key
        queue.set(msg.guild.id, queueConstruct);

        // Push song to songs array
        queueConstruct.songs.push(song);

        try {
            queueConstruct.connection = await voiceChannel.join();

            // Start playing from queue; only 1 song exist first time, but it will keep calling itself until queue is empty.
            // That's why we can just push a new song to queue without interupting the bot playing
            playRecursive(msg.guild, queueConstruct.songs[0]);

        } catch (error) {
            console.error(`I could not join the voice channel: ${error}`);
            
            queue.delete(msg.guild.id);

            return msg.channel.send(
                `I could not join the voice channel: ${error}`
            );
        }
    } else {
        // Server queue exists
        serverQueue.songs.push(song);

        // If it's a playlist don't send a message
        if (playlist) return;
        else
            return msg.channel.send(
                `✅ **${song.title}** has been added to the queue!`
            );
    }
    return;
}

// Recursive function that keeps playing all songs in server queue until empty
function playRecursive(guild, song, repeat) {
    const serverQueue = queue.get(guild.id);

    // If no songs are left in queue, leave voice channel and delete queue
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    // Play the moosik
    const dispatcher = serverQueue.connection
        .play(ytdl(song.url, { begin: song.start }))
        .on("end", (reason) =>
            setTimeout(function () {
                // Stupid end bug
                switch (reason) {
                    case "Stream is not generating quickly enough.": // Natural / song ended
                        // If repeat is not set, shift to next song
                        if (!serverQueue.songs[0].repeat) {
                            serverQueue.songs.shift();
                            var repeat = false;
                        } else {
                            var repeat = true;
                        }
                        break;
                    case "user": // Ended by user
                        serverQueue.songs.shift();
                        break;
                    default:
                        console.log(reason);
                        serverQueue.songs.shift();
                        break;
                }

                // Call recursively
                playRecursive(guild, serverQueue.songs[0], repeat);
            }, 500)
        )
        .on("error", (error) => console.error(error));

    dispatcher.setVolumeLogarithmic(serverQueue.volume / config.volume.max);

    if (!repeat)
        serverQueue.textChannel.send(`🎶 Started playing: **${song.title}**`);
}

function get(id) {
    return queue.get(id);
}

module.exports = {
    handle,
    get
}