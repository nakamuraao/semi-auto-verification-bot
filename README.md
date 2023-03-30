# Semi-auto Membership Verification Bot
## Introduction
`Semi-auto Membership Verification Bot` can help admins to easily keep track of guild members who have membership(and membership roles). Once the admin clicked `approve`, the guild member gains the membership role for 32 days.

## Setup
### Environment
Check [discord.js guide](https://discordjs.guide/) if you're new to discord.js. Run `npm install` to install necessary packages.

### Config.json
Check `configexample.json`, change its name to `config.json` after making the following changes.

* `token` : your Discord bot token
* `ownerID` : your UID
* `clientID` : bot's UID
* `guildID` : guild's ID
* `ytChannel` : ID of the channel where you want server members to send their screenshot
* `adminChannel` : ID of the channel where you want to verify them
* `adminrole` : ID of the admins' role(required when executing `/adminexpire`)
* `role` : YTmember role ID
* `servername` : name of your server\
run `node cmdreg` to register the commands

## Contact us
Contact the developers with the following ways :\
 1.PR or Issues\
 2.Discord : 蒼アオ#0501 & Pierre#9505\
 3.[Telegram](https://t.me/nkmraoao/)\
 4.[Twitter](https://twitter.com/nkmraoao/)