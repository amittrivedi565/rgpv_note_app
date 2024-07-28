const { where } = require("sequelize");
const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");
const { raw } = require("body-parser");

// Get all courses by branch get request
exports.CourseGet = {
  controller: async (req, res) => {
    try {

     const courseData = await db.courses.findAll({
      where : {
        branch_id : req.params.id
      } , order : ['name']
      })
      

      res.render("../views/admin/course.ejs", { courseData});
    } catch (error) {
      console.log(error)
      res.status(201).send(error);
    }
  },
};

// Create course
exports.createCourse = {
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      code: Joi.string().required(),
      name: Joi.string().required(),
      desc: Joi.string().min(0).max(500).required(),
      tags: Joi.string().required(),
      id: Joi.string().optional(),
    }),
  }),

  controller: async (req, res) => {
    const data = {
      code: req.body.code,
      name: req.body.name,
      desc: req.body.desc,
      tags: req.body.tags,
      branch_id: req.params.id,
    };

    const courseExists = await db.courses.findOne({
      where: {
        code: req.body.code,
        name: req.body.name,
      },
    });

    if (courseExists) {
      res.send("Course Already Exists");
    } else {
    const record = await db.courses.create(data);
      res.redirect("back");
    
    }
  },
};

// Delete course by branch
exports.deleteCourse = {
  controller: async (req, res) => {
    try {
      const deleteRecord = await db.courses.destroy({
        where: {
         id : req.params.id
        },
      });
      res.redirect("back");
    } catch (error) {
      res.status(201).send(error);
    }
  },
};

// Get description about course
exports.getDesc = {
  controller: async (req, res) => {
    try {
      const courseData = await db.courses.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.send("Description : " + courseData.desc);
    } catch (error) {
      res.status(201).send(error);
    }
  },
};

// Get tags about course
exports.getTag = {
  controller: async (req, res) => {
    try {
      const courseData = await db.courses.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.send("Tags : " + courseData.tags);
    } catch (error) {
      res.status(201).send(error);
    }
  },
};
