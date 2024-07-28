const path = require("node:path");
const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");

// create subject
exports.createSubjectGet = {
  controller: async (req, res) => {
    try {
      const subData = await db.subjects.findAll({
        where: {
          sem_id: req.params.id,
        }, order : ['name']
      });
      const semData = await db.sems.findAll({});
      res.render("../views/admin/sub.ejs", { subData, semData });
    } catch (error) {
      console.log(error);
    }
  },
};
// create subject
exports.createSubjectPost = {
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      code: Joi.string().required(),
      name: Joi.string().required(),
      desc: Joi.string().min(0).max(500).required(),
      tags: Joi.string().required(),
      sem_id: Joi.string().optional(),
      sem_name: Joi.string().optional(),
    }),
  }),

  controller: async (req, res) => {
    try { 

        
        const data = {
        code: req.body.code,
        name: req.body.name,
        desc: req.body.desc,
        tags: req.body.tags,
        sem_id: req.params.id,
        sem_name: req.params.sem_name,
      };

      const subjectExists = await db.subjects.findOne({
        where: {
          code: req.body.code,
          name: req.body.name,
        },
      });

      if (subjectExists) 
        {
        res.send("Subject Already Exists");
      } 
      else 
      {
        const record = await db.subjects.create(data);
        res.redirect("back");
      }
    } catch (error) {
      res.send(error.message);
    }
  },
}

exports.deleteSubject = {
  controller: async (req, res) => {
    try {
      
      const deleteRecord = await db.subjects.destroy({
        where: {
          id: req.params.id
        },
      });
      res.redirect("back");
    } catch (error) {
      console.log(error);
    }
  },
};


exports.getDesc = {
  controller: async (req, res) => {
    try {
      const subData = await db.subjects.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.send("Description : " + subData.desc);
    } catch (error) {}
  },
};

exports.getTag = {
  controller: async (req, res) => {
    try {
      const subData = await db.subjects.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.send("Tags : " + subData.tags);
    } catch (error) {}
  },
};

