import axios from "axios";
import { streamCompletion, generateId, getOpenAIKey } from "./functions.js"
import { DEBUG } from "./config.js";

async function completions(req, res) {
    let orgId = generateId();
    const authorization=req.headers?.authorization||req.headers?.Authorization|| `Bearer ${getOpenAIKey()}`;
    if (!req.body.prompt) {
        res.set("Content-Type", "application/json");
        return res.status(400).send({
            status: false,
            error: "No prompt provided"
        });
    }

    if (req.body.stream) {
        try {
            const response = await axios.post(
                `https://api.openai.com/v1/completions`, req.body,
                {
                    responseType: "stream",
                    headers: {
                        Accept: "text/event-stream",
                        "Content-Type": "application/json",
                        Authorization: authorization,
                    },
                },
            );

            res.setHeader("content-type", "text/event-stream");

            for await (const message of streamCompletion(response.data)) {
                try {
                    const parsed = JSON.parse(message);
                    delete parsed.id;
                    delete parsed.created;
                    res.write(`data: ${JSON.stringify(parsed)}\n\n`);
                } catch (error) {
                    if (DEBUG) console.error("Could not JSON parse stream message", message, error);
                }
            }

            res.write(`data: [DONE]`);
            res.end();
        } catch (error) {
            try {
                if (error.response && error.response.data) {
                    let errorResponseStr = "";

                    for await (const message of error.response.data) {
                        errorResponseStr += message;
                    }

                    errorResponseStr = errorResponseStr.replace(/org-[a-zA-Z0-9]+/, orgId);

                    const errorResponseJson = JSON.parse(errorResponseStr);
                    return res.status(error.response.status).send(errorResponseJson);
                } else {
                    if (DEBUG) console.error("Could not JSON parse stream message", error);
                    return res.status(500).send({
                        status: false,
                        error: "something went wrong!"
                    });
                }
            }
            catch (e) {
                console.log(e);
                return res.status(500).send({
                    status: false,
                    error: "something went wrong!"
                });
            }
        }
    }
    else {
        try {
            const response = await axios.post(
                `https://api.openai.com/v1/completions`, req.body,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: authorization,
                    },
                },
            );

            delete response.data.id;
            delete response.data.created;

            return res.status(200).send(response.data);
        } catch (error) {
            try {
                error.response.data.error.message = error.response.data.error.message.replace(/org-[a-zA-Z0-9]+/, orgId);
                return res.status(error.response.status).send(error.response.data);
            }
            catch (e) {
                if (DEBUG) console.log(e);
                return res.status(500).send({
                    status: false,
                    error: "something went wrong!"
                });
            }
        }
    }
}

async function chatCompletions(req, res) {
    let orgId = generateId();
    const authorization=req.headers?.authorization||req.headers?.Authorization|| `Bearer ${getOpenAIKey()}`;
    if (req.body.stream) {
        try {
            const response = await axios.post(
                `https://api.openai.com/v1/chat/completions`, req.body,
                {
                    responseType: "stream",
                    headers: {
                        Accept: "text/event-stream",
                        "Content-Type": "application/json",
                        Authorization:authorization,
                    },
                },
            );

            res.setHeader("content-type", "text/event-stream");

            for await (const message of streamCompletion(response.data)) {
                try {
                    const parsed = JSON.parse(message);
                    delete parsed.id;
                    delete parsed.created;
                    const { content } = parsed.choices[0].delta;
                    if (content) {
                        res.write(`data: ${JSON.stringify(parsed)}\n\n`);
                    }
                } catch (error) {
                    if (DEBUG) console.error("Could not JSON parse stream message", message, error);
                }
            }

            res.write(`data: [DONE]`);
            res.end();
        } catch (error) {
            try {
                if (error.response && error.response.data) {
                    let errorResponseStr = "";

                    for await (const message of error.response.data) {
                        errorResponseStr += message;
                    }

                    errorResponseStr = errorResponseStr.replace(/org-[a-zA-Z0-9]+/, orgId);

                    const errorResponseJson = JSON.parse(errorResponseStr);
                    return res.status(error.response.status).send(errorResponseJson);
                } else {
                    if (DEBUG) console.error("Could not JSON parse stream message", error);
                    return res.status(500).send({
                        status: false,
                        error: "something went wrong!"
                    });
                }
            }
            catch (e) {
                if (DEBUG) console.log(e);
                return res.status(500).send({
                    status: false,
                    error: "something went wrong!"
                });
            }
        }
    }
    else {
        try {
            const response = await axios.post(
                `https://api.openai.com/v1/chat/completions`, req.body,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: authorization,
                    },
                },
            );

            delete response.data.id;
            delete response.data.created;

            return res.status(200).send(response.data);
        } catch (error) {
            try {
                error.response.data.error.message = error.response.data.error.message.replace(/org-[a-zA-Z0-9]+/, orgId);
                return res.status(error.response.status).send(error.response.data);
            }
            catch (e) {
                if (DEBUG) console.log(e);
                return res.status(500).send({
                    status: false,
                    error: "something went wrong!"
                });
            }
        }
    }
}

export { completions, chatCompletions };
