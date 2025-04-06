# Redeem Bot

A simple Discord bot built with [discord.js v14](https://discord.js.org) and [CommandKit](https://commandkit.js.org) to handle redeem code commands with ease.

---

## 📦 Features

- Slash command support via CommandKit
- Auto-loading of commands, events, and validations
- Developer-only commands support via config
- `.env` support for keeping your bot token safe

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/Redeem-bot.git
cd Redeem-bot
```


### 2. Install dependencies

```npm install```


### 3. Create `.env` file

```BOT_TOKEN=your-bot-token-here```


### 4. Configure developer IDs
Edit `src/config/dev-config.json` :
```
{
  "guilds": ["your-guild-id"],
  "users": ["your-user-id"],
  "roles": ["your-role-id"]
}
```

### 5. Run the bot

```
node .
```