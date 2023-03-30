const {SlashCommandBuilder} = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder().setName('help').setDescription('認證說明'),

    async execute(interaction){
        const helpembed = new EmbedBuilder()
				.setColor('Navy')
				.setTitle('半自動會員審核機器人 v2.0.0(2023.03.31)')
        .setURL('https://github.com/nakamuraao/semi-auto-verification-bot/')
				.setDescription('由 蒼アオ#0501 與 Pierre#9505 製作，有任何問題請洽管理員\n\n')
        .addField('確認機器人存活','`/ping`',false)
        .addField('叫出此訊息','`/help`',false)

        await interaction.reply({embeds:[helpembed]})
    }
}