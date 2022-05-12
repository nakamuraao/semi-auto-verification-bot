const verifySys = require('../modules/verifySystem');
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('adminexpire')
        .setDescription('將使用者自會員資料庫移除')
        .addStringOption(option=>option.setName('user').setDescription('使用者UID').setRequired(true)),

    async execute(interaction){

        if(interaction.member.roles.cache.some(role=>role.id === config.adminrole)){
            const id = interaction.options.getString('user')
            
            await verifySys.deleteUser(id)
            interaction.reply(`成功將<@${id}>自資料庫移除`)

            
            }else{
            interaction.reply({ content: '此為管理員與會員審核員專用指令', ephemeral: true });
        }
    }
}