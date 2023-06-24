const userService = require("./userService");
const authService = require("../auth/authService");
class UserController {
  //[GET] /users?username={username}&email={email}....
  getUser = async (req, res) => {
    const query = req.query;
    if (query !== undefined) {
      const user = await userService.getUsers(query);
      return res.status(200).json(user);
    }
    return res.status(404).json(null);
  };

  getUserByUsername = async (req, res) => {
    const params = req.params;
    if (params.username !== undefined) {
      const user = await userService.getUserByUsername(params.username);
      res.status(200).json(user);
    } else {
      res.status(404);
    }
  };

  // [POST] /users/verify/email/send
  reSendVerifyEmail = async (req, res) => {
    try {
      const user = req.user;
      const email = user?.email;
      const userId = user?.id;
      await authService.sendVerifyEmail(email, userId);
      return res.status(200).json({
        success: true,
        message: "Send verification email successfully.",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

  //[GET] /users/verify-status
  verifyStatus = async (req, res) => {
    try {
      const user = req.user;
      if (user !== undefined && user.email !== undefined) {
        const status = await userService.getVerifyStatus(user.id);
        res.status(200).json(status);
      } else {
        res.status(404).json("User not found");
      }
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };
}

module.exports = new UserController();
