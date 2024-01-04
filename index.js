import {SERVER_PORT} from "./config.js";

const Koa = require('koa');
const KoaBodyParser = require("koa-bodyparser");
const Router = require("@koa/router");
const dotenv=require('dotenv')
dotenv.config()
import { completions, chatCompletions } from './routes.js';
process.on("uncaughtException", function (err) {
    if (DEBUG) console.error(`Caught exception: ${err}`);
});

const router = new Router();
const koa = new Koa()
koa.use(KoaBodyParser()).use(router.routes()).use(router.allowedMethods());
// Register routes
router.get('home',"/", async function (ctx) {
    ctx.body ={
        status: true,
        name: "Lc-cn Reverse Proxy",
        version: "1.0.0",
    }
});
router.post("/v1/completions", completions);
router.post("/v1/chat/completions", chatCompletions);

// Start server
koa.listen(SERVER_PORT, () => {
    console.log(`Listening on ${SERVER_PORT} ...`);
});
