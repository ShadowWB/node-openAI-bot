const telegramApi = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openAi = new OpenAIApi(configuration);
const TOKEN = "6105312579:AAGS98I1DPeg204DkSkXzAQvhmIThxppXmU",
    CHAT_ID = "-613964899";
let data = ''
const bot = new telegramApi(TOKEN, { polling: true })

async function runCompletion(msg) {

    if (msg.text == "/start") {
        return await bot.sendMessage(msg.chat.id, `hello ${msg.from.first_name}  \n \n Ask me something ! Its better in English ,but i can in Ucrainian also ! \n Слава Україні !!!`)
    }
    data = msg.text
    console.log(data);
    const completion = await openAi.createCompletion({
        model: "text-davinci-003",
        prompt: data,
        temperature: 0,
        max_tokens: 3060,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    console.log(completion.data.choices[0].text);

    bot.sendMessage(msg.chat.id, "Слава Україні !!!")
    bot.sendMessage(msg.chat.id, completion.data.choices[0].text)
}

bot.on("message", async (msg) => {
    await runCompletion(msg)
})
