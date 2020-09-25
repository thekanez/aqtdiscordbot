const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "Überspringe das aktuelle Lied",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
    if (!queue) return message.reply("Es wird grade nichts gespielt.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ hat das Lied übersprungen.`).catch(console.error);
  }
};
