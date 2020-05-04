module.exports = {
    conf: {
      name:    'ping',//nome do arquivo
      aliases: [],//aliases desejadas, isso é: uma segunda forma de execução do comando! Se não desejar nenhuma aliase apenas deixar vázio "[]"
      desc:    'mostra a latência do bot',//descrição do comando
      usage:   '',//forma de utilização
      grupo:   'Outros',//grupo em que se encontra o comando, ex: Administração,
      membro:  'Membro',//o nivel em que o membro precisa ter, ex: Administrador, Membro, Dono
    },
    run: async(bot, message, args) => {
      return message.reply(`Pong! ${Math.floor(bot.ping)}ms`)
    }
  }