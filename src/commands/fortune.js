const { EmbedBuilder } = require("discord.js");

const data = {
  name: "fortune",
  description: "Show your daily fortune!",
};

async function run({ interaction, client }) {

  const waifuValue = Math.floor(Math.random() * 100) + 1;
  const cockSize = "8" + "=".repeat(Math.floor(Math.random() * 15) + 1) + "D";
  const faggotValue = Math.floor(Math.random() * 100) + 1;
  let message = `Today you'r ${faggotValue}% gay! 🏳️‍🌈\n${cockSize}\n`;

  if (waifuValue <= 50) {
    message += `You'r ${waifuValue}% waifu today! 🤢\n`;
  } else {
    message += `You'r ${waifuValue}% waifu today! 🥰\n`;
  }

  const embed = new EmbedBuilder().setTitle("Daily Fortune").setDescription(message).setColor("#8e44ad").setTimestamp(new Date());

  return interaction.reply({ embeds: [embed] });
}

module.exports = { data, run };
