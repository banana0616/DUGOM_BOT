const {Command} = require('discord.js-commando-kr')
const { MessageEmbed } = require("discord.js")
const axios = require("axios")

module.exports = class Heart extends Command {
    constructor(client) {
        super(client, {
            name: '하트확인',
            description: "KOREANBOTS 봇 하트정보를 확인합니다.",
            group: 'general',
            memberName: 'heart',
            args: [
                {
                    key: "user",
                    prompt: "어떤 분의 하트정보를 불러올까요?",
                    type: "user",
                    default: message => message.author
                }
            ]
        });
    }

    async run(message, { user }) {
        const res = await require("node-fetch")(`https://api.koreanbots.dev/bots/get/729291410842452019`).then(data => data.json());
        const embed = new MessageEmbed()
            .setFooter(`지금까지 받은 하트의 수 : ${res.data.votes}개`);

        axios.get(`https://api.koreanbots.dev/bots/voted/${user.id}`, {
            headers: {
                token: ``
            }
        }).then(res => {
            if (res.data.voted == true) {
                embed.setDescription(`**${user}님은 ${this.client.user.username} 에게 하트를 눌러 주셨군요**`).setColor("#739cde");
                message.channel.send(embed);
            } else {
                embed.setDescription(`**${user}님은 하트를 눌러주지 안았군요**\n**[[\`링크\`]](https://koreanbots.dev/bots/728070046529749043)에서 ${this.client.user.username} 에게 하트를 눌러주세요!**`).setColor(0xFF0000);
                message.channel.send(embed);
            }
        });
    }
}