const disc = require("discord.js");
const fs = require("fs")
let coins = require("../coins.json");

module.exports.run = async (bot, msg, args) => {
	let result = Math.floor(Math.random() * Math.floor(2));
	var bet = -1;
	if(args.length < 2 || args.length > 2){
		return msg.reply("Correct way for using this command: ^coinflip <heads/tails> <amount>");
	}
	if(!coins[msg.author.id]){
		return msg.reply("You dont have any coins to bet.");
	}
	// retrieve bet
	if(args[0] === "heads" || args[0] === "head"){
		console.log("heads");
		bet = 0;
	}
	else if(args[0] === "tails" || args[0] === "tail"){
		console.log("tails");
		bet = 1;
	}
	else{
		return msg.reply("Please specify, heads or tails.")
	}

	console.log("num: " + result);
	console.log("bet: " + bet);

	let currCoins = coins[msg.author.id].coins;
	if(args[1] > currCoins){
		return msg.reply("You do not have enough coins to bet.");
	}

	if(bet === result){
		console.log("win");
		coins[msg.author.id] = {
			coins: currCoins + parseInt(args[1])
		}
		msg.channel.send(`${msg.author} has won ${args[1]} coins. You now have ${coins[msg.author.id].coins} coins <:roodnstare:514537491404161028>`);
	}
	else{
		console.log("loss");
		coins[msg.author.id] = {
			coins : currCoins - parseInt(args[1])
		}
		msg.channel.send(`${msg.author} has lost ${args[1]} coins. You now have ${coins[msg.author.id].coins} coins <:whyRoodn:514537008828514324>`);
	}

	fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
		if(err){
			console.log(err)
		}
	});

}

module.exports.help = {
	name: "coinflip"
}