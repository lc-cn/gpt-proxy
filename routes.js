import { getOpenAIKey } from "./functions.js"
import {OpenAI} from "openai";

async function completions(req, res) {
    const authorization=req.headers?.authorization||req.headers?.Authorization|| `Bearer ${getOpenAIKey()}`;
    const apiKey=authorization.split(" ")[1];
    const openAi=new OpenAI({apiKey})
    res.status(200).send(await openAi.completions.create(req.body));
}

async function chatCompletions(req, res) {
    const authorization=req.headers?.authorization||req.headers?.Authorization|| `Bearer ${getOpenAIKey()}`;
    const apiKey=authorization.split(" ")[1];
    const openAi=new OpenAI({apiKey})
    res.status(200).send(await openAi.chat.completions.create(req.body));
}

export { completions, chatCompletions };
