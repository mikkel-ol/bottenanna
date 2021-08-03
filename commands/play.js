const ytdl = require("ytdl-core"),
    YouTube = require("simple-youtube-api"),
    Util = require("discord.js").Util,
    config = require("../config/app"),
    youtube = new YouTube(process.env.YOUTUBE_API_KEY);

const queue = require("../shared/queue");

async function play(message) {
    // Split arguments into array
    const args = message.content.split(" "); // y!,play,hello,adele,trap,remix

    if (!args[2]) return message.channel.send(config.messages.missing.song);

    // Get string to search on youtube by slicing from 3. word onward
    const searchString = args.slice(2).join(" "); // hello adele trap remix

    // Save voice channel the message was sent from
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel)
        return message.channel.send(config.messages.missing.voicechannel);

    message.delete();

    // It's a playlist
    if (
        args[2].match(
            /^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/
        )
    ) {
        let playlistNoOfSongs = args[3]; // Get no of videos to add to queue

        if (!playlistNoOfSongs) playlistNoOfSongs = 20; // Default to 20

        if (playlistNoOfSongs == "all") playlistNoOfSongs = undefined; // Play all by not sending a limit

        const playlist = await youtube.getPlaylist(args[2]);
        const videos = await playlist.getVideos(playlistNoOfSongs);

        for (const video of Object.values(videos)) {
            const videoResult = await youtube.getVideoByID(video.id);

            await queue.handle(videoResult, message, voiceChannel, true);
        }

        return message.channel.send(
            `✅ Playlist: **${playlist.title}** has been added to the queue!`
        );
    }

    // It's not a playlist
    else {
        try {
            // Play video with a clean URL
            var video = await youtube.getVideo(args[2]);
        } catch (error) {
            // If it's not a url, search for it on YT
            try {
                const videos = await youtube.searchVideos(
                    searchString,
                    config.search.max
                );

                if (videos.length == 0)
                    return message.channel.send(
                        config.messages.missing.searchResult
                    );

                let index = 1;
                let songSelectMsg;

                // Send message with songs
                message.channel
                    .send(
                        `
__**Song selection:**__

${videos.map((video) => `**${index++}.** ${video.title}`).join("\n")}

Select a song by returning a number on the list.
				`
                    )
                    .then((message) => {
                        songSelectMsg = message;
                    });

                try {
                    var response = await message.channel.awaitMessages(
                        (reply) =>
                            reply.author == message.author &&
                            reply.content.charAt(0) > 0 &&
                            reply.content.charAt(0) < 11,
                        {
                            max: 1,
                            time: 10000,
                            errors: ["time"],
                        }
                    );

                    response.first().delete();
                } catch (err) {
                    if (!(err instanceof Map)) console.error(err);

                    return message.channel.send(
                        config.messages.missing.selection
                    );
                } finally {
                    songSelectMsg.delete();
                }

                response = response.first().content.split(" "); // Split responses into array by white space
                const videoIndex = parseInt(response[0]);

                // Save time to start, if any
                if (response[1]) {
                    if (response[1].indexOf("t=") != -1) {
                        var videoTimeStart = response[1].substr(
                            response[1].indexOf("t=") + 2
                        );
                    }
                }
                var video = await youtube.getVideoByID(
                    videos[videoIndex - 1].id
                );
            } catch (err) {
                console.error(err);
                return;
            }
        }

        // If time to start is given, extract and attach to queue
        if (args[2].indexOf("&t=") != -1) {
            var videoTimeStart = args[2].substr(args[2].indexOf("&t=") + 3);
        }

        // Check if repeat is set
        if (args[3]) {
            if (args[3].toUpperCase() === "REPEAT") var repeat = true;
        } else {
            var repeat = false;
        }
        
        // Send song to queue handler function
        return queue.handle(
            video,
            message,
            voiceChannel,
            false,
            videoTimeStart,
            repeat
        );
    }
}

module.exports = play;