const { EmbedBuilder } = require("discord.js");

const data = {
  name: "fortune",
  description: "Pega a sorte do dia!",
};

async function run({ interaction, client }) {

  const waifuValue = Math.floor(Math.random() * 100) + 1;
  const cockSize = "8" + "=".repeat(Math.floor(Math.random() * 15) + 1) + "D";
  const faggotValue = Math.floor(Math.random() * 100) + 1;
  let message = `Hoje você está ${faggotValue}% gay! 🏳️‍🌈\n${cockSize}\n`;

  if (waifuValue <= 50) {
    message += `Hoje você está ${waifuValue}% waifu! 🤢\n`;
  } else {
    message += `Hoje você está ${waifuValue}% waifu! 🥰\n`;
  }

  const embed = new EmbedBuilder().setTitle("Sorte do dia!").setDescription(message).setColor("#8e44ad").setTimestamp(new Date());

  return interaction.reply({ embeds: [embed] });
}

module.exports = { data, run };
