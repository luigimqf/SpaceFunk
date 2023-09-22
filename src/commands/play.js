const { useMainPlayer } = require("discord-player");
const { EmbedBuilder, Application, ApplicationCommandOptionType } = require("discord.js");

const data = {
  name: "play",
  description: "Play a song!",
  options: [
    {
      name: "url",
      description: "Nome ou Link da música",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
};

async function run({ interaction, client }) {
  const player = useMainPlayer();

  const channel = interaction.member.voice.channel;
  if (!channel) return interaction.reply("Você não está em um canal de voz!");

  const query = interaction.options.getString("url", true);

  const embed = new EmbedBuilder()
    .setAuthor({ name: "Carregando música..." })
    .setColor("#8e44ad");

  const reply = await interaction.reply({ embeds: [embed] });

  try {
    const { track } = await player.play(channel, query, {
      requestedBy: interaction.user,
    });

    if(track.playlist) {
      embed
      .setAuthor({
        name: `Playlist adicionada à queue!`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setDescription(`▶️ Adicionado à queue: **${track.playlist.tracks.length} músicas** `)
      .setFooter({
        text: `Comando executado por ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp()
      .toJSON();
      await reply.edit({ embeds: [embed] });
      return;
    }

    embed
      .setAuthor({
        name: `Música adicionada à queue!`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setThumbnail(track.thumbnail)
      .setDescription(`▶️  Adicionado à queue: **${track.title}** `)
      .setFooter({
        text: `Comando executado por ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp()
      .toJSON();
    await reply.edit({ embeds: [embed] });
    return;
  } catch (error) {
    console.log(error);
    embed
      .setAuthor({
        name: `Erro ao tocar a música!`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setDescription(`❌ Ocorreu um erro ao tocar a música!`)
      .setFooter({
        text: `Comando executado por ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp()
      .toJSON();
    await reply.edit({ embeds: [embed] });
    return;
  }
}

module.exports = { data, run };
