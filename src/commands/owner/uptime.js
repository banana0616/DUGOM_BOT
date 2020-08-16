const {Command} = require('discord.js-commando-kr')
const {MessageEmbed} = require('discord.js')
const moment = require("moment-timezone");


module.exports = class Uptime extends Command {
    constructor(client) {
        super(client, {
            name: '업타임',
            description: 'uptime',
            group: 'owner',
            memberName: 'uptime',
            ownerOnly: true
        });
    }

    run(message) {
        const totalSeconds = process.uptime();
        const realTotalSecs = Math.floor(totalSeconds % 60);
        const days = Math.floor((totalSeconds % (31536 * 100)) / 86400);
        const hours = Math.floor((totalSeconds / 3600) % 24);
        const mins = Math.floor((totalSeconds / 60) % 60);

        return message.channel.send(new MessageEmbed().setFooter(`봇 켜짐: ${moment(this.client.readyAt).format("YYYY/MM/DD A hh : mm : ss (Z)")}`).setDescription(`**지금까지 \`${days}일 ${hours}시간 ${mins}분 ${realTotalSecs}초\` 켜져 있었어요.**`).setColor("#739cde"));
    }
}