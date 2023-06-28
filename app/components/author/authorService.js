const Author = require("../../models/Author");
const AuthorRequest = require("../../models/AuthorRequest");
const sendEmail = require("../../utils/sendEmail");
const jwt = require("jsonwebtoken");
const userService = require("../users/userService");
const AuthorRegistrationSuccess = require("../../../views/email/AuthorRegistrationSuccess");
const AuthorRegistrationFail = require("../../../views/email/AuthorRegistrationFail");

class AuthorService {
  getListAuthorRequests = async () => {
    try {
      const authorRequests = await AuthorRequest.find();
      const authorInfos = authorRequests.map((request) => {
        const authorInfo = jwt.verify(request.hash, process.env.JWT_AUTHOR_KEY);
        return { ...authorInfo, hash: request.hash };
      });
      return authorInfos;
    } catch (error) {
      console.error(error);
    }
  };

  getAuthorByAddress = async (address) => {
    const author = await Author.findOne({ wallet_address: address });
    return author;
  };

  acceptBecomeAuthor = async (authorInfo) => {
    try {
      if (authorInfo) {
        // Update user is author
        userService.updateUserAuthor(authorInfo.wallet_address, true);

        // store author information to the database
        const newAuthor = new Author(authorInfo);

        //save newAuthor to database
        const author = await newAuthor.save();

        // Send email notification to author
        this.sendAcceptedEmail(authorInfo);
        // delete author request
        await this.deleteAuthorRequest(authorInfo.hash);

        return true;
      }

      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  refuseBecomeAuthor = async (authorInfo) => {
    try {
      if (authorInfo) {
        // Update user is author
        userService.updateUserAuthor(authorInfo.wallet_address, false);

        // Send email notification to author
        this.sendRefusedEmail(authorInfo);
        // delete author request
        await this.deleteAuthorRequest(authorInfo.hash);

        return true;
      }

      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  deleteAuthorRequest = async (hash) => {
    try {
      await AuthorRequest.deleteOne({ hash: hash });
    } catch (error) {
      console.log(error.message);
    }
  };

  sendAcceptedEmail = async (author) => {
    try {
      const subject = "[NFT BookStore] - Registration Successful";
      const html = AuthorRegistrationSuccess(author.pseudonym);
      await sendEmail(author.email, subject, html);
    } catch (error) {
      console.log("Send email error: " + error.message);
    }
  };

  sendRefusedEmail = async (author) => {
    try {
      const subject = "[NFT BookStore] - Registration Failed";
      const html = AuthorRegistrationFail(author.pseudonym);
      await sendEmail(author.email, subject, html);
    } catch (error) {
      console.log("Send email error: " + error.message);
    }
  };
}

module.exports = new AuthorService();
