const {CommandoClient} = require('discord.js-commando-kr')
const path = require('path')
const { ErelaClient } = require("erela.js")
const { MessageEmbed } = require("discord.js")

const client = new CommandoClient({
    owner: ['432160630682681347'],
    commandPrefix: '김치야 '
})

client.once("ready", () => {
    client.music = new ErelaClient(client, [
        {
            host: "localhost",
            port: 8000,
            password: "junkrat0616"
        }
    ])
    .on("trackStart", ({ textChannel }, { title, duration, identifier, uri }) => {
        const formatDuration = require("./utils/music/formatDuration");
        textChannel.send(new MessageEmbed().setTitle(`${title} • ${formatDuration(duration)}`).setURL(uri).setImage(`https://img.youtube.com/vi/${identifier}/maxresdefault.jpg`).setColor("#739cde"));
    })
    .on("queueEnd", player => {
        client.music.players.destroy(player.guild.id);
    })
    .on("trackEnd", player => {
        player.previous = player.futurePrevious;
    });
});

// Other Events

client.on("voiceStateUpdate", async (oldVoice, newVoice) => {
    const player = client.music.players.get(oldVoice.guild.id);
    if (!player) return;
    if (!newVoice.guild.members.cache.get(client.user.id).voice.channelID) client.music.players.destroy(player.guild.id);
    if (oldVoice.id === client.user.id) return;
    if (!oldVoice.guild.members.cache.get(client.user.id).voice.channelID) return;
    if (oldVoice.guild.members.cache.get(client.user.id).voice.channel.id === oldVoice.channelID) {
        if (oldVoice.guild.voice.channel && oldVoice.guild.voice.channel.members.size === 1) {
            const vcName = oldVoice.guild.me.voice.channel.name;
            const embed = new MessageEmbed()
                .setDescription(`❗ **남아있는 유저가 없어 \`${60000 / 1000}\`초 후 음성채널 \`${vcName}\` 에서 연결을 해제할게요.**`)
                .setColor(0xFF0000);

            const msg = await player.textChannel.send(embed);
            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(60000);

            const vcMembers = oldVoice.guild.voice.channel.members.size;
            if (!vcMembers || vcMembers === 1) {
                const newPlayer = client.music.players.get(newVoice.guild.id);
                if (newPlayer) {
                    client.music.players.destroy(newPlayer.guild.id);
                } else {
                    oldVoice.guild.voice.channel.leave();
                }

                const embed2 = new MessageEmbed()
                    .setDescription(`❗ **음성채널 \`${vcName}\` 에서 연결을 해제할게요.**`)
                    .setColor(0xFF0000);
                return player.textChannel.send("", embed2);
            } else {
                msg.delete();
            }
        }
    }
});

client.registry
    .registerDefaultTypes()
    .registerGroup('general', '기본 기능')
    .registerGroup('owner', '개발자 기능')
    .registerGroup('music', '음악 기능')
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on("ready", () => {
    console.log(`${client.user.tag}로 로그인하였습니다.`)
})

client.login(process.env.TOKEN)