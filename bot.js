import express from "express";
import { Telegraf } from "telegraf";
import fetch from "node-fetch";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function downloadPhoto(fileId) {
  const fileInfo = await bot.telegram.getFile(fileId);
  const url = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${fileInfo.file_path}`;
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const filePath = path.join("photo.jpg");
  fs.writeFileSync(filePath, Buffer.from(buffer));
  return filePath;
}

bot.on("photo", async (ctx) => {
  try {
    await ctx.reply("📷 Sedang menganalisis foto...");

    const fileId = ctx.message.photo.pop().file_id;
    const filePath = await downloadPhoto(fileId);

    const result = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Deskripsikan foto ini secara detail, seperti prompt AI." },
            { type: "image_url", image_url: `data:image/jpeg;base64,${fs.readFileSync(filePath).toString("base64")}` }
          ]
        }
      ],
    });

    const description = result.choices[0].message.content;
    await ctx.reply(`📝 Prompt foto:\n${description}`);

  } catch (err) {
    console.error(err);
    await ctx.reply("❌ Gagal menganalisis foto.");
  }
});

const app = express();
app.use(express.json());

const URL = process.env.WEBHOOK_URL || `https://${process.env.RAILWAY_STATIC_URL}`;
bot.telegram.setWebhook(`${URL}/bot${process.env.BOT_TOKEN}`);

app.use(bot.webhookCallback(`/bot${process.env.BOT_TOKEN}`));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Bot berjalan di port ${PORT}`);
});
