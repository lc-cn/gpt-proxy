import { getOpenAIKey } from "./functions.js"
import {OpenAI} from "openai";

async function completions(req, res) {
    const authorization=req.headers?.authorization||req.headers?.Authorization|| `Bearer ${getOpenAIKey()}`;
    const apiKey=authorization.split(" ")[1];
    const openAi=new OpenAI({
        apiKey,
    })
    try{
        res.status(200).send(await openAi.completions.create(req.body));
    }catch (e){
        res.status(e.status||500).send(e);
    }
}

async function chatCompletions(req, res) {
    const authorization=req.headers?.authorization||req.headers?.Authorization|| `Bearer ${getOpenAIKey()}`;
    const apiKey=authorization.split(" ")[1];
    const openAi=new OpenAI({apiKey})
    console.log(req);
    try{
        res.status(200).send(await openAi.chat.completions.create(req.body));
    }catch (e){
        res.status(e.status||500).send(e);
    }
}

export { completions, chatCompletions };
