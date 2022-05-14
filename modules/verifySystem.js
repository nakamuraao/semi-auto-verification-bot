const sql = require('sequelize');
const fs = require('fs');

const sequelize = new sql('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

class verifySystem {
	constructor(guildId) {
		this.guildId = guildId;
		this.member = require('./member.js')(sequelize, sql.DataTypes, guildId);
		//this.member.sync();
	}

	async addMember(userId) {
		//await this.member.sync();
		const now = new Date();
		await this.member.create({
			user_id: userId,
			verify_time: now
		}); 
	}

	async findMember(userId) {
		//await this.member.sync();
		return await this.member.findOne({ where: { user_id: userId } });
	}
	
	async updateDate(userId) {
		//await this.member.sync();
		const now = new Date();
		await this.member.update({ verify_time: now }, { where: { user_id: userId } });
	}
	
	async findOutdatedUser() {
		var now = new Date();
		now.setDate(now.getDate() - 32);
		//console.log(now);
		return await this.member.findAll({ 
			where: {
				verify_time: {
					[sql.Op.lt]: now
				}
			},
			raw: true
		});
	}
	
	async deleteUser(userId){
		await this.member.destroy({ where: { user_id: userId } });
	}
}

module.exports.verifySystem = verifySystem;