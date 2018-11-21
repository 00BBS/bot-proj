const config = require("./botconfig.json");
const disc = require("discord.js");
const fs = require("fs");
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
	bot.user.setActivity("Stir fry simulator");
});

bot.on("message", async msg => {
	if(msg.author.bot){
		return;
	}
	if(msg.channel.type === "dm"){
		console.log("dm: " + msg)
		return;
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
	if(msg.content.includes("kuretsuha") === true){
		let embed = new disc.RichEmbed()
		.setImage("https://i.imgur.com/3eSo2Hx.gif")
		.setColor("#35ffda")
		.addField("Le Akuma has arrived", "https://i.imgur.com/3eSo2Hx.gif");
		return msg.channel.send(embed);
	}
	if(msg.content.includes("messatsu") === true){
		let embed = new disc.RichEmbed()
		.setImage("https://j.gifs.com/Yvjk60.gif")
		.setColor("#35ffda")
		.addField("Le Akuma has arrived", "https://j.gifs.com/Yvjk60.gif");
		return msg.channel.send(embed);
	}
	if(msg.content.includes("shut") === true){
		return msg.channel.send("your mouth");
	}
	if(msg.content.includes("idk") === true){
		let embed = new disc.RichEmbed()
		.setImage("https://thumbs.gfycat.com/UnfinishedDefenselessAustralianfreshwatercrocodile-size_restricted.gif")
		.setColor("#35ffda")
		.addField("Dunno about that one chief", "https://thumbs.gfycat.com/UnfinishedDefenselessAustralianfreshwatercrocodile-size_restricted.gif");
		return msg.channel.send(embed);
	}
	/**** Bonus Random Features ****/

});

bot.login(config.token);
