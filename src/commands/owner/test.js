const {Command} = require('discord.js-commando-kr')
const {MessageEmbed} = require('discord.js')


module.exports = class Test extends Command {
    constructor(client) {
        super(client, {
            name: '테스트',
            description: 'test',
            group: 'owner',
            memberName: 'test',
            ownerOnly: true
        });
    }

    run(msg) {
        msg.say(new MessageEmbed().setTitle('test').setFooter(`test`).setDescription(`test`).setColor("#739cde"));
    }
}