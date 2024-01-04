const  {SERVER_PORT} = require('./config.js');

const Koa = require('koa');
const KoaBodyParser = require("koa-bodyparser");
const dotenv=require('dotenv')
dotenv.config()
const { router } =require('./router.js');
process.on("uncaughtException", function (err) {
    console.error(`Caught exception: ${err}`);
});

const koa = new Koa()
koa.use(KoaBodyParser()).use(router.routes()).use(router.allowedMethods());
// Register routes
router.get('home',"/", async function (ctx) {
    ctx.body ={
        status: true,
        name: "yea Reverse Proxy",
        version: "1.0.0",
    }
});

// Start server
koa.listen(SERVER_PORT, () => {
    console.log(`Listening on ${SERVER_PORT} ...`);
});
