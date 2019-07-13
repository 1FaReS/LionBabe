const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://glitch.com/~lava-monarch/`);
}, 280000); 
const Discord = require('discord.js'); 
const Lion = new Discord.Client();
const prefix = ["-"];
const botid = ['393542839482581003'];
const { User, MessageMentions } = require('discord.js') // Disocrd Package Classes
const Canvas = require('canvas'); // Canvas Package for photo stuffs
const Jimp = require('jimp'); // Jimp Package to get User's Avatar
const SQLite = require('sqlite'); // SQLite Package to read & write to sql files and databases
const path = require('path'); // Path Package to get paths easily
const ms = require('parse-ms'); // parse-ms Package to format ms to somethings
const fs = require('fs'); // file-sytem package.
const moment = require('moment');
console.log(`
╭╮╱╱╭━━┳━━━┳━╮╱╭╮╭━━╮╭━━━┳━━━━╮
┃┃╱╱╰┫┣┫╭━╮┃┃╰╮┃┃┃╭╮┃┃╭━╮┃╭╮╭╮┃
┃┃╱╱╱┃┃┃┃╱┃┃╭╮╰╯┃┃╰╯╰┫┃╱┃┣╯┃┃╰╯
┃┃╱╭╮┃┃┃┃╱┃┃┃╰╮┃┃┃╭━╮┃┃╱┃┃╱┃┃
┃╰━╯┣┫┣┫╰━╯┃┃╱┃┃┃┃╰━╯┃╰━╯┃╱┃┃
╰━━━┻━━┻━━━┻╯╱╰━╯╰━━━┻━━━╯╱╰╯
`)
Lion.on('ready', () => {
  console.log(`Logged in as ${Lion.user.tag} !`);
     Lion.user.setActivity(`${prefix}help || On ${Lion.guilds.size} Server`,{type: 'WATCHING'});
});
const log = JSON.parse(fs.readFileSync('./log.json' , 'utf8'));
 
Lion.on('message', message => {
           if (!message.channel.guild) return;
 
    let room = message.content.split(" ").slice(1);
    let findroom = message.guild.channels.find('name', `${room}`)
    if(message.content.startsWith(prefix + "setLog")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
if(!room) return message.channel.send('Please Type The Channel Name')
if(!findroom) return message.channel.send('Please Type The Log Channel Name')
let embed = new Discord.RichEmbed()
.setTitle('**Done The Log Code Has Been Setup**')
.addField('Channel:', `${room}`)
.addField('Requested By:', `${message.author}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${Lion.user.username}`)
message.channel.sendEmbed(embed)
log[message.guild.id] = {
channel: room,
onoff: 'On'
}
fs.writeFile("./log.json", JSON.stringify(log), (err) => {
if (err) console.error(err)
})
    }})
         
Lion.on('message', message => {
 
    if(message.content.startsWith(prefix + "toggleLog")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
        if(!log[message.guild.id]) log[message.guild.id] = {
          onoff: 'Off'
        }
          if(log[message.guild.id].onoff === 'Off') return [message.channel.send(`**The log Is __On__ !**`), log[message.guild.id].onoff = 'On']
          if(log[message.guild.id].onoff === 'On') return [message.channel.send(`**The log Is __Off__ !**`), log[message.guild.id].onoff = 'Off']
          fs.writeFile("./log.json", JSON.stringify(log), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }
         
        })
 
 
Lion.on('messageDelete', message => {
 
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(!message.guild.member(Lion.user).hasPermission('EMBED_LINKS')) return;
    if(!message.guild.member(Lion.user).hasPermission('MANAGE_MESSAGES')) return;
                        if(!log[message.guild.id]) log[message.guild.id] = {
          onoff: 'Off'
        }
    if(log[message.guild.id].onoff === 'Off') return;
    var logChannel = message.guild.channels.find(c => c.name === `${log[message.guild.id].channel}`);
    if(!logChannel) return;
 
    let messageDelete = new Discord.RichEmbed()
    .setTitle('**[MESSAGE DELETE]**')
    .setColor('RED')
    .setThumbnail(message.author.avatarURL)
    .setDescription(`**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL)
 
    logChannel.send(messageDelete);
});
Lion.on('messageUpdate', (oldMessage, newMessage) => {
 
    if(oldMessage.author.bot) return;
    if(!oldMessage.channel.type === 'dm') return;
    if(!oldMessage.guild.member(Lion.user).hasPermission('EMBED_LINKS')) return;
    if(!oldMessage.guild.member(Lion.user).hasPermission('MANAGE_MESSAGES')) return;
                        if(!log[oldMessage.guild.id]) log[oldMessage.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldMessage.guild.id].onoff === 'Off') return;
    var logChannel = oldMessage.guild.channels.find(c => c.name === `${log[oldMessage.guild.id].channel}`);
    if(!logChannel) return;
 
    if(oldMessage.content.startsWith('https://')) return;
 
    let messageUpdate = new Discord.RichEmbed()
    .setTitle('**[MESSAGE EDIT]**')
    .setThumbnail(oldMessage.author.avatarURL)
    .setColor('BLUE')
    .setDescription(`**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``)
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL)
 
    logChannel.send(messageUpdate);
});
 
 
Lion.on('roleCreate', role => {
 
    if(!role.guild.member(Lion.user).hasPermission('EMBED_LINKS')) return;
    if(!role.guild.member(Lion.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[role.guild.id]) log[role.guild.id] = {
          onoff: 'Off'
        }
    if(log[role.guild.id].onoff === 'Off') return;
    var logChannel = role.guild.channels.find(c => c.name === `${log[role.guild.id].channel}`);
    if(!logChannel) return;
 
    role.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let roleCreate = new Discord.RichEmbed()
        .setTitle('**[ROLE CREATE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('GREEN')
        .setTimestamp()
        .setFooter(role.guild.name, role.guild.iconURL)
 
        logChannel.send(roleCreate);
    })
});
Lion.on('roleDelete', role => {
 
    if(!role.guild.member(Lion.user).hasPermission('EMBED_LINKS')) return;
    if(!role.guild.member(Lion.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[role.guild.id]) log[role.guild.id] = {
          onoff: 'Off'
        }
    if(log[role.guild.id].onoff === 'Off') return;
    var logChannel = role.guild.channels.find(c => c.name === `${log[role.guild.id].channel}`);
    if(!logChannel) return;
 
    role.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let roleDelete = new Discord.RichEmbed()
        .setTitle('**[ROLE DELETE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('RED')
        .setTimestamp()
        .setFooter(role.guild.name, role.guild.iconURL)
 
        logChannel.send(roleDelete);
    })
});
Lion.on('roleUpdate', (oldRole, newRole) => {
 
    if(!oldRole.guild.member(Lion.user).hasPermission('EMBED_LINKS')) return;
    if(!oldRole.guild.member(Lion.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[oldRole.guild.id]) log[oldRole.guild.id] = {
          onoff: 'Off'
            }
    if(log[oldRole.guild.id].onoff === 'Off') return;
    var logChannel = oldRole.guild.channels.find(c => c.name === `${log[oldRole.guild.id].channel}`);
    if(!logChannel) return;
 
    oldRole.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(oldRole.name !== newRole.name) {
            if(log[oldRole.guild.id].onoff === 'Off') return;
            let roleUpdateName = new Discord.RichEmbed()
            .setTitle('**[ROLE NAME UPDATE]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldRole.guild.name, oldRole.guild.iconURL)
 
            logChannel.send(roleUpdateName);
        }
        if(oldRole.hexColor !== newRole.hexColor) {
            if(oldRole.hexColor === '#000000') {
                var oldColor = '`Default`';
            }else {
                var oldColor = oldRole.hexColor;
            }
            if(newRole.hexColor === '#000000') {
                var newColor = '`Default`';
            }else {
                var newColor = newRole.hexColor;
            }
            if(log[oldRole.guild.id].onoff === 'Off') return;
            let roleUpdateColor = new Discord.RichEmbed()
            .setTitle('**[ROLE COLOR UPDATE]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldRole.guild.name, oldRole.guild.iconURL)
 
            logChannel.send(roleUpdateColor);
        }
    })
});
 
Lion.on('channelCreate', channel => {
 
    if(!channel.guild) return;
    if(!channel.guild.member(Lion.user).hasPermission('EMBED_LINKS')) return;
    if(!channel.guild.member(Lion.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[channel.guild.id]) log[channel.guild.id] = {
          onoff: 'Off'
        }
    if(log[channel.guild.id].onoff === 'Off') return;
    var logChannel = channel.guild.channels.find(c => c.name === `${log[channel.guild.id].channel}`);
    if(!logChannel) return;
 
    if(channel.type === 'text') {
        var roomType = 'Text';
    }else
    if(channel.type === 'voice') {
        var roomType = 'Voice';
    }else
    if(channel.type === 'category') {
        var roomType = 'Category';
    }
 
    channel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let channelCreate = new Discord.RichEmbed()
        .setTitle('**[CHANNEL CREATE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('GREEN')
        .setTimestamp()
        .setFooter(channel.guild.name, channel.guild.iconURL)
 
        logChannel.send(channelCreate);
    })
});
Lion.on('channelDelete', channel => {
    if(!channel.guild) return;
    if(!channel.guild.member(Lion.user).hasPermission('EMBED_LINKS')) return;
    if(!channel.guild.member(Lion.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[channel.guild.id]) log[channel.guild.id] = {
          onoff: 'Off'
        }
    if(log[channel.guild.id].onoff === 'Off') return;
    var logChannel = channel.guild.channels.find(c => c.name === `${log[channel.guild.id].channel}`);
    if(!logChannel) return;
 
    if(channel.type === 'text') {
        var roomType = 'Text';
    }else
    if(channel.type === 'voice') {
        var roomType = 'Voice';
    }else
    if(channel.type === 'category') {
        var roomType = 'Category';
    }
 
    channel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let channelDelete = new Discord.RichEmbed()
        .setTitle('**[CHANNEL DELETE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('RED')
        .setTimestamp()
        .setFooter(channel.guild.name, channel.guild.iconURL)
 
        logChannel.send(channelDelete);
    })
});
Lion.on('channelUpdate', (oldChannel, newChannel) => {
    if(!oldChannel.guild) return;
            if(!log[oldChannel.guild.id]) log[oldChannel.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldChannel.guild.id].onoff === 'Off') return;
    var logChannel = oldChannel.guild.channels.find(c => c.name === `${log[oldChannel.guild.id].channel}`);
    if(!logChannel) return;
 
    if(oldChannel.type === 'text') {
        var channelType = 'Text';
    }else
    if(oldChannel.type === 'voice') {
        var channelType = 'Voice';
    }else
    if(oldChannel.type === 'category') {
        var channelType = 'Category';
    }
 
    oldChannel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(oldChannel.name !== newChannel.name) {
            let newName = new Discord.RichEmbed()
            .setTitle('**[CHANNEL EDIT]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)
 
            logChannel.send(newName);
        }
        if(oldChannel.topic !== newChannel.topic) {
            if(log[oldChannel.guild.id].onoff === 'Off') return;
            let newTopic = new Discord.RichEmbed()
            .setTitle('**[CHANNEL EDIT]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic || 'NULL'}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic || 'NULL'}\`\`\`\n**Channel:** ${oldChannel} (ID: ${oldChannel.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)
 
            logChannel.send(newTopic);
        }
    })
});
 
 
Lion.on('guildBanAdd', (guild, user) => {
 
    if(!guild.member(Lion.user).hasPermission('EMBED_LINKS')) return;
    if(!guild.member(Lion.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[user.guild.id]) log[guild.guild.id] = {
          onoff: 'Off'
        }
    if(log[user.guild.id].onoff === 'Off') return;
    var logChannel = guild.channels.find(c => c.name === `${log[guild.guild.id].channel}`);
    if(!logChannel) return;
 
    guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(userID === Lion.user.id) return;
 
        let banInfo = new Discord.RichEmbed()
        .setTitle('**[BANNED]**')
        .setThumbnail(userAvatar)
        .setColor('DARK_RED')
        .setDescription(`**\n**:airplane: Successfully \`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL)
 
        logChannel.send(banInfo);
    })
});
Lion.on('guildBanRemove', (guild, user) => {
    if(!guild.member(Lion.user).hasPermission('EMBED_LINKS')) return;
    if(!guild.member(Lion.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[guild.guild.id]) log[guild.guild.id] = {
          onoff: 'Off'
        }
    if(log[guild.guild.id].onoff === 'Off') return;
    var logChannel = guild.channels.find(c => c.name === `${log[guild.guild.id].channel}`);
    if(!logChannel) return;
 
    guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(userID === Lion.user.id) return;
 
        let unBanInfo = new Discord.RichEmbed()
        .setTitle('**[UNBANNED]**')
        .setThumbnail(userAvatar)
        .setColor('GREEN')
        .setDescription(`**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL)
 
        logChannel.send(unBanInfo);
    })
});
 
Lion.on('guildMemberUpdate', (oldMember, newMember) => {
    if(!oldMember.guild) return;
                if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldMember.guild.id].onoff === 'Off') return;
    var logChannel = oldMember.guild.channels.find(c => c.name === `${log[oldMember, newMember.guild.id].channel}`);
    if(!logChannel) return;
 
    oldMember.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
        var userTag = logs.entries.first().executor.tag;
 
        if(oldMember.nickname !== newMember.nickname) {
            if(oldMember.nickname === null) {
                var oldNM = '`اسمه الاصلي`';
            }else {
                var oldNM = oldMember.nickname;
            }
            if(newMember.nickname === null) {
                var newNM = '`اسمه الاصلي`';
            }else {
                var newNM = newMember.nickname;
            }
 
            let updateNickname = new Discord.RichEmbed()
            .setTitle('**[UPDATE MEMBER NICKNAME]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldMember.guild.name, oldMember.guild.iconURL)
 
            logChannel.send(updateNickname);
        }
        if(oldMember.roles.size < newMember.roles.size) {
            let role = newMember.roles.filter(r => !oldMember.roles.has(r.id)).first();
                            if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
            if(log[oldMember.guild.id].onoff === 'Off') return;
            let roleAdded = new Discord.RichEmbed()
            .setTitle('**[ADDED ROLE TO MEMBER]**')
            .setThumbnail(oldMember.guild.iconURL)
            .setColor('GREEN')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(roleAdded);
        }
        if(oldMember.roles.size > newMember.roles.size) {
            let role = oldMember.roles.filter(r => !newMember.roles.has(r.id)).first();
                            if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
            if(log[oldMember, newMember.guild.id].onoff === 'Off') return;
            let roleRemoved = new Discord.RichEmbed()
            .setTitle('**[REMOVED ROLE FROM MEMBER]**')
            .setThumbnail(oldMember.guild.iconURL)
            .setColor('RED')
            .setDescription(`**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(roleRemoved);
        }
    })
    if(oldMember.guild.owner.id !== newMember.guild.owner.id) {
                    if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
        if(log[oldMember, newMember.guild.id].onoff === 'Off') return;
        let newOwner = new Discord.RichEmbed()
        .setTitle('**[UPDATE GUILD OWNER]**')
        .setThumbnail(oldMember.guild.iconURL)
        .setColor('GREEN')
        .setDescription(`**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`)
        .setTimestamp()
        .setFooter(oldMember.guild.name, oldMember.guild.iconURL)
 
        logChannel.send(newOwner);
    }
});
 
 
Lion.on('voiceStateUpdate', (voiceOld, voiceNew) => {
 
    if(!voiceOld.guild.member(Lion.user).hasPermission('EMBED_LINKS')) return;
    if(!voiceOld.guild.member(Lion.user).hasPermission('VIEW_AUDIT_LOG')) return;
                    if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
    if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
    var logChannel = voiceOld.guild.channels.find(c => c.name === `${log[voiceOld, voiceNew.guild.id].channel}`);
    if(!logChannel) return;
 
    voiceOld.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userTag = logs.entries.first().executor.tag;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(voiceOld.serverMute === false && voiceNew.serverMute === true) {
            let serverMutev = new Discord.RichEmbed()
            .setTitle('**[VOICE MUTE]**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png')
            .setColor('RED')
            .setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverMutev);
        }
        if(voiceOld.serverMute === true && voiceNew.serverMute === false) {
                            if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
            let serverUnmutev = new Discord.RichEmbed()
            .setTitle('**[VOICE UNMUTE]**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png')
            .setColor('GREEN')
            .setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverUnmutev);
        }
        if(voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
                            if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
            let serverDeafv = new Discord.RichEmbed()
            .setTitle('**[VOICE DEAF]**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png')
            .setColor('RED')
            .setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverDeafv);
        }
        if(voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
                            if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
            let serverUndeafv = new Discord.RichEmbed()
            .setTitle('**[VOICE UNDEAF]**')
            .setThumbnail('https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png')
            .setColor('GREEN')
            .setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverUndeafv);
        }
    })
   
    if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && voiceNew.voiceChannel && voiceOld.voiceChannel != null) {
                        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
        if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
        let voiceLeave = new Discord.RichEmbed()
        .setTitle('**[CHANGED VOICE ROOM]**')
        .setColor('GREEN')
        .setThumbnail(voiceOld.user.avatarURL)
        .setDescription(`**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
        .setTimestamp()
        .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)
 
        logChannel.send(voiceLeave);
    }
});

Lion.on("message", message => {
  if (message.content === prefix + "help") {
           message.channel.sendMessage('**Done | :e_mail: **')
  }
});

Lion.on('message', message => {
  if(!message.channel.guild) return;
  if (message.content.startsWith(prefix + 'ping')) {
  if(!message.channel.guild) return;
  var msg = `${Date.now() - message.createdTimestamp}`
  var api = `${Math.round(Lion.ping)}`
  if (message.author.bot) return;
  let ping = new Discord.RichEmbed()
  .addField(`**:ping_pong: Ping: \`${msg}\`**`,`** **`)
  if(msg < 80) ping.setColor('GREEN')
  if(msg >= 80 && msg < 140) ping.setColor('ORANGE')
  if(msg >= 140) ping.setColor('RED')
  message.channel.send(ping)}
  });
Lion.on("message", msg => {
    const rooms = []
    msg.guild.channels.forEach(c => {
        if(c.type !== "voice") return;
        rooms.push(c.name);
});
  
    let args = msg.content.split(" ").slice(1).join(" ")
    if(msg.content.startsWith(prefix+"moveme")){
        if(!msg.member.voiceChannel) return msg.channel.send("**⛔   You're not in voice channel! **");
        if(!args) return msg.channel.send("**⛔   Please be more specific**\`\`\`"+rooms.join("\n")+"\`\`\`");
        if(isNaN(args)){
            let channel = msg.guild.channels.find(ch => ch.name === args) || msg.mentions.members.first().voiceChannel;
            if(!channel) return msg.channel.send("**⛔   Please be more specific**\`\`\`"+rooms.join("\n")+"\`\`\`");
            msg.member.setVoiceChannel(channel).then(msg.channel.send("**✅  "+msg.author.username+" moved to "+channel+"!**"))
        } else {
            let channel = msg.guild.channels.get(args) || msg.guild.members.get(args).voiceChannel
            msg.member.setVoiceChannel(channel).then(msg.channel.send("**✅  "+msg.author.username+" moved to "+channel+"!**"));
 
        }
    }
})

Lion.on("message", message => {
  if (message.content === prefix + "help") {
                message.react('🦁')
  }
});

Lion.on("message", message => {
  if (message.content === prefix + "help") {
    message.author.sendMessage(`**
      ╭╮╱╱╭━━┳━━━┳━╮╱╭╮╭━━╮╭━━━┳━━━━╮
      ┃┃╱╱╰┫┣┫╭━╮┃┃╰╮┃┃┃╭╮┃┃╭━╮┃╭╮╭╮┃
      ┃┃╱╱╱┃┃┃┃╱┃┃╭╮╰╯┃┃╰╯╰┫┃╱┃┣╯┃┃╰╯
      ┃┃╱╭╮┃┃┃┃╱┃┃┃╰╮┃┃┃╭━╮┃┃╱┃┃╱┃┃
      ┃╰━╯┣┫┣┫╰━╯┃┃╱┃┃┃┃╰━╯┃╰━╯┃╱┃┃
      ╰━━━┻━━┻━━━┻╯╱╰━╯╰━━━┻━━━╯╱╰╯

__ What Is LionBot __
LionBot هو احد البوتات الجديدة العربية .
ويسعا دائما لتسهيل الخدمات لدى مستعمليه .
ولديه حماية قوية ضد التخريب .

__ General Commands __

${prefix}ping ==> - يعرض لك سرعة الانترنت لديك -
${prefix}members ==> - يريك حالة الاعضاء الذين فلسيرفر -
${prefix}server ==> - يعرض لك معلومات السيرفر -
${prefix}discrim ==> - يعرض لك الاسماء التي نفس تاقك -
${prefix}new ==> - يفتح لك روم خاص تتكلم معه مع الادارة -
${prefix}id ==> - يعرض معلوماتك -

__ Admin Commands __
${prefix}moveme ==> - سحب نفسك الى روم -
${prefix}kick ==> - طرد العضو من السيرفر -
${prefix}toggleLog ==> - لتفعيل والغاء تفعيل اللوق -
${prefix}ban ==> - حضر العضو من السيرفر -
${prefix}vkick ==> - طرد العضو من الروم الصوتي -
${prefix}unban ==> - فك الحضر عن العضو المحضور -
${prefix}bc ==> - يرسل رسالة جماعية لاعضاء السيرفر -
${prefix}mute ==> - لاسكات العضو -
${prefix}unmute ==> - لفك اسكات العضو -
${prefix}points ==> - لاضافة نقاط او تصفير كل النقاط او انقاصها من شخص -
${prefix}vc ==> - ينشأ روم فيه عدد الاعضاء المتواجدين في الرومات -
${prefix}vm ==> - ينشأ روم فيه عدد الاعضاء المتواجدين في السيرفر -

__ Other Commands __

${prefix}invite ==> - يرسل لك رابط اضافة البوت -
${prefix}stats ==> - يرسل لك معلومات البوت -
Created By : <@377890420677541898>
Support Server : https://discord.gg/2uGEaTG
      **`);

  }
});


Lion.on('message',async Epic => {
  if(Epic.content.startsWith(prefix + "vc")) {
  if(!Epic.guild.member(Epic.author).hasPermissions('MANAGE_CHANNELS')) return Epic.reply(':x: **You Dont Have Premissions**');
  if(!Epic.guild.member(Lion.user).hasPermissions(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return Epic.reply(':x: **I Dont Have Premissions**');
  Epic.guild.createChannel(`Voice Online : [ ${Epic.guild.members.filter(m => m.voiceChannel).size} ]` , 'voice').then(c => {
    c.overwritePermissions(Epic.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
    setInterval(() => {
      c.setName(`Voice Online :  ${Epic.guild.members.filter(m => m.voiceChannel).size} .`)
      },1000);
  });
  }
});

Lion.on('message',async Epic => {
  if(Epic.content.startsWith(prefix + "vm")) {
  if(!Epic.guild.member(Epic.author).hasPermissions('MANAGE_CHANNELS')) return Epic.reply(':x: **You Dont Have Premissions**');
  if(!Epic.guild.member(Lion.user).hasPermissions(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return Epic.reply(':x: **I Dont Have Premissions**');
  Epic.guild.createChannel(`Voice Members : [ ${Epic.guild.members.filter(m => m.guild).size} ]` , 'voice').then(c => {
    c.overwritePermissions(Epic.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
    setInterval(() => {
      c.setName(`Voice Members :  ${Epic.guild.members.filter(m => m.guild).size} .`)
      },1000);
  });
  }
});

Lion.on("message", message => {
  const command = message.content.split(" ")[0];

  if(command == prefix+"vkick"){

      if (!message.guild.member(message.author).hasPermission('MOVE_MEMBERS') || !message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
          return message.reply('you do not have permission to perform this action!');
      }

      var member = message.guild.members.get(message.mentions.users.array()[0].id);
      if(!message.mentions.users){
          message.reply("please mention the member")
          return;
      }

  if(!member.voiceChannel){
  message.reply("i can't include voice channel for member!")
  return;
  }
            message.guild.createChannel('voicekick', 'voice').then(c => {
              member.setVoiceChannel(c).then(() => {
                  c.delete(305).catch(console.log)




    });
   });
  }
});
Lion.on('message', message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "ban") {
               if(!message.channel.guild) return message.reply('** This command only for servers**');

  if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**You Don't Have ` BAN_MEMBERS ` Permission**");
  if(!message.guild.member(Lion.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");
  /*let b5bzlog = Lion.channels.find("name", "5bz-log");
  if(!b5bzlog) return message.reply("I've detected that this server doesn't have a 5bz-log text channel.");*/
  if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
  if(!reason) return message.reply ("**اكتب سبب الطرد**");
  if (!message.guild.member(user)
  .bannable) return message.reply("**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**");

  message.guild.member(user).ban(7, user);

  const banembed = new Discord.RichEmbed()
  .setAuthor(`BANNED!`, user.displayAvatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
  .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
  .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
  message.channel.send({
    embed : banembed
  })
}
});
Lion.on('message', message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {
               if(!message.channel.guild) return message.reply('** This command only for servers**');

  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
  if(!message.guild.member(Lion.user).hasPermission("KICK_MEMBERS")) return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");
  /*let b5bzlog = Lion.channels.find("name", "5bz-log");
  if(!b5bzlog) return message.reply("I've detected that this server doesn't have a 5bz-log text channel.");*/
  if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
  if(!reason) return message.reply ("**اكتب سبب الطرد**");
  if (!message.guild.member(user)
  .kickable) return message.reply("**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**");

  message.guild.member(user).kick();

  const kickembed = new Discord.RichEmbed()
  .setAuthor(`KICKED!`, user.displayAvatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
  .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
  .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
  message.channel.send({
    embed : kickembed
  })
}
});

Lion.on('message',function(message) {
  if (message.author.bot) return;


                  if(!message.channel.guild) return;

                    if (message.content === prefix + "members") {
 const embed = new Discord.RichEmbed()

    .setDescription(`**Members info ✨
💚 online:   ${message.guild.members.filter(m=>m.presence.status == 'online').size}
❤  dnd:       ${message.guild.members.filter(m=>m.presence.status == 'dnd').size}
💛  idle:     ${message.guild.members.filter(m=>m.presence.status == 'idle').size}
💠   membersCount:  ${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size}
💡 bots: ${message.guild.members.filter(m=>m.user.bot).size} **`)
         message.channel.send({embed});

    }
      });


Lion.on("message", (Fares) => {

  if (Fares.content === '-new') {
        const reason = Fares.content.split(" ").slice(1).join(" ");
        if (!Fares.guild.roles.exists("name", "Support")) return Fares.channel.send(`**يجب عمل رتبة بأسم \`Support\`**`);
        if (Fares.guild.channels.exists("name", "ticket-" + Fares.author.id)) return Fares.channel.send(`لديك تذكرة من الأساس :x:`);
        Fares.guild.createChannel(`just-ticket`, "text").then(c => {
            let Fares1 = Fares.guild.roles.find("name", "Support");
            let Fares2 = Fares.guild.roles.find("name", "@everyone");
            c.overwritePermissions(Fares1, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            c.overwritePermissions(Fares2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(Fares.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            Fares.channel.send(`:white_check_mark: تـم فتح التذكرة , #${c.name}.`);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .addField(` ${Fares.author.username}!`, `
** __ لاغلاق التذكرة اكتب : -close __ **
**مرحبا    , لدنيا فريق المساعده ليساعدك في أقرب وقت . **`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error);
    }
    if (Fares.content === '-close') {
        if (!Fares.channel.name.startsWith(`just-ticket`)) return Fares.channel.send(`**لا تستطيع :x:**`);

        Fares.channel.send(`**هل انت متأكد ؟ ** `)
            .then((m) => {
                Fares.channel.awaitMessages(response => response.content === 'نعم', {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })
                    .then((collected) => {
                        Fares.channel.delete();
                    })
                    .catch(() => {
                        m.edit('وقت الأغلاق أنتهي , لن تمسح التذكرة .').then(m2 => {
                            m2.delete();
                        }, 3000);
                    });
            });
        }

    });
    Lion.on('message' , message => {
      let user = message.mentions.users.first()|| Lion.users.get(message.content.split(' ')[1])
      if(message.content.startsWith(prefix + 'unban')) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('❌|**\`ADMINISTRATOR\`لا توجد لديك رتبة`**');
          if(!user) return  message.channel.send(`Do this ${prefix} <@ID user> \n or \n ${prefix}unban ID user`);
          message.guild.unban(user);
          message.guild.owner.send(`لقد تم فك الباند عن الشخص \n ${user} \n By : <@${message.author.id}>`)
          var embed = new Discord.RichEmbed()
          .setThumbnail(message.author.avatarURl)
          .setColor("RANDOM")
          .setTitle('**# - Unban** !')
          .addField('**# - User Unban :** ', `${user}` , true)
          .addField('**# - By :**' ,       ` <@${message.author.id}> ` , true)
          .setAuthor(message.guild.name)
          message.channel.sendEmbed(embed)
      }
  });
  Lion.on('message', message => {
    if(message.content == `<@${botid}>`) {
    message.channel.startTyping()
    setTimeout(() => {
    message.channel.stopTyping()
    }, 7000);
    }
    });

    Lion.on('message',async message => {
      if(message.author.bot) return;
      if(message.channel.type === 'dm') return;
      let args = message.content.split(' ');
      let tag;
      if(args[0] === `${prefix}discrim`) {
        if(args[1]) {
          let discrim = Array.from(args[1]);
          if(isNaN(args[1])) return message.channel.send(`- \`${message.author.username}\`, يجب ان تتكون هذه الخانة من ارقام وليس احرف`);
          if(discrim.length !== 4) return message.channel.send(`- \`${message.author.username}\`, يجب ان يكون التاق مكون من 4 ارقام`);

          tag = discrim.map(r => r.toString()).join('');
          console.log(tag);
          if(Lion.users.filter(f => f.discriminator === tag).size === 0) return message.channel.send(`- \`${message.author.username}\`, لا يوجد احد بهذا التاق`);
          let iLD = new Discord.RichEmbed()
          .setAuthor(message.author.username, message.author.avatarURL)
          .setDescription(Lion.users.filter(f => f.discriminator === tag).map(r => r.username).slice(0, 10).join('\n'))
          .setFooter('Lion Bot Team .');
          message.channel.send(iLD);
        } else if(!args[1]) {
          tag = message.author.discriminator;
          if(Lion.users.filter(f => f.discriminator === tag).size === 0) return message.channel.send(`- \`${message.author.username}\`, لا يوجد احد بهذا التاق`);
          let L4U = new Discord.RichEmbed()
          .setAuthor(message.author.username, message.author.avatarURL)
          .setDescription(Lion.users.filter(f => f.discriminator === tag).map(r => r.username).slice(0, 10).join('\n'))
          .setFooter('Lion Bot Team . || اذا لم تجد اسم فقط غير اسمك لـ .... وسيتغير تاقك');
          message.channel.send(L4U);
        }
      }
    });

   







      Lion.on('message', message => {
          if(message.content.startsWith(`${prefix}invite`)){
              if(!message.channel.guild) return message.channel.send("This Command is Just For Servers!")
              var embed = new Discord.RichEmbed()
              .setTitle("Invite Me !.")
              .setURL(`https://discordapp.com/api/oauth2/authorize?client_id=393542839482581003&permissions=8&scope=bot`)
              .setTimestamp()
              .setColor("RANDOM")
              message.channel.send({embed})
          }
      });


      Lion.on('message', async message => {
        let args = message.content.split(" ");
        if(message.content.startsWith(prefix + "mute")) {
          if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply('# - ملحوظة :  يجب ان يكون لديك بر  مشن أداري . ').then(msg => {
            msg.delete(3500);
            message.delete(3500);
          });

          if(!message.guild.member(Lion.user).hasPermission("MANAGE_ROLES")) return message.reply('# - ملحوظة : يجب ان يكون البوت لديه برمشن أداري').then(msg => {
            msg.delete(3500);
            message.delete(3500);
          });

          let mention = message.mentions.members.first();
          if(!mention) return message.reply('# - ملحوظة : يجب ان تقوم بمنشن شخص معين .').then(msg => {
            msg.delete(3500);
            message.delete(3500);
          });

          if(mention.highestRole.position >= message.guild.member(message.author).highestRole.positon) return message.reply('# - ملحوظة : لا يمكنك اعطاء ميوت لشخص اعلي من رتبتك .').then(msg => {
            msg.delete(3500);
            message.delete(3500);
          });
          if(mention.highestRole.positon >= message.guild.member(Lion.user).highestRole.positon) return message.reply('# - ملحوظه : لا يمكنك اعطاء ميوت لشخص اعلي من رتبتك').then(msg => {
            msg.delete(3500);
            message.delete(3500);
          });
          if(mention.id === message.author.id) return message.reply('# - ملحوظه : لا يمكنك ان تعطي ميوت لنفسك .').then(msg => {
            msg.delete(3500);
            message.delete(3500);
          });

          let duration = args[2];
          if(!duration) return message.reply('# - ملحوظه : يجب ان تضع وقت .').then(msg => {
            msg.delete(3500);
            message.delete(3500);
          });

          if(isNaN(duration)) return message.reply('# - ملحوظه : يجب تحديد وقت زمني صحيح').then(msg => {
            msg.delete(3500);
            message.delete(3500);
          });

          let sbb = message.content.split(" ").slice(3).join(" ");
          if(!sbb) sbb = "غير معروف .";

          let thisEmbed = new Discord.RichEmbed()
          .setAuthor(mention.user.username, mention.user.avatarURL)
          .setTitle('# - لقد تم أعطائك ميوت .')
          .setThumbnail(mention.user.avatarURL)
          .addField('# - السيرفر',message.guild.name,true)
          .addField('# - تم اعطائك ميوت بواسطة',message.author,true)
          .addField('# - السبب',sbb)

          let role = message.guild.roles.find('name', 'Muted') || message.guild.roles.get(r => r.name === 'Muted');
          if(!role) try {
            message.guild.createRole({
              name: "Muted",
              permissions: 0
            }).then(r => {
              message.guild.channels.forEach(c => {
                c.overwritePermissions(r , {
                  SEND_MESSAGES: false,
                  READ_MESSAGES_HISTORY: false,
                  ADD_REACTIONS: false
                });
              });
            });
          } catch(e) {
            console.log(e.stack);
          }
          mention.addRole(role).then(() => {
            mention.send(thisEmbed);
            message.channel.send(`**:white_check_mark: ${mention.user.username} Muted ! :zipper_mouth:  **  `);
            mention.setMute(true);
          });
          setTimeout(() => {
            if(duration === 0) return;
            if(!mention.has.roles(role)) return;
            mention.setMute(false);
            mention.removeRole(role);
            message.channel.send(`**:white_check_mark: ${mention.user.username} Unmuted **   `);
          },duration * 60000);
        } else if(message.content.startsWith(prefix + "unmute")) {
          let mention = message.mentions.members.first();
          let role = message.guild.roles.find('name', 'Muted') || message.guild.roles.get(r => r.name === 'Muted');
          if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply('# - ملحوظة :  يجب ان يكون لديك برمشن أداري . ').then(msg => {
            msg.delete(3500);
            message.delete(3500);
          });

          if(!message.guild.member(Lion.user).hasPermission("MANAGE_ROLES")) return message.reply('# - ملحوظة : يجب ان يكون البوت لديه برمشن أداري').then(msg => {
            msg.delete(3500);
            message.delete(3500);
          });

          if(!mention) return message.reply('# - ملحوظه : يجب منشن شخص لفك الميوت عنهه .').then(msg => {
            msg.delete(3500);
            message.delete(3500);
          });

            mention.removeRole(role);
            mention.setMute(false);
            message.channel.send(`**:white_check_mark: ${mention.user.username} Unmuted ! **  `);
        }
      });



    Lion.on('message', message => {

    var args = message.content.split(" ").slice(1);
    if(message.content.startsWith(prefix + 'id')) {
    var year = message.author.createdAt.getFullYear()
    var month = message.author.createdAt.getMonth()
    var day = message.author.createdAt.getDate()
    var men = message.mentions.users.first();
    let args = message.content.split(' ').slice(1).join(' ');
    if (args == '') {
    var z = message.author;
    }else {
    var z = message.mentions.users.first();
    }

    let d = z.createdAt;
    let n = d.toLocaleString();
    let x;
    let y;

    if (z.presence.game !== null) {
    y = `${z.presence.game.name}`;
    } else {
    y = "No Playing... |💤.";
    }
    if (z.bot) {
    var w = 'بوت';
    }else {
    var w = 'عضو';
    }
    let embed = new Discord.RichEmbed()
    .setColor("#502faf")
    .addField('🔱| اسمك:',`**<@` + `${z.id}` + `>**`, true)
    .addField('🛡| ايدي:', "**"+ `${z.id}` +"**",true)
    .addField('♨| Playing:','**'+y+'**' , true)
    .addField('🤖| نوع حسابك:',"**"+ w + "**",true)
    .addField('📛| الكود حق حسابك:',"**#" +  `${z.discriminator}**`,true)
    .addField('**التاريح الذي انشئ فيه حسابك | 📆 **: ' ,year + "-"+ month +"-"+ day)
    .addField("**تاريخ دخولك للسيرفر| ⌚   :**", message.member.joinedAt.toLocaleString())

    .addField('**⌚ | تاريخ انشاء حسابك الكامل:**', message.author.createdAt.toLocaleString())
    .addField("**اخر رسالة لك | 💬  :**", message.author.lastMessage)

    .setThumbnail(`${z.avatarURL}`)
    .setFooter(message.author.username, message.author.avatarURL)

    message.channel.send({embed});
      if (!message) return message.reply('**منشن الشخص  ❌ **').catch(console.error);

    }

    });

    Lion.on('message', message => {
        if (message.content === "-server") {
        let embed = new Discord.RichEmbed()
       .setColor("RANDOM")
       .setThumbnail(message.author.avatarURL)
       .setTitle(`info about ${message.guild.name}`)
       .addField("Server Owner 👑",`➥ ` + `${message.guild.owner.user.username}`, true)
       .addField('Server ID 🆔',`➥` + message.guild.id, true)
       .addField("Owner Tag",`➥ ` +  `#` + message.guild.owner.user.discriminator, true)
       .addField("Owner ID 🆔",`➥ ` + message.guild.owner.user.id, true)
       .addField("Server Region📡",`➥ ` + message.guild.region, true)
       .addField("Server Member Size🏧",`➥ ` + message.guild.members.size, true)
       .addField("Server Channels Number🏧",`➥ ` + message.guild.channels.size, true)
       .addField("Server Roels Number🏧",`➥ ` + message.guild.roles.size, true)
       .addField("AFK channel💤",`➥ ` + message.guild.afkChannel || 'Null', true)
       .addField("Server Created AT",`➥ ` + message.guild.createdAt, true)
       .addField(`info about ${message.author.username}`, `➥ `)
       .addField("Name",`➥ ` + `${message.author.username}`, true)
       .addField('Tag',`➥ ` + "#" +  message.author.discriminator, true)
       .addField("ID 🆔",`➥ ` + message.author.id, true)
       .addField(" Account Created At",`➥ ` + message.author.createdAt, true)
       .setTimestamp()
       .setFooter(message.author.tag, message.author.avatarURL)


       message.channel.sendEmbed(embed);
         }
     });
     const devs = ["377890420677541898"];
const adminprefix = ["-"];
Lion.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!devs.includes(message.author.id)) return;

  if (message.content.startsWith(adminprefix + 'ply')) {
    Lion.user.setGame(argresult);
      message.channel.send(`**✅   ${argresult}**`)
  } else
     if (message.content === (adminprefix + "leave")) {
    message.guild.leave();
  } else
  if (message.content.startsWith(adminprefix + 'wt')) {
  Lion.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.send(`**✅   ${argresult}**`)
  } else
  if (message.content.startsWith(adminprefix + 'ls')) {
  Lion.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.send(`**✅   ${argresult}**`)
  } else
  if (message.content.startsWith(adminprefix + 'st')) {
    Lion.user.setGame(argresult, "https://www.twitch.tv/idk");
      message.channel.send(`**✅**`)
  }
  if (message.content.startsWith(adminprefix + 'setname')) {
  Lion.user.setUsername(argresult).then
      message.channel.send(`Changing The Name To ..**${argresult}** `)
} else
if (message.content.startsWith(adminprefix + 'setavatar')) {
  Lion.user.setAvatar(argresult);
    message.channel.send(`Changing The Avatar To :**${argresult}** `);
}
});
Lion.on('message', function(message) {//Toxic Codes  n3k4a is one
    if(!message.channel.guild) return;
    if (message.author.bot) return;
    if (message.author.id === Lion.user.id) return;
    if (message.author.equals(Lion.user)) return;
    if (!message.content.startsWith(prefix)) return;
   
    var args = message.content.substring(prefix.length).split(' ');//Toxic Codes  n3k4a is one
    switch (args[0].toLocaleLowerCase()) {//Toxic Codes  n3k4a is one
    case "clear" :
    message.delete()
    if(!message.channel.guild) return
    if(message.member.hasPermissions(0x2000)){ if (!args[1]) {//Toxic Codes  n3k4a is one
    message.channel.fetchMessages()
    .then(messages => {
    message.channel.bulkDelete(messages);
    var messagesDeleted = messages.array().length;
    message.channel.sendMessage(' '+ "**```fix\n" + messagesDeleted + " " +  ': عدد الرسائل التي تم مسحها' + "```**").then(m => m.delete(5000));
    })
    } else {
    let messagecount = parseInt(args[1]);
    message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
    message.channel.sendMessage(' '+ "**```fix\n" + args[1] + " " +  ': عدد الرسائل التي تم مسحها' + "```**").then(m => m.delete(5000));
    message.delete(60000);
    }
    } else {
    var manage = new Discord.RichEmbed()
    .setDescription('You Do Not Have Permission MANAGE_MESSAGES :(')
    .setColor("RANDOM")
    message.channel.sendEmbed(manage)
    return;
    }
    }
});
Lion.on('message', message => {
if(message.author.bot) return;
if(message.channel.type === 'dm') return;
    if(message.content.startsWith(prefix + 'bc')) {
     let filter = m => m.author.id === message.author.id;
 
 let recembed = new Discord.RichEmbed()
 .setTitle(`${Lion.user.username}`)
 .setDescription(`**
 -=-=-=-=-=-=-=-=-=-=
 🎖 Broadcast sends to a specific role without embed
 
 🏅 Broadcast sends to a specific role with embed
 
 📭 Broadcast sends for all members with embed
 
 📧 Broadcast sends for all members without embed
 
 🔵 Broadcast sends for online members only without embed
 
 🔷 Broadcast sends for online members only with embed
 
 ❌ To Cancel the process
 -=-=-=-=-=-=-=-=-=-=
 **`)
 
 message.channel.sendEmbed(recembed).then(msg => {
     msg.react('🎖')
     .then(() => msg.react('🏅'))
     .then(() => msg.react('📭'))
     .then(() =>  msg.react('📧'))
     .then(() => msg.react('🔵'))
     .then(() => msg.react('🔷'))
     .then(() => msg.react('❌'))
 
 
             let embedmsgFilter = (reaction, user) => reaction.emoji.name === '📭' && user.id === message.author.id;
 
             let normalmsgFilter = (reaction, user) => reaction.emoji.name === '📧' && user.id === message.author.id;
 
             let cancelFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
 
             let onlyroleFilter = (reaction, user) => reaction.emoji.name === '🎖' && user.id === message.author.id;8
 
             let onlineonlyFilter = (reaction, user) => reaction.emoji.name === '🔵' && user.id === message.author.id;8
 
             let embedonlineonlyFilter = (reaction, user) => reaction.emoji.name === '🔷' && user.id === message.author.id;8
 
             let embedonlyroleFilter = (reaction, user) => reaction.emoji.name === '🏅' && user.id === message.author.id;8
 
             let embedmsg = msg.createReactionCollector(embedmsgFilter, { time: 0 });
 
             let normalmsg = msg.createReactionCollector(normalmsgFilter, { time: 0 });
     
             let onlyrole = msg.createReactionCollector(onlyroleFilter, { time: 0 });
 
             let embedonlyrole = msg.createReactionCollector(embedonlyroleFilter, { time: 0 });
 
             let onlineonly = msg.createReactionCollector(onlineonlyFilter, { time: 0 });
                 
             let embedonlineonly = msg.createReactionCollector(embedonlineonlyFilter, { time: 0 });
 
             let cancel = msg.createReactionCollector(cancelFilter, { time: 0 });
 
 embedonlineonly.on('collect', r => {
 
    let msge;
    message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
   
           message.channel.awaitMessages(filter, {
             max: 1,
             time: 90000,
             errors: ['time']
           })
           .then(collected => {
               collected.first().delete();
               msge = collected.first().content;
               msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
                 message.channel.awaitMessages(filter, {
                   max: 1,
                   time: 90000,
                   errors: ['time']
                 })
                 .then(collected => {
                   if(collected.first().content === 'yes') {
   message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
   
   
   message.guild.members.filter(m => m.presence.status === 'online').forEach(m => {
    var bc = new Discord.RichEmbed()
           .setColor('RANDOM')
           .setTitle(`:mega: New Broadcast`)
           .addField('🔰Server🔰', message.guild.name)
           .addField('🚩Sender🚩', message.author.username)
           .addField('📜Message📜', `${msge}`)
           .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
           .setFooter(Lion.user.username, Lion.user.avatarURL);
           m.send({ embed: bc })
           m.send(`${m}`)
           
       })
   }})
   if(collected.first().content === 'no') {
   message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
   message.guild.members.filter(m => m.presence.status === 'online').forEach(m => {
    var bc = new Discord.RichEmbed()
           .setColor('RANDOM')
           .setTitle(`:mega: New Broadcast`)
           .addField('🔰Server🔰', message.guild.name)
           .addField('🚩Sender🚩', message.author.username)
           .addField('📜Message📜', `${msge}`)
           .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
           .setFooter(Lion.user.username, Lion.user.avatarURL);
           m.send({ embed: bc })
           
       })
   }
                 
   })
               })
           })
       })
 
       
 onlineonly.on('collect', r => {
    let msge;
    message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
 
        message.channel.awaitMessages(filter, {
          max: 1,
          time: 90000,
          errors: ['time']
        })
        .then(collected => {
            collected.first().delete();
            msge = collected.first().content;
            msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 90000,
                errors: ['time']
              })
              .then(collected => {
 
                if(collected.first().content === 'yes') {
message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
               
 
message.guild.members.filter(m => m.presence.status === 'online').forEach(m => {
    m.send(`${msge}`)
m.send(`${m}`)      
       
    })
}
if(collected.first().content === 'no') {
message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
message.guild.members.filter(m => m.presence.status === 'online').forEach(m => {
    m.send(`${msge}`)
               
    })}
})
})
        })
    })
})
 
 embedmsg.on('collect', r => {
     let msge;
  message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
 
         message.channel.awaitMessages(filter, {
           max: 1,
           time: 90000,
           errors: ['time']
         })
         .then(collected => {
             collected.first().delete();
             msge = collected.first().content;
             msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
               message.channel.awaitMessages(filter, {
                 max: 1,
                 time: 90000,
                 errors: ['time']
               })
               .then(collected => {
                 if(collected.first().content === 'yes') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
 
 
     message.guild.members.forEach(m => {
         var bc = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(`:mega: New Broadcast`)
         .addField('🔰Server🔰', message.guild.name)
         .addField('🚩Sender🚩', message.author.username)
         .addField('📜Message📜', `${msge}`)
         .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
         .setFooter(Lion.user.username, Lion.user.avatarURL);
         m.send({ embed: bc })
         m.send(`${m}`)
         
     })
 }})
 if(collected.first().content === 'no') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
     message.guild.members.forEach(m => {
         var bc = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(`:mega: New Broadcast`)
         .addField('🔰Server🔰', message.guild.name)
         .addField('🚩Sender🚩', message.author.username)
         .addField('📜Message📜', `${msge}`)
         .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
         .setFooter(Lion.user.username, Lion.user.avatarURL);
         m.send({ embed: bc })
         
     })
 }
               
 })
             })
         })
     })
 
 
   
 
 
 
 normalmsg.on('collect', r => {
     let msge;
     message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
 
         message.channel.awaitMessages(filter, {
           max: 1,
           time: 90000,
           errors: ['time']
         })
         .then(collected => {
             collected.first().delete();
             msge = collected.first().content;
             msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
               message.channel.awaitMessages(filter, {
                 max: 1,
                 time: 90000,
                 errors: ['time']
               })
               .then(collected => {
 
                 if(collected.first().content === 'yes') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
                 
 
     message.guild.members.forEach(m => {
 m.send(`${msge}`)
 m.send(`${m}`)      
         
     })
 }
 if(collected.first().content === 'no') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
     message.guild.members.forEach(m => {
         m.send(`${msge}`)
                 
     })}
 })
 })
         })
     })
 })
 
 onlyrole.on('collect', r => {
     let msge;
     let role;
     message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
 
         message.channel.awaitMessages(filter, {
           max: 1,
           time: 90000,
           errors: ['time']
         })
 
         .then(collected => {
             collected.first().delete();
             msge = collected.first().content;
                 msg.edit('✅ **| Now Please Write The Role Name**').then(msg => {
                 message.channel.awaitMessages(filter, {
                     max: 1,
                     time: 90000,
                     errors: ['time']
                   })
         
         .then(collected => {
             collected.first().delete();
             role = collected.first().content;
                 let rolecheak = message.guild.roles.find('name', `${role}`)
             msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
               message.channel.awaitMessages(filter, {
                 max: 1,
                 time: 90000,
                 errors: ['time']
               })
               .then(collected => {
 
                 if(collected.first().content === 'yes') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
                 
 
             message.guild.members.filter(m => m.roles.get(rolecheak.id)).forEach(m => {
 
 m.send(`${msge}`)
 m.send(`${m}`)      
         
     })
 }
 if(collected.first().content === 'no') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
         message.guild.members.filter(m => m.roles.get(rolecheak.id)).forEach(m => {
 
         m.send(`${msge}`)
                 
     })}
 })
 })
         })
     })
 })
 })
 });
 
 
 
 embedonlyrole.on('collect', r => {
     let msge;
     let role;
     message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
 
         message.channel.awaitMessages(filter, {
           max: 1,
           time: 90000,
           errors: ['time']
         })
 
         .then(collected => {
             collected.first().delete();
             msge = collected.first().content;
                 msg.edit('✅ **| Now Please Write The Role Name**').then(msg => {
                 message.channel.awaitMessages(filter, {
                     max: 1,
                     time: 90000,
                     errors: ['time']
                   })
         
         .then(collected => {
             collected.first().delete();
             role = collected.first().content;
                 let rolecheak = message.guild.roles.find('name', `${role}`)
             msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
               message.channel.awaitMessages(filter, {
                 max: 1,
                 time: 90000,
                 errors: ['time']
               })
               .then(collected => {
 
                 if(collected.first().content === 'yes') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
                 
 
                     message.guild.members.filter(m => m.roles.get(rolecheak.id)).forEach(m => {
                         var bc = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(`:mega: New Broadcast`)
         .addField('🔰Server🔰', message.guild.name)
         .addField('🚩Sender🚩', message.author.username)
         .addField('📜Message📜', `${msge}`)
         .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
         .setFooter(Lion.user.username, Lion.user.avatarURL);
         m.send({ embed: bc })
 m.send(`${m}`)      
         
     })
 }
 if(collected.first().content === 'no') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
 message.guild.members.filter(m => m.roles.get(rolecheak.id)).forEach(m => {
         var bc = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(`:mega: New Broadcast`)
         .addField('🔰Server🔰', message.guild.name)
         .addField('🚩Sender🚩', message.author.username)
         .addField('📜Message📜', `${msge}`)
         .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
         .setFooter(Lion.user.username, Lion.user.avatarURL);
         m.send({ embed: bc })
         
                 
     })}
 })
 })
         })
     })
 })
 })
 })
     cancel.on('collect', r => {
         let cancelembed = new Discord.RichEmbed()
         .setTitle('Successfully Canceled :x:')
      message.channel.sendEmbed(cancelembed)
         embedmsg.stop();
         normalmsg.stop();
         onlyrole.stop();
         embedonlyrole.stop();
         embedonlineonly.stop()
         onlineonly.stop()
         cancel.stop();
     })
 })
    }});


Lion.on("message",function(message) {
   if(message.content.startsWith(prefix + 'stats')) {
       var uptime = Lion.uptime;

   var days = 0;
   var hours = 0;
   var minutes = 0;
   var seconds = 0;
   var notCompleted = true;

   while (notCompleted) {

       if (uptime >= 8.64e+7) {

           days++;
           uptime -= 8.64e+7;

       } else if (uptime >= 3.6e+6) {

           hours++;
           uptime -= 3.6e+6;

       } else if (uptime >= 60000) {

           minutes++;
           uptime -= 60000;

       } else if (uptime >= 1000) {
           seconds++;
           uptime -= 1000;

       }

       if (uptime < 1000)  notCompleted = false;

   }

var v1 = new Discord.RichEmbed()
 v1.setTimestamp(new Date())
 v1.setColor("#6a109d")
 v1.setDescription('***__ انتظر .. جاري الحصول علي البيانات __***')
 v1.setFooter("Lion Bot")
var heroo = new Discord.RichEmbed()
.setColor('#6a109d')
.setTimestamp(new Date())
.setThumbnail(Lion.user.avatarURL)
.setTitle('Lion Bot Info')
.setURL('https://discordapp.com/api/oauth2/authorize?client_id=393542839482581003&permissions=8&scope=bot')
.setAuthor(Lion.user.username,Lion.user.avatarURL)
.addField("**البرفكس** :",`**[ ${prefix} ]**`,true)
.addField("**السيرفرات** :","**[ "+Lion.guilds.size+" ]**",true)
.addField("**القنوات** :","**[ "+Lion.channels.size+" ]**",true)
.addField("**المستخدمين** :","**[ "+Lion.users.size+" ]**",true)
.addField("**اسم البوت** : ","**[ "+Lion.user.username+" ]**",true)
.addField("**ايدي البوت **:","**[ "+Lion.user.id+" ]**",true)
.addField("**الحجم المستخدم** :",`**[ ${(process.memoryUsage().rss / 1048576).toFixed()}MB ]**`,true)
.addField("**موعد الاقلاع** :",`**[** **Days:** \`${days}\` **Hours:** \`${hours}\` **Minutes:** \`${minutes}\` **Seconds:** \`${seconds}\` **]**`,true)
.setFooter("Lion Bot");
 message.channel.send({embed:v1}).then(m => {
     setTimeout(() => {
        m.edit({embed:heroo});
     },3000);
 });
}
});
Lion.on('message',async message => {
if(message.content == '-unbanall') {
if(message.author.bot || message.channel.type == "dm" || !message.member.hasPermission("BAN_MEMBERS")) return;
message.guild.fetchBans().then(ba => {
ba.forEach(ns => {
message.guild.unban(ns);
})
}).then(() => {
let embed = new Discord.RichEmbed()
  .setAuthor(message.author.username)          
  .addField("Done✅|تم إزالة الباند عن جميع الأعضاء")    
  message.channel.send(embed);
})
}
});
Lion.on('message', async message => {
  if(!message.channel.guild) return;
   if (message.content.startsWith("-set")) {
       if (message.author.id !== "377890420677541898") return;
let args = message.content.split(' ').slice(1).join(' ');
if(!args) return message.channel.send("** :x: Please choose one of the Status :**\`online\` \`dnd\` \`invisible\` \`idle\` ")
  let sigMessage = await args;
  
  if (sigMessage === "online") {
      Lion.user.setStatus("online");
      message.channel.send("**:white_check_mark: Change Status To :** \`online\`:notes: ").then(message =>{message.delete(5000)})
  }
  if (sigMessage === "idle") {
      Lion.user.setStatus("idle");
                      message.channel.send("**:white_check_mark: Change Status To :** \`idle\`:notes: ").then(message =>{message.delete(5000)})
  }
  if (sigMessage === "invisible") {
      Lion.user.setStatus("invisible");
                      message.channel.send("**:white_check_mark: Change Status To :** \`invisible\`:notes: ").then(message =>{message.delete(5000)})
  }
  if (sigMessage === "dnd") {
      Lion.user.setStatus("dnd");
                      message.channel.send("**:white_check_mark: Change Status To :** \`dnd\`:notes:  ")
  }

}
});
let points = JSON.parse(fs.readFileSync('./points.json' , 'utf8')); //Toxic Codes // n3k4a is one
 
 
Lion.on('message', async message => {//Toxic Codes // n3k4a is one
 
 
    if(message.channel.type !== 'text') return;
   
   
    var command = message.content.toLowerCase().split(" ")[0];//Toxic Codes // n3k4a is one
    var args = message.content.toLowerCase().split(" ");
    var userM = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.id == args[1]));
      const embed  = new Discord.RichEmbed()
.setDescription(`
**لم يتم تسجيل أي نقطة حتى الأن **
** أمثلة للأوامر: **
**:small_orange_diamond:** ${prefix}points ${message.author} 1 \`لتغيير نقاط شخص معين \`
**:small_orange_diamond:** ${prefix}points ${message.author} +1 \`لزيادة نقاط شخص معين\`
**:small_orange_diamond:** ${prefix}points ${message.author} -1 \`لأزالة نقطة من شخص معين \`
**:small_orange_diamond:** ${prefix}points ${message.author} 0 \`لتصفير نقاط شخص معين \`
**:small_orange_diamond:** ${prefix}points reset \`لتصفير جميع النقاط\`
`)
.setFooter('Requested by '+message.author.username, message.author.avatarURL)
.setColor(`#e60909`)
  const error  = new Discord.RichEmbed()
.setDescription(`
**:x: | يجب كتابة الأمر بشكل صحيح. **
** أمثلة للأوامر: **
**:small_orange_diamond:** ${prefix}points ${message.author} 1 \`لتغيير نقاط شخص معين \`
**:small_orange_diamond:** ${prefix}points ${message.author} +1 \`لزيادة نقاط شخص معين\`
**:small_orange_diamond:** ${prefix}points ${message.author} -1 \`لأزالة نقطة من شخص معين \`
**:small_orange_diamond:** ${prefix}points ${message.author} 0 \`لتصفير نقاط شخص معين \`
**:small_orange_diamond:** ${prefix}points reset \`لتصفير جميع النقاط\``)
.setFooter('Requested by '+message.author.username, message.author.avatarURL)
.setColor(`#e60909`)
if(command == prefix + 'points') {
     
        if(!message.guild.member(Lion.user).hasPermission('EMBED_LINKS')) return message.channel.send(':no_entry: | I dont have Embed Links permission.');
        if(!args[1]) {
            if(!points) return message.channel.send(embed);
            var members = Object.values(points);
            var memb = members.filter(m => m.points >= 1);
            if(memb.length == 0) return message.channel.send(embed);
            var x = 1;
            let pointsTop = new Discord.RichEmbed()
            .setAuthor('Points:')
            .setColor('#FBFBFB')
            .setDescription(memb.sort((second, first) => first.points > second.points).slice(0, 10).map(m => `**:small_blue_diamond:** <@${m.id}> \`${m.points}\``).join('n'))
            .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
            message.channel.send({
                embed: pointsTop
            });
        }else if(args[1] == 'reset') {
            let pointsReset = new Discord.RichEmbed()
            .setDescription('**:white_check_mark: | تم تصفير جميع النقاظ بنجاح**')//Toxic Codes // n3k4a is one
            .setFooter('Requested by '+message.author.username, message.author.avatarURL)//Toxic Codes // n3k4a is one
            if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("You dont have Manage Server permission.");
            if(!points) return message.channel.send(pointsReset);//Toxic Codes // n3k4a is one
            var members = Object.values(points);
            var memb = members.filter(m => m.points >= 1);
            if(memb.length == 0) return message.channel.send(pointsReset);
            points = {};
            message.channel.send(pointsReset);
        }else if(userM) {
            if(!message.member.hasPermission('MANAGE_GUILD')) return  message.channel.send("You dont have Manage Server permission.");
            if(!points[userM.user.id]) points[userM.user.id] = {
                points: 0,
                id: userM.user.id
            };
            if(!args[2]) {
                if(points[userM.user.id].points == 0) return message.channel.send( `${userM.user.username} Not have any points.`);
                var userPoints = new Discord.RichEmbed()
                .setColor('#d3c325')
                .setAuthor(`${userM.user.username} have ${points[userM.user.id].points} points.`);
                message.channel.send({
                    embed: userPoints
                });
            }else if(args[2] == 'reset') {
                if(points[userM.user.id].points == 0) return message.channel.send(error);
                points[userM.user.id].points = 0;
                message.channel.send(`Successfully reset ${userM.user.username} points.`);
            }else if(args[2].startsWith('+')) {
                args[2] = args[2].slice(1);
                args[2] = parseInt(Math.floor(args[2]));
                if(points[userM.user.id].points == 1000000) return message.channel.send(error);
                if(!args[2]) return message.channel.send(error);
                if(isNaN(args[2])) return message.channel.send(error);
                if(args[2] > 1000000) return message.channel.send(error);
                if(args[2] < 1) return message.channel.send(error);
                if((points[userM.user.id].points + args[2]) > 1000000) args[2] = 1000000 - points[userM.user.id].points;
                points[userM.user.id].points += args[2];
                let add = new Discord.RichEmbed()
                .setDescription(`**:small_blue_diamond:** <@${userM.id}> \`${points[userM.user.id].points}\``)
                .setAuthor('Points:')
                .setColor('#FBFBFB')
                .setFooter('Requested by' + message.author.username, message.author.avatarURL)
                message.channel.send(add);
            }else if(args[2].startsWith('-')) {
                args[2] = args[2].slice(1);
                args[2] = parseInt(Math.floor(args[2]));
                if(points[userM.user.id].points == 0) return message.channel.send(error);
                if(!args[2]) return message.channel.send(error);
                if(isNaN(args[2])) return message.channel.send(error);
                if(args[2] > 1000000) return message.channel.send(error);
                if(args[2] < 1) return message.channel.send(error);
                if((points[userM.user.id].points - args[2]) < 0) args[2] = points[userM.user.id].points;
                points[userM.user.id].points -= args[2];
                    let rem = new Discord.RichEmbed()
                .setDescription(`**:small_blue_diamond:** <@${userM.id}> \`${points[userM.user.id].points}\``)
                .setAuthor('Points:')
                .setColor('#FBFBFB')
                .setFooter('Requested by' + message.author.username, message.author.avatarURL)
                message.channel.send(rem);
            }else if(!args[2].startsWith('+') || !args[2].startsWith('-')) {
                args[2] = parseInt(Math.floor(args[2]));
                if(isNaN(args[2])) return message.channel.send(error);
                if(args[2] > 1000000) return message.channel.send(error);
                if(args[2] < 1) return message.channel.send(error);
                if(points[userM.user.id].points == args[2]) return message.channel.send(`${userM.user.username} points is already ${args[2]}.`);
                points[userM.user.id].points = args[2];
                    let set = new Discord.RichEmbed()
                .setDescription(`**:small_blue_diamond:** <@${userM.id}> \`${points[userM.user.id].points}\``)
                .setAuthor('Points:')
                .setColor('#FBFBFB')
                .setFooter('Requested by' + message.author.username, message.author.avatarURL)
                message.channel.send(set);
            }
            }
            }
      fs.writeFile("./points.json", JSON.stringify(points) ,(err) =>{//Toxic Codes // n3k4a is one
          if (err) console.log(err.message);
      });//Toxic Codes // n3k4a is one
 
});
const welcome = JSON.parse(fs.readFileSync('./welcomer.json' , 'utf8'));
Lion.on('message', async message => {
    let messageArray = message.content.split(" ");
   if(message.content.startsWith(prefix + "setLeave")) {
             
    let filter = m => m.author.id === message.author.id;
    let thisMessage;
    let thisFalse;
 
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send('You don\'t have permission').then(msg => {
       msg.delete(4500);
       message.delete(4500);
    });
   
    message.channel.send(':pencil: **| من فضلك اكتب الرساله الان... :pencil2: **').then(msg => {
 
        message.channel.awaitMessages(filter, {
          max: 1,
          time: 90000,
          errors: ['time']
        })
        .then(collected => {
            collected.first().delete();
            thisMessage = collected.first().content;
            let boi;
            msg.edit(':scroll: **| اكتب اسم الروم الان... :pencil2: **').then(msg => {
     
                message.channel.awaitMessages(filter, {
                  max: 1,
                  time: 90000,
                  errors: ['time']
                })
                .then(collected => {
                    collected.first().delete();
                    boi = collected.first().content;
                    msg.edit('✅ **| تم الاعداد بنجاح...  **').then(msg => {
       
                      message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 90000,
                        errors: ['time']
                      })
                      let embed = new Discord.RichEmbed()
                      .setTitle('**Done The Leave Msg Code Has Been Setup**')
                      .addField('Message:', `${thisMessage}`)
                      .addField('Channel:', `${boi}`)
                      .setThumbnail(message.author.avatarURL)
                      .setFooter(`${Lion.user.username}`)
                     message.channel.sendEmbed(embed)
    welcome[message.guild.id] = {
leavechannel: boi,
leavemsg: thisMessage,
onoff: 'On',
leave: 'On'
    }
    fs.writeFile("./welcomer.json", JSON.stringify(welcome), (err) => {
    if (err) console.error(err)
  })
   }
            )
        })
    })
})
    })
}})
   
Lion.on('message', message => {
           if (!message.channel.guild) return;
 
    let room = message.content.split(" ").slice(1);
    let findroom = message.guild.channels.find('name', `${room}`)
    if(message.content.startsWith(prefix + "setWelcomer")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
if(!room) return message.channel.send('Please Type The Channel Name')
if(!findroom) return message.channel.send('Cant Find This Channel')
let embed = new Discord.RichEmbed()
.setTitle('**Done The Welcome Code Has Been Setup**')
.addField('Channel:', `${room}`)
.addField('Requested By:', `${message.author}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${Lion.user.username}`)
message.channel.sendEmbed(embed)
welcome[message.guild.id] = {
channel: room,
onoff: 'On',
by: 'On',
dm: 'Off',
leave: 'Off'
}
fs.writeFile("./welcomer.json", JSON.stringify(welcome), (err) => {
if (err) console.error(err)
})
    }})
   
 
            Lion.on('message', message => {
 
    if(message.content.startsWith(prefix + "toggleLeave")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
        if(!welcome[message.guild.id]) welcome[message.guild.id] = {
            onoff: 'Off',
          leave: 'Off'
        }
          if(welcome[message.guild.id].leave === 'Off') return [message.channel.send(`**The Leave Msg Is __𝐎𝐍__ !**`), welcome[message.guild.id].leave = 'On']
          if(welcome[message.guild.id].leave === 'On') return [message.channel.send(`**The Leave Msg Is __𝐎𝐅𝐅__ !**`), welcome[message.guild.id].leave = 'Off']
          fs.writeFile("./welcome.json", JSON.stringify(welcome), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            })
          }
         
        })
Lion.on('message', message => {
 
    if(message.content.startsWith(prefix + "toggleWelcome")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
        if(!welcome[message.guild.id]) welcome[message.guild.id] = {
          onoff: 'Off'
        }
          if(welcome[message.guild.id].onff === 'Off') return [message.channel.send(`**The Welcome Is __𝐎𝐍__ !**`), welcome[message.guild.id].onoff = 'On']
          if(welcome[message.guild.id].onoff === 'On') return [message.channel.send(`**The Welcome Is __𝐎𝐅𝐅__ !**`), welcome[message.guild.id].onoff = 'Off']
          fs.writeFile("./welcome.json", JSON.stringify(welcome), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            })
          }
         
        })
       
 
       
        Lion.on('message', message => {
 
    if(message.content.startsWith(prefix + "toggleDmwelcome")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
        if(!welcome[message.guild.id]) welcome[message.guild.id] = {
          dm: 'Off'
        }
          if(welcome[message.guild.id].dm === 'Off') return [message.channel.send(`**The Welcome Dm Is __𝐎𝐍__ !**`), welcome[message.guild.id].dm = 'On']
          if(welcome[message.guild.id].dm === 'On') return [message.channel.send(`**The Welcome Dm Is __𝐎𝐅𝐅__ !**`), welcome[message.guild.id].dm = 'Off']
          fs.writeFile("./welcome.json", JSON.stringify(welcome), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            })
          }
         
        })
 
        Lion.on('message', message => {
 
            if(message.content.startsWith(prefix + "toggleInvitedby")) {
                if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
                if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
                if(!welcome[message.guild.id]) welcome[message.guild.id] = {
                  by: 'Off'
                }
                  if(welcome[message.guild.id].by === 'Off') return [message.channel.send(`**The Invited By Is __𝐎𝐍__ !**`), welcome[message.guild.id].by = 'On']
                  if(welcome[message.guild.id].by === 'On') return [message.channel.send(`**The Invited By Is __𝐎𝐅𝐅__ !**`), welcome[message.guild.id].by = 'Off']
                  fs.writeFile("./welcome.json", JSON.stringify(welcome), (err) => {
                    if (err) console.error(err)
                    .catch(err => {
                      console.error(err);
                  });
                    })
                  }
                 
                })
      Lion.on("guildMemberRemove", member => {
            if(!welcome[member.guild.id]) welcome[member.guild.id] = {
          onoff: 'Off',
          leave: 'Off'
        }
       
        if(welcome[member.guild.id].onoff === 'Off') return;
                if(welcome[member.guild.id].leave === 'Off') return;
    let welcomer = member.guild.channels.find('name', `${welcome[member.guild.id].leavechannel}`)
    if(!welcomer) return;
     welcomer.send(`${member} ${welcome[member.guild.id].leavemsg}`);
      })          
 
Lion.on("guildMemberAdd", member => {
            if(!welcome[member.guild.id]) welcome[member.guild.id] = {
          onoff: 'Off'
        }
        if(welcome[member.guild.id].onoff === 'Off') return;
    let welcomer = member.guild.channels.find('name', `${welcome[member.guild.id].channel}`)
    let memberavatar = member.user.avatarURL
      if (!welcomer) return;
      if(welcomer) {
         moment.locale('ar-ly');
         var h = member.user;
        let heroo = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(h.avatarURL)
        .setAuthor(h.username,h.avatarURL)
        .addField(': تاريخ دخولك الدسكورد',`${moment(member.user.createdAt).format('D/M/YYYY h:mm a')} **\n** \`${moment(member.user.createdAt).fromNow()}\``,true)
         .setFooter(`${h.tag}`,"https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif")
     welcomer.send({embed:heroo});
     fs.writeFile("./welcome.json", JSON.stringify(welcome), (err) => {
        if (err) console.error(err)
        .catch(err => {
          console.error(err);
      });
        })
      }})
 
 
 
Lion.on('guildMemberAdd',async member => {
            if(!welcome[member.guild.id]) welcome[member.guild.id] = {
          onoff: 'Off'
        }
    if(welcome[member.guild.id].onoff === 'Off') return;
    const Canvas = require('canvas');
    const jimp = require('jimp');
    const w = ['./welcome_4.png'];
          let Image = Canvas.Image,
              canvas = new Canvas(800, 300),
              ctx = canvas.getContext('2d');
          ctx.patternQuality = 'bilinear';
          ctx.filter = 'bilinear';
          ctx.antialias = 'subpixel';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
          ctx.shadowOffsetY = 2;
          ctx.shadowBlur = 2;
          ctx.stroke();
          ctx.beginPath();
   
          fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
              if (err) return console.log(err);
              let BG = Canvas.Image;
              let ground = new Image;
              ground.src = Background;
              ctx.drawImage(ground, 0, 0, 800, 300);
   
  })
   
                  let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".png" : member.user.displayAvatarURL;
                  jimp.read(url, (err, ava) => {
                      if (err) return console.log(err);
                      ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                   if (err) return console.log(err);
   
            ctx.font = '36px Arial';
            ctx.fontSize = '72px';
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(member.user.username, 545, 177);
           
            ctx.font = '16px Arial Bold';
            ctx.fontSize = '72px';
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(`Your The Member ${member.guild.memberCount}`, 580, 200);
           
            let Avatar = Canvas.Image;
            let ava = new Avatar;
            ava.src = buf;
            ctx.beginPath();
            ctx.arc(169.5, 148, 126.9, -100, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(ava, 36, 21, 260, 260);
             
            let c = member.guild.channels.find('name', `${welcome[member.guild.id].channel}`)
            if(!c) return;
            c.sendFile(canvas.toBuffer());
            fs.writeFile("./welcome.json", JSON.stringify(welcome), (err) => {
                if (err) console.error(err)
                .catch(err => {
                  console.error(err);
              });
                })
   
  });
  });
  });
 
  const invites = {};
 
const wait = require('util').promisify(setTimeout);
 
Lion.on('ready', () => {
  wait(1000);
 
  Lion.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});
 
Lion.on('guildMemberAdd', member => {
                    if(!welcome[member.guild.id]) welcome[member.guild.id] = {
                  by: 'Off'
                }
    if(welcome[member.guild.id].by === 'Off') return;
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = Lion.users.get(invite.inviter.id);
    const logChannel = member.guild.channels.find(channel => channel.name === `${welcome[member.guild.id].channel}`);
    if(!logChannel) return;
      setTimeout(() => {
    logChannel.send(`Invited By: <@${inviter.id}>`);
  },2000)
  fs.writeFile("./welcome.json", JSON.stringify(welcome), (err) => {
    if (err) console.error(err)
    .catch(err => {
      console.error(err);
  });
    });
  });
});
 
Lion.on("guildMemberAdd", member => {
                    if(!welcome[member.guild.id]) welcome[member.guild.id] = {
                  dm: 'Off'
                }
        if(welcome[member.guild.id].dm === 'Off') return;
  member.createDM().then(function (channel) {
  return channel.send(`:rose:  ولكم نورت السيرفر:rose:
:crown:اسم العضو  ${member}:crown:  
انت العضو رقم ${member.guild.memberCount} `)
}).catch(console.error)
fs.writeFile("./welcome.json", JSON.stringify(welcome), (err) => {
    if (err) console.error(err)
    .catch(err => {
      console.error(err);
  });
    })
})
// Bot Configs:

const Client = new Discord.Client() // Discord Client
Client.commands = new Discord.Collection() // Discord Collection For Commands
Client.aliases = new Discord.Collection() // Discord Collection For Aliases

// SQLite And Databases:
SQLite.open(path.join(__dirname, 'profile.sql')) // Read SQL file
.then(() => {
  console.log('Opened')
  SQLite.run(`CREATE TABLE IF NOT EXISTS profileSystem (id VARCHAR(30), credits BIGINT, lastDaily BIGINT, xp BIGINT, level BIGINT, rep BIGINT, lastRep BIGINT, info TEXT, inventory JSON, profileData JSON)`)
})
.catch(err => console.error(err))

// Commands Here
let cmds = {
  profile: { cmd: 'بروفايل', a: ['بروفايلي'] },
  setinfo: { cmd: 'معلوماتي', a: ['معلوماتي تعديل'] },
  rep: { cmd: 'لايك', a: ['اعجاب'] },
  credits: { cmd: 'فلوسي', a: ['رصيدي'] },
  daily: { cmd: 'هدية', a: ['هديه'] },
  transfer: { cmd: 'تحويل' },
  add: { cmd: 'فلوس' },
  buy: { cmd: 'شراء' },
  set: { cmd: 'خلفية', a: ['خلفيه'] },
  preview: { cmd: 'تجربة', a: ['تجربه'] },
  mywalls: { cmd: 'خلفياتي' }
}

// Register Commands
Object.keys(cmds).forEach(key => {
var value = cmds[key];
  var command = value.cmd;
  Client.commands.set(command, command);

  if(value.a) {
    value.a.forEach(alias => {
    Client.aliases.set(alias, command)
  })
  }
})

// Functions
let funcs = {

  generateInt: (low, high) => {
    return Math.floor(Math.random() * (high - low + 1) + low);
  },
  getLevelFromExp: (exp) => {
    let level = 0;

        while (exp >= funcs.getLevelExp(level)) {
            exp -= funcs.getLevelExp(level);
            level++;
        }

        return level;
  },
  getLevelExp: (level) => {
    return 5 * (Math.pow(level, 2)) + 50 * level + 100;
  }

}

// Code Begin Here ..

Client.on('ready', () => { // When Bot is ready
  console.log(`Bot is launched.`);
})

Client.on('message', async msg => { // When Bot is recived message
  if(msg.author.bot) return; // If Message author is bot dont reply to it .

  SQLite.get(`SELECT * FROM profileSystem WHERE id = '${msg.author.id}'`).then(res => {

    var s;

    let xp = funcs.generateInt(1, 5); // Generate XP

    if(!res) s = `INSERT INTO profileSystem VALUES ('${msg.author.id}', 200, 0, ${xp}, 0, 0, 0, "Type ${prefix}setinfo to set info", '{}', '{"wallSrc": "/walls/p2.png"}')`

    if(res) {

      xp = res.xp + xp;

      console.log(xp);

      let level = funcs.getLevelFromExp(xp);
      console.log(level);
      let lvl = res.level;

      if(res.level != level) {
        lvl++;
        msg.channel.send('Level UP!, ' + msg.author + ' just reached level ' + level)
      }

      s = `UPDATE profileSystem SET xp = ${xp}, level = ${lvl} WHERE id = '${msg.author.id}'`

    }

    SQLite.run(s);

  }).catch(err => console.error(err))

    const prefixMention = new RegExp(`^<@!?${Client.user.id}>( |)$`);
    if (msg.content.match(prefixMention)) {
      return msg.reply(`My prefix is \`${prefix}\``);
    }

    if(!msg.content.startsWith(prefix)) return undefined;

    let args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    let cmd = Client.commands.get(command) || Client.commands.get(Client.aliases.get(command))

    if(msg.content.startsWith(prefix + 'test')) {

      let res = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${msg.author.id}'`)

      if(args[0] == 'delete') {
        SQLite.run(`DELETE * FROM profileSystem`)
        msg.channel.send('Deleted !')
      } else if(args[0] == 'reps') {

        msg.channel.send(`Reps: ${res.rep}`)

      } else {

      msg.channel.send(`XP:${res.xp}, Level:${res.level}`)
      }
    }

    if(cmd == 'فلوسي') {

      let user = msg.mentions.users.first() || msg.author;

      let res = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${user.id}'`)
      if(!res) SQLite.run(`INSERT INTO profileSystem VALUES ('${msg.author.id}', 200, 0, ${xp}, 0, 0, 0, "Type ${prefix}setinfo to set info", "{}", "{wallSrc: '/walls/p2.png'}"`)

      let credits;

      if(!res) credits = 0;
      else credits = res.credits;

      if(!msg.mentions.users.first()) {

      msg.channel.send(`**Your 💳 balance is: **\`$${credits}\``)

    } else {

      if(msg.mentions.users.first().bot) return msg.channel.send('The Bots doesn\'t have credits.')


      msg.channel.send(`**${user.tag} 💳 balance is: **\`$${credits}\``)

      }

  } else if(cmd == 'هدية') {

    let daily = 86400000;
    let amount = funcs.generateInt(100, 300)

    let res = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${msg.author.id}'`)
    if(!res) SQLite.run(`INSERT INTO profileSystem VALUES ('${msg.author.id}', 200, 0, ${xp}, 0, 0, 0, "Type ${prefix}setinfo to set info", "{}", "{wallSrc: '/walls/p2.png'}"`)

    let curDaily = res.lastDaily;

    let credits = res.credits;

    if(curDaily != null && daily - (Date.now() - curDaily) > 0) {

      let timeObj = ms(daily - (Date.now() - curDaily));

      msg.channel.send(`You already collected your daily, try again after ${timeObj.hours} Hours, ${timeObj.minutes} Minutes and ${timeObj.seconds} Seconds.`)

    } else {

      msg.channel.send(`You have successfully collected your daily reward: \`${amount}\``);

      SQLite.run(`UPDATE profileSystem SET credits = ${credits + amount}, lastDaily = ${Date.now()} WHERE id = '${msg.author.id}'`);

    }

  } else if(cmd == 'لايك') {

    let rep = 86400000;

    let men = msg.mentions.users.first();

    if(!men) return msg.channel.send('Please mention the user you want to give him rep.');

    if(men.id === msg.author.id) return msg.channel.send('You can\'t give yourself.');

    if(men.bot) return msg.channel.send('You can\'t give bots rep, but you can give me a rep.')

    let resOfMen = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${men.id}'`);
    let resOfAuthor = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${msg.author.id}'`)
    if(!resOfMen) SQLite.run(`INSERT INTO profileSystem VALUES ('${men.id}', 200, 0, 0, 0, 0, 0, "Type ${prefix}setinfo to set info", "")`)
    if(!resOfAuthor) SQLite.run(`INSERT INTO profileSystem VALUES ('${msg.author.id}', 200, 0, ${xp}, 0, 0, 0, "Type ${prefix}setinfo to set info", "{}", "{wallSrc: '/walls/p2.png'}"`)

    let curRep = resOfAuthor.lastRep;

    if(curRep != null && rep - (Date.now() - curRep) > 0) {

      let timeObj = ms(rep - (Date.now() - curRep));

      msg.channel.send(`You already gived your reputation point to someone, try again after ${timeObj.hours} Hours, ${timeObj.minutes} Minutes and ${timeObj.seconds} Seconds.`)

    } else {

      msg.channel.send(`You have successfully gived ${men} a reputation point!`)

      SQLite.run(`UPDATE profileSystem SET lastRep = ${Date.now()} WHERE id = '${msg.author.id}'`)
      SQLite.run(`UPDATE profileSystem SET rep = ${resOfMen.rep + 1} WHERE id = '${men.id}'`)

    }

  } else if(cmd == 'تحويل') {

    let men = msg.mentions.users.first();

    if(!men) return msg.channel.send('Please mention the user you want to transfer credits to him.');

    if(men.id === msg.author.id) return msg.channel.send('You can\'t transfer to yourself.');

    if(men.bot && men.id !== Client.user.id) return msg.channel.send('You can\'t transfer credits to bots.')

    let resOfMen = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${men.id}'`);
    let resOfAuthor = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${msg.author.id}'`)
    if(!resOfMen) SQLite.run(`INSERT INTO profileSystem VALUES ('${men.id}', 200, 0, 0, 0, 0, 0, "Type ${prefix}setinfo to set info", "")`)
    if(!resOfAuthor) SQLite.run(`INSERT INTO profileSystem VALUES ('${msg.author.id}', 200, 0, ${xp}, 0, 0, 0, "Type ${prefix}setinfo to set info", "{}", "{wallSrc: '/walls/p2.png'}"`)

    let creditsOfMen = resOfMen.credits;
    let creditsOfAuthor = resOfAuthor.credits;

    if(!args[1] || isNaN(args[1])) return msg.channel.send('Please input number of credits to transfer it.');

    if(parseInt(args[1]) > creditsOfAuthor) return msg.channel.send('You don\'t have enough credits to do this.');

    let newAuthorCredits = (creditsOfAuthor - parseInt(args[1]));
    let newMenCredits = (creditsOfMen + parseInt(args[1]));

    SQLite.run(`UPDATE profileSystem SET credits = ${newAuthorCredits} WHERE id = '${msg.author.id}'`);
    SQLite.run(`UPDATE profileSystem SET credits = ${newMenCredits} WHERE id = '${men.id}'`);

    msg.channel.send(`${msg.author} has tranfered \`$${args[1]}\` to ${men}.`)


  } else if(cmd == 'فلوس') {

    if(!ids.includes(msg.author.id)) return;

    let men = msg.mentions.users.first() || msg.author;

    if(men.bot) return msg.channel.send('Bots dosen\'t have credits.');

    let res = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${men.id}'`);
    if(!res) SQLite.run(`INSERT INTO profileSystem VALUES ('${men.id}', 200, 0, 0, 0, 0, 0, "Type ${prefix}setinfo to set info", "")`)

    let resu;

    if(men.id === msg.author.id && !msg.mentions.users.first()) resu = args[0];
    else resu = args[1];

    if(!resu || isNaN(resu)) return msg.channel.send('Please input number to add it.');

    SQLite.run(`UPDATE profileSystem SET credits = ${res.credits + parseInt(resu)} WHERE id = '${men.id}'`)

    msg.channel.send('Added!')

  } else if(cmd == 'معلوماتي') {

    let res = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${msg.author.id}'`);
    if(!res) SQLite.run(`INSERT INTO profileSystem VALUES ('${msg.author.id}', 200, 0, ${xp}, 0, 0, 0, "Type ${prefix}setinfo to set info", "{}", "{wallSrc: '/walls/p2.png'}"`)

    if(!args[0]) return msg.channel.send('Please input info to set it.');

    SQLite.run(`UPDATE profileSystem SET info = "${args.join(' ')}" WHERE id = '${msg.author.id}'`)

    msg.channel.send('Your info set to: **' + args.join(' ') + '**')

  } else if(cmd == 'شراء') {

    let res = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${msg.author.id}'`);
    if(!res) SQLite.run(`INSERT INTO profileSystem VALUES ('${msg.author.id}', 200, 0, ${xp}, 0, 0, 0, "Type ${prefix}setinfo to set info", "{}", "{wallSrc: '/walls/p2.png'}"`)

    let hisWalls = res.inventory;

    let wallsShop = config.wallpapers;

    let credits = res.credits;

    if(!args[0] || isNaN(args[0])) return msg.channel.send('Please Select Wallpaper Number.');

    let json = JSON.parse(hisWalls);

    if(!json.walls) json = {
      walls: {}
    };

    if(!wallsShop[args[0]]) return msg.channel.send('There is no wallpaper with this number.')

    if(json.walls[args[0]] == wallsShop[args[0]]) return msg.channel.send('You already bought this wallpaper.');

    if(credits < wallsShop[args[0]].price) return msg.channel.send('You don\'t have enough credits to buy this wallpaper');

    json.walls[args[0]] = wallsShop[args[0]];

    let updatedJson = JSON.stringify(json);

    SQLite.run(`UPDATE profileSystem SET inventory = json('${updatedJson}'), credits = ${credits - wallsShop[args[0]].price} WHERE id = '${msg.author.id}'`)

    msg.channel.send(`You have successfully purchased wallpaper No.${args[0]} With Price: \`$${wallsShop[args[0]].price}\``)

  } else if(cmd == 'خلفية') {

    let res = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${msg.author.id}'`)
    if(!res) SQLite.run(`INSERT INTO profileSystem VALUES ('${msg.author.id}', 200, 0, ${xp}, 0, 0, 0, "Type ${prefix}setinfo to set info", "{}", "{wallSrc: '/walls/p2.png'}"`)

    let hisWalls = res.inventory;

    if(!args[0] || isNaN(args[0])) return msg.channel.send('Please Select Wallpaper Number.');

    let json = JSON.parse(hisWalls)

    if(!json.walls[args[0]]) return msg.channel.send('You don\'t have this wallpaper in your inventory.');

    let proData = res.profileData;

    let data = JSON.parse(proData);

    data.wallSrc = json.walls[args[0]].src;

    SQLite.run(`UPDATE profileSystem SET profileData = json('${JSON.stringify(data)}') WHERE id = '${msg.author.id}'`);

    msg.channel.send(`Your profile image has been set.`);

  } else if(cmd == 'تجربة') {

    let wallpapers = config.wallpapers;

    if(!args[0] || isNaN(args[0])) return msg.channel.send('Please Select Wallpaper Number.');

    if(!wallpapers[args[0]]) return msg.channel.send('There is no wallpaper with this number.')

    let Image = Canvas.Image,
    canvas = Canvas.createCanvas(300, 300),
    ctx = canvas.getContext('2d');
fs.readFile(__dirname + `/${wallpapers[args[0]].src}`, function (err, Background) {
  fs.readFile(__dirname + `/walls/p1.png`, function (err, Background) {
  if (err) return console.log(err);
  let BG = Canvas.Image;
  let ground = new Image;
  ground.src = Background;
  ctx.drawImage(ground, 0, 0, 297, 305);
});
  if (err) return console.log(err);
  let BG = Canvas.Image;
  let ground = new Image;
  ground.src = Background;
  ctx.drawImage(ground, 0, 0, 300, 305);
});

  setTimeout(() => {
  msg.channel.send({file:canvas.toBuffer()})
}, 2000)
  } else if(cmd == 'خلفياتي') {

    let res = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${msg.author.id}'`);

    let data = JSON.parse(res.inventory);

    if(!data.walls) return msg.channel.send('You don\'t have any wallpapers in your inventory');

    let wallsArray = [];

      for (const [key, value] of Object.entries(data.walls)) {
        console.log(`${key} ${JSON.stringify(value)}`);

          wallsArray.push({number: key, s: value.src, p: value.price});

      }

    let embed = new Discord.RichEmbed()
    .setAuthor(`${msg.author.username}`, msg.author.displayAvatarURL)
    .setDescription(`Your Wallpapers:`)
    .setFooter(`Tip: To preview wallpaper try \`${prefix}تجربة\``)

    for (var wall in wallsArray) {
      embed.addField(`Wallpaper No.${wallsArray[wall].number}`, `Price: ${wallsArray[wall].p}`, true)
    }

    msg.channel.send(embed)

  } else if(cmd == 'بروفايل') {

    let getvalueof = msg.mentions.users.first() || msg.author;

    let res = await SQLite.get(`SELECT * FROM profileSystem WHERE id = ${getvalueof.id}`)

    if(!res) SQLite.run(`INSERT INTO profileSystem VALUES ('${msg.author.id}', 200, 0, ${xp}, 0, 0, 0, "Type ${prefix}setinfo to set info", "{}", "{wallSrc: '/walls/p2.png'}"`)


    let Image = Canvas.Image,
    canvas = Canvas.createCanvas(300, 300),
    ctx = canvas.getContext('2d');
fs.readFile(__dirname + `/${JSON.parse(res.profileData).wallSrc}`, function (err, Background) {
  fs.readFile(__dirname + `/walls/p1.png`, function (err, Background) {
  if (err) return console.log(err);
  let BG = Canvas.Image;
  let ground = new Image;
  ground.src = Background;
  ctx.drawImage(ground, 0, 0, 297, 305);
});
  if (err) return console.log(err);
  let BG = Canvas.Image;
  let ground = new Image;
  ground.src = Background;
  ctx.drawImage(ground, 0, 0, 300, 305);
});


let url = getvalueof.displayAvatarURL.endsWith(".webp") ? getvalueof.displayAvatarURL.slice(5, -20) + ".png" : getvalueof.displayAvatarURL;
Jimp.read(url, (err, ava) => {
    if (err) return console.log(err);
    ava.getBuffer(Jimp.MIME_PNG, async (err, buf) => {
        if (err) return console.log(err);


        //Avatar
       let Avatar = Canvas.Image;
        let ava = new Avatar;
        ava.src = buf;
     ctx.drawImage(ava, 8, 43, 80, 85); // احداثيات صورتك

        //ur name
        ctx.font = 'bold 16px profile'; // حجم الخط و نوعه
        ctx.fontSize = '40px'; // عرض الخط
        ctx.fillStyle = "#FFFFFF"; // لون الخط
        ctx.textAlign = "left"; // محاذا ة النص
        ctx.fillText(`${getvalueof.username}`, 100, 125) // احداثيات اسمك

         //bord
         let leaderboard = await SQLite.all(`SELECT * FROM profileSystem ORDER BY xp DESC, credits DESC`);
        ctx.font = "regular 12px profile" // نوع الخط وحجمه
        ctx.fontSize = '50px'; // عرض الخط
        ctx.fillStyle = "#FFFFFF" // لون الخط
        ctx.textAlign = "left"; // محاذا ة
        for(var i = 0;i<leaderboard.length;i++) {
          if(leaderboard[i].id == getvalueof.id) {
            ctx.fillText(`#${i+1}`, 173, 200)
          }
        }


        //credit
        ctx.font = "bold 10px profile" // نوع الخط وحجمه
        ctx.fontSize = '10px'; // عرض الخط
        ctx.fillStyle = '#FFFFFF' // لون الخط
        ctx.textAlign = "left"; // محاذا ة النص
        ctx.fillText(`$ ${res.credits}`, 156, 163) // احداثيات المصاري

        //poits
        ctx.font = "bold 13px profile" // ن
        ctx.fontSize = '10px'; // عرض الخطوع الخط وحجمه
        ctx.fillStyle = "#FFFFFF" // لون الخط
        ctx.textAlign = "left"; // محاذا ة النص
        ctx.fillText(`${res.xp}`, 173, 182) // احداثيات النقاط

        //Level
        ctx.font = "bold 27px profile" // نوع الخط و حجمه
        ctx.fontSize = '50px'; // عرض الخط
        ctx.fillStyle = "#FFFFFF" // لون الخط
        ctx.textAlign = "left"; // محاذا ة النص
        ctx.fillText(`${res.level}`, 30, 200) // احداثيات اللفل

        //info
        ctx.font = "blod 13px profile" // ن
        ctx.fontSize = '10px'; // عرض الخطوع الخط وحجمه
        ctx.fillStyle = "#FFFFFF" // لون الخط
        ctx.textAlign = "left"; // محاذا ة النص
        ctx.fillText(`${res.info}`, 118, 40) // احداثيات النقاط

        // REP
        ctx.font = "bold 27px profile";
        ctx.fontSize = "100px";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "left";
        ctx.fillText(`+${res.rep}`, 18,270)

msg.channel.send("**:white_check_mark: `Show Profile` ➤**" + `${msg.author}`, {
file: canvas.toBuffer()
})
})
})


  }

});

Lion.login("MzkzNTQyODM5NDgyNTgxMDAz.XSm5kw.gfmHQGNH_f6379Xek3cm-6W8afo");
