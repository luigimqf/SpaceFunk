const {
  ApplicationCommandOptionType,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

const choices = [
  { name: "Pedra", emoji: "🗿" },
  { name: "Papel", emoji: "📄" },
  { name: "Tesoura", emoji: "✂️" },
];

const data = {
  name: "ppt",
  description: "Chame um player para um x1 de pedra, papel e tesoura!",
  dm_permission: false,
  options: [
    {
      name: "user",
      description: "Usuário pro x1",
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
        content: "Deve ser triste a vida de quem quer jogar sozinho...",
        ephemeral: true,
      });

    if (targetUser.bot)
      return interaction.reply({
        content: "Você não pode jogar com bots!",
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setTitle("Pedra, papel e tesoura!")
      .setDescription(`Sua vez, ${targetUser}!`)
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
      content: `${interaction.user} te convocou para um x1 de pedra, papel e tesoura , ${targetUser}!`,
      embeds: [embed],
      components: [actionRow],
    });

    const targetInteraction = await reply
      .awaitMessageComponent({
        filter: (i) => i.user.id === targetUser.id,
        time: 30000,
      })
      .catch(async (error) => {
        embed.setDescription(`GG! ${targetUser} não respondeu a tempo!`);
        await reply.edit({ embeds: [embed], components: [] });
        return;
      });

    if (!targetInteraction) return;

    const targetChoice = choices.find((choice) => {
      return choice.name === targetInteraction.customId;
    });

    await targetInteraction.reply({
      content: `Você escolheu ${targetChoice.emoji}!`,
      ephemeral: true,
    });

    embed.setDescription(`${interaction.user}, sua vez!`);

    await reply.edit({ embeds: [embed] });

    const initialUserInteraction = await reply
      .awaitMessageComponent({
        filter: (i) => i.user.id === interaction.user.id,
        time: 30000,
      })
      .catch(async (error) => {
        embed.setDescription(`GG! ${interaction.user} não respondeu a tempo!`);
        await reply.edit({ embeds: [embed], components: [] });
        return;
      });

    if (!initialUserInteraction) return;

    const initialUserChoice = choices.find((choice) => {
      return choice.name === initialUserInteraction.customId;
    });

    await initialUserInteraction.reply({
      content: `Você escolheu ${targetChoice.emoji}!`,
      ephemeral: true,
    });

    let result;

    if (targetChoice.name === "Pedra" && initialUserChoice.name === "Tesoura") {
      result = `${targetUser} venceu!`;
    }

    if (targetChoice.name === "Tesoura" && initialUserChoice.name === "Papel") {
      result = `${targetUser} venceu!`;
    }
    if (targetChoice.name === "Papel" && initialUserChoice.name === "Pedra") {
      result = `${targetUser} venceu!`;
    }
    if (initialUserChoice.name === "Pedra" && targetChoice.name === "Tesoura") {
      result = `${targetUser} venceu!`;
    }

    if (initialUserChoice.name === "Tesoura" && targetChoice.name === "Papel") {
      result = `${targetUser} venceu!`;
    }
    if (initialUserChoice.name === "Papel" && targetChoice.name === "Pedra") {
      result = `${targetUser} venceu!`;
    }

    if (initialUserChoice.name === targetChoice.name) {
      result = "Empate!";
    }

    embed.setDescription(
      `${targetUser} escolheu ${targetChoice.emoji}!\n${interaction.user} escolheu ${initialUserChoice.emoji}!\n\n${result}`
    );

    await reply.edit({ embeds: [embed], components: [] });
  } catch (error) {}
}

module.exports = { data, run };
