const Sequelize = require("sequelize");
const { validate } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const University = sequelize.define("unis", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique : true
    },
    desc: {
      type: "LONGTEXT",
      allowNull: false,
      // unique : true

    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    url : {
      type : DataTypes.STRING,
      allowNull:false
    },
    admin_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
  // If don't want updatedAt
  },{
    timestamps : false
  });
  return University;
};
