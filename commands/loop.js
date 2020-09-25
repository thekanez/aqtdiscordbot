const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "loop",
  aliases: ['l'],
  description: "Aktiviere/Deaktiviere Lied wiederholen",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Es wird grade nichts gespielt.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel
      .send(`Aktuelles Lied wiederholen ${queue.loop ? "**an**" : "**aus**"}`)
      .catch(console.error);
  }
};
