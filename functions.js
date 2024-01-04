const {OPENAI_KEYS}=require('./config.js')

function getOpenAIKey() {
    return OPENAI_KEYS[Math.floor(Math.random() * OPENAI_KEYS.length)];
}

module.exports= { getOpenAIKey }
