const db = require("../../models");
const { celebrate, Joi, Segments } = require("celebrate");
const { uploadPdf } = require('../../middlewares/upload')

exports.noteGet = {
  controller: async (req, res) => {
    try {
      const noteData = await db.notes.findAll({
        where: {
          sub_id: req.params.id,
        }, order : ['name']
      });
      res.render("../views/admin/note.ejs", { noteData });
    } catch (error) {
      console.log(error);
    }
  },
};

exports.notePost = {
  
  validator: celebrate({
    [Segments.BODY]: Joi.object().keys({
      note_name: Joi.string().required(),
      note_desc: Joi.string().min(0).max(500).required(),
      note_tags: Joi.string().required(),
      sub_id: Joi.string().required(),
      sub_name: Joi.string().required(),
      pdf : Joi.optional()
    }),
  }),
  controller: async (req, res) => {
    try {
         console.log(req.files)
        const data = {
            name: req.body.name,
            desc: req.body.desc,
            tags: req.body.tags,
            url : req.file.location,
            sub_id: req.params.id,
            sub_name: req.params.sub_name,
          };
    
          const noteExists = await db.notes.findOne({
            where: {
              name: req.body.name,
            },
          });
    
          if (noteExists) {
             res.send("already exists!")
          } else {
        
            const record = await db.notes.create(data);
            res.redirect("back");
          }
    } catch (error) {
        res.send(error.message)
    }
  },
};
 
// Delete course by branch
exports.deleteNote = {
  controller: async (req, res) => {
    try {
      
      const deleteRecord = await db.notes.destroy({
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
      const noteData = await db.notes.findOne({
        where: {
            id: req.params.id,
        },
      });
      res.json("Description : " + noteData.desc);
    } catch (error) {
      res.send(error.message)
    }
  },
};

exports.getTag = {
  controller: async (req, res) => {
    try {
      const noteData = await db.notes.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.json("Tags : " + noteData.tags);
    } catch (error) {
      res.send(error.message)
    }
  },
};
