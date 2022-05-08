const verifySys = require('../modules/verifySystem');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder().setName('expire').setDescription('從會員資料庫移除').addSubcommand(sub=>sub.setName('youtube').setDescription('從YT會員資料庫移除')).addSubcommand(sub=>sub.setName('twitcasting').setDescription('從TC資料庫移除')),

    async execute(interaction){
        if (interaction.options.getSubcommand() === 'youtube') {
            if(interaction.member.roles.cache.some(role=>role.id === '972727142175637586')){
                interaction.reply('你的YT會員未過期，不可自資料庫移除')
            }else{
                await verifySys.deleteYTUser(interaction.user.id)
                interaction.reply('已將你從 YT會員 資料庫移除')}
        }else if (interaction.options.getSubcommand() === 'twitcasting'){
            if(interaction.member.roles.cache.some(role=>role.id === '947827884364558406')){
                interaction.reply('你的TC會員未過期，不可自資料庫移除')
            }else{
                await verifySys.deleteTCUser(interaction.user.id)
                interaction.reply('已將你從 TC會員 資料庫移除')}
        }
    }
}