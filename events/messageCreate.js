const config = require('../config.json');
const {MessageEmbed, MessageButton, MessageActionRow} = require('discord.js')

module.exports = async (client, msg) => {
	if (msg.channelId === config.guildList[msg.guild.id].ytChannel) {

		if(msg.attachments.size > 0) {

			msg.attachments.forEach( async a => {
				const url = a.url
				if(!url.startsWith('https://')||(!url.endsWith('.jpg')&&!url.endsWith('.png')&&!url.endsWith('.PNG')&&!url.endsWith('.JPG'))){
					msg.reply('圖片格式錯誤，僅接受jpg與png檔案');
					return
				}else{

					await msg.author.send('已收到你的YT認證，敬請稍候審核').catch(error=> {
						msg.reply('請允許"允許來自伺服器成員的私人訊息"')
					});
			
					const embed = new MessageEmbed()
						.setTitle(`${msg.author.tag} (${msg.author.id})`)
						.setDescription(`審查：<@${msg.author.id}>`)
						.setColor('GREEN')
						.setFooter({text: msg.author.id})
						.setImage(`${url}`)
					
					const approve = new MessageButton().setCustomId('approve').setLabel('通過').setStyle('SUCCESS')
					const dismiss = new MessageButton().setCustomId('dismiss').setLabel('不通過').setStyle('DANGER')
					const row = new MessageActionRow().addComponents(approve).addComponents(dismiss)
					const adminchannel = await client.channels.cache.get(config.guildList[msg.guild.id].adminChannel)
					await adminchannel.send({embeds:[embed],components:[row]})
				}
			})
		} else {
			await msg.reply('此頻道僅限上傳圖片')
		}
	}
}