// Server configuration
const SERVER_PORT = 3000; // Server port
const DEBUG = false; // Debug mode

// Rate limit
const PRIOD = 15 * 1000; // 15 seconds
const RATE_LIMIT = 50; // 50 requests per 15 seconds

// Whitelisted IPs
const WHITELISTED_IPS = [
    // "127.0.0.1"
];

// OpenAI API Keys
let OPENAI_KEYS = process.env.API_KEYS?process.env.API_KEYS.split(","):[];
module.exports={
	OPENAI_KEYS,
	SERVER_PORT,
    DEBUG,
	PRIOD,
    RATE_LIMIT,
	WHITELISTED_IPS
}
