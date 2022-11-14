const api = require("../../utils/api"),
  express = require("express"),
  user = express.Router(),
  uuid = require("node-uuid");

// add user
user.post("/add", async (req, res) => {
  let useridd = uuid.v1(); 
  req.body.id = useridd;
  try {
    let manageObj = await api.find("user", {
      userName: req.body.userName,
    });
    if (manageObj) {
      res.send({ msg: "The user name already exists", status: 1 });
      return;
    }
  } catch (err) {
  }

  api.add("user", req.body).then(() => {
    res.send({ msg: "ok", status: 0 });
  });
});

user.put("/update", async (req, res) => {
  try {
    api.update("user", req.body).then(() => {
      res.send({ msg: "Modified successfully", status: 0 });
    });
  } catch (error) {
    res.send({ msg: "app error", status: 1 });
  }
});

user.delete("/delete", (req, res) => {
  try {
    api.deleteData("user", req.query).then((info) => {
      res.send({ msg: "Successfully deleted", status: 0 });
    });
  } catch (error) {
    res.send({ msg: "app error", status: 1 });
  }
});

module.exports = user;
