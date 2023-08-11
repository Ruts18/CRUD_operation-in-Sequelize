const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./controller/userController");
// const contactController = require("./controller/contactController");

const app = express();

app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.send("Hello rutuja");
});

// CRUD routes for users
app.post("/users", userController.addUser);
app.get("/users", userController.verifyToken, userController.getUsers);
app.get("/users/:id", userController.getUser);
app.put("/users/:id", userController.patchUser);
app.delete("/users/:id", userController.deleteUser);
app.post("/login", userController.loginUser);
app.post("/registration", userController.registerUser);

// CRUD routes for contacts
// app.post('/contacts', contactController.addContact);
// app.get('/contacts', contactController.getContacts);
// app.get('/contacts/:id', contactController.getContact);
// app.put('/contacts/:id', contactController.patchContact);
// app.delete('/contacts/:id', contactController.deleteContact);

const { sequelize } = require("./models"); // Assuming this is the correct path to the models

sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully.");
    app.listen(3000, () =>
      console.log("App is running on http://localhost:3000!")
    );
  })
  .catch((error) => {
    console.error("Unable to sync the database:", error);
  });
