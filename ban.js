const discord = require('discord.js')

const db = require('quick.db')

exports.run = async(client, message, args) => {



  let command = args[0];
  const elminster =  new discord.MessageEmbed()
  .setColor('#E70000')
  .setFooter('Örnek Kullanım : !!banss banyetkili @rol', client.user.avatarURL())
  . setDescription (` **Bir seçenek gir** \n> ban => Kullanıcıyı Banlar. \n> banyetkili => Ban Komutunu Kullanabilecek Kişiyi Ayarlar.\n> banlog => Banlanan Kişilerin Loglanacağı Yeri Ayarlar. \n> bansay => Sunucuda Kaç Banlı Üye Var Gösterir. \n> banlimit => Sunucuda ki Ban Limiti Ayarlar. \n> banlimit-sıfırla => Etiketlenen Kullanıcının Ban Limitini Sıfırlar. `)
  .setThumbnail(message.author.avatarURL({dynamic:true}))
  if(!command) return message.channel.send(elminster)
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**Bu komut için `sunucuyu yönet` izni gerekli!**").then(m => m.delete(10000))
    
  if(command.toLowerCase() === "banlog") {
    let  kanal = message.mentions.channels.first()
    if(!kanal) return message.channel.send(`Kanaletiketle`)
    db.set(`banlogss_${message.guild.id}`,kanal.id)
    message.channel.send(`  Ban Log Kanalı ${kanal} olarak ayarlandı`)
    
}
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**Bu komut için `sunucuyu yönet` izni gerekli!**").then(m => m.delete(10000))
    
  if(command.toLowerCase() === "banyetkili") {
    let rol = message.mentions.roles.first()
    if(!rol) return message.channel.send('rol etiketle')
    db.set(`banrolss_${message.guild.id}`,rol.id)
    message.channel.send(`Ban Yetkili Rol ${rol} olarak ayarlandi`)
    
    }
  if(message.author.id !== message.guild.owner.user.id) return message.channel.send(`Bu kullanmak için kurucu olmalısın.`)
   
  if(command.toLowerCase() === "banlimit") {
    
   if(!args[1]) return message.reply("Limiti girmedin!")
   if(isNaN(args[1])) return message.reply(`Limit Sadece Sayı Olabilir.`);

   db.set(`banlimitss_${message.guild.id}`, args[1])

  message.channel.send(`Ban Limiti \`${args[1]}\` Sayısına Ayarlandı!`);

    }
  if(message.author.id !== message.guild.owner.user.id) return message.channel.send(`Bu kullanmak için kurucu olmalısın.`)
   
  if(command.toLowerCase() === "banlimit-sıfırla") {
    let bansss = db.fetch(`banlogss_${message.guild.id}`)
    let etiket = message.mentions.users.first() 
    if(!etiket) return message.reply('Etiket ')
    db.set(`bansayiss_${etiket.id}`, 0)
    message.channel.send(` ${etiket} Adlı Kullanıcının Limiti ${message.author} tarafındansifirlandi`)
    client.channels.cache.get(bansss).send(` ${etiket} Adlı Kullanıcınin Ban Limiti Sıfırlandı  \n Sıfırlayan : ${message.author}`)
    }
  if(command.toLowerCase() === "ban") {
    let banlimitss = db.fetch(`banlimitss_${message.guild.id}`)
    let hahayt = db.fetch(`banrolss_${message.guild.id}`)
    let banlan = message.mentions.users.first() 
    let banlanlog = db.fetch(`banlogss_${message.guild.id}`)
    if(!message.member.roles.cache.has(db.fetch(`banrolss_${message.guild.id}`,hahayt))) return message.channel.send(`Yetkin  Yok`)
    if(!banlan)  return message.reply(`Etiket At` )
    if(!banlanlog) return message.reply(`Log Yok`)
   
   if (!banlimitss) return message.reply("Ban Sisteminin Limit'i Ayarlanmamış")
if (db.fetch(`bansayiss_${message.author.id}`) >= banlimitss) return message.reply(`Ban Limitin Doldu!, Bir Yetkili Sıfırlayana Kadar Kullanamassın!`)
     
message.guild.members.ban(banlan)
    db.add(`bansayiss_${message.author.id}`, 1)
    const faviningotunuskm = new discord.MessageEmbed()
    . setDescription (`<a:OnaylamakGif:753288622387494992> ${banlan} Banlandi oc ${message.author} Banladi`)
    client.channels.cache.get(banlanlog).send(faviningotunuskm)

  
    }
  if(command.toLowerCase() === "bansay") {
      if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**Bu komut için `sunucuyu yönet` izni gerekli!**").then(m => m.delete(10000))
    
    let elminsterR = message.guild;
  elminsterR
    .fetchBans()
    .then(elminster =>
    message.channel.send(` <a:OnaylamakGif:753288622387494992> Sunucunuzda ${elminster.size} banlanmış üye bulunmaktadır.`)
  )
    .catch(console.error);

  }
  
};
exports.conf = {

  name: true,

  guildonly: false,

  aliases: [],

  permlevel: 0

}

exports.help = {

  name: 'ban'

}
