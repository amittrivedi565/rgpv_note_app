const db = require("../../models")
exports.homeGet = {
    controller: async (req, res) => {
      const uniData = await db.university.findAll({order :["name"]})
     res.render("../views/client/home.ejs",{
        title : "Home"
     ,uniData})
  }};
  