const config = require("./botconfig.json");
const disc = require("discord.js");
const fs = require("fs");
let coins = require("./coins.json");
let xp = require("./xp.json");

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


	/** Coin Functionality **/
	// if the author has no coins, set to 0
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

		let cashEmbed = new disc.RichEmbed()
		.setAuthor(msg.author.username)
		.setColor("#35ffda")
		.addField("💸", `${coinAmount * 50} coins added !`);

		msg.channel.send(cashEmbed).then(message => {message.delete(10000)});

	}


	/** Xp Functionality **/
	let xpAmount = Math.floor(Math.random() * 7) + 8;
	if(!xp[msg.author.id]){
		xp[msg.author.id] = {
			xp: 0,
			level: 1
		}
	}

	let currXp = xp[msg.author.id].xp;
	let currLvl = xp[msg.author.id].level;
	let nextLevel = currLvl * 250;

	xp[msg.author.id].xp = currXp + xpAmount;
	// if user has reached levelling amount, increase level.
	if(nextLevel <= xp[msg.author.id].xp){
		xp[msg.author.id].level = currLvl + 1;
		//reset xp to zero when reaching level cap and add additional left over xp.
		xp[msg.author.id].xp = (currXp + xpAmount) % 250;
		let icon = msg.author.displayAvatarURL;
		let levelUp = new disc.RichEmbed()
		.setAuthor(msg.author.username)
		.setColor("#35ffda")
		.setThumbnail(icon)
		.addField("⚔", `You are now level ${xp[msg.author.id].level}! You need ${(xp[msg.author.id].level * 250) - xp[msg.author.id].xp} more experience to level.`);

		msg.channel.send(levelUp).then(message => {message.delete(100000)});

	}

	fs.writeFile("xp.json", JSON.stringify(xp), (err) => {
		if(err){
			console.log(err);
		}
	});


	console.log(`xpAmount gained: ${xpAmount}`);
	console.log(`Level is ${xp[msg.author.id].level}`);


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
		return msg.channel.send("le " + msg.member + " has arrived").then(message => {message.delete(5000)})
	}
	/**** Bonus Random Features ****/

});

bot.login(config.token);
