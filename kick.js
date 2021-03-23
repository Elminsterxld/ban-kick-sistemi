const discord = require('discord.js')

const db = require('quick.db')

exports.run = async(client, message, args) => {



  let command = args[0];
  const elminster =  new discord.MessageEmbed()
  .setColor('#E70000')
  .setFooter('Örnek Kullanım : !!kick kickyetkili @rol', client.user.avatarURL())
  . setDescription (` **Bir seçenek gir** \n> kick => \`Kullanıcıyı kickler.\` \n> kickyetkili => \`Kick Komutunu Kullanabilecek Kişiyi Ayarlar.\`\n> kicklog => \`Kicklenen Kişilerin Loglanacağı Yeri Ayarlar.\`\n> kicklimit => \`Sunucuda ki Kick Limiti Ayarlar.\` \n> kicklimit-sıfırla => \`Etiketlenen Kullanıcının KickLimitini Sıfırlar.\``)
  .setThumbnail(message.author.avatarURL({dynamic:true}))
  if(!command) return message.channel.send(elminster)
   
  if(command.toLowerCase() === "kicklog") {
     if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**Bu komut için `sunucuyu yönet` izni gerekli!**").then(m => m.delete(10000))
    
    let  kanal = message.mentions.channels.first()
    if(!kanal) return message.channel.send(`Kanaletiketle`)
    db.set(`kicklogss_${message.guild.id}`,kanal.id)
    message.channel.send(`Kick Log Kanalı ${kanal} olarak ayarlandı`)
    
}
   
  if(command.toLowerCase() === "kickyetkili") {
     if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**Bu komut için `sunucuyu yönet` izni gerekli!**").then(m => m.delete(10000))
    
    let rol = message.mentions.roles.first()
    if(!rol) return message.channel.send('rol etiketle')
    db.set(`kickrolss_${message.guild.id}`,rol.id)
    message.channel.send(`Kick Yetkili Rol ${rol} olarak ayarlandi`)
    
    }

  if(command.toLowerCase() === "kicklimit") {
      if(message.author.id !== message.guild.owner.user.id) return message.channel.send(`Bu kullanmak için kurucu olmalısın.`)
   
   if(!args[1]) return message.reply("Limiti girmedin!")
   if(isNaN(args[1])) return message.reply(`Limit Sadece Sayı Olabilir.`);

   db.set(`kicklimitss_${message.guild.id}`, args[1])

  message.channel.send(`Kick Limiti \`${args[1]}\` Sayısına Ayarlandı!`);

    }
  
  if(command.toLowerCase() === "kicklimit-sıfırla") {
      if(message.author.id !== message.guild.owner.user.id) return message.channel.send(`Bu kullanmak için kurucu olmalısın.`)
   
    let kicksss = db.fetch(`kicklogss_${message.guild.id}`)
    let etiket = message.mentions.users.first() 
    if(!etiket) return message.reply('Etiket ')
    db.set(`kicksayiss_${etiket.id}`, 0)
    message.channel.send(` ${etiket} Adlı Kullanıcının Limiti ${message.author} tarafındansifirlandi`)
    client.channels.cache.get(kicksss).send(` ${etiket} Adlı Kullanıcınin kick Limiti Sıfırlandı  \n Sıfırlayan : ${message.author}`)
    }
  if(command.toLowerCase() === "kick") {
    let kicklimitss = db.fetch(`kicklimitss_${message.guild.id}`)
    let hahayt = db.fetch(`kickrolss_${message.guild.id}`)
    let kicklan = message.mentions.users.first() 
    let kicklanlog = db.fetch(`kicklogss_${message.guild.id}`)
    if(!message.member.roles.cache.has(db.fetch(`kickrolss_${message.guild.id}`,hahayt))) return message.channel.send(`Yetkin  Yok`)
    if(!kicklan)  return message.reply(`Etiket At` )
    if(!kicklanlog) return message.reply(`Log Yok`)
   
   if (!kicklimitss) return message.reply("kick Sisteminin Limit'i Ayarlanmamış")
if (db.fetch(`kicksayiss_${message.author.id}`) >= kicklimitss) return message.reply(`kick Limitin Doldu!, Bir Yetkili Sıfırlayana Kadar Kullanamassın!`)
     
message.guild.member(kicklan).kick()
    db.add(`kicksayiss_${message.author.id}`, 1)
    const faviningotunuskm = new discord.MessageEmbed()
    . setDescription (`<a:OnaylamakGif:753288622387494992> ${kicklan} kicklendi oc ${message.author} kickledi`)
    client.channels.cache.get(kicklanlog).send(faviningotunuskm)

  
    }
  
  
  
};
exports.conf = {

  name: true,

  guildonly: false,

  aliases: [],

  permlevel: 0

}

exports.help = {

  name: 'kick'

}
