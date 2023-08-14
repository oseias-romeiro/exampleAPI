const { sequelize } = require('../models');
const bcrypt = require('bcrypt');

const User = require('../models/user')

async function verifyUser(email, password) {
  const user = await sequelize.models.User.findOne({ where: {email: email} })
  if(user && await bcrypt.compare(password, user.password)) return user
  else return false
}

async function createUser(name, email, password, role) {
  return await sequelize.models.User.create({
    name: name, email: email, password: await bcrypt.hash(password, 10), role: role
  })
}

async function getAllUsers() {
  const users = await sequelize.models.User.findAll();

  const plainUsers = users.reduce((acc, user) => {
    acc.push({id: user.id, name: user.name, email: user.email, role: user.role })
    return acc;
  }, []);

  return plainUsers
}

async function destroyUser(id, admin=false) {
  const user = await sequelize.models.User.findOne({where: {id:id}})
  if(user.role === "USER"){
    await user.destroy()
  }else if (admin) {
    await user.destroy()
  }
  return (user.role === "USER" || admin)// user removed?
}

async function updateUser(id, name, password, role) {
  const user = await sequelize.models.User.findOne({where: {id:id}})
  user.name = name
  user.password = await bcrypt.hash(password, 10)
  user.role = role
  return await user.save()
}

module.exports = {verifyUser, createUser, getAllUsers, destroyUser, updateUser}
