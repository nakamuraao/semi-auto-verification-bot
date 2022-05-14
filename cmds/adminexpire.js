const verifySys = require('../modules/verifySystem');
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('adminexpire')
        .setDescription('將使用者自會員資料庫移除')
        .addStringOption(option=>option.setName('user').setDescription('使用者UID').setRequired(true)),

    async execute(interaction, client){
		const verifyObj = new verifySys.verifySystem(interaction.guild.id);
        if(interaction.member.roles.cache.some(role => role.id === config.guildList[interaction.guild.id].adminRole)){
            
            const id = interaction.options.getString('user')
            const server = client.guilds.cache.get(interaction.guild.id)
            if (server.members.cache.find(user => user.id === id)){
                const guild = config.guildList[interaction.guild.id]
                const member = await server.members.fetch(id)
                member.roles.remove(guild.memberRole)
                await verifyObj.deleteUser(id)
                await interaction.reply(`成功將<@${id}>自資料庫移除`)
            }else{
                await interaction.reply('查無此人')
            }
        }else{
            await interaction.reply({ content: '此為管理員專用指令', ephemeral: true });
        }
    }
}