const {Command} = require('discord.js-commando-kr')
const {MessageEmbed} = require('discord.js')


module.exports = class Sc extends Command {
    constructor(client) {
        super(client, {
            name: '검색',
            description: '검색',
            group: 'general',
            memberName: 'sc',
            args: [
                {
                    key: "url",
                    prompt: "무엇을 검색할까요?",
                    type: "string"
                }
            ]
        });
    }

    run(msg, { url }) {
        const embed = new MessageEmbed()
        embed.setTitle(`국어사전`).setColor("#739cde");
        embed.setDescription(`**네이버** : [**링크**](https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=${url})\n**다음** : [**링크**](https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&sq=&o=&q=${url})`)
        return msg.say(embed)
    }
}
