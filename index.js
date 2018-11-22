const config = require("./botconfig.json");
const disc = require("discord.js");
const fs = require("fs");
let coins = require("./coins.json");

const bot = new disc.Client({disableEveryone: true});

bot.commands = new disc.Collection();

fs.readdir("./commands/", (err, file) => {
	if(err){
		console.log(err);
	}
	let jsfile = file.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
		console.log("Cant find commands.");
		return;
	}
	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`${f} has been loaded`);
		bot.commands.set(props.help.name, props);
	});
})

bot.on("ready", async()=>{
	console.log(`${bot.user.username} is here.`);
	bot.user.setActivity("Stir Fry Simulator 2020");
});

bot.on("message", async msg => {
	if(msg.author.bot){
		return;
	}
	if(msg.channel.type === "dm"){
		console.log("dm: " + msg)
		return;
	}


	if(!coins[msg.author.id]){
		coins[msg.author.id] = {
			coins: 0
		};
	}

	// randomise coin amounts
	let coinAmount = Math.floor(Math.random() * 15) + 1;
	let baseAmount = Math.floor(Math.random() * 15) + 1;
	console.log(`${coinAmount} ; ${baseAmount}`);

	// if they happen to match, give the coins to the message author
	if(coinAmount === baseAmount){
		coins[msg.author.id] = {
			coins: coins[msg.author.id].coins + (coinAmount*50)
		};
		fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
			if(err){
				console.log(err)
			}
		});

		let embed = new disc.RichEmbed()
		.setAuthor(msg.author.username)
		.setColor("#35ffda")
		.addField("💸", `${coinAmount * 50} coins added !`);

		msg.channel.send(embed).then(message => {message.delete(10000)});

	}

	let prefix = config.prefix;
	// split message by spaces
	let msgArr = msg.content.split(" ");
	// obtain the first part of the command, e.g ((^hello)) or ((^hi))
	let cmd = msgArr[0];
	// obtain the arguments following the command
	let args = msgArr.slice(1);


	let commandFile = bot.commands.get(cmd.slice(prefix.length));
	if(commandFile){
		commandFile.run(bot, msg, args);
	}

	/**** Bonus Random Features ****/
	if(msg.content.includes("le") === true){
		return msg.channel.send("le " + msg.member + " has arrived")
	}
	/**** Bonus Random Features ****/

});

bot.login(config.token);
