const sql = require('sequelize');
const fs = require('fs');

const sequelize = new sql('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});
const member = require('./member.js')(sequelize, sql.DataTypes);

async function addMember(userId) {
	const now = new Date();
	await member.create({
		user_id: userId,
		verify_time: now
	}); 
}

async function findMember(userId) {
	return await member.findOne({ where: { user_id: userId } });
}

async function updateDate(userId) {
	const now = new Date();
	await member.update({ verify_time: now }, { where: { user_id: userId } });
}

async function findOutdatedUser() {
	var now = new Date();
	now.setDate(now.getDate() - 30);
	//console.log(now);
	return await member.findAll({ 
		where: {
			verify_time: {
				[sql.Op.lt]: now
			}
		},
		raw: true
	});
}

module.exports.addMember = addMember;
module.exports.findMember = findMember;
module.exports.updateDate = updateDate;
module.exports.findOutdatedUser = findOutdatedUser;