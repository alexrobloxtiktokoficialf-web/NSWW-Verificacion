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

// COMANDOS

const commands = [

    new SlashCommandBuilder()
        .setName("verificarse")
        .setDescription("Información sobre la verificación NSWW")
        .toJSON(),

    new SlashCommandBuilder()
        .setName("comenzar_verificacion")
        .setDescription("Comienza la verificación automática")
        .toJSON(),

    new SlashCommandBuilder()
        .setName("verificacion_manual")
        .setDescription("Información sobre la verificación manual")
        .toJSON(),

    new SlashCommandBuilder()
        .setName("aprobar")
        .setDescription("Aprueba a un usuario")
        .addUserOption(option =>
            option
                .setName("usuario")
                .setDescription("Usuario a aprobar")
                .setRequired(true)
        )
        .toJSON(),

    new SlashCommandBuilder()
        .setName("rechazar")
        .setDescription("Rechaza a un usuario")
        .addUserOption(option =>
            option
                .setName("usuario")
                .setDescription("Usuario a rechazar")
                .setRequired(true)
        )
        .toJSON()

];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

// REGISTRAR COMANDOS

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

        console.log("✅ Comandos registrados");

    } catch (error) {

        console.error(error);

    }
})();

// BOT LISTO

client.once("clientReady", () => {

    console.log(`✅ Conectado como ${client.user.tag}`);

});

// INTERACCIONES

client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand()) return;

    // /verificarse

    if (interaction.commandName === "verificarse") {

        return interaction.reply({
            ephemeral: true,
            content:
`🌩️ SISTEMA DE VERIFICACIÓN NSWW

1️⃣ Lee las reglas.
2️⃣ Completa la verificación automática.
3️⃣ Si fallas pasarás a verificación manual.

📖 Reglas:
<#1505761998590312609>

🤖 Verificación Automática:
<#1510103874483130489>

📋 Verificación Manual:
<#1510103934801281128>`
        });

    }

    // /comenzar_verificacion

    if (interaction.commandName === "comenzar_verificacion") {

        return interaction.reply({
            ephemeral: true,
            content:
`⚠️ Sistema de preguntas automáticas en construcción.

Próximamente aparecerán aquí las preguntas meteorológicas y de Chile.`
        });

    }

    // /verificacion_manual

    if (interaction.commandName === "verificacion_manual") {

        return interaction.reply({
            ephemeral: true,
            content:
`📋 VERIFICACIÓN MANUAL

Dirígete a:

<#1510103934801281128>

Crea una solicitud y espera a:

• Fundador
• Met-Staff
• Instructor-CTC

Ellos revisarán tu caso.`
        });

    }

    // /aprobar

    if (interaction.commandName === "aprobar") {

        return interaction.reply({
            ephemeral: true,
            content:
"✅ Sistema de aprobación aún no implementado."
        });

    }

    // /rechazar

    if (interaction.commandName === "rechazar") {

        return interaction.reply({
            ephemeral: true,
            content:
"❌ Sistema de rechazo aún no implementado."
        });

    }

});

// LOGIN

client.login(process.env.DISCORD_TOKEN);

console.log("CLIENT_ID:", process.env.CLIENT_ID);
console.log("GUILD_ID:", process.env.GUILD_ID);
