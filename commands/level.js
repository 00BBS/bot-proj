const disc = require("discord.js");
const xp = require("../xp.json");


module.exports.run = async (bot, msg, args) => {
	let icon = msg.author.displayAvatarURL;
	let embed = new disc.RichEmbed()
	.setDescription("Character Level")
	.setColor("#35ffda")
	.setThumbnail(icon)
	.addField("Level", xp[msg.author.id].level)
	.addField("Current XP", xp[msg.author.id].xp)
	.addField("Needed XP to level", xp[msg.author.id].level * 250 - xp[msg.author.id].xp);

	return msg.channel.send(embed);
}

module.exports.help = {
	name: "level"
}