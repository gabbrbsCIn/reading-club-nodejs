const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../../utils/messages/messages");

const { createClub } = require("../../services/clubs/clubServices");

const {
  validateClubDataRequest,
} = require("../../utils/validators/validators");

const register = async (req, res) => {
  try {
    const clubData = req.body;
    const club = validateClubDataRequest(clubData);
    await createClub(club);
    const response = { data: club, message: "Clube criado com sucesso" };
    sendSuccessResponse(res, response);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

module.exports = {
  register,
};
