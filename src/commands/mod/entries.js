/**
 * @author Lothaire Guée
 * @description
 *      Contains the command 'entries'.
 *      Send the member entries log file to the user in DM.
 */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { AttachmentBuilder } = require("discord.js");

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const slashCommand = new SlashCommandBuilder()
    .setName("entries")
    .setDescription("[mod] Envoi les logs d'entrées des membres dans vos MP.")
    .setDefaultPermission(false);

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'ping'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {

    const logsFile = new AttachmentBuilder(
        `${process.cwd()}/files/userEntries.log`
    );
    await interaction.member.send({
        content: `Logs des entrées de membres du serveur ${interaction.guild.name} (${interaction.guildId}).`,
        files: [logsFile],
    });
    await interaction.reply({
        content: `Voilà le fichier de logs ci-dessous ! Le message étant en ephemeral, le fichier vous a aussi été envoyé en MP.`,
        files: [logsFile],
        ephemeral: true,
    });
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    data: slashCommand,
    execute,
};
