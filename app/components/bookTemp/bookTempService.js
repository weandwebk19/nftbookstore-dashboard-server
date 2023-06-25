const BookTemp = require("../../models/BookTemp");

class BookTempService {
  getListBookTemps = async () => {
    const bookTemps = await BookTemp.find();
    return bookTemps;
  };
}

module.exports = new BookTempService();
