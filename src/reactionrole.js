module.exports = class ReactionRole {
    /**
     * @example 
     *  {Client} Bot client.
     *  {Guild} The guild for this Reaction Role
     *  {Message} Message to ReactionRole
     *  {Role} Role to given after react
     *  {Emoji} Emoji to this role
     */
    constructor(options){
        this.client = options.client ? options.client : options.message.client
        this.guild = options.guild ? options.guild : options.message.guild
        this.message = options.message.id ? options.message.id : options.message
        this.role = options.role.id ? options.role.id : options.role
        this.emoji = options.emoji.id ? options.emoji.id : options.emoji
        this.onlyadd = options.onlyadd == true ? true : false //optional
        this.debug = options.debug == true ? true : false //optional
        this.max = options.max > 0 ? options.max : Number.MAX_SAFE_INTEGER //optional

        this.uses = 0
        this.load()
    }
    load(){
        if(!this.client || typeof this.client != 'object') return console.log('Client from message is undefined!')
        else if(typeof this.guild != 'object') this.guild = this.client.guilds.get(this.guild)
        else if(typeof this.guild != 'object' || !this.guild) return console.log('Guild format invalid!')
        else if(typeof this.role == 'object') this.role.id ? this.role = this.role.id : this.role
        else if(typeof this.role != 'number') return console.log('Role format invalid!')
        else if(typeof this.message != 'object' && typeof this.message != 'number') return console.log('Message format invalid!')
        else if(typeof this.emoji == 'object') this.emoji.id ? this.emoji = this.emoji.id : this.emoji = this.emoji.name
        else if(typeof this.emoji != 'string' && typeof this.emoji != 'number') return console.log('Emoji format invalid!')
        //Se está tudo certo, pode iniciar!
        else {
        this.client.on('raw', evento => this.run(evento))
        if(this.debug) console.log(`[DEBUG] : ReactionRole ${this.role} started!`)
        }
    }
    run(evento){
    if(evento.t != 'MESSAGE_REACTION_ADD' && evento.t != 'MESSAGE_REACTION_REMOVE') return
        let typeAdd = evento.t == 'MESSAGE_REACTION_ADD' ? true : false
        if(this.onlyadd && !typeAdd || this.uses >= this.max) return
        evento = evento.d
        let emoji = evento.emoji.id ? evento.emoji.id : evento.emoji.name
        if(this.message == evento.message_id && this.emoji == emoji){
            let membro = this.guild.members.get(evento.user_id)
            if(!membro) return
            if(typeAdd) membro.addRole(this.role).then(() => {if(this.debug) console.log(`[DEBUG] : User ${evento.user_id} reacted with emoji ${this.emoji} and received the role ${this.role}`)}).catch(e => console.log(e))
            else membro.removeRole(this.role).then(() => {if(this.debug) console.log(`[DEBUG] : User ${evento.user_id} reacted with emoji ${this.emoji} and lost the role ${this.role}`)}).catch(e => console.log(e))
            this.uses += 1
        }
    }
}