/**
 * @author Lothaire Guée
 * @description
 *      Contains the command 'certify'.
 *      Allow mods to certify someone in the server.
 */

/*      IMPORTS      */
const { SlashCommandBuilder } = require( "@discordjs/builders" );
const { CommandInteraction } = require( "discord.js" );
//const { JSON } (ça sera l'import de la databse ou le json qui aura l'id du channel proposition)

/*      AUTHORISATION      */
const { Presentation } = require('../../files/modules.js');
 
/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
 const slashCommand = new SlashCommandBuilder()
     .setName( "p_reset" )
     .setDescription( "Reset les restrictions pour permettre à un utilisateur de mettre à nouveau une présentation." )
     .setDefaultPermission( true )
     .addUserOption(option =>
        option.setName('user')
            .setDescription("Entrez l'utilisateur.")
            .setRequired(true));
 
/* ----------------------------------------------- */
/* PERMISSIONS                                     */
/* ----------------------------------------------- */

const permissions = [
    {
        id: 'MOD_ID',
        type: 'ROLE',
        permission: true,
    },
];

 /* ----------------------------------------------- */
 /* FUNCTIONS                                       */
 /* ----------------------------------------------- */
 /**
  * Function called when the command 'ping'
  * @param {CommandInteraction} interaction The interaction generated by the command's execution.
  */
  async function execute( interaction ) {
    if(Presentation == false) return;
    
    const { dbModifyPresentation, getSetupData } = require("../../utils/enmapUtils")
    const PRESENTATION_ID = await getSetupData(interaction.guild.id, "presentation")
    memberFirst = interaction.options.getMember('user')


    dbModifyPresentation.delete(memberFirst.id)
    interaction.guild.channels.cache.find(x => x.id === PRESENTATION_ID)   //channel presentation
        .permissionOverwrites.edit(memberFirst, {
            SEND_MESSAGES: true
        })

    await interaction.reply(
        { content: `Reset des permissions de présentation de <@${memberFirst.id}> à été confirmé par <@${interaction.member.id}>.`, ephemeral: false }
    );
     
 }
 
 
 /* ----------------------------------------------- */
 /* MODULE EXPORTS                                  */
 /* ----------------------------------------------- */
 module.exports = {
    data: slashCommand,
    permissions: permissions,
    execute
 }