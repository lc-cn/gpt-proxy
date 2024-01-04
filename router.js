const { getOpenAIKey } = require('./functions.js')
const Router = require("@koa/router");
const { OpenAI } = require('openai');

/**
 *
 * @param callback {function(OpenAI,import('koa').Context['req']):Promise<any>} 回调
 * @returns {(function(import('koa').Context, import('koa').Next): Promise<void>)|*}
 */
function callApi(callback){
    return async (ctx,next)=>{
        const authorization=ctx.req.headers?.authorization||ctx.req.headers?.Authorization|| `Bearer ${getOpenAIKey()}`;
        const apiKey=authorization.split(" ")[1];
        const openAi=new OpenAI({apiKey})
        try{
            console.log('request body',req.body)
            ctx.body=await callback(openAi,ctx.req)
            console.log('callback returned',ctx.body)
        }catch (e){
            console.error(e)
            ctx.body=e
        }
    }
}
const router = new Router();
router.post('/v1/completions',callApi((openAi,req)=>{
    return openAi.completions.create(req.body)
}))
router.post('/v1/chat/completions',callApi((openAi,req)=>{
    return openAi.chat.completions.create(req.body)
}))
router.post('/v1/audio/speech',callApi((openAi,req)=>{
    return openAi.audio.speech.create(req.body)
}))
router.post('/v1/audio/transcriptions',callApi((openAi,req)=>{
    return openAi.audio.transcriptions.create(req.body)
}))
router.post('/v1/audio/translations',callApi((openAi,req)=>{
    return openAi.audio.translations.create(req.body)
}))
router.post('/v1/embeddings',callApi((openAi,req,)=>{
    return openAi.embeddings.create(req.body)
}))
router.post('v1/files',callApi((openAi,req)=>{
    return openAi.files.create(req.body)
}))
router.get('v1/files',callApi((openAi)=>{
    return openAi.files.list()
}))
router.post('/v1/images/generations',callApi((openAi,req)=>{
    return openAi.images.generate(req.body)
}))
router.post('/v1/images/edits',callApi((openAi,req)=>{
    return openAi.images.edit(req.body)
}))
router.post('/v1/images/variations',callApi((openAi,req)=>{
    return openAi.images.createVariation(req.body)
}))
router.get('v1/models',callApi((openAi)=>{
    return openAi.models.list()
}))
module.exports={ router };
