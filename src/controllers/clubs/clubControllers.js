const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../../utils/messages/messages");

const {
  createClub,
  findClubById,
  JoinAUserToClub,
} = require("../../services/clubs/clubServices");

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

const joinClub = async (req, res) => {
  try {
    const userId = req.user.id;
    const clubId = req.params.id;
    await findClubById(clubId);

    await JoinAUserToClub(userId, clubId);

    sendSuccessResponse(res, { message: "Usuário cadastrado no clube" });
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

module.exports = {
  register,
  joinClub,
};
