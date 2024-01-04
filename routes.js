const { getOpenAIKey } = require('./functions.js')
const { OpenAI } = require('openai');
async function completions(ctx) {
    const authorization=ctx.req.headers?.authorization||ctx.req.headers?.Authorization|| `Bearer ${getOpenAIKey()}`;
    const apiKey=authorization.split(" ")[1];
    const openAi=new OpenAI({
        apiKey,
    })
    try{
        console.log(ctx.body)
        ctx.body=await openAi.completions.create(ctx.request.body)
    }catch (e){
        ctx.body=e
    }
}

async function chatCompletions(ctx, res) {
    const authorization=ctx.req.headers?.authorization||ctx.req.headers?.Authorization|| `Bearer ${getOpenAIKey()}`;
    const apiKey=authorization.split(" ")[1];
    const openAi=new OpenAI({apiKey})
    try{
        console.log(ctx.body)
        ctx.body=await openAi.chat.completions.create(ctx.request.body)
    }catch (e){
        ctx.body=e
    }
}

module.exports={ completions, chatCompletions };
