const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { name, email } = req.body;
  const password = req.body.password.toString();
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const digitRegex = /[0-9]/;
  const repeatingRegex = /(.)\1\1/;

  if (password.length < 6 || password.length > 20) {
    return res.status(400).json({
      error: true,
      msg: "Password length must be between 6 and 20 characters.",
    });
  }

  if (
    !lowercaseRegex.test(password) ||
    !uppercaseRegex.test(password) ||
    !digitRegex.test(password)
  ) {
    return res.status(400).json({
      error: true,
      msg: "Password is invalid. It should contain at least one lowercase letter, one uppercase letter, and one digit.",
    });
  }

  if (repeatingRegex.test(password)) {
    return res.status(400).json({
      error: true,
      msg: "Password is invalid. It should not contain three repeating characters in a row.",
    });
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    return res.status(400).json({
      error: true,
      msg: "Email already registered",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const createUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return res.status(200).json({
    error: false,
    msg: "Register Successfully",
    data: createUser,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: true,
      msg: "All field is mandatory!d",
    });
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    return res.status(200).json({
      error: false,
      msg: "Login Successfully",
      data: user,
    });
  } else {
    return res.status(401).json({
      error: true,
      msg: "Email or Password is not valid",
    });
  }
};

module.exports = { registerUser, loginUser };
