/**
 * @author Lothaire Guée
 * @description
 *		This event is used to store the memes in the database and add their initial reactions.
 */


const { Client, Message } = require( "discord.js" );
const { activeMember } = require("../utils/modules/activeMember.js");
const { proposition } = require("../utils/modules/proposition.js");
const { presentation } = require("../utils/modules/presentation");

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */


/**
 * Function called when the event 'messageCreate' is emitted.
 * @param {Message} message The message created.
 * @param {Client} client The client that emitted the event.
 */
async function execute( message, client ) {
	activeMember(client, message);
	proposition(client, message);
	presentation(message)
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "messageCreate",
	execute
}
