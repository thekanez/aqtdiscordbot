const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Ändere die Lautstärke von dem aktuellen Lied",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("Es wird grade nichts gespielt.").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("Du musst dich in **einem Channel** befinden, bevor du den Befehl ausführen kannst.").catch(console.error);

    if (!args[0]) return message.reply(`🔊 Aktuelle Lautstärke: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("Benutze eine Zahl.").catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.reply("Bitte eine Zahl von 0 - 100").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`Lautstärke gesetzt auf: **${args[0]}%**`).catch(console.error);
  }
};
