const { token } = require('./config.json');
const sql = require('sequelize')
const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const verifySys = require('./modules/verifySystem');
const client = new Client({partials:['GUILD_MEMBER'] ,intents: [Intents.FLAGS.GUILDS , Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS] });
const prefix = '=>'
const fs = require('fs');
const config  = require('./config.json');
client.commands = new Collection();
client.buttons = new Collection();
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));
const buttonCommand = fs.readdirSync('./buttoncommand').filter(file => file.endsWith('.js'))

const sequelize = new sql('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

client.once('ready', async () => {
	for (const file of commandFiles) {
		const command = require(`./cmds/${file}`);
		await client.commands.set(command.data.name, command);
	}
	
	for (const file of buttonCommand) {
		const button = require(`./buttoncommand/${file}`)
		await client.buttons.set(file, button)
	}
	
	Object.keys(config.guildList).forEach(async (guildId) => {
		const guild = config.guildList[guildId];
		const verifyObj = new verifySys.verifySystem(guildId);
		await verifyObj.member.sync();
		
		const firstOutDated = await verifyObj.findOutdatedUser()
		for(let i=0; i<firstOutDated.length; i++){
			const embed = new MessageEmbed().setDescription(`你在 ${guild.serverName} 的 Youtube會員 審核已過期，請重新驗證`).setColor('RED')
			
			const server = client.guilds.cache.get(guildId)
			await verifyObj.deleteUser(firstOutDated[i].user_id)
			try {
				await client.users.fetch(firstOutDated[i].user_id).then(user => user.send({embeds:[embed]}))
				await server.members.fetch(firstOutDated[i].user_id).then(user => user.roles.remove(guild.memberRole))
			}
			catch(error) {
				console.log(`${firstOutDated[i].user_id} 此人已退出 ${guild.serverName}`)
			}
		}
		setInterval(async () => {
			const outDated = await verifyObj.findOutdatedUser()
			for(let i=0; i<outDated.length; i++) {
				const embed = new MessageEmbed().setDescription(`你在 ${guild.serverName} 的 Youtube會員 審核已過期，請重新驗證`).setColor('RED')
				
				const server = client.guilds.cache.get(guildId)
				await verifyObj.deleteUser(outDated[i].user_id)
				try {
					await client.users.fetch(outDated[i].user_id).then(user => user.send({embeds:[embed]}) )
					await server.members.fetch(outDated[i].user_id).then(user=>user.roles.remove(guild.memberRole))
				}
				catch(error) {
					console.log(`${outDated[i].user_id} 此人已退出 ${guild.serverName}`)
				}
			}
		}, 24*60*60*1000);
	});

	const now = new Date()
	const time = now.toTimeString()
	console.log(`${time}`)
	console.log(`以 ${client.user.tag} 登入`);
});


client.on('messageCreate', async msg => {
	if (msg.author.bot) return;
	
	require('./events/messageCreate.js')(client, msg);
})


client.on('interactionCreate', async interaction => {

	const command = await client.commands.get(interaction.commandName)
	const button = await client.buttons.get(interaction.customId+'.js')

	//if (!command) return;
	if(interaction.isButton()) {
		try {
			await button.execute(interaction, client)
		} catch(error) {
			console.error(error);
		}
	}

	if (interaction.channel.type === "DM") return;
			
	if (!interaction.isCommand())return;

	try {
		await command.execute(interaction,client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

})
client.login(token);