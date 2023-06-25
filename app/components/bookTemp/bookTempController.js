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

  //[POST] /book-temps/accept
  acceptBookTemp = async (req, res) => {
    try {
      const bookTemp = req.body;
      if (bookTemp) {
        // Update approved status book
        const updateStatus = await bookTempService.updateStatusBook(
          bookTemp.tokenId,
          true
        );

        // Delete book temp
        const deleteStatus = await bookTempService.deleteBookTemp(
          bookTemp.tokenId
        );

        // TODO: Send email notification to author

        if (updateStatus && deleteStatus) {
          return res.status(200).json({
            success: true,
            message: "Successfully",
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Something went wrong",
          });
        }
      }

      return res.status(404).json({
        success: false,
        message: "Not Found",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  //[POST] /book-temps/refuse
  refuseBookTemp = async (req, res) => {
    try {
      const bookTemp = req.body;
      if (bookTemp) {
        // Update approved status book
        const updateStatus = await bookTempService.updateStatusBook(
          bookTemp.tokenId,
          false
        );

        // Delete book temp
        const deleteStatus = await bookTempService.deleteBookTemp(
          bookTemp.tokenId
        );

        // TODO: Send email notification to author

        if (updateStatus && deleteStatus) {
          return res.status(200).json({
            success: true,
            message: "Successfully",
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Something went wrong",
          });
        }
      }

      return res.status(404).json({
        success: false,
        message: "Not Found",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };
}

module.exports = new BookTempController();
