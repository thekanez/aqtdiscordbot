const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Entpausiert das aktuelle Lied",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Es wird grade nichts gespielt.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`${message.author} ▶ hat das Lied entpausiert.`).catch(console.error);
    }

    return message.reply("Das Lied ist nicht pausiert.").catch(console.error);
  }
};
