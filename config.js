const
	prefix = "y!",
	defaultVolume = 50,
	maxVolume = 100,
	noOfSearches = 10,
	fadeTime = 4000;

const play_noSong = "I need to know what to play..",
	noVoicechannel = "Join a voice channel so I know where to play moosik!",
	noSearchResult = "No search results on YouTube..",
	noSelection = "I need a number from 1-10 within 10 seconds. Cancelled song selection.";





const bashDefault = '\033[0m',
	bashBlack = '\033[0;30m',
	bashRed = '\033[0;31m',
	bashGreen = '\033[0;32m',
	bashBrown = '\033[0;33m',
	bashBlue = '\033[0;34m',
	bashPurple = '\033[0;35m',
	bashCyan = '\033[0;36m',
	bashYellow = '\033[1;33m',
	bashWhite = '\033[1;37m';



exports.TOKEN = '';
exports.PREFIX = prefix;
exports.DEFAULT_VOLUME = defaultVolume;
exports.MAX_VOLUME = maxVolume;
exports.GOOGLE_API_KEY = '';
exports.SEARCH_NO = noOfSearches;
exports.FADE_TIME = fadeTime;
exports.PLAY_NOSONG = play_noSong;
exports.NO_SEARCH = noSearchResult;
exports.NO_VOICECHANNEL = noVoicechannel;
exports.NO_SELECTION = noSelection;
exports.BOT_READY = bashGreen + 'Ready: ' + bashBlue + 'Botten Anna' + bashDefault + ' - fired up and ready to serve!';