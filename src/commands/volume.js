const { useQueue } = require("discord-player");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

const data = {
  name: "volume",
  description: "Altera o volume da música",
  options: [
    {
      name: "volume",
      description: "Volume da música",
      type: ApplicationCommandOptionType.Number,
      required: true,
      minValue: 1,
      maxValue: 100,
    }
  ]
}

async function run({ interaction, client }) {
  const queue = useQueue(interaction.guildId);

  if (!queue || !queue.isPlaying())
    return interaction.reply({
      content: "Não estou tocando nada no momento!",
      epheremal: true,
    });

  const newVolume = interaction.options.getNumber("volume");

  if(queue.node.volume === newVolume) return interaction.reply({
    content: `O volume já está em **${newVolume}**`,
    epheremal: true,
  })

  queue.node.setVolume(newVolume);

  const embed = new EmbedBuilder()
    .setAuthor({name: `🔊 Volume alterado para ${newVolume}`,iconURL:client.user.displayAvatarURL()})
    .setColor('#8e44ad')
    .setFooter({text: `Comando executado por ${interaction.user.tag}`,iconURL: interaction.user.displayAvatarURL()}).setTimestamp().toJSON();

  interaction.reply({embeds: [embed]});
}

module.exports = { data, run }