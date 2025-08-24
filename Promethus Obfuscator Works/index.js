require("dotenv").config();
(() => {
    const r = require("discord.js");
    const O = require("axios");
    const E = require("fs");
    const y = require("child_process");
    const path = require("path");
    const express = require("express");

    const l = {
        log: (...e) => console.log("[PROMETHEUS]", ...e),
        error: (...e) => console.error("[PROMETHEUS]", ...e),
    };

    const tempDir = path.join(__dirname, "Temp_files");
    if (!E.existsSync(tempDir)) {
        l.error("❌ Temp_files directory does not exist! Please create it manually.");
        process.exit(1);
    }

    function obfuscate(inputFile, preset) {
        return new Promise((resolve, reject) => {
            let outputFile = path.join(tempDir, `obfuscated_${Date.now()}.lua`);
            let proc = y.spawn("./bin/luajit.exe", [
                "./lua/cli.lua",
                "--preset", preset,
                inputFile,
                "--out", outputFile
            ]);

            proc.stderr.on("data", data => {
                l.error(data.toString());
                reject(data.toString());
            });

            proc.on("close", () => resolve(outputFile));
        });
    }

    const token = process.env.DISCORD_TOKEN;

    l.log("Bot is starting...");

    const client = new r.Client({
        intents: [
            r.Intents.FLAGS.GUILDS,
            r.Intents.FLAGS.GUILD_MESSAGES,
            r.Intents.FLAGS.DIRECT_MESSAGES
        ],
        partials: ["CHANNEL"]
    });

    client.login(token);

    client.once("ready", () => {
        l.log(`✅ Logged in as ${client.user?.tag || "Unknown"}`);
    });

    client.on("messageCreate", async msg => {
        if (msg.author.bot) return;
        if (!msg.content.startsWith(".obf")) return; // ✅ Only trigger with .obf

        let fileUrl = msg.attachments.first()?.url;
        if (!fileUrl) {
            msg.reply("⚠️ Please upload a **Lua file** with the `.obf` command!");
            return;
        }

        let inputFile = path.join(tempDir, `input_${Date.now()}.lua`);
        let response = await O({
            method: "GET",
            url: fileUrl,
            responseType: "stream"
        });

        response.data.pipe(E.createWriteStream(inputFile));

        await new Promise((resolve, reject) => {
            response.data.on("end", resolve);
            response.data.on("error", reject);
        });

        let outputFile;
        try {
            outputFile = await obfuscate(inputFile, "Medium");
        } catch (err) {
            msg.reply("❌ Obfuscation failed:\n```\n" + err + "\n```");
            return;
        }

        const obfuscatedCode = E.readFileSync(outputFile, "utf-8");

        if (obfuscatedCode.length < 1900) {
            await msg.reply("```lua\n" + obfuscatedCode + "\n```");
        } else {
            const attachment = new r.MessageAttachment(outputFile, "obfuscated.lua");
            await msg.reply({ files: [attachment] });
        }

        try {
            E.unlinkSync(inputFile);
            E.unlinkSync(outputFile);
        } catch (err) {
            l.error("Cleanup failed:", err);
        }
    });

    // ✅ Keepalive server for Render
    const app = express();
    const PORT = 3000; // fixed port
    app.get("/", (req, res) => res.send("✅ Prometheus bot is running!"));
    app.listen(PORT, () => l.log(`🌍 Server running on port ${PORT}`));
})();

