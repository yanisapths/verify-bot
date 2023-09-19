const { SlashCommandBuilder } = require("discord.js");
const { generateUniqueToken, buildVerificationLink } = require("../common/index.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("arise_soul_verify")
    .setDescription("Get a unique verification link")
    .setDefaultMemberPermissions(0),

  async execute(interaction) {
    const userId = interaction.user.id;
    const member = interaction.member;
    const internalRole = member.roles.cache.find(role => role.name === "internal");
    const uniqueToken = generateUniqueToken(userId);
    const queryParams = {
      user_id: userId,
    };

    if (!internalRole) {
      await interaction.reply({ content: "You do not have permission to use this command.", ephemeral: true });
      return;
    }

    const verificationLink = buildVerificationLink(uniqueToken, queryParams);
    await interaction.reply({content:`Here's your verification link: ${verificationLink}`, ephemeral: true, });
  },
};
