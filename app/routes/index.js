const authRouter = require("../components/auth/authRouter");
const userRouter = require("../components/users/userRouter");
const authMiddleware = require("../components/auth/authMiddleware");

function route(app) {
  app.use("/users", authMiddleware.verifyToken, userRouter);
  app.use("/auth", authRouter);

  app.use("/", authMiddleware.verifyToken, (req, res, next) => {
    res.status(200).json(req.user);
  });
}

module.exports = route;
