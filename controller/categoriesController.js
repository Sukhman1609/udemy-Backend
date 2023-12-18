const { bollywood } = require("../dummy");

const bollywoodcon = (req, res) => {
  return res.send(bollywood);
};

const bcrypt = require('bcrypt');
const array = [];
const jwt = require('jsonwebtoken');
const secret_key = 'hello16';

const register = (req, res) => {
  const data = req.body;
  console.log(data);
  const details = array.find((item) => item.email === data.email);
  if (details) {
    return res.send({ msg: 'User already has an account!!' });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashpassword = bcrypt.hashSync(data.password, salt);
  console.log(hashpassword);
  console.log(hashpassword);
  const tempobject = {
    email: data.email,
    password: hashpassword,
  };
  array.push(tempobject);
  const token = jwt.sign({ useremail: data.email }, secret_key, { expiresIn: '7d' });
  console.log(token);
  res.send({ msg: 'user Registered Successfully!!!', token: token });
};

const login = (req, res) => {
  const logindata = req.body;
  console.log(logindata);
  const user = array.find((item) => item.email === logindata.email);

  if (user) {
    const validate = bcrypt.compareSync(logindata.password, user.password);

    if (validate) {
      const token = jwt.sign({ useremail: logindata.email }, secret_key, { expiresIn: '7d' });
      return res.send({ msg: 'User logged in!!!', token: token });
    } else {
      return res.send({ msg: 'User password is wrong...Please Check again' });
    }
  } else {
    return res.send({ msg: 'User not found. Please register first.' });
  }
  
};

module.exports = { register, login, bollywoodcon };
