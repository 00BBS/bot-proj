const disc = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	let icon = msg.guild.iconURL;
		// let array = Array.from(msg.member.guild.members);
	let embed = new disc.RichEmbed()
	.setDescription("Server Information")
	.setColor("#35ffda")
	.setThumbnail(icon)
	.addField("Server Name", msg.guild.name)
	.addField("Created On", msg.guild.createdAt)
	.addField("You joined", msg.member.joinedAt)
	.addField("Total members", msg.guild.memberCount)
	.addField("Worst member", msg.guild.members.random().user.username);

	console.log(msg.guild.members.random().user.username)
	return msg.channel.send(embed);
}

module.exports.help = {
	name: "serverInfo"
}