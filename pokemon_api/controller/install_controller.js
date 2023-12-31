const sequelize = require("../helpers/database");
const UserModel = require("../model/user_model");
const bcrypt = require("bcrypt");

const { sucess, fail } = require("../helpers/response");

async function install(req, res) {
  try {
    await sequelize.sync({ force: true });

    // CREATE USER ADMIN
    const user = await UserModel.create({
      username: "admin",
      password: bcrypt.hashSync("admin", 8),
      isAdmin: true,
    });

    res.json(sucess({ user }));
  } catch (error) {
    res.status(500).json(fail("Erro na instalação"));
  }
}

module.exports = {
  install,
};
