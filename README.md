# Music bot for Discord <img src="https://discordapp.com/assets/07dca80a102d4149e9736d4b162cff6f.ico" alt="" width="24px" height="24px">

A (simple) music bot for Discord that can play music from <img src="https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png" alt="" width="14px" height="14px"> YouTube

### Requirements

A [Discord Bot token](https://discordapp.com/developers/docs/topics/oauth2#bots) set in a `token.js` file in root folder:

```javascript

exports.TOKEN = "token";

```

<br/>

A [YouTube Data API key](https://developers.google.com/youtube/v3/getting-started) set in a `apikey.js` file in root folder:

```javascript

exports.GOOGLE_API_KEY = "";

```


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
