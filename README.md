#Semi-auto Membership Verification Bot\n
Mind that there is another branch(semi-auto-2) for multipule(YT&TC) member verification\n
##Introduction\n
`Semi-auto Membership Verification Bot` can help admins to easily keep track of guild members who have membership(and membership roles). Once the admin clicked `approve`, the guild member gains the membership role for 32 days.\n\n
##Setup\n
###Environment\n
Check [discord.js guide](https://discordjs.guide/) if you're new to discord.js. This bot requires \n\n1.basic packages for discord bot\n2.packages for slash commands\n3.packages for sqlite database\n\n
###Config.json\n
Check `configexample.json`, change its name to `config.json` after making the following changes.\n\n
`token` : your Discord bot token\n
`ownerID` : your UID\n
`clientID` : bot's UID\n
`guildID` : guild's ID\n
`ytChannel` : ID of the channel where you want server members to send their screenshot\n
`adminChannel` : ID of the channel where you want to verify them\n
`adminrole` : ID of the admins' role(required when executing `/adminexpire`)\n
`role` : YTmember role ID\n
`servername` : name of your server\n
run `node cmdreg` to register the commands\n\n
##Contact us\n
Contact the developers with the following ways :\n\n1.PR or Issues\n2.Discord : 蒼アオ#7022 & Pierre#9505\n3.[Telegram](https://t.me/nkmraoao/)\n4.[Twitter](https://twitter.com/nkmraoao/)