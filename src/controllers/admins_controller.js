const { Admin } = require("../models");

const adminsController = {
  getAllAdmins: async () => {
    const admins = Admin.findAll({
      order: [["lastName", "ASC"]],
      attributes: ["firstName", "lastName"],
      raw: true,
    });
    return admins;
  },
};

module.exports = adminsController;
