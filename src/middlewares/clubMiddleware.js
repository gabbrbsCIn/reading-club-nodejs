const { findUserClubById } = require("../services/clubs/clubServices");
const { sendErrorResponse } = require("../utils/messages/messages");

const isClubJoined = async (req, res, next) => {
  try {
    const clubId = req.params.id;
    const userId = req.user.id;

    await findUserClubById(userId, clubId);
    req.clubId = clubId;
    next();
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

module.exports = { isClubJoined };
