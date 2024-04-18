const { useQueue } = require("discord-player");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

const data = {
  name: "volume",
  description: "Change the volume of the music!",
  options: [
    {
      name: "volume",
      description: "The volume to set! (1-100)",
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
      content: "I'm not playing anything!",
      epheremal: true,
    });

  const newVolume = interaction.options.getNumber("volume");

  if(queue.node.volume === newVolume) return interaction.reply({
    content: `Volume already in **${newVolume}**`,
    epheremal: true,
  })

  queue.node.setVolume(newVolume);

  const embed = new EmbedBuilder()
    .setAuthor({name: `🔊 Volume changed ${newVolume}`,iconURL:client.user.displayAvatarURL()})
    .setColor('#8e44ad')
    .setFooter({text: `Command executed by ${interaction.user.tag}`,iconURL: interaction.user.displayAvatarURL()}).setTimestamp().toJSON();

  interaction.reply({embeds: [embed]});
}

module.exports = { data, run }