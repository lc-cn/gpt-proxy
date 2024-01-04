// Server configuration
const SERVER_PORT = 3000; // Server port

// OpenAI API Keys
let OPENAI_KEYS = process.env.API_KEYS?process.env.API_KEYS.split(","):[];
module.exports={
	OPENAI_KEYS,
	SERVER_PORT
}
