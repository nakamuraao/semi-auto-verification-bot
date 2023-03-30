const sql = require('sequelize');
//const fs = require('fs');

const sequelize = new sql('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const YTmember = require('./YTmember.js')(sequelize, sql.DataTypes);
const TCmember = require('./TCmember.js')(sequelize, sql.DataTypes);

async function addYTMember(userId) {
	const now = new Date();
	await YTmember.create({
		user_id: userId,
		verify_time: now
	}); 
}

async function findYTMember(userId) {
	return await YTmember.findOne({ where: { user_id: userId } });
}

async function updateYTDate(userId) {
	const now = new Date();
	await YTmember.update({ verify_time: now }, { where: { user_id: userId } });
}

async function findOutdatedYTUser() {
	var now = new Date();
	now.setDate(now.getDate() - 32);
	//console.log(now);
	return await YTmember.findAll({ 
		where: {
			verify_time: {
				[sql.Op.lt]: now
			}
		},
		raw: true
	});
}

async function deleteYTUser(userId){
	await YTmember.destroy({ where: { user_id: userId } });
}

async function addTCMember(userId) {
	const now = new Date();
	await TCmember.create({
		user_id: userId,
		verify_time: now
	}); 
}

async function findTCMember(userId) {
	return await TCmember.findOne({ where: { user_id: userId } });
}

async function updateTCDate(userId) {
	const now = new Date();
	await TCmember.update({ verify_time: now }, { where: { user_id: userId } });
}

async function findOutdatedTCUser() {
	var now = new Date();
	now.setDate(now.getDate() - 32);
	//console.log(now);
	return await TCmember.findAll({ 
		where: {
			verify_time: {
				[sql.Op.lt]: now
			}
		},
		raw: true
	});
}

async function deleteTCUser(userId){
	await TCmember.destroy({ where: { user_id: userId } });
}

module.exports.addYTMember = addYTMember;
module.exports.findYTMember = findYTMember;
module.exports.updateYTDate = updateYTDate;
module.exports.findOutdatedYTUser = findOutdatedYTUser;
module.exports.deleteYTUser = deleteYTUser;

module.exports.addTCMember = addTCMember;
module.exports.findTCMember = findTCMember;
module.exports.updateTCDate = updateTCDate;
module.exports.findOutdatedTCUser = findOutdatedTCUser;
module.exports.deleteTCUser = deleteTCUser;