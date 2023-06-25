const bookTempService = require("./bookTempService");
class BookTempController {
  //[GET] /book-temps
  getBookTemps = async (req, res) => {
    const user = await bookTempService.getListBookTemps();
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json(user);
    }
  };
}

module.exports = new BookTempController();
