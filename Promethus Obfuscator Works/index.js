// simple/index.js
require("dotenv").config();

const { Client, GatewayIntentBits, Partials } = require("discord.js");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const tmp = require("tmp");
const { v4: uuidv4 } = require("uuid");

// Logger
const log = (...args) => console.log("[BOT]", ...args);

// Setup Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.once("ready", () => {
  log(`Logged in as ${client.user.tag}`);
});

// Command: .obf
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(".obf")) {
    if (message.attachments.size === 0) {
      return message.reply("❌ Please attach a Lua file to obfuscate.");
    }

    const attachment = message.attachments.first();
    log(`Received file: ${attachment.name}`);

    try {
      // Download attachment
      const response = await axios.get(attachment.url, { responseType: "arraybuffer" });
      const tmpFile = tmp.fileSync({ postfix: ".lua" });
      fs.writeFileSync(tmpFile.name, response.data);

      // Fake obfuscation
      const obfuscatedCode = `-- Obfuscated by Prometheus Bot\n${fs.readFileSync(tmpFile.name, "utf8")}`;

      // Save with .obf extension
      const outPath = path.join(__dirname, `obf-${uuidv4().slice(0, 8)}.obf`);
      fs.writeFileSync(outPath, obfuscatedCode);

      await message.reply({
        content: "✅ File obfuscated successfully!",
        files: [outPath]
      });

      fs.unlinkSync(outPath);
      tmpFile.removeCallback();
    } catch (err) {
      console.error(err);
      message.reply("❌ Failed to obfuscate file.");
    }
  }
});

// Start bot
client.login(process.env.DISCORD_TOKEN);
