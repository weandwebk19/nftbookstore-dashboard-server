const bcrypt = require("bcrypt");
const saltRounds = 10;
const Moderator = require("../../models/Moderator");
const User = require("../../models/User");

class UserService {
  getUserByUsername = async (username) => {
    const user = await Moderator.findOne({
      username: username,
    });
    return user;
  };

  getUserByEmail = async (email) => {
    const user = await Moderator.findOne({
      email: email,
    });
    return user;
  };

  getUserById = async (id) => {
    const user = await Moderator.findOne({
      _id: id,
    });
    return user;
  };

  updateUserAuthor = async (walletAddress, isAuthor) => {
    const result = await User.updateOne(
      {
        wallet_address: walletAddress,
      },
      { $set: { is_author: isAuthor } }
    );
    return result;
  };

  createUser = async (body) => {
    const hashPassword = await bcrypt.hash(body.password, saltRounds);
    //create new user
    const newUser = new Moderator({
      ...body,
      password: hashPassword,
    });

    //save user to database
    const user = await newUser.save();
    return user;
  };

  activeUser = async (userId) => {
    try {
      await Moderator.updateOne(
        { verifyStatus: true },
        { where: { id: userId } }
      );
      return true;
    } catch (error) {
      return false;
    }
  };

  getVerifyStatus = async (userId) => {
    try {
      const user = await Moderator.findOne({
        attributes: ["verifyStatus"],
        where: {
          id: userId,
        },
        raw: false,
      });
      if (user) {
        return user.verifyStatus;
      }
    } catch (error) {
      return error;
    }
  };

  resetPassword = async (userId, hashPassword) => {
    await models.User.update(
      { password: hashPassword },
      {
        where: {
          id: userId,
        },
      }
    );
  };
}

module.exports = new UserService();
