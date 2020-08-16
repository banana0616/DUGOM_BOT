const {Command} = require('discord.js-commando-kr')
const {MessageEmbed} = require('discord.js')


module.exports = class Dev extends Command {
    constructor(client) {
        super(client, {
            name: '개발자',
            description: '개발자',
            group: 'general',
            memberName: 'dev'
        });
    }

    run(msg) {
        const embed = new MessageEmbed()
        embed.setDescription('**개발자 : 바나나#2020, 봇 코드 제공: Dugom#4015**\n**두곰봇 오픈소스 링크: [[이동하기!]](https://github.com/ejl-kr/DUGOM_BOT)**\n**김치봇 오픈소스 링크: [[이동하기!]](https://github.com/junkrat0616/banana)**').setColor(0xFF0000);
        embed.setFooter('본 오픈소스의 라이센스는 두곰님 에게 있습니다.')
        return msg.say(embed)
    }
}
