const authorService = require("./authorService");

class AuthorController {
  //[GET] /author/request
  getAuthorRequests = async (req, res) => {
    const authors = await authorService.getListAuthorRequests();
    if (authors) {
      return res.status(200).json(authors);
    } else {
      return res.status(404).json(authors);
    }
  };

  //[POST] /author/request/accept
  acceptAuthor = async (req, res) => {
    const isAccepted = await authorService.acceptBecomeAuthor(
      req.body.authorInfo
    );

    if (isAccepted) {
      return res.status(200).json({
        success: true,
        message: "Successfully accepted.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }
  };

  //[POST] /author/request/refuse
  refuseAuthor = async (req, res) => {
    const isRefused = await authorService.refuseBecomeAuthor(
      req.body.authorInfo
    );

    if (isRefused) {
      return res.status(200).json({
        success: true,
        message: "Successfully refused.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }
  };
}

module.exports = new AuthorController();
