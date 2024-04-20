const { EmbedBuilder } = require("@discordjs/builders");

const data = {
  name: "serverinfo",
  description: "Shows information about the server!",
};

async function run({ interaction, client }) {
  if (!interaction.guild) {
    return interaction.reply({
      content: "You can only use this command in a server!",
      ephemeral: true,
    });
  }

  const { guild } = interaction;

  const serverInfoEmbed = new EmbedBuilder({
    author: { name: guild.name, iconURL: guild.iconURL({ size: 4096 }) },
    fields: [
      {
        name: "Owner",
        value: (await guild.fetchOwner()).user.tag,
        inline: true,
      },
      {
        name: "Text channels",
        value: guild.channels.cache
          .filter((channel) => channel.type === 0)
          .toJSON().length,
        inline: true,
      },
      {
        name: "Voice channels",
        value: guild.channels.cache
          .filter((channel) => channel.type === 2)
          .toJSON().length,
        inline: true,
      },
      {
        name: "Category channels",
        value: guild.channels.cache
          .filter((channel) => channel.type === 4)
          .toJSON().length,
        inline: true,
      },
      { name: "Members", value: guild.memberCount, inline: true },
      { name: "Roles", value: guild.roles.cache.size, inline: true },
    ],
    footer: {
      text: `Command executed by ${
        interaction.user.tag
      } | Created at: ${guild.createdAt.toLocaleDateString()}}`,
    },
  });

  await interaction.reply({ embeds: [serverInfoEmbed] });
}

module.exports = { data, run };
