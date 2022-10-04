const {MessageButton,MessageActionRow,MessageEmbed} = require('discord.js')
const config = require('../config.json')

module.exports = {

    async execute(interaction,client){
        if(interaction.channelId === config.adminYTChannel){
            const embed3 = new MessageEmbed().setColor('RED').setDescription(`你在 ${config.servername} 的 Youtube會員 審核未通過，原因可能有下列幾種 :\n1.審核圖片規格不符\n2.圖片已過期或即將過期*\n\n請於查明後再次申請，有任何問題歡迎聯絡管理員或參考<#957801198503755857>說明\n*即將過期係指認證日距離過期日之五天內`)
            //await msg.author.send({embeds:[embed3]}) 
            const oldEmbedFooter = interaction.message.embeds[0].footer.text
            await client.users.fetch(oldEmbedFooter).then(user => user.send({embeds:[embed3]}))
            const approve = new MessageButton().setCustomId('approve').setLabel('通過').setStyle('SUCCESS').setDisabled(true)
            const dismiss = new MessageButton().setCustomId('dismiss').setLabel('不通過').setStyle('DANGER').setDisabled(true)
            const finish = new MessageButton().setCustomId('finish').setLabel(`審核駁回 by ${interaction.user.tag}`).setStyle('SECONDARY').setDisabled(true)
            const row = new MessageActionRow().addComponents(approve).addComponents(dismiss).addComponents(finish)
            await interaction.update({components:[row]}); 
        }else if(interaction.channelId === config.adminTCChannel){
            const embed3 = new MessageEmbed().setColor('RED').setDescription(`你在 ${config.servername} 的 TwitCast會員 審核未通過，原因可能有下列幾種 :\n1.審核圖片規格不符\n2.圖片已過期或即將過期*\n3.圖片中會員編號不明顯\n\n請於查明後再次申請，有任何問題歡迎聯絡管理員或參考<#957801198503755857>說明\n*即將過期係指認證日距離過期日之五天內`)
            //await msg.author.send({embeds:[embed3]}) 
            const oldEmbedFooter = interaction.message.embeds[0].footer.text
            await client.users.fetch(oldEmbedFooter).then(user => user.send({embeds:[embed3]}))
            const approve = new MessageButton().setCustomId('approve').setLabel('通過').setStyle('SUCCESS').setDisabled(true)
            const dismiss = new MessageButton().setCustomId('dismiss').setLabel('不通過').setStyle('DANGER').setDisabled(true)
            const finish = new MessageButton().setCustomId('finish').setLabel(`審核駁回 by ${interaction.user.tag}`).setStyle('SECONDARY').setDisabled(true)
            const row = new MessageActionRow().addComponents(approve).addComponents(dismiss).addComponents(finish)
            await interaction.update({components:[row]}); 
        }
    }
}