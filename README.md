# <img src="https://github.com/mikkel-ol/bottenanna/raw/master/logo.png" alt="" width="24px" height="24px"> Music bot for Discord

A (simple) music bot for <img src="https://discordapp.com/assets/07dca80a102d4149e9736d4b162cff6f.ico" alt="" width="14px" height="14px"> Discord that can play music from <img src="https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png" alt="" width="14px" height="14px"> YouTube. <a href="https://discordapp.com/api/oauth2/authorize?client_id=356076982846488579&permissions=3221504&scope=bot">Add it to your server here!</a>

### Usage

Prefix: `y!`

**Commands**:

`play` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - plays link or searches on YouTube - adds to queue if already playing

`stop` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - stops the current song

`pause` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - pauses playing

`resume` &nbsp;&nbsp;&nbsp; - resumes playing

`playing` &nbsp; - shows the current song playing

`q` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - shows what's in the queue

`shuffle` &nbsp; - shuffles the queue

`volume` &nbsp;&nbsp;&nbsp; - sets volume between `0` and `100`%

`fade` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - fades the volume to between `0` and `100`%


### Development

Written with <a href="https://discord.js.org"><img src="https://discord.js.org/static/favicon.ico" alt="" width="14px" height="14px"> Discord.js</a>

Built and run with <a href="https://nodejs.org/"><img src="https://nodejs.org/static/favicon.png" alt="" width="14px" height="14px"> Node.js</a>

### Requirements

* <a href="https://nodejs.org/">Node.js</a>
* <a href="https://github.com/mikkel-ol/bottenanna/blob/master/envars.md">Environment variables</a>

### Install & run

First install dependencies with `npm run install` in folder.

Then run the bot with `node .`


**Todos**:

* Saving playlists and queues
