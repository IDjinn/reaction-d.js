import { Collection, RichEmbed } from "discord.js";
let reacaoMenu = ['⬅','➡']

class ReactionMenu{
    constructor(menu){
        this.conteudoPaginas = menu.conteudoPaginas;
        this.tempo = menu.tempo > 0 ? menu.tempo : 60000;
        this.canal = menu.canal;
        this.titulo = menu.titulo;
        this.autor = menu.autor;
        this.message = menu.message;
    }
    init(){
        this.paginas = new Collection();
        this.paginaAtual = 0;

        this.conteudoPaginas.forEach(pagina => {
            this.embed = new RichEmbed()
            .setDescription(pagina)
            if(this.title) this.embed.setTitle(this.title)
            if(this.autor) this.embed.setAuthor(this.autor)
            this.paginas[this.paginaAtual] = pagina;
            this.paginaAtual += 1;
        });
        this.paginaAtual = 0;
        this.canal.send(this.paginas[this.paginaAtual]).then(async mensagem => {
            await mensagem.react("➡").catch(e => console.error(e));
            const filter = (reaction, user) => reacaoMenu.includes(reaction.emoji.name) && user.id === this.message.author.id
            const collector = m.createReactionCollector(filter, { time: this.tempo });
            collector.on('collect', async r => {
                switch(r.emoji.name){
                    case '➡':
                if(this.paginaAtual <= this.paginas.length) this.paginaAtual += 1;
                else m.reactions.forEach(mensagem => {
                    if(mensagem.emoji == '➡') mensagem.remove().catch(e => console.error(e));
                })
                mensagem.edit(this.paginas[this.paginaAtual]).catch(e => console.error(e));
                break;
        
                    case '⬅':
                if(this.paginaAtual >= 0) this.paginaAtual -= 1;
                else m.reactions.forEach(mensagem => {
                    if(mensagem.emoji == '⬅') mensagem.remove().catch(e => console.error(e));
                })
                mensagem.edit(this.paginas[this.paginaAtual]).catch(e => console.error(e));
                break;
                }
                if(this.paginaAtual > 0) m.react('⬅').catch(e => console.error(e));
                r.remove(this.message.author);
            })
        })
        
    }
}
