const path = require("path");
const fs = require("fs");
const { ActionRowBuilder } = require("discord.js");

function createQueueButton() {
  const buttonsPath = path.resolve(__dirname, "..", "buttons", "player");

  const buttonsFiles = fs
    .readdirSync(buttonsPath)
    .filter((file) => file.endsWith(".js"));

  const buttons = buttonsFiles.map((file) =>
    require(path.resolve(buttonsPath, file))
  );

  const buttonsCollection1 = buttons.filter((button) =>
    ["previous", "stop", "skip"].includes(button.button.data.custom_id)
  );
  const buttonsCollection2 = buttons.filter((button) =>
    ["resume", "shuffle", "pause"].includes(button.button.data.custom_id)
  );

  buttonsCollection1.sort((a, b) => {
    const order = ["previous", "stop", "skip"];
    return order.indexOf(a.button.data.custom_id) - order.indexOf(b.button.data.custom_id);
  });

  buttonsCollection2.sort((a, b) => {
    const order = ["pause", "shuffle", "resume"];
    return order.indexOf(a.button.data.custom_id) - order.indexOf(b.button.data.custom_id);
  });

  const buttonComponents1 = buttonsCollection1.map((button) => button.button);
  const buttonComponents2 = buttonsCollection2.map((button) => button.button);

  const row1 = new ActionRowBuilder().addComponents(buttonComponents1);
  const row2 = new ActionRowBuilder().addComponents(buttonComponents2);

  return { rows: [row1, row2], buttons };
}

module.exports = createQueueButton;
