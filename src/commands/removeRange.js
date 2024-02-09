const { useQueue } = require("discord-player");
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

const data = {
  name: "remove-range",
  description: "Remove músicas entre dois números da fila!",
  options: [
    {
      name: "initial",
      description: "A posição inicial da música na fila",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "final",
      description: "A posição final da música na fila",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
};

async function run({ interaction, client }) {
  const queue = useQueue(interaction.guild);
  const embed = new EmbedBuilder();

  if (!queue || !queue.isPlaying())
    return interaction.reply({content: "Não estou tocando nada no momento!", epheremal: true});

  const rangeInitial = interaction.options.getString("song");
  const rangeEnd = interaction.options.getNumber("number");

  if (!rangeInitial && !rangeEnd)
    return interaction.reply({content:"Você precisa especificar os indexs!", epheremal: true});


  const tracks_to_remove = queue.tracks
    .toArray()
    .slice(rangeInitial - 1, rangeEnd - 1);

  if (!tracks_to_remove)
    return interaction.reply("Não foi possível encontrar as músicas na fila!");

  for(music in tracks_to_remove){
    queue.removeTrack(music);
  }

  embed
    .setAuthor({
      name: "Músicas removidas",
      iconURL: client.user.displayAvatarURL(),
    })
    .setDescription(`⏭️ Músicas removidas: **${tracks_to_remove.length}**`)
    .setColor("#8e44ad")
    .setFooter({
      text: `Comando executado por ${interaction.user.tag}`,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setTimestamp()
    .toJSON();

  return interaction.reply({
    embeds: [embed],
  });
}

module.exports = { data, run };
