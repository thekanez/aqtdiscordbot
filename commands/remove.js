const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "remove",
  description: "Entfernt Lieder von der Warteschlange",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Es ist derzeit keine Playlist verfügbar.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`Benutze: **${message.client.prefix}remove <1-10>**`);
    if (isNaN(args[0])) return message.reply(`Benutze: **${message.client.prefix}remove <1-10>**`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} ❌ hat **${song[0].title}** von der Warteschlange entfernt.`);
  }
};
