const disc = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, msg, args) => {
	// basic error checking
	if(!coins[msg.author.id]){
		return msg.reply("You dont have any coins.");
	}
	if(args.length < 2){
		return msg.reply("You have not specified an amount.");
	}
	if(args[0].includes(msg.author.id) === true){
		return msg.reply("You cannot give yourself coins.");
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
	}else{
		coins[msg.author.id].coins = {
			coins: sCoins - parseInt(args[1])
		};

		coins[userP.id].coins = {
			coins: pCoins + parseInt(args[1])
		}
	}

	embed = new disc.RichEmbed()
	.setAuthor(msg.author.username)
	.setColor("#35ffda")
	.addField("Coins given 💸", args[1]);

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