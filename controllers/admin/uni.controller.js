const { where } = require("sequelize");
const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");
const { uploadPdf } = require('../../middlewares/upload')
// Create University Get
exports.createUniGet = {
    controller: async (req, res) => {
      try {
        const uniData = await db.university.findAll({
          order : ['name']
        });
        const adminData = await db.admins.findOne()
        res.render("../views/admin/uni.ejs", { uniData ,adminData});
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  // Create University Post
  exports.createUniPost = {
    // validating incoming data
    validator: celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        tags: Joi.string().required(),
        desc: Joi.string().min(0).max(2500).required(),
        pdf : Joi.optional(),
        url : Joi.string().optional(),
        admin_id: Joi.string().optional(),
      }),
    }),
    controller: async (req, res) => {
      try {
        console.log(req.files)
        const data = {
          name: req.body.name,
          desc: req.body.desc,
          url : req.file.location,
          tags: req.body.tags,
          admin_id : req.admin_id,
        };

        const uniExists = await db.university.findOne({
          where: {
            name: req.body.name,
          },
        });
  
        if (uniExists) {
          res.send("branch already exists");
        } else {
          const result  = await db.university.create(data);
          console.log(result)
          res.redirect("back");
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  };
  
  // Delete branch corresponding courses
exports.deleteUni = {
  controller: async (req, res, next) => {
    try {
      const id = req.params.id;
      const isValid = await db.university.findOne({
        where: {
          id: id,
        },
      });

      if (!isValid) {
        console.log("invalid id ");
      } else {

        const uniDelete = await db.university.destroy({
          where: {
            id: id,
          },
        });
        console.log(uniDelete)
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
      const uniData = await db.university.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.send("Description : " + uniData.desc);
    } catch (error) {
      console.log(error.message);
    }
  },
};

exports.getTag = {
  controller: async (req, res) => {
    try {
      const uniData = await db.university.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.send("Tags : " + uniData.tags);
    } catch (error) {
      console.log(error.message);
    }
  },
};
