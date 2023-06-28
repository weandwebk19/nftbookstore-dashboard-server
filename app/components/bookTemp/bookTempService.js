const BookTemp = require("../../models/BookTemp");
const Book = require("../../models/Book");
const PublishingBookRegistrationSuccess = require("../../../views/email/PublishingBookRegistrationSuccess");
const PublishingBookRegistrationFail = require("../../../views/email/PublishingBookRegistrationFail");
const sendEmail = require("../../utils/sendEmail");

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

  sendAcceptedEmail = async (author, bookTitle) => {
    try {
      const subject = "[NFT BookStore] - Your NFT book is approved";
      const html = PublishingBookRegistrationSuccess(
        author.pseudonym,
        bookTitle
      );
      await sendEmail(author.email, subject, html);
    } catch (error) {
      console.log("Send email error: " + error.message);
    }
  };

  sendRefusedEmail = async (author, bookTitle) => {
    try {
      const subject = "[NFT BookStore] - Your NFT book is not approved";
      const html = PublishingBookRegistrationFail(author.pseudonym, bookTitle);
      await sendEmail(author.email, subject, html);
    } catch (error) {
      console.log("Send email error: " + error.message);
    }
  };
}

module.exports = new BookTempService();
