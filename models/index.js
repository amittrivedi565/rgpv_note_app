const dbConfig = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");
const uuidv4 = require("uuid").v4;
const bcrypt = require("bcrypt");
const { Hooks } = require("sequelize/lib/hooks");
const salt = bcrypt.genSaltSync(10);

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: console.log,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admins = require("./admin.models")(sequelize, DataTypes);

db.university = require("./uni.model")(sequelize, DataTypes);

db.branches = require("./branch.models")(sequelize, DataTypes);

db.courses = require("./course.models")(sequelize, DataTypes);

db.years = require("./year.model")(sequelize, DataTypes);

db.sems = require("./sem.models")(sequelize, DataTypes);

db.subjects = require("./sub.models")(sequelize, DataTypes);

db.notes = require("./notes.model")(sequelize, DataTypes);


// 1 : M (Admin : Colleges)
db.admins.hasMany(db.university, {
  foreignKey: "admin_id",
  as: "unis",
  onDelete: "CASCADE",
  hooks: true
});

db.university.belongsTo(db.admins, {
  foreignKey: "admin_id",
  as: "admin",
  onDelete: "CASCADE",
  hooks: true
});


// 1 : M (College : Branches)
db.university.hasMany(db.branches, {
  foreignKey: "uni_id",
  as: "branch",
  onDelete: "CASCADE",
  hooks: true
});

db.branches.belongsTo(db.university, {
  foreignKey: "uni_id",
  as: "unis",
  onDelete: "CASCADE",
  hooks :true
});




// 1 : M (Branch : Courses)
db.branches.hasMany(db.courses, {
  foreignKey: "branch_id",
  as: "course",
  onDelete: "CASCADE",
  hooks: true
});
db.courses.belongsTo(db.branches, {
  foreignKey: "branch_id",
  as: "branch",
  onDelete: "CASCADE",
  hooks :true
});


// 1 : M (Course : Years)
db.courses.hasMany(db.years, {
  foreignKey: "course_id",
  as: "years",
  onDelete: "CASCADE",
  hooks :true
});

db.years.belongsTo(db.courses, {
  foreignKey: "course_id",
  as: "course",
  onDelete: "CASCADE",
  hooks :true
});


// 1 : M (Year : Sems)
db.years.hasMany(db.sems, {
  foreignKey: "year_id",
  as: "semester",
  onDelete: "CASCADE",
  hooks :true
});

db.sems.belongsTo(db.years, {
  foreignKey: "year_id",
  as: "years",
  onDelete: "CASCADE",
  hooks :true
});


// 1 : M (Sem : Subjects)
db.sems.hasMany(db.subjects, {
  foreignKey: "sem_id",
  as: "subject",
  onDelete: "CASCADE",
  hooks :true
});

db.subjects.belongsTo(db.sems, {
  foreignKey: "sem_id",
  as: "semester",
  onDelete: "CASCADE",
  hooks :true
});


// 1 : M (Suject : Notes)
db.subjects.hasMany(db.notes, {
  foreignKey: "sub_id",
  as: "notes",
  onDelete: "CASCADE",
  hooks :true
});

db.notes.belongsTo(db.subjects, {
  foreignKey: "sub_id",
  as: "subject",
  onDelete: "CASCADE",
  hooks :true
});


db.sequelize.sync({ force: false }).then(async () => {
  console.log("Re-Sync Done!");

  // let admin = ({
  //   name: "abc",
  //   email: "abc",
  //   password: bcrypt.hashSync("123", salt),
  // })
  // await db.admins.create(admin)

});



module.exports = db;
