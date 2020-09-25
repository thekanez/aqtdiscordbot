module.exports = {
  canModifyQueue(member) {
    const { channel } = member.voice;
    const botChannel = member.guild.me.voice.channel;

    if (channel !== botChannel) {
      member.send("Du musst dich in **einem Channel** befinden, bevor du den Befehl ausführen kannst.").catch(console.error);
      return false;
    }

    return true;
  }
};
