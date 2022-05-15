const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('確認延遲或機器人狀態'),

	async execute(interaction) {

		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		interaction.editReply(`${sent.createdTimestamp - interaction.createdTimestamp}ms`);

	}
};