const {MessageButton,MessageActionRow,MessageEmbed} = require('discord.js')

module.exports = {

    async execute(interaction,client){
        if(interaction.channelId === '971679867198377994'){
            const embed3 = new MessageEmbed().setColor('RED').setDescription('你在 みけねこの貓窩 的 Youtube會員 審核未通過，原因可能有下列幾種 :\n1.審核圖片規格不符\n2.圖片已過期\n\n請於查明後再次申請，有任何問題歡迎聯絡管理員\n有關圖片格式可參考<#957801198503755857>')
            //await msg.author.send({embeds:[embed3]}) 
            const oldEmbedFooter = interaction.message.embeds[0].footer.text
            await client.users.cache.get(oldEmbedFooter).send({embeds:[embed3]})
            const approve = new MessageButton().setCustomId('approve').setLabel('通過').setStyle('SUCCESS').setDisabled(true)
            const dismiss = new MessageButton().setCustomId('dismiss').setLabel('不通過').setStyle('DANGER').setDisabled(true)
            const finish = new MessageButton().setCustomId('finish').setLabel('已審核').setStyle('SECONDARY').setDisabled(true)
            const row = new MessageActionRow().addComponents(approve).addComponents(dismiss).addComponents(finish)
            await interaction.update({components:[row]}); 
        }else if(interaction.channelId === '972389397586640936'){
            const embed3 = new MessageEmbed().setColor('RED').setDescription('你在 みけねこの貓窩 的 TwitCast會員 審核未通過，原因可能有下列幾種 :\n1.審核圖片規格不符\n2.圖片已過期\n3.圖片中會員編號不明顯\n\n請於查明後再次申請，有任何問題歡迎聯絡管理員\n有關圖片格式可參考<#957801198503755857>')
            //await msg.author.send({embeds:[embed3]}) 
            const oldEmbedFooter = interaction.message.embeds[0].footer.text
            await client.users.cache.get(oldEmbedFooter).send({embeds:[embed3]})
            const approve = new MessageButton().setCustomId('approve').setLabel('通過').setStyle('SUCCESS').setDisabled(true)
            const dismiss = new MessageButton().setCustomId('dismiss').setLabel('不通過').setStyle('DANGER').setDisabled(true)
            const finish = new MessageButton().setCustomId('finish').setLabel('已審核').setStyle('SECONDARY').setDisabled(true)
            const row = new MessageActionRow().addComponents(approve).addComponents(dismiss).addComponents(finish)
            await interaction.update({components:[row]}); 
        }
    }
}