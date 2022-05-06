const verifySys = require('../modules/verifySystem');
const {MessageButton,MessageActionRow,MessageEmbed} = require('discord.js')

module.exports = {

    async execute(interaction,client){
        const embed2 = new MessageEmbed().setColor('BLUE').setDescription('你在 みけねこの貓窩 的 YouTube會員 審核已經通過，現在可以觀看會限頻道了')
        const oldEmbedFooter = interaction.message.embeds[0].footer.text
		// console.log(oldEmbedFooter);
        await client.users.cache.get(oldEmbedFooter).send({embeds:[embed2]})
        //加入db
        if(!await verifySys.findMember(oldEmbedFooter)) {
			await verifySys.addMember(oldEmbedFooter);
		}
		else {
			await verifySys.updateDate(oldEmbedFooter);
		}
        //身分組
        const role = await interaction.guild.roles.cache.find(r=>r.id==='951074513905418290')
        const member = await interaction.guild.members.fetch(oldEmbedFooter) // await client.users.cache.get(oldEmbedFooter)
		// console.log(member)
        await member.roles.add(role)

        const approve = new MessageButton().setCustomId('approve').setLabel('通過').setStyle('SUCCESS').setDisabled(true)
        const dismiss = new MessageButton().setCustomId('dismiss').setLabel('不通過').setStyle('DANGER').setDisabled(true)
        const finish = new MessageButton().setCustomId('finish').setLabel('已審核').setStyle('SECONDARY').setDisabled(true)
        const row = new MessageActionRow().addComponents(approve).addComponents(dismiss).addComponents(finish)
        await interaction.update({components:[row]}); //potential problem
    }

}