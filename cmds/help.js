const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder().setName('help').setDescription('機器人說明'),

    async execute(interaction){
        const helpembed = new MessageEmbed()
				.setColor('#76afee')
				.setTitle('半自動會員審核機器人 v2.0.1 (2022.5.14)')
        .setURL('https://github.com/nakamuraao/semi-auto-verification-bot/tree/main')
				.setDescription('由 蒼アオ#7022 與 Pierre#9505 製作，有任何問題請洽管理員\n以下是可能使用到的指令\n\n')
        .addField('將一個成員的會員資格取消','`/adminexpire 成員UID`', false)
        .addField('確認機器人存活','`/ping`',false)
        .addField('叫出此訊息','`/help`',false)
        
        await interaction.reply({embeds:[helpembed]})
    }
}