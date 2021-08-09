/* eslint-disable no-param-reassign */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} = require("../helpers/errors");
const { Admin } = require("../models");

async function getEncryptedPassword(password) {
  const encryptedPassword = await bcrypt.hash(password, 10);
  return encryptedPassword;
}

const adminsController = {
  login: async (email, password) => {
    const user = await Admin.findOne({
      where: {
        mail: email,
      },
    });
    if (!user) {
      throw new NotFoundError("Email incorrect", "Ressource introuvable");
    }

    const correct = await bcrypt.compare(password, user.password);
    if (correct) {
      const MAXAGE = Math.floor(Date.now()) + 600 * 6000;
      user.exp = MAXAGE;
      const token = await jwt.sign(
        JSON.stringify(user),
        process.env.JWT_SECRET
      );
      user.token = token;
      return user;
    }
    throw new UnauthorizedError("Mot de passe incorrect");
  },
  add: async (data) => {
    const { mail, password } = data;

    const userFound = await Admin.findOne({
      where: {
        mail,
      },
    });
    if (userFound) {
      throw new BadRequestError(
        "Ressource existante",
        "Cet utilisateur existe déjà"
      );
    }

    data.password = await getEncryptedPassword(password);
    const newUser = await Admin.create(data);
    return newUser;
  },
  getAllAdmins: async () => {
    const admins = Admin.findAll({
      order: [["lastName", "ASC"]],
      attributes: ["firstName", "lastName", "id"],
      raw: true,
    });
    return admins;
  },
};

module.exports = adminsController;
