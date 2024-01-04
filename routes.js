import { getOpenAIKey } from "./functions.js"
import {OpenAI} from "openai";

async function completions(ctx) {
    const authorization=ctx.req.headers?.authorization||ctx.req.headers?.Authorization|| `Bearer ${getOpenAIKey()}`;
    const apiKey=authorization.split(" ")[1];
    const openAi=new OpenAI({
        apiKey,
    })
    try{
        ctx.body=await openAi.completions.create(ctx.req.body)
    }catch (e){
        ctx.body=e
    }
}

async function chatCompletions(ctx, res) {
    const authorization=ctx.req.headers?.authorization||ctx.req.headers?.Authorization|| `Bearer ${getOpenAIKey()}`;
    const apiKey=authorization.split(" ")[1];
    const openAi=new OpenAI({apiKey})
    try{
        ctx.body=await openAi.chat.completions.create(ctx.request.body)
    }catch (e){
        ctx.body=e
    }
}

export { completions, chatCompletions };
