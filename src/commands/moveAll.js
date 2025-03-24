const { useQueue } = require("discord-player");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

const data = {
  name: "move-all",
  description: "Move all users from a channel to another",
  options: [
    {
      name: "current-channel",
      description: "The channel the users are in",
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
    {
      name: "new-channel",
      description: "The channel to move the users to",
      type: ApplicationCommandOptionType.Channel,
      required: true,
    }
  ]
};

async function run({ interaction, client }) {
  const currentChannel = interaction.options.getChannel("current-channel");
  const newChannel = interaction.options.getChannel("new-channel");

  if(!currentChannel.isVoice() || !newChannel.isVoice()) {
    return interaction.reply({ content: "Both channels must be voice channels", ephemeral: true });
  }

  const members = currentChannel.members.filter(member => !member.user.bot);
  if(!members.size) {
    return interaction.reply({ content: "No users to move", ephemeral: true });
  }

  for(const member of members.values()) {
    await member.voice.setChannel(newChannel);
    console.log(`Moved ${member.user.tag} to ${newChannel.name}`);	
  }

  interaction.reply({ content: "Moved all users", ephemeral: true });
}

module.exports = { data, run };