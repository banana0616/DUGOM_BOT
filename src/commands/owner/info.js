const {Command} = require('discord.js-commando-kr')
const {MessageEmbed} = require('discord.js')
const { MyBot } = require("koreanbots")
const Bot = new MyBot("")


module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: '봇정보업뎃',
            description: '봇정보업뎃',
            group: 'owner',
            memberName: 'info',
            ownerOnly: true
        });
    }

    run(msg) {
        let update = count => Bot.update(count) 
            .then(res => msg.say("서버 수를 정상적으로 업데이트하였습니다!\n반환된 정보:" + JSON.stringify(res)))
            .catch(console.error)
        update(this.client.guilds.cache.size) // 준비 상태를 시작할 때, 최초로 업데이트합니다.
        setInterval(() => update(client.guilds.cache.size), 600000) // 10분마다 서버 수를 업데이트합니다.
    }
}
