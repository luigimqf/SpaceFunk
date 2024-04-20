const { useQueue } = require("discord-player");
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

const choices = [
  { name: "QUEUE", emoji: "🎶", description: "Loop set in queue" },
  { name: "TRACK", emoji: "🎵", description: "Loop set in track" },
  { name: "AUTOPLAY", emoji: "▶️", description: "Loop set in auto" },
  { name: "OFF", emoji: "🔇", description: "Loop off" },
];

const data = {
  name: "loop",
  description: "Enable or disable loop!",
};

async function run({ interaction }) {
  const queue = useQueue(interaction.guild);

  if (!queue || !queue.isPlaying()) {
    return interaction.reply({content: "I'm not playing anything!", ephemeral: true });
  }

  const embed = new EmbedBuilder()
  .setAuthor({name: "Loop confirmation",iconURL: interaction.client.user.displayAvatarURL()})
  .setDescription(`
    1. Loop in queue: ${choices[0].emoji}\n
    2. Loop in track: ${choices[1].emoji}\n
    3. Autoplay: ${choices[2].emoji}\n
    4. Off: ${choices[3].emoji}\n
  `)
  .setColor("#8e44ad")
  .setFooter({text: `Command executed by ${interaction.user.tag}`,iconURL: interaction.user.displayAvatarURL()}).setTimestamp().toJSON();

  const buttons = choices.map((choice) => {
    return new ButtonBuilder()
      .setCustomId(choice.name)
      .setStyle(ButtonStyle.Primary)
      .setEmoji(choice.emoji);
  });

  const actionRow = new ActionRowBuilder().addComponents(buttons);

  const reply = await interaction.reply({
    embeds: [embed],
    components: [actionRow],
  });

  const userInteraction = await reply.awaitMessageComponent({
    filter: (i) => i.user.id === interaction.user.id,
  });

  if (!userInteraction) return;

  const userChoice = choices.find((choice) => {
    return choice.name === userInteraction.customId;
  });

  switch (userChoice.name) {
    case "QUEUE":
      queue.setRepeatMode(1);
      break;
    case "TRACK":
      queue.setRepeatMode(2);
      break;
    case "AUTOPLAY":
      queue.setRepeatMode(3);
      break;
    case "OFF":
      queue.setRepeatMode(0);
      break;
  }

  const successEmbed = new EmbedBuilder()
  .setAuthor({name: `${userChoice.description}`,iconURL: interaction.client.user.displayAvatarURL()})
  .setColor("#8e44ad")
  .setFooter({text: `Command executed by ${interaction.user.tag}`,iconURL: interaction.user.displayAvatarURL()}).setTimestamp().toJSON();

  await reply.edit({
    content: '',
    embeds: [successEmbed],
    components: [],
  });
}

module.exports = { data, run };
