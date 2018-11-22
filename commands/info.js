const disc = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	let icon = bot.user.displayAvatarURL;
	let embed = new disc.RichEmbed()
	.setDescription("Bot Information")
	.setColor("#35ffda")
	.setThumbnail(icon)
	.addField("Bot Name", bot.user.username)
	.addField("Created On", bot.user.createdAt)
	.addField("Git", "https://github.com/00BBS/bot-proj")
	.addField("Commands", "^coins, ^coinflip, ^pay, ^serverInfo, ^info")
	.addField("Special Strings", "le");

	return msg.channel.send(embed);
}

module.exports.help = {
	name: "info"
}