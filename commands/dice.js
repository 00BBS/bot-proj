const disc = require("discord.js");
let coins = require("../coins.json");
const fs = require("fs")

module.exports.run = async (bot, msg, args) => {
	let dice1 = Math.floor(Math.random() * Math.floor(6));
	let dice2 = Math.floor(Math.random() * Math.floor(6));
	let currCoin = coins[msg.author.id].coins;

	// two dice
	if(args.length === 3){
		if(args[0] < 1 || args[0] > 6 || args[1] < 1 || args[1] > 6){
			return msg.reply("Please make sure you input values between 1 and 6 for the dice.");
		}
		else if(args[2] > coins[msg.author.id].coins){
			return msg.reply("You do not have enough coins to bet.");
		}
		else{
			var diceBet = args[0] - 1;
			var diceBet2 = args[1] - 1;
			if((diceBet) === dice1 && (diceBet2) === dice2){
				coins[msg.author.id] = {
					coins : currCoin + 36*parseInt(args[2])
				}
				msg.reply(`You have won! Congratulations! Your account has been credited with ` + 36*args[2] + " coins");
			}
			else{
				coins[msg.author.id] = {
					coins : currCoin - parseInt(args[2])
				}
				msg.reply(`Sorry, the two dice were ${dice1 + 1} & ${dice2 + 1}. ${args[2]} has been subtracted from your account.`);
			}
		}
	}
	// one dice
	else if(args.length === 2){
		if(args[0] < 1 || args[0] > 6){
			return msg.reply("Please make sure you input values between 1 and 6 for the dice.")
		}
		else if(args[1] > coins[msg.author.id].coins){
			return msg.reply("You do not have enough coins to bet.");
		}
		else{
			var diceBet = args[0] - 1;
			console.log("Bet: " + diceBet);
			if(diceBet === dice1){
				coins[msg.author.id] = {
					coins : currCoin + 6*parseInt(args[1])
				}
				msg.reply(`You have won! Congratulations! Your account has been credited with ` + 6*args[1] + " coins");
			}
			else{
				coins[msg.author.id] = {
					coins : currCoin - parseInt(args[1])
				}
				msg.reply(`Sorry the dice was ${dice1 + 1}. ${args[1]} coins has been subtracted from your account.`);
			}
		}
	}
	else{
		return msg.reply("Correct command use: ^dice|<number btwn 1-6>|bet, or ^dice|<number 1-6>*2|bet.")
	}


	fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
		if(err){
			console.log(err)
		}
	});
}

module.exports.help = {
	name: "dice"
}