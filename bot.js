const config = require('./config.json');
const sql = require('sequelize')
const { Client, Intents, Collection, MessageEmbed,MessageActionRow,MessageButton } = require('discord.js');
const verifySys = require('./modules/verifySystem');
const client = new Client({partials:['GUILD_MEMBER'] ,intents: [Intents.FLAGS.GUILDS , Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS] });
const prefix = '=>'
const fs = require('fs');
client.commands = new Collection();
client.buttons = new Collection();
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));
const buttonCommand = fs.readdirSync('./buttoncommand').filter(file=>file.endsWith('.js'))

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
	
	for (const file of buttonCommand){
		const button = require(`./buttoncommand/${file}`)
		await client.buttons.set(file, button)
	}
	const YTmember = require('./modules/YTmember.js')(sequelize, sql.DataTypes);
	await YTmember.sync();

	const TCmember = require('./modules/TCmember.js')(sequelize, sql.DataTypes);
	await TCmember.sync();
	
	const YTFirstOutDated = await verifySys.findOutdatedYTUser()
	for(let i=0; i<YTFirstOutDated.length; i++){
		const embed = new MessageEmbed().setDescription(`你在 ${config.servername} 的 Youtube會員 審核已過期，請重新驗證`).setColor('RED')
		const server = client.guilds.cache.get(config.guildID)
		await verifySys.deleteYTUser(YTFirstOutDated[i].user_id)
		try {
			await client.users.fetch(YTFirstOutDated[i].user_id).then(user => user.send({embeds:[embed]}))
			await server.members.fetch(YTFirstOutDated[i].user_id).then(user => user.roles.remove(config.ytRole))
		}catch(error){
			console.log(`${YTFirstOutDated[i].user_id} 此人已退出 ${config.servername}`)
		}
	}

	const TCFirstOutDated = await verifySys.findOutdatedTCUser()
	for(let i=0; i<TCFirstOutDated.length; i++){
		const embed = new MessageEmbed().setDescription(`你在 ${config.servername} 的 TwitCasting會員 審核已過期，請重新驗證`).setColor('RED')
		const server = client.guilds.cache.get(config.guildID)
		await verifySys.deleteTCUser(TCFirstOutDated[i].user_id)
		try {
			await client.users.fetch(TCFirstOutDated[i].user_id).then(user => user.send({embeds:[embed]}))
			await server.members.fetch(TCFirstOutDated[i].user_id).then(user => user.roles.remove(config.tcRole))
		}catch(error){
			console.log(`${TCFirstOutDated[i].user_id} 此人已退出 ${config.servername}`)
		}
	}

	console.log(`以 ${client.user.tag} 登入`);
	const now = new Date()
	//const time = now.getFullYear()+'/'+(now.getMonth()+1)+'/'+now.getDate()+'--'+now.getTime()
	const time = now.toTimeString()
	console.log(`${time}`)
	//client.user.setAvatar('https://cdn.discordapp.com/avatars/496299518703435777/2de5d6aa84950020a954aa5913846540.png?size=2048')
	//client.user.setUsername('會員審核')
	
	setInterval(async () => {
		const YTOutDated = await verifySys.findOutdatedYTUser()
		for(let i=0; i<YTOutDated.length; i++){
			const embed = new MessageEmbed().setDescription(`你在 ${config.servername} 的 Youtube會員 審核已過期，請重新驗證`).setColor('RED')
			const server = client.guilds.cache.get(config.guildID)
			await verifySys.deleteYTUser(YTOutDated[i].user_id)
			try {
				await client.users.fetch(YTOutDated[i].user_id).then(user => user.send({embeds:[embed]}))
				await server.members.fetch(YTOutDated[i].user_id).then(user => user.roles.remove(config.ytRole))
			}catch(error){
				console.log(`${YTOutDated[i].user_id} 此人已退出 ${config.servername}`)
			}
		}

		const TCOutDated = await verifySys.findOutdatedTCUser()
		for(let i=0; i<TCOutDated.length; i++){
			const embed = new MessageEmbed().setDescription(`你在 ${config.servername} 的 TwitCasting會員 審核已過期，請重新驗證`).setColor('RED')
			const server = await client.guilds.cache.get(config.guildID)
			await verifySys.deleteTCUser(TCOutDated[i].user_id)
			try {
				await client.users.fetch(TCOutDated[i].user_id).then(user => user.send({embeds:[embed]}))
				await server.members.fetch(TCOutDated[i].user_id).then(user => user.roles.remove(config.tcRole))
			}catch(error){
				console.log(`${TCOutDated[i].user_id} 此人已退出 ${config.servername}`)
			}
		}
	}, 24*60*60*1000);
	
});


client.on('messageCreate', async msg => {
	if (msg.author.bot)return;
	/*if (msg.content.startsWith(prefix+'url') && msg.guild.id==='946307370877857793'){
		
		if(msg.attachments.size>0){
			msg.attachments.forEach(a=>{
			const url = a.url
			msg.reply('圖片url : '+url)
		})}else{
			msg.reply('請將圖片以附件形式加在訊息中')
		}
	}*/
	if (msg.channelId === config.ytChannel){
		
		if(msg.attachments.size>0){
			
			msg.attachments.forEach(a=>{
			const url = a.url
			if(!url.startsWith('https://')||(!url.endsWith('.jpg')&&!url.endsWith('.png')&&!url.endsWith('.PNG')&&!url.endsWith('.JPG'))){
            	 msg.reply('圖片格式錯誤，僅接受jpg與png檔案');
            	return
        	}else{
				msg.author.send('已收到你的YT認證，敬請稍候審核').catch(error=> {
					msg.reply('請允許"允許來自伺服器成員的私人訊息"')
				});
				const embed = new MessageEmbed()
					.setTitle(`${msg.author.tag} (${msg.author.id})`)
					.setDescription(`審查：<@${msg.author.id}>`)
					.setColor('GREEN')
					.setFooter({text: msg.author.id})
					.setImage(`${url}`)
				/*{
					title: "會員審查",
					description: `審查：<@${msg.author.id}>`,
					author: {
						  name: `${msg.author.tag}`,
						  icon_url: `${msg.author.avatarURL()}`
					},
					color: 53380,
					footer: {
						  text: `${msg.author.id}`
					},
					image: {url :`${url}`}}*/
				const approve = new MessageButton().setCustomId('approve').setLabel('通過').setStyle('SUCCESS')
				const dismiss = new MessageButton().setCustomId('dismiss').setLabel('不通過').setStyle('DANGER')
				const row = new MessageActionRow().addComponents(approve).addComponents(dismiss)
				const adminchannel =  client.channels.cache.get(config.adminYTChannel)
				adminchannel.send({embeds:[embed],components:[row]})
			}
		})}else{
			msg.reply('此頻道僅限上傳圖片')
		}
	}else if(msg.channelId === config.tcChannel){
		if(msg.attachments.size>0){
			msg.attachments.forEach(a=>{
			const url = a.url
			if(!url.startsWith('https://')||(!url.endsWith('.jpg')&&!url.endsWith('.png')&&!url.endsWith('.PNG')&&!url.endsWith('.JPG'))){
            	 msg.reply('圖片格式錯誤，僅接受jpg與png檔案');
            	return
        	}else{
				msg.author.send('已收到你的TC認證，敬請稍候審核').catch(error=> {
					msg.reply('請允許"允許來自伺服器成員的私人訊息"')
				});
				const embed = new MessageEmbed()
					.setTitle(`${msg.author.tag} (${msg.author.id})`)
					.setDescription(`審查：<@${msg.author.id}>`)
					.setColor('GREEN')
					.setFooter({text: msg.author.id})
					.setImage(`${url}`)
				/*{
					title: "會員審查",
					description: `審查：<@${msg.author.id}>`,
					author: {
						  name: `${msg.author.tag}`,
						  icon_url: `${msg.author.avatarURL()}`
					},
					color: 53380,
					footer: {
						  text: `${msg.author.id}`
					},
					image: {url :`${url}`}}*/
				const approve = new MessageButton().setCustomId('approve').setLabel('通過').setStyle('SUCCESS')
				const dismiss = new MessageButton().setCustomId('dismiss').setLabel('不通過').setStyle('DANGER')
				const row = new MessageActionRow().addComponents(approve).addComponents(dismiss)
				const adminchannel =  client.channels.cache.get(config.adminTCChannel)
				adminchannel.send({embeds:[embed],components:[row]})
			}
		})}else{
			msg.reply('此頻道僅限上傳圖片')
		}
	}
})


client.on('interactionCreate',async interaction => {
	const command = await client.commands.get(interaction.commandName)
	const button = await client.buttons.get(interaction.customId+'.js')

	//if (!command) return;
	if(interaction.isButton()){
		try{
			await button.execute(interaction,client)
		}catch(error){
			console.error(error);
		}
	}
			
	if (!interaction.isCommand())return;

	try {
		await command.execute(interaction,client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

})
client.login(config.token);