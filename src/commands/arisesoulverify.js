const { SlashCommandBuilder } = require("discord.js");
const { generateUniqueToken, buildVerificationLink } = require("../common/index.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("arise_soul_verify")
    .setDescription("Get a unique verification link")
    .setDefaultMemberPermissions(0),

  async execute(interaction) {
    const userId = interaction.user.id;
    const uniqueToken = generateUniqueToken(userId);
    const queryParams = {
      user_id: userId,
    };

    const verificationLink = buildVerificationLink(uniqueToken, queryParams);
    
    await interaction.reply(`Here's your verification link: ${verificationLink}`);
  },
};
