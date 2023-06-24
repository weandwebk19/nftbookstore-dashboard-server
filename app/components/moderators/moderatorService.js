const bcrypt = require("bcrypt");
const saltRounds = 10;
const Account = require("../../models/Moderator");

class ModeratorService {
  getModerators = async () => {
    const users = await Account.find();
    return users;
  };

  getModeratorByModeratorname = async (username) => {
    const moderator = await Account.findOne({
      username: username,
    });
    return moderator;
  };

  createModerator = async (body) => {
    const hashPassword = await bcrypt.hash(body.password, saltRounds);
    return await Account.create({
      ...body,
      password: hashPassword,
    });
  };

  activeModerator = async (userId) => {
    try {
      await Account.update({ verifyStatus: true }, { where: { id: userId } });
      return true;
    } catch (error) {
      return false;
    }
  };

  getVerifyStatus = async (userId) => {
    try {
      const moderator = await Account.findOne({
        attributes: ["verifyStatus"],
        where: {
          id: userId,
        },
        raw: false,
      });
      if (moderator) {
        return moderator.verifyStatus;
      }
    } catch (error) {
      return error;
    }
  };
}

module.exports = new ModeratorService();
