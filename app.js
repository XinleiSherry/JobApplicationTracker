const uri = process.env.MONGODB_URI;
const express = require("express"),
  bodyparser = require("body-parser"),
  path = require("path"),
  app = express(),
  pathroutes = path.resolve(__dirname, "routers"),
  server = process.env.PORT;
  console.log(uri, server);
app.listen(server, () => {
  console.log(
    `THE WEB SERVICE SUCCESSFULLY AND LISTENING TO THE PORT：${server}!`
  );
});
app.use((req, res, next) => {
  if (req.path !== "/") {
    res.set({
      "Access-Control-Allow-Credentials": false,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
      "Content-Type": "application/json; charset=utf-8",
    });
  }
  next();
});
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use("/login", require(`${pathroutes}/login`));
app.use("/user", require(`${pathroutes}/user`));
app.use("/applyfor", require(`${pathroutes}/applyfor`));
