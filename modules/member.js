module.exports = (sequelize, DataTypes, guildId) => {
	return sequelize.define(`ytmember_${guildId}`, {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		verify_time: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});
}