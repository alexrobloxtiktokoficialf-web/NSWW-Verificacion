require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    REST,
    Routes,
    SlashCommandBuilder
} = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// Registrar comando /verify
const commands = [
    new SlashCommandBuilder()
        .setName("verify")
        .setDescription("Inicia la verificación NSWW")
        .toJSON()
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log("Registrando comandos...");

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log("✅ Comando /verify registrado");
    } catch (error) {
        console.error(error);
    }
})();

client.once("clientReady", () => {
    console.log(`✅ Conectado como ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "verify") {

        await interaction.reply({
            content:
                "🌩️ Sistema de Verificación NSWW operativo.\n\nLa siguiente versión abrirá el formulario de verificación.",
            ephemeral: true
        });

    }
});

client.login(process.env.DISCORD_TOKEN);
console.log("CLIENT_ID:", process.env.CLIENT_ID);
console.log("GUILD_ID:", process.env.GUILD_ID);