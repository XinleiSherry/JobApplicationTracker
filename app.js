const express = require("express"),
  bodyparser = require("body-parser"),
  path = require("path"),
  app = express(),
  pathroutes = path.resolve(__dirname, "routers"),
  serveStatic = require('serve-static')
  // server = process.env.PORT;
  server = 5005;
// app.use(serveStatic(path.join(__dirname, "./front/build")));
app.use((express.static(path.join(__dirname, "./front/build"))));
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
