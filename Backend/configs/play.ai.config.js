const playAiApiHeader = {
    'Content-Type': 'application/json',
    'Authorization': process.env.PLAY_AUTH_KEY,
    'X-USER-ID': process.env.PLAY_AUTH_ID
}

module.exports = {playAiApiHeader};

