const { where } = require("sequelize");
const db = require("../models");
const { celebrate, Joi, Segments } = require("celebrate");
const { raw } = require("body-parser");

// Get all courses by branch get request
exports.CourseGet = {
  controller: async (req, res) => {
    try {
  
      const courseData = await db.courses.findAll({
        where: {
          branch_id: req.params.id
        },
      });
      
      console.log(courseData)
      res.render("../views/admin/course.ejs", {courseData});
    } catch (error) {
      res.status(201).send(error);
    }
  },
};

// Create course
exports.createCourse = {
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      course_code: Joi.string().required(),
      course_name: Joi.string().required(),
      course_desc: Joi.string().min(0).max(500).required(),
      course_tags: Joi.string().required(),
      branch_id: Joi.string().optional(),
    }),
  }),

  controller: async (req, res) => {
    const data = {
      course_code: req.body.course_code,
      course_name: req.body.course_name,
      course_desc: req.body.course_desc,
      course_tags: req.body.course_tags,
      branch_id: req.params.id,
    };

    const courseExists = await db.courses.findOne({
      where: {
        course_code: req.body.course_code,
        course_name: req.body.course_name
      },
    });

    if (courseExists) {
      res.send("Course Already Exists");
    } else {
      await db.courses.create(data);
      res.redirect("back");
    }
  },
};

// Delete course by branch
exports.deleteCourse = {
  controller: async (req, res) => {
    const id = req.params.id;
    try {
      const id = req.params.id;
      const deleteRecord = await db.courses.destroy({
        where: {
          course_id: id,
        },
      });
      res.redirect('back');
      console.log(deleteRecord);
    } catch (error) {
      res.status(201).send(error);
    }
  },
};

// Get description about course 
exports.getDesc = {
  controller : async(req,res)=>{
    try {
      const courseData = await db.courses.findOne({where :{
         course_id : req.params.id
      }})
      res.send("Description : "+courseData.course_desc)
    } catch (error) {
      res.status(201).send(error);
    }
  }
}

// Get tags about course
exports.getTag = {
  controller : async(req,res)=>{
    try {
      const courseData = await db.courses.findOne({where :{
         course_id : req.params.id
      }})
      res.send("Tags : "+courseData.course_tags)
    } catch (error) {
      res.status(201).send(error);
    }
  }
}

 // const courseData = await db.branches.findAll({
      //   include : [{
      //     model : db.courses,
      //     as : "course",
      //     attributes :['course_code','course_name','course_desc','course_tags'],
      //     where : {
      //       branch_id : req.params.id
      //     }
      //   }]
      // })