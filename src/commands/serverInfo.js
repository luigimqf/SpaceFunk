const { EmbedBuilder } = require("@discordjs/builders");

const data = {
  name: "serverinfo",
  description: "Mostra informações do servidor!",
};

async function run({ interaction, client }) {
  if(!interaction.guild){
    return interaction.reply({
      content: "Você não está em um servidor!",
      ephemeral: true,
    });
  }

  const { guild } = interaction;

  const serverInfoEmbed = new EmbedBuilder({
    author: {name: guild.name, iconURL: guild.iconURL({size: 4096})},
    fields:[
      {name: "Dono", value: (await guild.fetchOwner()).user.tag, inline: true},
      {name: "Canais de texto", value: guild.channels.cache.filter(channel => channel.type === 0).toJSON().length, inline: true},
      {name: "Canais de voz", value: guild.channels.cache.filter(channel => channel.type === 2).toJSON().length, inline: true},
      {name: "Canais de categoria", value: guild.channels.cache.filter(channel => channel.type === 4).toJSON().length, inline: true},
      {name: "Membros", value: guild.memberCount, inline: true},
      {name: "Cargos", value: guild.roles.cache.size, inline: true},
    ],
    footer: {text: `Comando executado por ${interaction.user.tag} | Criado em: ${guild.createdAt.toLocaleDateString()}}`},
  });

  await interaction.reply({embeds: [serverInfoEmbed]});
}

module.exports = { data, run };
