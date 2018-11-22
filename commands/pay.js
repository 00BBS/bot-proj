const disc = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, msg, args) => {
	// error checking
	if(!coins[msg.author.id]){
		return msg.reply("You dont have any coins.");
	}
	if(args[0].includes(msg.author.id) === true){
		return msg.reply("You cannot give yourself coins.");
	}
	if(args.length > 2 || args.length < 2){
		return msg.reply("The correct way of using the command: ^pay @someone <amount>. Make sure you are not including a space, after the @.");
	}
	let userP = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(args[0]);
	// check if the payed user has coins or not
	if(!coins[userP.id]){
		coins[userP.id] = {
			coins: 0
		};
	}

	let pCoins = coins[userP.id].coins;
	let sCoins = coins[msg.author.id].coins;

	if(args[1] > sCoins){
		return msg.reply("You do not have enough coins to give.")
	}
	coins[msg.author.id] = {
		coins: sCoins - parseInt(args[1])
	};

	coins[userP.id] = {
		coins: pCoins + parseInt(args[1])
	};

	let icon = msg.author.displayAvatarURL;
	embed = new disc.RichEmbed()
	.setAuthor(msg.author.username)
	.setColor("#35ffda")
	.setThumbnail(icon)
	.addField("Coins given 💸", args[1])
	.addField("Given to 👥", args[0])
	.addField("You hold 👤", coins[msg.author.id].coins);

	fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
		if(err){
			console.log(err)
		}
	});

	return msg.channel.send(embed);
}

module.exports.help = {
	name: "pay"
}