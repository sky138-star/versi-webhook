const express = require("express");
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Halo! Kirim foto, nanti aku jelasin isi fotonya 📷"));

bot.on("photo", async (ctx) => {
  await ctx.reply("Foto diterima, lagi dianalisa...");
  // proses analisa foto pakai OpenAI
});

const app = express();
app.use(bot.webhookCallback(`/webhook`));

const PORT = process.env.PORT || 3000;
const URL = process.env.RAILWAY_STATIC_URL
  ? `https://${process.env.RAILWAY_STATIC_URL}`
  : `http://localhost:${PORT}`;

// Set webhook otomatis
bot.telegram.setWebhook(`${URL}/webhook`);

app.get("/", (req, res) => {
  res.send("Bot is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
