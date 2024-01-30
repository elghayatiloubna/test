import { OpenAI } from "openai";
//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
const openai = new OpenAI({
  apiKey: "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",
});

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "system",
      "content": "You will be provided with a sentence in English, and your task is to translate it into French."
    },
    {
      "role": "user",
      "content": "My name is Jane. What is yours?"
    }
  ],
  temperature: 0.7,
  max_tokens: 64,
  top_p: 1,
});