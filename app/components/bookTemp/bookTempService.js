const BookTemp = require("../../models/BookTemp");
const Book = require("../../models/Book");

class BookTempService {
  getListBookTemps = async () => {
    const bookTemps = await BookTemp.find();
    return bookTemps;
  };

  updateStatusBook = async (tokenId, status) => {
    const result = await Book.updateOne(
      {
        token_id: tokenId,
      },
      { $set: { is_approved: status } }
    );
    return result;
  };

  deleteBookTemp = async (tokenId) => {
    const result = await BookTemp.deleteOne({ token_id: tokenId });
    return result;
  };
}

module.exports = new BookTempService();
