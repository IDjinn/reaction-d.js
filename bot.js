const Discord = require('discord.js');
const bot = new Discord.Client();
var fs = require('fs');
const Reaction = require('./index.js')
const YesNo = require('./src/yesno.js')

bot.commands = new Discord.Collection();//se você definiu "client", troque "bot" por client!
bot.aliases = new Discord.Collection();

bot.on('ready', () => {
  console.log(`Conectado com sucesso ${bot.user.tag}!`);
});

fs.readdir('./commands', (erro, file) => {
  if (erro) console.log(erro.stack);
  let jsf = file.filter(f => f.endsWith('.js'));//isso fara com que apenas pega os comandos feitos em ".js"
  if (jsf.length < 0) console.log('Nenhum comando foi encontrado!');//caso não tenha nenhum comando ou possivelmente algum erro
  jsf.forEach((f, i) => {
    let p = require(`./commands/${f}`);
    bot.commands.set(p.conf.name, p);
    console.log(`Carregando comando: ${p.conf.name}`)
    p.conf.aliases.forEach(a => {
      bot.aliases.set(a, p.conf.name);
    })
  })
})

bot.on('message',async message => {
  console.log(await YesNo(message))
  if (!message.content.startsWith('n!')) return //Não processa mensagens que não começa com o prefixo do bot.
  let args = message.content.split(' ');
  let comando = args.shift().slice(2).toLowerCase();

  let cmd = bot.commands.get(comando) || bot.commands.get(bot.aliases.get(comando));
  if (cmd) {
    cmd.run(bot, message, args) //Executa o comando
  }
  else {
    return message.reply(`Não existe comando chamado \`${comando}\`!`)
  }
});

bot.login('NTQ3OTcyMDEzMjE4NTk0ODE3.D0-iSQ.WSYAgUVoJifoyOKETvEmMJ5aECU');
