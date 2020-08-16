const {Command} = require('discord.js-commando-kr')
const {MessageEmbed} = require('discord.js')


module.exports = class Ping extends Command {
    constructor(client) {
        super(client, {
            name: '핑',
            description: '핑',
            group: 'general',
            memberName: 'ping'
        });
    }

    run(msg) {
        const embed = new MessageEmbed()
        embed.setTitle(`${this.client.user.username} ping`).setColor("#739cde");
        embed.setDescription(
            `<a:O_:744081991405666374> 웹소켓 핑: ${this.client.ws.ping}ms
            <a:O_:744081991405666374> 메시지 핑: ${Date.now() - msg.createdTimestamp}ms`
                )
        return msg.say(embed)
    }
}
