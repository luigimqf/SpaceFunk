const data = {
  name: 'ping',
  description: 'Ping!',
}

async function run ({interaction,client}) {
  await interaction.reply('Pong!')
}

module.exports = { data, run };