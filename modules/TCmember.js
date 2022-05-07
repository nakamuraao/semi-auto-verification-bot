module.exports = (sequelize, DataTypes) => {
	return sequelize.define('tcmember', {
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