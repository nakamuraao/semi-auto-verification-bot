const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageButton,MessageActionRow} = require('discord.js')


module.exports = {
    data:new SlashCommandBuilder().setName('verify').setDescription('會員認證').addStringOption(option=>option.setName('圖片url').setDescription('請貼上證明圖片的連結').setRequired(true)),

    async execute(interaction,client){
        
        const url = interaction.options.getString('圖片url')
        if(!url.startsWith('https://')||(!url.endsWith('.jpg')&&!url.endsWith('.png'))){
            await interaction.reply('圖片url格式錯誤');
            return
        }
        const embed = {
            title: "會員審查",
            description: `審查：<@${interaction.user.id}>`,
            author: {
                  name: `${interaction.user.tag}`,
                  icon_url: `${interaction.user.avatarURL()}`
            },
            color: 53380,
            footer: {
                  text: `${interaction.user.id}`
            },
            image: {url :`${url}`}}

        const approve = new MessageButton().setCustomId('approve').setLabel('通過').setStyle('SUCCESS')
        const dismiss = new MessageButton().setCustomId('dismiss').setLabel('不通過').setStyle('DANGER')
        //const finish = new MessageButton().setCustomId('finish').setLabel('已審核').setStyle('SECONDARY').setDisabled(true)
        const row = new MessageActionRow().addComponents(approve).addComponents(dismiss)
              
        const adminchannel = client.channels.cache.get('971679867198377994')
        adminchannel.send({embeds:[embed],components:[row]})
        await interaction.reply('確認收到，請靜待審核')
    }

}