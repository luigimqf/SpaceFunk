const {
  ApplicationCommandOptionType,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

const choices = [
  { name: "Rock", emoji: "🗿" },
  { name: "Paper", emoji: "📄" },
  { name: "Scissor", emoji: "✂️" },
];

const data = {
  name: "ppt",
  description: "Play rock, paper, scissor with someone!",
  dm_permission: false,
  options: [
    {
      name: "user",
      description: "User to play X1!",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
};

async function run({ interaction }) {
  try {
    const targetUser = interaction.options.getUser("user");

    if (interaction.user.id === targetUser.id)
      return interaction.reply({
        content: "Must be sad being this much alone...",
        ephemeral: true,
      });

    if (targetUser.bot)
      return interaction.reply({
        content: "You can't play with a bot!",
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setTitle("Rock, Paper and Scissors")
      .setDescription(`Your turn, ${targetUser}!`)
      .setColor("#8e44ad")
      .setTimestamp(new Date());

    const buttons = choices.map((choice) => {
      return new ButtonBuilder()
        .setCustomId(choice.name)
        .setLabel(choice.name)
        .setStyle(ButtonStyle.Primary)
        .setEmoji(choice.emoji);
    });

    const actionRow = new ActionRowBuilder().addComponents(buttons);

    const reply = await interaction.reply({
      content: `${interaction.user} invoked you to a rock, paper, scissor X1 , ${targetUser}!`,
      embeds: [embed],
      components: [actionRow],
    });

    const targetInteraction = await reply
      .awaitMessageComponent({
        filter: (i) => i.user.id === targetUser.id,
        time: 30000,
      })
      .catch(async (error) => {
        embed.setDescription(`GG! ${targetUser} didn't answer in time!`);
        await reply.edit({ embeds: [embed], components: [] });
        return;
      });

    if (!targetInteraction) return;

    const targetChoice = choices.find((choice) => {
      return choice.name === targetInteraction.customId;
    });

    await targetInteraction.reply({
      content: `You chose ${targetChoice.emoji}!`,
      ephemeral: true,
    });

    embed.setDescription(`${interaction.user}, your turn!`);

    await reply.edit({ embeds: [embed] });

    const initialUserInteraction = await reply
      .awaitMessageComponent({
        filter: (i) => i.user.id === interaction.user.id,
        time: 30000,
      })
      .catch(async (error) => {
        embed.setDescription(`GG! ${interaction.user} didn't answer in time!`);
        await reply.edit({ embeds: [embed], components: [] });
        return;
      });

    if (!initialUserInteraction) return;

    const initialUserChoice = choices.find((choice) => {
      return choice.name === initialUserInteraction.customId;
    });

    await initialUserInteraction.reply({
      content: `You chose ${targetChoice.emoji}!`,
      ephemeral: true,
    });

    let result;

    if (targetChoice.name === "Rock" && initialUserChoice.name === "Scissor") {
      result = `${targetUser} won!`;
    }

    if (targetChoice.name === "Scissor" && initialUserChoice.name === "Paper") {
      result = `${targetUser} won!`;
    }
    if (targetChoice.name === "Paper" && initialUserChoice.name === "Rock") {
      result = `${targetUser} won!`;
    }
    if (initialUserChoice.name === "Rock" && targetChoice.name === "Scissor") {
      result = `${targetUser} won!`;
    }

    if (initialUserChoice.name === "Tesoura" && targetChoice.name === "Papel") {
      result = `${targetUser} won!`;
    }
    if (initialUserChoice.name === "Papel" && targetChoice.name === "Pedra") {
      result = `${targetUser} won!`;
    }

    if (initialUserChoice.name === targetChoice.name) {
      result = "Draw!";
    }

    embed.setDescription(
      `${targetUser} chose ${targetChoice.emoji}!\n${interaction.user} chose ${initialUserChoice.emoji}!\n\n${result}`
    );

    await reply.edit({ embeds: [embed], components: [] });
  } catch (error) {}
}

module.exports = { data, run };
