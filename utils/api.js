const uri = 'mongodb://localhost:27017/netwo';
function link() {
  return new Promise((resolve) => {
    var MongoClient = require("mongodb").MongoClient;
    MongoClient.connect(
      uri,
      { useUnifiedTopology: true },
      function (err, client) {
        if (err) throw err;
        resolve(client);
      }
    );
  });
}

function find(formName, query) {
  return new Promise((resolve, reject) => {
    link().then((client) => {
      const mydb = client.db("netwo");
      mydb
        .collection(formName)
        .findOne(query)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}
function findList(formName, query, params) {
  return new Promise((resolve, reject) => {
    link().then((client) => {
      let { limit = 9, skip = 0 } = params;
      const mydb = client.db("netwo");
      mydb
        .collection(formName)
        .find(query)
        .limit(limit)
        .skip(skip)
        .toArray((err, res) => {
          if (err) throw err;
          resolve(res);
          client.close();
        });
    });
  });
}

function findListAll(formName, query) {
  return new Promise((resolve) => {
    link().then((client) => {
      const mydb = client.db("netwo");
      mydb
        .collection(formName)
        .find(query)
        .toArray((err, res) => {
          if (err) throw err;
          resolve(res);
          client.close();
        });
    });
  });
}
function add(formName, query) {
  return new Promise((resolve) => {
    link().then((client) => {
      const mydb = client.db("netwo");
      mydb.collection(formName).insertOne(query, (err, res) => {
        if (err) throw err;
        resolve(res);
        client.close();
      });
    });
  });
}
function update(formName, query) {
  return new Promise((resolve, reject) => {
    link().then(async (client) => {
      const mydb = client.db("netwo");
      mydb
        .collection(formName)
        .updateOne({ id: query.id }, { $set: query })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}
function deleteData(formName, query) {
  return new Promise((resolve) => {
    link().then((client) => {
      const mydb = client.db("netwo");
      mydb.collection(formName).deleteOne(query, (err, res) => {
        if (err) throw err;
        resolve(res);
        client.close();
      });
    });
  });
}
exports.link = link;
exports.findList = findList;
exports.add = add;
exports.find = find;
exports.update = update;
exports.deleteData = deleteData;
exports.findListAll = findListAll;
