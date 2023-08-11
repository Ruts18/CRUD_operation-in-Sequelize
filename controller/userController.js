const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "JSON";

var registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await db.User.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    return res.status(409).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await db.User.create({
    email: email,
    password: hashedPassword,
    name: name,
  });

  // console.log(result);
  // //token generation method jwt.sign()
  // const token=jwt.sign({email: result.email,id:result._id},SECRET_KEY,{ expiresIn: "2h"} );
  // // res.status(201).json({user: result,token:token})
  res.status(201).json({ message: "User registered successfully" });
};
var loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await db.User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    const token = jwt.sign(
      { email: user.email, id: user.id, name: user.name },
      SECRET_KEY,
      { expiresIn: "6h" }
    );
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
};
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}
var addUser = async (req, res) => {
  const { firstName, lastName, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const data = db.User.build({
    firstName: firstName,
    lastName: lastName,
    password: hashedPassword,
  });
  await data.save();
  console.log("Data saved in the database");
  console.log(data.toJSON());
  res.status(200).json(data.toJSON());
};
//  addUser =async (req,res)=>{
//     const data = await db.User.create({firstName:req.body.firstName,lastName:req.body.lastName});
//     // console.log(data instanceof User);
// data.update({
//     firstname:"Ruts"
// })
// data.save();
// console.log(" data save in database");
// console.log(data.toJSON());
// res.status(200).json(data.toJSON());
// }
// var getUsers = async(req,res)=>{
//     const data= await db.User.findAll({ });
//     res.status(200).json({data:data});
// }

// var getUser = async(req,res)=>{
//     const data= await db.User.findOne({
//         where:{
//             id:req.params.id
//         }
//      });
//     res.status(200).json({data:data});
// }
// var postUser = async(req,res)=>{
//     var postData=req.body;
//     //if we want to send multiple data attime we use bulkcreate
//     if(postData.length>1){
//         var data= await db.User.bulkCreate(postData);
//     }
//     else{
//         var data=await db.User.create(postData);
//     }
//     res.status(200).json({data:data});
// }
// var deleteUser = async(req,res)=>{
//     const data= await db.User.destroy({
//         where:{
//             id:req.params.id
//         }
//      });
//     res.status(200).json({data:data});
// }
// var patchUser = async(req,res)=>{
//     var updatedata=req.body;
//     const data= await db.User.update(updatedata,{
//         where:{
//             id:req.params.id
//         }
//      });
//     res.status(200).json({data:data});
// }
module.exports = {
  addUser,
  // getUsers,
  // getUser,
  // postUser,
  // deleteUser,
  // patchUser,
  loginUser,
  registerUser,
  verifyToken,
};
