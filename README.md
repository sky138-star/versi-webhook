# 🤖 Telegram Photo Prompt Bot (Webhook Version)

Bot Telegram untuk menganalisis foto menjadi deskripsi prompt AI (image-to-text) menggunakan OpenAI GPT-4o-mini.

## 🚀 Deploy ke Railway
1. Upload project ini ke GitHub.
2. Di Railway → **New Project → Deploy from GitHub**.
3. Pilih **Web Service**.
4. Isi Environment Variables:
   - `BOT_TOKEN` = token bot Telegram dari BotFather
   - `OPENAI_API_KEY` = API Key OpenAI
   - `WEBHOOK_URL` = URL Railway kamu (misal `https://nama-app.up.railway.app`)
5. Deploy, tunggu sampai log menunjukkan:
```
🚀 Bot berjalan di port 3000
```
6. Kirim foto ke bot → bot membalas deskripsi prompt.

## ⚙️ Environment Variables
| Nama            | Deskripsi |
|-----------------|-----------|
| BOT_TOKEN       | Token bot Telegram |
| OPENAI_API_KEY  | API Key OpenAI |
| WEBHOOK_URL     | URL Railway (contoh: https://nama-app.up.railway.app) |
