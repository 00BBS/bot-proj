const disc = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	let icon = bot.user.displayAvatarURL;
	let embed = new disc.RichEmbed()
	.setDescription("Bot Information")
	.setColor("#35ffda")
	.setThumbnail(icon)
	.addField("Bot Name", bot.user.username)
	.addField("Created On", bot.user.createdAt)
	.addField("Commands", "^gamers, ^ping, ^serverInfo, ^info")
	.addField("Special Strings", "le, kuretsuha, messatsu. shut, idk");

	return msg.channel.send(embed);
}

module.exports.help = {
	name: "info"
}