const play = require('./play');
const stop = require('./stop');
const playing = require('./playing');
const skip = require('./skip');
const pause = require('./pause');
const resume = require('./resume');
const volume = require('./volume');
const queue = require('./queue');
const shuffle = require('./shuffle');
const fade = require('./fade');

module.exports = {
    play,
    stop,
    playing,
    skip,
    pause,
    resume,
    volume,
    queue,
    shuffle,
    fade
}