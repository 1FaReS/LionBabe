const Discord = require('discord.js');
const Lion = new Discord.Client();
const prefix = ["-"];
const botid = ['393542839482581003'];
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


Lion.on("message", message => {
  if (message.content === prefix + "help") {
           message.channel.sendMessage('**Done | :e_mail: **')
  }
});

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

${prefix}kick ==> - طرد العضو من السيرفر -
${prefix}ban ==> - حضر العضو من السيرفر -
${prefix}vkick ==> - طرد العضو من الروم الصوتي -
${prefix}unban ==> - فك الحضر عن العضو المحضور -
${prefix}bc ==> - ارسال رسالة جماعية لكل اعضاء السيرفر -
${prefix}mute ==> - لاسكات العضو -
${prefix}unmute ==> - لفك اسكات العضو -
${prefix}vc ==> - ينشأ روم فيه عدد الاعضاء المتواجدين في الرومات -
${prefix}vc ==> - ينشأ روم فيه عدد الاعضاء المتواجدين في السيرفر -
__ Other Commands _

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
        if (Fares.guild.channels.exists("name", "ticket-" + Fares.author.id)) return Fares.channel.send(`لديك تذكرة من الأساس :joy:`);
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
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            Fares.channel.send(`:white_check_mark: تـم فتح التذكرة , #${c.name}.`);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .addField(` ${message.author.username}!`, `**مرحبا    , لدنيا فريق المساعده ليساعدك في أقرب وقت . **`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error);
    }
    if (Fares.content === 'L#close') {
        if (!Fares.channel.name.startsWith(`L#ticket`)) return Fares.channel.send(`**لا تستطيع :x:**`);

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
    if(message.content == `${botid}`) {
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
          if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply('# - ملحوظة :  يجب ان يكون لديك برمشن أداري . ').then(msg => {
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
          .addField('# - السبب',reason)

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
Lion.on("message", message => {

          var args = message.content.substring(prefix.length).split(" ");
          if (message.content.startsWith(prefix + "clear")) {
 if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('⚠ | **ليس لديك صلاحيات**');
      var msg;
      msg = parseInt();

    message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
    message.channel.sendMessage("", {embed: {
      title: "Done | تــم",
      color: 0x06DF00,
      description: "تم مسح الرسائل بنجاح",
      footer: {
        text: "Lion"
      }
    }}).then(msg => {msg.delete(3000)});
                        }


});
Lion.on('message', message => {
  if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'bc')) {
if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
if(!message.member.hasPermission('ADMINISTRATOR')) return
message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
const args = message.content.split(" ").slice(1).join(" ")
const BcList = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setAuthor(`محتوى الرساله : ${args}`)
.setDescription(`**برودكاست بـ امبد 📝\nبرودكاست بدون امبد✏ \nلديك دقيقه للأختيار قبل الغاء البرودكاست**`)
if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(BcList).then(msg => {
msg.react('📝')
.then(() => msg.react('✏'))
.then(() =>msg.react('📝'))

var EmbedBcFilter = (reaction, user) => reaction.emoji.name === '📝' && user.id === message.author.id;
var NormalBcFilter = (reaction, user) => reaction.emoji.name === '✏' && user.id === message.author.id;

var EmbedBc = msg.createReactionCollector(EmbedBcFilter, { time: 60000 });
var NormalBc = msg.createReactionCollector(NormalBcFilter, { time: 60000 });


EmbedBc.on("collect", r => {

message.channel.send(`:ballot_box_with_check: تم ارسال الرساله بنجاح`).then(m => m.delete(5000));
message.guild.members.forEach(m => {
var EmbedRep = args.replace('<server>' ,message.guild.name).replace('<user>', m).replace('<by>', `${message.author.username}#${message.author.discriminator}`)
var bc = new
Discord.RichEmbed()
.setColor('RANDOM')
.setDescription(EmbedRep)
.setThumbnail(message.author.avatarURL)
m.send({ embed: bc })
msg.delete();
})
})
NormalBc.on("collect", r => {
 message.channel.send(`:ballot_box_with_check: تم ارسال الرساله بنجاح`).then(m => m.delete(5000));
message.guild.members.forEach(m => {
var NormalRep = args.replace('<server>' ,message.guild.name).replace('<user>', m).replace('<by>', `${message.author.username}#${message.author.discriminator}`)
m.send(NormalRep);
msg.delete();
})
})
})
}
});



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

Lion.login("MzkzNTQyODM5NDgyNTgxMDAz.Dstnug.zLexKviWtQoL-z6mnWCxJ_WfJVg");
