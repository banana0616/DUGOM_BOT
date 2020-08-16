const {Command} = require('discord.js-commando-kr')
const {MessageEmbed} = require('discord.js')


module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: '도움말',
            description: '도움말',
            group: 'general',
            memberName: 'help'
        });
    }

    run(msg) {
        const embed = new MessageEmbed()
        embed.setTitle('도움말').setColor("#739cde");
        msg.client.registry.groups.forEach(group => {
            embed.addField(group.name, '`' + group.commands.map(r => r.name).join('` `') + '`')
        })
        return msg.say(embed)
    }
}
