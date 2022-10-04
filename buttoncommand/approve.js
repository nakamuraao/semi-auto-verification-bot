const verifySys = require('../modules/verifySystem');
const {MessageButton,MessageActionRow,MessageEmbed} = require('discord.js')
const config = require('../config.json')

module.exports = {

    async execute(interaction,client){
        if(interaction.channelId === config.adminYTChannel){
            const embed2 = new MessageEmbed().setColor('BLUE').setDescription(`你在 ${config.servername} 的 YouTube會員 審核已經通過，現在可以觀看會限頻道了`)
            const oldEmbedFooter = interaction.message.embeds[0].footer.text
            // console.log(oldEmbedFooter);
            await client.users.fetch(oldEmbedFooter).then(user => user.send({embeds:[embed2]}))
            //加入db
            if(!await verifySys.findYTMember(oldEmbedFooter)) {
                await verifySys.addYTMember(oldEmbedFooter);
            }
            else {
                await verifySys.updateYTDate(oldEmbedFooter);
            }
            //身分組
            const role = await interaction.guild.roles.cache.find(r=>r.id===config.ytRole)
            const member = await interaction.guild.members.fetch(oldEmbedFooter) // await client.users.cache.get(oldEmbedFooter)
            // console.log(member)
            await member.roles.add(role)

            const approve = new MessageButton().setCustomId('approve').setLabel('通過').setStyle('SUCCESS').setDisabled(true)
            const dismiss = new MessageButton().setCustomId('dismiss').setLabel('不通過').setStyle('DANGER').setDisabled(true)
            const finish = new MessageButton().setCustomId('finish').setLabel(`審核通過 by ${interaction.user.tag}`).setStyle('SECONDARY').setDisabled(true)
            const row = new MessageActionRow().addComponents(approve).addComponents(dismiss).addComponents(finish)
            await interaction.update({components:[row]}); 

        }else if(interaction.channelId === config.adminTCChannel){
            const embed2 = new MessageEmbed().setColor('BLUE').setDescription(`你在 ${config.servername} 的 TwitCasting會員 審核已經通過，現在可以觀看會限頻道了`)
            const oldEmbedFooter = interaction.message.embeds[0].footer.text
            // console.log(oldEmbedFooter);
            //await client.users.cache.get(oldEmbedFooter).send({embeds:[embed2]})
            await client.users.fetch(oldEmbedFooter).then(user => user.send({embeds:[embed2]}))
            //加入db
            if(!await verifySys.findTCMember(oldEmbedFooter)) {
                await verifySys.addTCMember(oldEmbedFooter);
            }
            else {
                await verifySys.updateTCDate(oldEmbedFooter);
            }
            //身分組
            const role = await interaction.guild.roles.cache.find(r=>r.id===config.tcRole)
            const member = await interaction.guild.members.fetch(oldEmbedFooter) // await client.users.cache.get(oldEmbedFooter)
            // console.log(member)
            await member.roles.add(role)

            const approve = new MessageButton().setCustomId('approve').setLabel('通過').setStyle('SUCCESS').setDisabled(true)
            const dismiss = new MessageButton().setCustomId('dismiss').setLabel('不通過').setStyle('DANGER').setDisabled(true)
            const finish = new MessageButton().setCustomId('finish').setLabel(`審核通過 by ${interaction.user.tag}`).setStyle('SECONDARY').setDisabled(true)
            const row = new MessageActionRow().addComponents(approve).addComponents(dismiss).addComponents(finish)
            await interaction.update({components:[row]}); 
        }
    }
}