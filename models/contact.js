module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('contact', {
    // Model attributes are defined here
    permanent_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    current_address: {
      type: DataTypes.STRING,
      allowNull: true // allowNull defaults to true
    }
  }, {
    // Other model options go here
  });

  return Contact;
};
