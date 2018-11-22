const disc = require("discord.js");
let coins = require("../coins.json");

module.exports.run = async (bot, msg, args) => {
	if(!coins[msg.author.id]){
		coins[msg.author.id] = {
			coins: 0
		};
	}

	let uCoins = coins[msg.author.id].coins;
	let embed = new disc.RichEmbed()
	.setAuthor(msg.author.username)
	.setColor("#35ffda")
	.addField("💰", "You have: " + uCoins + " coins!");

	return msg.channel.send(embed);
}

module.exports.help = {
	name: "coins"
}