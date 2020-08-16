const { Command } = require("discord.js-commando-kr"),
    { MessageEmbed } = require("discord.js");

module.exports = class ConnectCommand extends Command {
    constructor(client) {
        super(client, {
            name: "입장",
            group: "music",
            memberName: "connect",
            description: "음성채널에 연결합니다.",
            guildOnly: true
        });
    }

    async run(message) {
        const { channel } = message.member.voice;
        if (channel) {
            const player = this.client.music.players.spawn({
                guild: message.guild,
                voiceChannel: channel,
                textChannel: message.channel
            });

            message.channel.send(new MessageEmbed().setDescription(`🔊 **음성채널 \`${message.member.voice.channel.name}\` 에 연결했어요.**`).setColor("#739cde"));
        } else {
            message.channel.send(new MessageEmbed().setDescription(`❗ **${message.author} 님이 먼저 음성채널에 연결해야 해요.**`).setColor(0xFF0000));
        }
    }
}