const authRouter = require("../components/auth/authRouter");
const userRouter = require("../components/users/userRouter");
const bookTempRouter = require("../components/bookTemp/bookTempRouter");
const authMiddleware = require("../components/auth/authMiddleware");

function route(app) {
  app.use("/book-temps", authMiddleware.verifyToken, bookTempRouter);
  app.use("/users", authMiddleware.verifyToken, userRouter);
  app.use("/auth", authRouter);

  app.use("/", authMiddleware.verifyToken, (req, res, next) => {
    res.status(200).json(req.user);
  });
}

module.exports = route;
