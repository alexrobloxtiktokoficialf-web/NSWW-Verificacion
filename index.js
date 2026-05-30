require("dotenv").config();

console.log("TOKEN:", process.env.DISCORD_TOKEN ? "ENCONTRADO" : "NO ENCONTRADO");

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log(`✅ Conectado como ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);