const verifySys = require('../modules/verifySystem');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder().setName('expire').setDescription('從資料庫移除'),

    async execute(interaction){
        if(interaction.member.roles.cache.some(role=>role.id === '951074513905418290')){
            interaction.reply('你的會員未過期，不可自資料庫移除')
        }else{
            await verifySys.deleteUser(interaction.user.id)
            interaction.reply('已將你從 YT會員 資料庫移除')}
    }
}