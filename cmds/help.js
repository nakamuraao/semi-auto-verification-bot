const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder().setName('help').setDescription('認證說明'),

    async execute(interaction){
        const helpembed = new MessageEmbed()
				.setColor('#76afee')
				.setTitle('半自動會員審核機器人')
				.setDescription('由 蒼アオ#4022 與 Pierre#9505 製作，有任何問題請洽管理員\n\n可先使用`=>url`取得圖片url')
        .addField('取得圖片url','將圖片以附件形式加在訊息裡，訊息內容打=>url，有問題請洽管理員或看別人怎麼做',false)
				.addField('審核指令','/verify `圖片url`',false)
        .addField('將資料自資料庫移除','`/expire`\n\n如果你不打算續費會員，請使用此指令將自己的資料自資料庫移除，否則機器人會每天提醒你續費',false)
				.setImage('https://cdn.discordapp.com/attachments/971679867198377994/972025537977520148/unknown.png')

        await interaction.reply({embeds:[helpembed]})
    }
}