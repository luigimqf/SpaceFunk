const data = {
  name: 'caule',
  description: 'Mostra o caule do dia!',
}

async function run ({interaction,client}) {
  return interaction.reply(`
  ⣿⣿⣿⣿⡷⠀⢠⣄⡿⢣⣄⡸⢀⣤⣶⣾⣿⣿⣿⣿⣿⣿⣷⣶⣭⡳⣶⣦⣤⣤ 
  ⣿⡿⣿⣿⠃⠀⠿⢟⣲⣿⢏⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡈⢿⣿ 
  ⣿⣿⣶⡆⢀⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡹ 
  ⣿⣿⢿⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢷ 
  ⢟⣽⣿⣿⣿⣿⣿⣿⣿⣿⡜⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⣿⣿⣿⣿⣿⡎ 
  ⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠘⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⣡⣾⣿⣿⣿⣿⣿⣿ 
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢈⣛⠻⣿⣿⠿⢛⣩⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿ 
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⢻⣿⣷⣄⠰⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ 
  ⣿⣿⣿⡿⠿⠿⠛⠿⠿⠟⠁⠀⢸⣧⠹⣿⣧⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ 
  ⣿⣿⣿⣷⣶⣿⣿⣷⣶⣶⣶⣶⡌⠻⣧⡘⢿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ 
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣈⠁⣀⡀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
  `);
}

module.exports = { data, run };