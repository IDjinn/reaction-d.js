module.exports = class ReactionRole {
    constructor(args){
        this.client = args.message.client
        this.guild = args.message.guild
        this.channel = args.message.channel
        this.message = args.message
        this.role = args.role
        this.emoji = args.emoji
        this.onlyadd = args.onlyadd == true ? true : false
        this.debug = args.debug == true ? true : false

        this.load()
    }
    load(){
        if(!this.client) return console.log('Client from message is undefined!')
        if(!this.guild || typeof this.guild != 'object') return console.log('Guild from message is undefined!')
        if(!this.channel || typeof this.channel != 'object') return console.log('Channel from message is undefined!')
        this.role.id ? this.role = this.role.id : this.role
        if(!this.role || isNaN(this.role)) return console.log('Role format invalid!')
        if(!this.message || typeof this.message != 'object') return console.log('Message format invalid!')
        if(isNaN(this.emoji)) this.emoji.id ? this.emoji = this.emoji.id : this.emoji = this.emoji.name
        if(!this.emoji || isNaN(this.emoji)) return console.log('Emoji format invalid!')

        this.client.on('raw', evento => this.run(evento))
        if(this.debug) console.log(`[DEBUG] : ReactionRole ${this.role} started!`)
    }
    run(evento){
    if(evento.t != 'MESSAGE_REACTION_ADD' && evento.t != 'MESSAGE_REACTION_REMOVE') return
        let typeAdd = evento.t == 'MESSAGE_REACTION_ADD' ? true : false
        if(this.onlyadd && !typeAdd) return
        evento = evento.d
        let emoji = evento.emoji.id ? evento.emoji.id : evento.emoji.name
        if(this.message.id == evento.message_id && this.emoji == emoji){
            let membro = this.guild.members.get(evento.user_id)
            if(!membro) return console.log(`I can't get guild ${evento.guild_id}!`)
            if(typeAdd) membro.addRole(this.role).then(() => {if(this.debug) console.log(`[DEBUG] : User ${evento.user_id} reacted with emoji ${this.emoji} and received the role ${this.role}`)}).catch(e => console.log(e))
            else membro.removeRole(this.role).then(() => {if(this.debug) console.log(`[DEBUG] : User ${evento.user_id} reacted with emoji ${this.emoji} and lost the role ${this.role}`)}).catch(e => console.log(e))
        }
    }
}