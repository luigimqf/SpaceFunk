module.exports = {
    app: {
        playing: 'by luigimqf ❤️',
        global: true,
        ExtraMessages: false,
        loopMessage: false,
    },

    opt: {
        maxVol: 100,
        spotifyBridge: true,
        volume: 75,
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 30000,
        leaveOnEnd: true,
        leaveOnEndCooldown: 30000,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
