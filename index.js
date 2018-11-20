const config = require("./botconfig.json");
const disc = require("discord.js");


const bot = new disc.Client({disableEveryone: true});


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


	// bot functions
	if(cmd === `${prefix}gamers`){
		return msg.channel.send("Gamers rise up");
	}
	// ping pong
	else if(cmd === `${prefix}ping`){
		return msg.channel.send("Pong!");
	}
	else if(cmd === `${prefix}serverInfo`){
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
		.addField("Least favourite member", msg.guild.members.random().user.username);

		console.log(msg.guild.members.random().user.username)
		return msg.channel.send(embed);
	}
	// contain bot info
	else if(cmd === `${prefix}info`){
		let icon = bot.user.displayAvatarURL;
		let embed = new disc.RichEmbed()
		.setDescription("Bot Information")
		.setColor("#35ffda")
		.setThumbnail(icon)
		.addField("Bot Name", bot.user.username)
		.addField("Created On", bot.user.createdAt)
		.addField("Commands", "^gamers, ^ping, ^serverInfo, ^info")
		.addField("Special Strings", "le, kuretsuha, messatsu. shut, idk");

		return msg.channel.send(embed);
	}
	// error
	else if(cmd === `${prefix}`){
		return msg.channel.send("Command not found. Try: ^info for a list of commands.");
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
