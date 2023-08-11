module.exports = (sequelize, DataTypes, Model) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: false, // Email should not be null
      unique: true, // Make sure emails are unique
      validate: {
        isEmail: true, // Validate that the input is a valid email format
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'users',
    updatedAt: 'updateTimestamp'
    // timestamps: false
  });

  // `sequelize.define` also returns the model
  return User;
  console.log(User === sequelize.models.User); // true
};
