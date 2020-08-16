const {Command} = require('discord.js-commando-kr')
const {MessageEmbed} = require('discord.js')

module.exports = class Eval extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            description: 'eval',
            memberName: 'eval',
            group: 'owner',
            args: [
                {
                    type: 'string',
                    key: 'script',
                    prompt: '스크립트 입력'
                }
            ],
            ownerOnly: true
        });
    }

    run(msg, args, fromPattern, result) {
        const embed = new MessageEmbed()
        embed.setTitle('EVAL')
        const input = args.script.replace(/^```js/, '').replace(/```$/,'')
        embed.addField('📥 INPUT:', '```js\n' + input + '```').setColor("#739cde");
        try {
            const res = require('util').inspect(eval(input))
            embed.setDescription('상태 : <a:O_:744081991405666374>\n')
            embed.addField('📤 Output:', '```' + `${res.length > 1000 ? res.slice(0,1000).replace(this.client.token, "토큰을 가져올수 없습니다.") + '...' : res.replace(this.client.token, "토큰을 가져올수 없습니다.")}` + '```')
        } catch (e) {
            embed.setDescription('상태 : <a:X_:744081991497940994>\n')
            embed.addField('📤 Output:',  '```' + `${e.stack.length > 1000 ? e.stack.slice(0,1000).replace(this.client.token, "토큰을 가져올수 없습니다.") + '...' : e.stack.replace(this.client.token, "토큰을 가져올수 없습니다.")}` + '```')
        }
        return msg.say(embed)
    }
}