const {ShardingManager} = require('discord.js')
const path = require('path')

const manager = new ShardingManager(
    path.join(__dirname, 'bot.js'), {
        respawn: true,
        totalShards: 1,
        token: process.env.TOKEN,
        mode: 'process'
    }
)

manager.on('shardCreate', shard => {
    console.log(`Launched shard ${shard.id}`)
})

manager.spawn()
