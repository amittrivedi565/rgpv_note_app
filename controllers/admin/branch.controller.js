const { where } = require("sequelize");
const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");

// Create Branch Get
exports.createBranchGet = {
  controller: async (req, res) => {
    try {
      const branchData = await db.branches.findAll({
        order : ['name']
      });
      res.render("../views/admin/branch.ejs", { branchData });
    } catch (error) {
      console.log(error);
    }
  },
};

// Create Branch Post
exports.createBranchPost = {
  // validating incoming data
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      tags: Joi.string().required(),
      desc: Joi.string().min(0).max(2500).required(),
    }),
  }),
  controller: async (req, res) => {
    try {
      const data = {
        name: req.body.name,
        desc: req.body.desc,
        tags: req.body.tags,
        uni_id : req.params.id
      };

      const branchExists = await db.branches.findOne({
        where: {
          name: req.body.name,
        },
      });

      if (branchExists) {
        res.send("branch already exists");
      } else {
        await db.branches.create(data);
        res.redirect("back");
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};

// Delete branch corresponding courses
exports.deleteBranch = {
  controller: async (req, res, next) => {
    try {
      const id = req.params.id;
      const isValid = await db.branches.findOne({
        where: {
          id: id,
        },
      });

      if (!isValid) {
        console.log("invalid id ");
      } else {
        const branchDelete = await db.branches.destroy({
          where: {
            id: id,
          },
        });
        res.redirect("back");
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};

exports.getDesc = {
  controller: async (req, res) => {
    try {
      const branchData = await db.branches.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.send("Description : " + branchData.desc);
    } catch (error) {
      console.log(error.message);
    }
  },
};

exports.getTag = {
  controller: async (req, res) => {
    try {
      const branchData = await db.branches.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.send("Tags : " + branchData.tags);
    } catch (error) {
      console.log(error.message);
    }
  },
};
