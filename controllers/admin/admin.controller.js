const db = require("../../models");

exports.adminGet = {
    controller: async (req, res) => {
     res.render("../views/admin/dashboard.ejs")
  }};
  