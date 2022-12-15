const api = require("../../utils/api"),
  express = require("express");
(applyfor = express.Router()), (uuid = require("node-uuid"));
// add user
applyfor.post("/add", async (req, res) => {
  if (!req.body.userid) {
    res.send({ msg: "userid is null", status: 1 });
    return;
  }

  let useridd = uuid.v1();
  req.body.id = useridd;
  try {
    api.add("applyfor", req.body).then(() => {
      res.send({ msg: "ok", status: 0 });
    });
  } catch (error) {
    res.send({ msg: "app error", status: 1 });
  }
});
// query list
applyfor.post("/list", async (req, res) => {
  if (!req.body.userid) {
    res.send({ msg: "userid is null", status: 1 });
    return;
  }
  let info = await api.findListAll("applyfor", { userid: req.body.userid });

  let manageObj = await api.findList(
    "applyfor",
    {
      userid: req.body.userid,
      company: new RegExp(req.body.serch)
    },
    { skip: +req.body.skip * 9 }
  );
  res.send({
    msg: "query success！",
    status: 0,
    data: manageObj,
    dataLength: info.length,
  });
});



applyfor.delete("/delete", async (req, res) => {
  try {
    api.deleteData("applyfor", { id: req.query.id }).then((_) => {
      res.send({ msg: "delete success！", status: 0 });
    });
  } catch (error) {
    res.send({ msg: "delete error", status: 1 });
  }
});

applyfor.put("/update", async (req, res) => {
  try {
    api.update("applyfor", req.body).then(() => {
      res.send({ msg: "Modified successfully", status: 0 });
    });
  } catch (error) {
    res.send({ msg: "app error", status: 1 });
  }
});

module.exports = applyfor;
