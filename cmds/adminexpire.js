const verifySys = require('../modules/verifySystem');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder().setName('adminexpire').setDescription('將使用者自會員資料庫移除').addStringOption(option=>option.setName('user').setDescription('使用者UID').setRequired(true)).addSubcommand(sub=>sub.setName('youtube').setDescription('從YT會員資料庫移除')).addSubcommand(sub=>sub.setName('twitcasting').setDescription('從TC資料庫移除')),

    async execute(interaction){

        const id = interaction.options.getString('user')
        if (interaction.options.getSubcommand() === 'youtube') {

            await verifySys.deleteYTUser(id)
            interaction.reply(`成功將<@${id}>自 YT資料庫 移除`)

            }
        else if (interaction.options.getSubcommand() === 'twitcasting'){
            
            await verifySys.deleteTCUser(id)
            interaction.reply(`成功將<@${id}>自 TC資料庫 移除`)
            
        }
    }
}