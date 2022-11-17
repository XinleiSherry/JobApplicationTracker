const api = require("../../utils/api"),
  express = require("express"),
  login = express.Router();

// add user
login.post("/login", async (req, res) => {
  let { userName, password } = req.body;
  let info = await api.find("user", { userName, password });
  if (info) {
    res.send({ msg: "Log in successfully", status: 0 , userInfo:info});
  } else {
    res.send({ msg: "The account or password is incorrect , Please check and try again", status: 1 });
  }
});

module.exports = login;
