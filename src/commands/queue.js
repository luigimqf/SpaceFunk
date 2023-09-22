const { useQueue } = require("discord-player");
const {
  EmbedBuilder,
} = require("discord.js");

const buttonActions = [
  { name: "back", emoji: "⬅️" },
  { name: "foward", emoji: "➡️" },
];

const data = {
  name: "queue",
  description: "Mostra a queue de músicas",
};

async function run({ interaction, client }) {
  const queue = useQueue(interaction.guildId);

  if (!queue || !queue.isPlaying())
    return interaction.reply({
      content: "Não estou tocando nada no momento!",
      epheremal: true,
    });

  if (!queue.tracks.toArray()[0])
    return interaction.reply({
      content: "Não há músicas na queue",
      epheremal: true,
    });

  let queueStart = 0;
  let queueEnd = 10;

  const songs = queue.tracks.size;
  const nextSongs =
    songs > 10
      ? `E **${songs - 10}** música(s)...`
      : `**${songs}** na playlist...`;

  const tracks = queue.tracks
    .toArray()
    .map(
      (track, index) =>
        `**${index + 1}**. **[${track.title}](${track.url}) | [${
          track.author
        }](${track.url})** - \`${track.duration}\` - \`${
          track.requestedBy.username
        }\``
    );

  // const buttons = buttonActions.map((choice) => {
  //   return new ButtonBuilder()
  //     .setCustomId(choice.name)
  //     .setStyle(ButtonStyle.Primary)
  //     .setEmoji(choice.emoji);
  // });

  // const actionRow = new ActionRowBuilder().addComponents(buttons);

  const progress = queue.node.createProgressBar(queue.currentTrack.duration);

  const embed = new EmbedBuilder()
    .setColor("#8e44ad")
    .setAuthor({
      name: `Server queue - ${interaction.guild.name}`,
      iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }),
    })
    .setDescription(
      `▶️ Tocando: **[${queue.currentTrack.title}](${
        queue.currentTrack.url
      })**\n\n${progress}\n\n${tracks.slice(queueStart, queueEnd).join("\n")}\n\n${nextSongs}`
    )
    .setFooter({
      text: `Comando executado por ${interaction.user.tag}`,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setTimestamp()
    .toJSON();

  const reply = await interaction.reply({ embeds: [embed]});

  // const userInteraction = await reply.awaitMessageComponent({
  //   filter: (i) => i.user.id === interaction.user.id,
  // });

  // if (!userInteraction) return;

  // const userChoice = buttonActions.find((choice) => {
  //   return choice.name === userInteraction.customId;
  // });

  // switch (userChoice.name) {
  //   case 'back':
  //     if(queueStart === 0) return;
  //     queueStart -= 10;
  //     queueEnd -= 10;
  //     break;

  //   case 'foward':
  //     if(queueEnd === queue.tracks.size) return;
  //     queueStart += 10;
  //     queueEnd += 10;
  // }

  // const newQueueEmbed = new EmbedBuilder()
  // .setAuthor({
  //   name: `Server queue - ${interaction.guild.name}`,
  //   iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }),
  // })
  // .setDescription(
  //   `▶️ Tocando: **[${queue.currentTrack.title}](${
  //     queue.currentTrack.url
  //   })**\n\n${tracks.slice(queueStart, queueEnd).join("\n")}\n\n${nextSongs}`
  // )
  // .setColor("#8e44ad")
  // .setFooter({
  //   text: `Comando executado por ${interaction.user.tag}`,
  //   iconURL: interaction.user.displayAvatarURL(),
  // })
  // .setTimestamp()
  // .toJSON();

  // await reply.edit({
  //   embeds: [newQueueEmbed],
  //   components: [actionRow],
  // })
}

module.exports = { data, run };
