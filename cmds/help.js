const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder().setName('help').setDescription('認證說明'),

    async execute(interaction){
        const helpembed = new MessageEmbed()
				.setColor('#76afee')
				.setTitle('半自動會員審核機器人')
				.setDescription('由 蒼アオ#4022 與 Pierre#9505 製作，有任何問題請洽管理員\n\n可先使用`=>url`取得圖片url')
				.addField('審核指令','/verify `圖片url`\n\n請將證明截圖以附件的方式加在訊息中\n審核前請先執行`/ping`確認機器人是否在線上',false)
				.setImage('https://cdn.discordapp.com/attachments/971679867198377994/972025537977520148/unknown.png')

        await interaction.reply({embeds:[helpembed]})
    }
}